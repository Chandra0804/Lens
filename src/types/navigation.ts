import { NativeStackScreenProps } from '@react-navigation/native-stack';

/**
 * Type definitions for navigation route parameters
 */
export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Quiz: {
    subject: string;
    moduleId: string;
    userId: string;
  };
  Test: {
    title: string;
    testName: string;
    subject: string;
    userId: string;
  };
  Result: {
    score: number;
    total: number;
    timeTaken: number;
    subject: string;
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

