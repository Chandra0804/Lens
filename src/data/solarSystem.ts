import { Question, Test } from "./types";

export const SolarSystemTest: Test = {
  id: "id:test/medical-instruments",
  title: "Medical Instruments",
  testName: "solarSystem",
  numOfQuestions: 6,
  duration: 10,
  image: {
    uri: "https://img.freepik.com/free-photo/still-life-medical-tools_23-2149371263.jpg",
    alt: "Medical Instruments",
  },
};

export const solarSystemQuestions: Question[] = [
  {
    id: "id:question/30",
    question: "What is a stethoscope primarily used for?",
    image: {
      uri: "https://cdn.prod.website-files.com/63a1cbc81b0e903002cf9cec/64138bba0f85e33ff06de855_Best%20Stethoscopes%20for%20Nurses.webp",
      alt: "stethoscope",
    },
    options: [
      { id: "id:option/110", text: "Measuring blood pressure", isCorrect: false },
      { id: "id:option/111", text: "Listening to heart and lung sounds", isCorrect: true },
      { id: "id:option/112", text: "Checking reflexes", isCorrect: false },
      { id: "id:option/113", text: "Administering medication", isCorrect: false },
    ],
    answerDescription:
      "Correct! A stethoscope is used to listen to heart and lung sounds during a medical examination.",
    hint: "Doctors use this instrument by placing it on the chest or back.",
  },
  {
    id: "id:question/31",
    question: "Which instrument is used to measure body temperature?",
    image: {
      uri: "https://www.cosinuss.com/wp-content/uploads/2021/02/COS-cosinuss-bodytemperature-core_shell-EN-XXXX-V01-800x566.jpg",
      alt: "body temp",
    },
    options: [
      { id: "id:option/114", text: "Thermometer", isCorrect: true },
      { id: "id:option/115", text: "Stethoscope", isCorrect: false },
      { id: "id:option/116", text: "Sphygmomanometer", isCorrect: false },
      { id: "id:option/117", text: "Otoscope", isCorrect: false },
    ],
    answerDescription:
      "Correct! A thermometer is used to measure body temperature, often in cases of fever.",
    hint: "Common types include digital, infrared, and mercury versions.",
  },
  {
    id: "id:question/32",
    question: "What is a sphygmomanometer used for?",
    image: {
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo1I3US-Iy7qIb-5zaYKrcg8kmfnjt4RXiyA&s",
      alt: "body temp",
    },
    options: [
      { id: "id:option/118", text: "Measuring blood pressure", isCorrect: true },
      { id: "id:option/119", text: "Measuring oxygen saturation", isCorrect: false },
      { id: "id:option/120", text: "Monitoring glucose levels", isCorrect: false },
      { id: "id:option/121", text: "Listening to heartbeats", isCorrect: false },
    ],
    answerDescription:
      "Correct! A sphygmomanometer measures blood pressure and is commonly used with a stethoscope.",
    hint: "It includes a cuff wrapped around the arm.",
  },
  {
    id: "id:question/33",
    question: "Which instrument is used to examine the inside of the ear?",
    image: {
      uri: "https://www.verywellhealth.com/thmb/keiwm-9crXkqPEXA7p_loqOiOoA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-165564611-6b0f250870684a20b2135bfd7cd9fa1b.jpg",
      alt: "body temp",
    },
    options: [
      { id: "id:option/122", text: "Otoscope", isCorrect: true },
      { id: "id:option/123", text: "Endoscope", isCorrect: false },
      { id: "id:option/124", text: "Thermometer", isCorrect: false },
      { id: "id:option/125", text: "Laryngoscope", isCorrect: false },
    ],
    answerDescription:
      "Correct! An otoscope is used to examine the ear canal and eardrum.",
    hint: "It often has a light and a magnifying lens.",
  },
  {
    id: "id:question/34",
    question: "What is a defibrillator used for?",
    image: {
      uri: "https://media.istockphoto.com/id/179048564/photo/defibrillator.jpg?s=612x612&w=0&k=20&c=wHqPQogfKFMHUFSLz3XoqZY1ehgFmddmdFr_sg-wHVY=",
      alt: "body temp",
    },
    options: [
      { id: "id:option/126", text: "Restarting the heart during cardiac arrest", isCorrect: true },
      { id: "id:option/127", text: "Measuring oxygen levels", isCorrect: false },
      { id: "id:option/128", text: "Administering medication", isCorrect: false },
      { id: "id:option/129", text: "Measuring heart rate", isCorrect: false },
    ],
    answerDescription:
      "Correct! A defibrillator delivers an electric shock to restart or stabilize a person's heartbeat.",
    hint: "It is often seen in emergency scenarios or hospitals.",
  },
  {
    id: "id:question/35",
    question: "Which instrument is used to monitor oxygen levels in blood?",
    image: {
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmEvFORhWCoiCbPnUgVdkYpWnnzp-ibpDA8w&s",
      alt: "body temp",
    },
    options: [
      { id: "id:option/130", text: "Pulse oximeter", isCorrect: true },
      { id: "id:option/131", text: "Thermometer", isCorrect: false },
      { id: "id:option/132", text: "Sphygmomanometer", isCorrect: false },
      { id: "id:option/133", text: "ECG machine", isCorrect: false },
    ],
    answerDescription:
      "Correct! A pulse oximeter monitors the oxygen saturation levels in blood and is clipped onto a finger.",
    hint: "This is a small, portable device often used in clinics and at home.",
  },
];
