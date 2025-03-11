export interface Image {
  uri: string;
  alt: string;
}

export interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  question: string;
  image?: Image;
  hint: string;
  options: Option[];
  answerDescription: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  subject?: string;
  topic?: string;
  subtopic?: string;
  tags?: string[];
  explanation?: string;
  references?: string[];
  isBookmarked?: boolean;
}

export interface Test {
  id: string;
  title: string;
  image?: Image;
  testName: TestName;
  numOfQuestions: number;
  duration: number; // in seconds
  subject?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  isPremium?: boolean;
  isComplete?: boolean;
  lastAttempted?: Date;
  highestScore?: number;
}

export interface Module {
  id: string;
  name: string;
  subject: string;
  icon: string;
  numOfTopics: number;
  totalQuestions: number;
  completedQuestions: number;
  progress: number; // percentage
  isPremium: boolean;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  modules: number;
  totalQuestions: number;
  completedQuestions: number;
  progress: number; // percentage
}

export interface UserProgress {
  userId: string;
  subject: string;
  moduleId: string;
  progress: number; // percentage
  completedTopics: number;
  totalTopics: number;
  lastUpdated: Date;
}

export interface QuizResult {
  id: string;
  userId: string;
  subject: string;
  moduleId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  timeTaken: number; // in milliseconds
  date: Date;
}

export interface Note {
  id: string;
  userId: string;
  subject: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Bookmark {
  id: string;
  userId: string;
  questionId: string;
  subject: string;
  moduleId: string;
  createdAt: Date;
}

export interface User {
  id: string;
  username: string;
  phoneNumber: string;
  role: 'student' | 'doctor' | 'admin';
  specialization?: string;
  college?: string;
  graduationYear?: number;
  isSubscribed: boolean;
  subscriptionPlan: 'free' | 'basic' | 'premium';
  subscriptionExpiry?: Date;
  createdAt: Date;
}

export type TestName = 
  | "anatomy" 
  | "physiology" 
  | "biochemistry" 
  | "pathology" 
  | "pharmacology" 
  | "microbiology"
  | "forensicMedicine"
  | "ent"
  | "ophthalmology"
  | "communityMedicine"
  | "generalMedicine"
  | "generalSurgery"
  | "obgyn"
  | "pediatrics"
  | "psychiatry"
  | "orthopedics"
  | "dermatology"
  | "anesthesiology"
  | "radiology"
  | "flags"
  | "solarSystem";
