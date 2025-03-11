import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface QuizState {
  currentQuestionIndex: number;
  questions: Question[];
  answers: { [key: string]: string };
  score: number;
  timeRemaining: number;
  isQuizComplete: boolean;
}

type QuizAction =
  | { type: 'SET_QUESTIONS'; payload: Question[] }
  | { type: 'ANSWER_QUESTION'; payload: { questionId: string; answer: string } }
  | { type: 'NEXT_QUESTION' }
  | { type: 'PREVIOUS_QUESTION' }
  | { type: 'UPDATE_TIME'; payload: number }
  | { type: 'COMPLETE_QUIZ' }
  | { type: 'RESET_QUIZ' };

const initialState: QuizState = {
  currentQuestionIndex: 0,
  questions: [],
  answers: {},
  score: 0,
  timeRemaining: 0,
  isQuizComplete: false,
};

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'SET_QUESTIONS':
      return {
        ...state,
        questions: action.payload,
        timeRemaining: action.payload.length * 60, // 60 seconds per question
      };
    case 'ANSWER_QUESTION':
      const { questionId, answer } = action.payload;
      const newAnswers = { ...state.answers, [questionId]: answer };
      const score = state.questions.reduce((acc, question) => {
        return acc + (newAnswers[question.id] === question.correctAnswer ? 1 : 0);
      }, 0);
      return { ...state, answers: newAnswers, score };
    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestionIndex: Math.min(
          state.currentQuestionIndex + 1,
          state.questions.length - 1
        ),
      };
    case 'PREVIOUS_QUESTION':
      return {
        ...state,
        currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0),
      };
    case 'UPDATE_TIME':
      return { ...state, timeRemaining: action.payload };
    case 'COMPLETE_QUIZ':
      return { ...state, isQuizComplete: true };
    case 'RESET_QUIZ':
      return initialState;
    default:
      return state;
  }
}

const QuizContext = createContext<{
  state: QuizState;
  dispatch: React.Dispatch<QuizAction>;
} | null>(null);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}

export type { Question, QuizState, QuizAction }; 