const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const os = require('os');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const mongoURI = process.env.MONGO_URI || 'mongodb+srv://chandrasaiteja0804:Saiteja2004@cluster0.y9pqj.mongodb.net/medquiz';

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'doctor', 'admin'], default: 'student' },
  specialization: { type: String, default: '' },
  college: { type: String, default: '' },
  graduationYear: { type: Number },
  isSubscribed: { type: Boolean, default: false },
  subscriptionPlan: { type: String, default: 'free' },
  subscriptionExpiry: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", userSchema);

// Quiz Results Schema
const resultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: String, required: true },
  moduleId: { type: String, required: true },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  timeTaken: { type: Number, required: true }, // in milliseconds
  correctAnswers: { type: Number, required: true },
  wrongAnswers: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const Result = mongoose.model("Result", resultSchema);

// User Progress Schema
const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: String, required: true },
  moduleId: { type: String, required: true },
  progress: { type: Number, default: 0 }, // percentage
  completedModules: { type: Number, default: 0 },
  totalModules: { type: Number, required: true },
  lastUpdated: { type: Date, default: Date.now },
});

const Progress = mongoose.model("Progress", progressSchema);

// Bookmark Schema
const bookmarkSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  questionId: { type: String, required: true },
  subject: { type: String, required: true },
  moduleId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

// Notes Schema
const noteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Note = mongoose.model("Note", noteSchema);

// Question Schema
const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
  explanation: { type: String, required: true },
  subject: { type: String, required: true },
  topic: { type: String, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  createdAt: { type: Date, default: Date.now },
});

const Question = mongoose.model("Question", questionSchema);

