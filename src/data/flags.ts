import { Question, Test } from "./types";

export const FlagTest: Test = {
  id: "id:test/flag",
  title: "Medical Basics",
  testName: "flags",
  numOfQuestions: 10,
  duration: 10,
  image: {
    uri: "https://majorsdata.arizona.edu/sites/default/files/styles/az_trellis_800w_scale/public/2022-05/Basic%20Medical%20Sciences.jpeg?itok=feGVoONl",
    alt: "Medical Basics",
  },
};

export const flagQuestions: Question[] = [
  {
    id: "id:question/0",
    question: "What is the normal range of human body temperature?",
    image: {
      uri: "https://media.post.rvohealth.io/wp-content/uploads/2020/10/thermometers-1200x628-facebook-1200x628.jpg",
      alt: "Thermometer",
    },
    options: [
      { id: "id:option/0", text: "34-36°C", isCorrect: false },
      { id: "id:option/1", text: "36.5-37.5°C", isCorrect: true },
      { id: "id:option/2", text: "38-39°C", isCorrect: false },
      { id: "id:option/3", text: "40-41°C", isCorrect: false },
    ],
    answerDescription:
      "Correct! The normal range of human body temperature is 36.5-37.5°C.",
    hint: "It's the range that keeps our body functioning optimally.",
  },
  {
    id: "id:question/1",
    question: "Which organ is responsible for filtering toxins from the blood?",
    image: {
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGwRzKWeGKN9zqMZfBo5fdp1IcTmEhcZqg5A&s",
      alt: "Kidney",
    },
    options: [
      { id: "id:option/4", text: "Liver", isCorrect: false },
      { id: "id:option/5", text: "Kidney", isCorrect: true },
      { id: "id:option/6", text: "Lungs", isCorrect: false },
      { id: "id:option/7", text: "Stomach", isCorrect: false },
    ],
    answerDescription: "Correct! The kidneys filter toxins from the blood.",
    hint: "This organ also regulates water and salt balance in the body.",
  },
  {
    id: "id:question/2",
    question: "What is the primary function of red blood cells?",
    image: {
      uri: "https://images.ctfassets.net/tytuahdkbx9m/1nvEaHJErJltOToPbylHnS/1fbd1523f5778e2e1f41e8ad98d639a3/large-GettyImages-1437141716-Promo_Image_3000x2000.jpg?fm=webp&q=50&w=1200&h=600&fit=thumb",
      alt: "Red Blood Cells",
    },
    options: [
      { id: "id:option/8", text: "Fight infections", isCorrect: false },
      { id: "id:option/9", text: "Carry oxygen", isCorrect: true },
      { id: "id:option/10", text: "Form clots", isCorrect: false },
      { id: "id:option/11", text: "Break down toxins", isCorrect: false },
    ],
    answerDescription: "Correct! Red blood cells are responsible for carrying oxygen throughout the body.",
    hint: "Think of the part of the blood that binds to oxygen molecules.",
  },
  {
    id: "id:question/3",
    question: "What does BMI stand for?",
    image: {
      uri: "https://www.usz.ch/app/uploads/2023/10/bmi-usz-class-gender-en-scaled.jpg",
      alt: "BMI Calculation",
    },
    options: [
      { id: "id:option/12", text: "Body Mass Index", isCorrect: true },
      { id: "id:option/13", text: "Bone Muscle Indicator", isCorrect: false },
      { id: "id:option/14", text: "Body Measurement Index", isCorrect: false },
      { id: "id:option/15", text: "Basic Metabolic Indicator", isCorrect: false },
    ],
    answerDescription: "Correct! BMI stands for Body Mass Index.",
    hint: "It's a measurement used to assess if someone is underweight, normal, or overweight.",
  },
  {
    id: "id:question/4",
    question: "What is the name of the largest bone in the human body?",
    image: {
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIRCojQPoA3B0x0ArV05SAohybh3TeeyhANQ&s",
      alt: "Femur",
    },
    options: [
      { id: "id:option/16", text: "Femur", isCorrect: true },
      { id: "id:option/17", text: "Humerus", isCorrect: false },
      { id: "id:option/18", text: "Tibia", isCorrect: false },
      { id: "id:option/19", text: "Fibula", isCorrect: false },
    ],
    answerDescription:
      "Correct! The femur is the largest bone in the human body, located in the thigh.",
    hint: "This bone supports the body's weight during walking and running.",
  },
  {
    id: "id:question/5",
    question: "Which part of the brain controls balance and coordination?",
    image: {
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxs7zXQA4OjJPuPIesrkdVYPcvoQ1MGYIPzQ&s",
      alt: "Brain",
    },
    options: [
      { id: "id:option/20", text: "Cerebrum", isCorrect: false },
      { id: "id:option/21", text: "Cerebellum", isCorrect: true },
      { id: "id:option/22", text: "Medulla", isCorrect: false },
      { id: "id:option/23", text: "Hypothalamus", isCorrect: false },
    ],
    answerDescription:
      "Correct! The cerebellum is responsible for balance and coordination.",
    hint: "This part of the brain is located at the back, near the brainstem.",
  },
];