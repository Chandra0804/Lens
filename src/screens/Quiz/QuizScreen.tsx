import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useQuiz } from '../../context/QuizContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';

type QuizScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Quiz'>;
  route: RouteProp<RootStackParamList, 'Quiz'>;
};

const SCREEN_WIDTH = Dimensions.get('window').width;

export function QuizScreen({ navigation, route }: QuizScreenProps) {
  const { state, dispatch } = useQuiz();
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (state.timeRemaining > 0) {
      const timer = setInterval(() => {
        dispatch({ type: 'UPDATE_TIME', payload: state.timeRemaining - 1 });
      }, 1000);
      return () => clearInterval(timer);
    } else if (state.timeRemaining === 0 && !state.isQuizComplete) {
      handleQuizComplete();
    }
  }, [state.timeRemaining]);

  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        `https://lens-67p4.onrender.com/api/questions/${route.params.subject}`
      );
      if (response.ok) {
        const questions = await response.json();
        dispatch({ type: 'SET_QUESTIONS', payload: questions });
      } else {
        Alert.alert('Error', 'Failed to fetch questions');
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
      Alert.alert('Error', 'Failed to fetch questions');
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    const currentQuestion = state.questions[state.currentQuestionIndex];
    dispatch({
      type: 'ANSWER_QUESTION',
      payload: { questionId: currentQuestion.id, answer: option },
    });
  };

  const handleNext = () => {
    if (state.currentQuestionIndex < state.questions.length - 1) {
      dispatch({ type: 'NEXT_QUESTION' });
      setSelectedOption(null);
    } else {
      handleQuizComplete();
    }
  };

  const handlePrevious = () => {
    dispatch({ type: 'PREVIOUS_QUESTION' });
    const prevQuestion = state.questions[state.currentQuestionIndex - 1];
    setSelectedOption(state.answers[prevQuestion.id] || null);
  };

  const handleQuizComplete = async () => {
    dispatch({ type: 'COMPLETE_QUIZ' });
    try {
      const result = {
        userId: route.params.userId,
        subject: route.params.subject,
        moduleId: route.params.moduleId,
        score: state.score,
        totalQuestions: state.questions.length,
        timeTaken: state.questions.length * 60 - state.timeRemaining,
        correctAnswers: state.score,
        wrongAnswers: state.questions.length - state.score,
      };

      const response = await fetch('https://lens-67p4.onrender.com/api/results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(result),
      });

      if (response.ok) {
        navigation.replace('Result', {
          score: state.score,
          total: state.questions.length,
          timeTaken: result.timeTaken,
          subject: route.params.subject,
        });
      } else {
        Alert.alert('Error', 'Failed to save quiz results');
      }
    } catch (error) {
      console.error('Error saving quiz results:', error);
      Alert.alert('Error', 'Failed to save quiz results');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0E7490" />
        <Text style={styles.loadingText}>Loading questions...</Text>
      </View>
    );
  }

  const currentQuestion = state.questions[state.currentQuestionIndex];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.timer}>
          Time: {Math.floor(state.timeRemaining / 60)}:
          {String(state.timeRemaining % 60).padStart(2, '0')}
        </Text>
        <Text style={styles.progress}>
          {state.currentQuestionIndex + 1} / {state.questions.length}
        </Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.questionText}>{currentQuestion.text}</Text>

        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                selectedOption === option && styles.selectedOption,
              ]}
              onPress={() => handleOptionSelect(option)}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedOption === option && styles.selectedOptionText,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.navButton,
            state.currentQuestionIndex === 0 && styles.disabledButton,
          ]}
          onPress={handlePrevious}
          disabled={state.currentQuestionIndex === 0}
        >
          <Icon name="chevron-left" size={24} color="#fff" />
          <Text style={styles.navButtonText}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, styles.nextButton]}
          onPress={handleNext}
        >
          <Text style={styles.navButtonText}>
            {state.currentQuestionIndex === state.questions.length - 1
              ? 'Finish'
              : 'Next'}
          </Text>
          <Icon name="chevron-right" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#0E7490',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#0E7490',
  },
  timer: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  progress: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 20,
    lineHeight: 24,
  },
  optionsContainer: {
    marginTop: 10,
  },
  option: {
    backgroundColor: '#f0f9ff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bae6fd',
  },
  selectedOption: {
    backgroundColor: '#0E7490',
    borderColor: '#0E7490',
  },
  optionText: {
    fontSize: 16,
    color: '#0c4a6e',
  },
  selectedOptionText: {
    color: '#fff',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0E7490',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: SCREEN_WIDTH * 0.4,
    justifyContent: 'center',
  },
  nextButton: {
    backgroundColor: '#0E7490',
  },
  disabledButton: {
    backgroundColor: '#94a3b8',
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    marginHorizontal: 8,
  },
}); 