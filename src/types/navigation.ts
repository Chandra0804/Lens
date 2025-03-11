import { NativeStackScreenProps } from '@react-navigation/native-stack';

/**
 * Type definitions for navigation route parameters
 */
export type RootStackParamList = {
  Home: undefined;
  Login: {
    redirectTo?: keyof RootStackParamList;
  };
  Register: {
    email?: string;
    name?: string;
    redirectTo?: keyof RootStackParamList;
  };
  Test: {
    title: string;
    testName: string;
    subject: string;
    moduleId: string;
    userId: string;
    difficulty: string;
  };
  Result: {
    correctAnswers: number;
    totalQuestions: number;
    timeTaken: number;
    subject: string;
    moduleId: string;
    userId: string;
  };
  // Add other routes as needed
};

/**
 * Props for the Test screen component
 */
export type TestScreenProps = NativeStackScreenProps<RootStackParamList, 'Test'>;

/**
 * Props for the Result screen component
 */
export type ResultScreenProps = NativeStackScreenProps<RootStackParamList, 'Result'>;

/**
 * Helper type to get route params for a specific screen
 */
export type TestScreenRouteParams = TestScreenProps['route']['params'];
export type ResultScreenRouteParams = ResultScreenProps['route']['params'];

/**
 * Props for the Login screen component
 */
export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

/**
 * Props for the Register screen component
 */
export type RegisterScreenProps = NativeStackScreenProps<RootStackParamList, 'Register'>;

/**
 * Helper type to get route params for auth screens
 */
export type LoginScreenRouteParams = LoginScreenProps['route']['params'];
export type RegisterScreenRouteParams = RegisterScreenProps['route']['params'];

