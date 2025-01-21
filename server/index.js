const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const os = require('os')

const app = express();

app.use(cors());
app.use(bodyParser.json());

const mongoURI = process.env.MONGO_URI

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", userSchema);

app.post("/api/auth/register", async (req, res) => {
  const { username, phoneNumber, password } = req.body;

  try {
    const userExists = await User.findOne({ phoneNumber });
    if (userExists) {
      return res.status(400).json({ message: "Phone number already registered." });
    }

    const newUser = new User({ username, phoneNumber, password });
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

    res.status(200).json({ message: "Login successful!" , user:user});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// const PORT = process.env.PORT || 3000;
// function getNetworkIp() {
//     const interfaces = os.networkInterfaces();
//     for (const iface of Object.values(interfaces)) {
//       for (const details of iface) {
//         if (details.family === "IPv4" && !details.internal) {
//           return details.address;
//         }
//       }
//     }
//     return "localhost";
//   }
  
//   app.listen(PORT, "0.0.0.0", () => {
//     const networkIp = getNetworkIp();
//     console.log(`Server running at:`);
//     console.log(`- Local:   http://localhost:${PORT}`);
//     console.log(`- Network: http://${networkIp}:${PORT}`);
//   });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});