// Authentication Routes
app.post("/api/auth/register", async (req, res) => {
  const { username, phoneNumber, password, college, specialization, graduationYear } = req.body;

  try {
    const userExists = await User.findOne({ phoneNumber });
    if (userExists) {
      return res.status(400).json({ message: "Phone number already registered." });
    }

    const newUser = new User({ 
      username, 
      phoneNumber, 
      password, 
      college: college || '', 
      specialization: specialization || '',
      graduationYear: graduationYear || null
    });
    
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { phoneNumber, password } = req.body;

  try {
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Don't send password in response
    const userToSend = user.toObject();
    delete userToSend.password;

    res.status(200).json({ message: "Login successful!", user: userToSend });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// User Profile Routes
app.get("/api/user/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

app.put("/api/user/:userId", async (req, res) => {
  try {
    const { username, college, specialization, graduationYear } = req.body;
    
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { username, college, specialization, graduationYear },
      { new: true }
    ).select("-password");
    
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }
    
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Quiz Results Routes
app.post("/api/results", async (req, res) => {
  try {
    const { userId, subject, moduleId, score, totalQuestions, timeTaken, correctAnswers, wrongAnswers } = req.body;
    
    const newResult = new Result({
      userId,
      subject,
      moduleId,
      score,
      totalQuestions,
      timeTaken,
      correctAnswers,
      wrongAnswers
    });
    
    await newResult.save();
    
    // Update user progress
    let progress = await Progress.findOne({ userId, subject, moduleId });
    
    if (!progress) {
      progress = new Progress({
        userId,
        subject,
        moduleId,
        progress: (correctAnswers / totalQuestions) * 100,
        completedModules: 1,
        totalModules: 1
      });
    } else {
      progress.progress = (correctAnswers / totalQuestions) * 100;
      progress.lastUpdated = Date.now();
    }
    
    await progress.save();
    
    res.status(201).json(newResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

app.get("/api/results/:userId", async (req, res) => {
  try {
    const results = await Result.find({ userId: req.params.userId }).sort({ date: -1 });
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

app.get("/api/results/:userId/:subject", async (req, res) => {
  try {
    const results = await Result.find({ 
      userId: req.params.userId,
      subject: req.params.subject
    }).sort({ date: -1 });
    
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Progress Routes
app.get("/api/progress/:userId", async (req, res) => {
  try {
    const progress = await Progress.find({ userId: req.params.userId });
    res.status(200).json(progress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Bookmark Routes
app.post("/api/bookmarks", async (req, res) => {
  try {
    const { userId, questionId, subject, moduleId } = req.body;
    
    // Check if bookmark already exists
    const existingBookmark = await Bookmark.findOne({ userId, questionId });
    if (existingBookmark) {
      return res.status(400).json({ message: "Question already bookmarked." });
    }
    
    const newBookmark = new Bookmark({
      userId,
      questionId,
      subject,
      moduleId
    });
    
    await newBookmark.save();
    res.status(201).json(newBookmark);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

app.get("/api/bookmarks/:userId", async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json(bookmarks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

app.delete("/api/bookmarks/:id", async (req, res) => {
  try {
    const bookmark = await Bookmark.findByIdAndDelete(req.params.id);
    
    if (!bookmark) {
      return res.status(404).json({ message: "Bookmark not found." });
    }
    
    res.status(200).json({ message: "Bookmark removed successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Notes Routes
app.post("/api/notes", async (req, res) => {
  try {
    const { userId, subject, title, content } = req.body;
    
    const newNote = new Note({
      userId,
      subject,
      title,
      content
    });
    
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

app.get("/api/notes/:userId", async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.params.userId }).sort({ updatedAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

app.put("/api/notes/:id", async (req, res) => {
  try {
    const { title, content } = req.body;
    
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content, updatedAt: Date.now() },
      { new: true }
    );
    
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found." });
    }
    
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

app.delete("/api/notes/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    
    if (!note) {
      return res.status(404).json({ message: "Note not found." });
    }
    
    res.status(200).json({ message: "Note deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Subscription Routes
app.post("/api/subscription/:userId", async (req, res) => {
  try {
    const { plan, expiryDate } = req.body;
    
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { 
        isSubscribed: true, 
        subscriptionPlan: plan, 
        subscriptionExpiry: new Date(expiryDate) 
      },
      { new: true }
    ).select("-password");
    
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }
    
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Quiz Questions Routes
app.get("/api/questions/:subject", async (req, res) => {
  try {
    const questions = await Question.find({ subject: req.params.subject })
      .select('-correctAnswer -explanation')  // Don't send answers to client
      .limit(10);  // Limit to 10 questions per quiz
    
    if (!questions.length) {
      return res.status(404).json({ message: "No questions found for this subject." });
    }
    
    res.status(200).json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

app.post("/api/questions/verify", async (req, res) => {
  try {
    const { questionId, answer } = req.body;
    const question = await Question.findById(questionId);
    
    if (!question) {
      return res.status(404).json({ message: "Question not found." });
    }
    
    const isCorrect = question.correctAnswer === answer;
    res.status(200).json({
      isCorrect,
      explanation: question.explanation,
      correctAnswer: question.correctAnswer,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Admin route to add questions
app.post("/api/questions", async (req, res) => {
  try {
    const { text, options, correctAnswer, explanation, subject, topic, difficulty } = req.body;
    
    // Basic validation
    if (!options.includes(correctAnswer)) {
      return res.status(400).json({ message: "Correct answer must be one of the options." });
    }
    
    const newQuestion = new Question({
      text,
      options,
      correctAnswer,
      explanation,
      subject,
      topic,
      difficulty,
    });
    
    await newQuestion.save();
    res.status(201).json({ message: "Question added successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Get user's quiz history
app.get("/api/quiz-history/:userId", async (req, res) => {
  try {
    const results = await Result.find({ userId: req.params.userId })
      .sort({ date: -1 })
      .limit(10);
    
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Get subject-wise progress
app.get("/api/subject-progress/:userId", async (req, res) => {
  try {
    const results = await Result.aggregate([
      { $match: { userId: mongoose.Types.ObjectId(req.params.userId) } },
      {
        $group: {
          _id: "$subject",
          totalAttempts: { $sum: 1 },
          averageScore: { $avg: { $divide: ["$score", "$totalQuestions"] } },
          totalTimeTaken: { $sum: "$timeTaken" },
        },
      },
    ]);
    
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

const PORT = process.env.PORT || 3000;
function getNetworkIp() {
    const interfaces = os.networkInterfaces();
    for (const iface of Object.values(interfaces)) {
      for (const details of iface) {
        if (details.family === "IPv4" && !details.internal) {
          return details.address;
        }
      }
    }
    return "localhost";
  }
  
  app.listen(PORT, "0.0.0.0", () => {
    const networkIp = getNetworkIp();
    console.log(`Server running at:`);
    console.log(`- Local:   http://localhost:${PORT}`);
    console.log(`- Network: http://${networkIp}:${PORT}`);
  });