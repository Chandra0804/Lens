import { memo, useEffect, useRef, useState } from "react";
import {
  Header,
  LoadingIndicator,
  Question as QuestionComponent,
} from "./components";
import PagerView from "react-native-pager-view";
import { TestScreenProps, TestScreenRouteParams } from "../../types/navigation";

import { View, Alert } from "react-native";
import { shuffleArray } from "./shuffle";
import { Question } from "../../data/types";
import { flagQuestions, anatomyQuestions, pharmacologyQuestions } from "../../data";
import { solarSystemQuestions } from "../../data/solarSystem";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function TestScreen({ navigation, route }: TestScreenProps) {
  const { testName, subject, moduleId, userId, difficulty } = route.params;
  const [questions, setQuestions] = useState<Question[]>([]);
  const startTimeRef = useRef<number>(Date.now());
  const pagerViewRef = useRef<PagerView>(null);

  const [correctIndexes, setCorrectIndexes] = useState<number[]>([]);
  const [incorrectIndexes, setIncorrectIndexes] = useState<number[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<string[]>([]);

  // Load bookmarked questions
  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        const bookmarks = await AsyncStorage.getItem('bookmarkedQuestions');
        if (bookmarks) {
          setBookmarkedQuestions(JSON.parse(bookmarks));
        }
      } catch (error) {
        console.error("Error loading bookmarks:", error);
      }
    };
    
    loadBookmarks();
  }, []);

  // Load questions based on the selected category
  useEffect(() => {
    let selectedQuestions: Question[] = [];
    
    switch (testName) {
      case "flags":
        selectedQuestions = flagQuestions;
        break;
      case "solarSystem":
        selectedQuestions = solarSystemQuestions;
        break;
      case "anatomy":
        selectedQuestions = anatomyQuestions;
        break;
      case "physiology":
        selectedQuestions = anatomyQuestions.slice(0, 8); // Placeholder until we have real data
        break;
      case "biochemistry":
        selectedQuestions = anatomyQuestions.slice(8, 15); // Placeholder until we have real data
        break;
      case "pathology":
        selectedQuestions = pharmacologyQuestions.slice(0, 8); // Placeholder until we have real data
        break;
      case "pharmacology":
        selectedQuestions = pharmacologyQuestions;
        break;
      case "microbiology":
        selectedQuestions = pharmacologyQuestions.slice(8, 15); // Placeholder until we have real data
        break;
      default:
        // For any other subject, use anatomy questions as fallback
        selectedQuestions = anatomyQuestions;
    }
    
    // Filter questions by difficulty if specified
    if (difficulty) {
      selectedQuestions = selectedQuestions.filter(q => 
        !q.difficulty || q.difficulty === difficulty
      );
    }
    
    // Mark bookmarked questions
    const markedQuestions = selectedQuestions.map(q => ({
      ...q,
      isBookmarked: bookmarkedQuestions.includes(q.id)
    }));
    
    // Shuffle the questions and set state
    setQuestions(shuffleArray(markedQuestions));
  }, [testName, difficulty, bookmarkedQuestions]);

  // Update header when questions change
  useEffect(() => {
    if (questions.length > 0) {
      navigation.setOptions({
        header: () => (
          <Header
            current={currentQuestionIndex}
            numOfQuestions={questions.length}
            correct={correctIndexes}
            incorrect={incorrectIndexes}
            testName={testName}
            subject={subject}
            onQuestionTouch={(index) => {
              pagerViewRef.current?.setPage(index);
            }}
            onBackPress={() => {
              Alert.alert(
                "Exit Quiz",
                "Are you sure you want to exit? Your progress will be lost.",
                [
                  { text: "Stay", style: "cancel" },
                  { text: "Exit", onPress: () => navigation.goBack() }
                ]
              );
            }}
          />
        ),
      });
    }
  }, [
    navigation,
    questions.length,
    correctIndexes.length,
    incorrectIndexes.length,
    currentQuestionIndex,
    testName,
    subject
  ]);

  // Check if test is complete
  useEffect(() => {
    if (
      questions.length > 0 &&
      questions.length === correctIndexes.length + incorrectIndexes.length
    ) {
      const endTime = Date.now();
      const timeTaken = endTime - startTimeRef.current;
      
      // Save result to server if logged in
      if (userId) {
        saveResultToServer({
          userId,
          subject: subject || testName,
          moduleId: moduleId || testName,
          score: Math.round((correctIndexes.length / questions.length) * 100),
          totalQuestions: questions.length,
          timeTaken,
          correctAnswers: correctIndexes.length,
          wrongAnswers: incorrectIndexes.length
        });
      }
      
      // Navigate to result screen
      navigation.push("Result", {
        correctAnswers: correctIndexes.length,
        totalQuestions: questions.length,
        timeTaken,
        subject: subject || testName,
        moduleId: moduleId || testName,
        userId
      });
    }
  }, [
    navigation,
    questions.length,
    correctIndexes.length,
    incorrectIndexes.length,
    userId,
    subject,
    moduleId,
    testName
  ]);

  // Save quiz result to server
  const saveResultToServer = async (resultData: {
    userId: string;
    subject: string;
    moduleId: string;
    score: number;
    totalQuestions: number;
    timeTaken: number;
    correctAnswers: number;
    wrongAnswers: number;
  }) => {
    try {
      const response = await fetch("https://lens-67p4.onrender.com/api/results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(resultData)
      });
      
      if (!response.ok) {
        console.error("Failed to save quiz result");
      }
    } catch (error) {
      console.error("Error saving quiz result:", error);
    }
  };

  // Handle bookmarking questions
  const handleBookmark = async (questionId: string, isBookmarked: boolean) => {
    try {
      let updatedBookmarks = [...bookmarkedQuestions];
      
      if (isBookmarked && !updatedBookmarks.includes(questionId)) {
        updatedBookmarks.push(questionId);
      } else if (!isBookmarked && updatedBookmarks.includes(questionId)) {
        updatedBookmarks = updatedBookmarks.filter(id => id !== questionId);
      }
      
      setBookmarkedQuestions(updatedBookmarks);
      await AsyncStorage.setItem('bookmarkedQuestions', JSON.stringify(updatedBookmarks));
      
      // Update question in the current list
      setQuestions(questions.map(q => 
        q.id === questionId ? { ...q, isBookmarked } : q
      ));
      
      // Save to server if logged in
      if (userId && isBookmarked) {
        try {
          await fetch("https://lens-67p4.onrender.com/api/bookmarks", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              userId,
              questionId,
              subject: subject || testName,
              moduleId: moduleId || testName
            })
          });
        } catch (error) {
          console.error("Error saving bookmark to server:", error);
        }
      }
    } catch (error) {
      console.error("Error bookmarking question:", error);
    }
  };

  if (questions.length === 0) {
    return <LoadingIndicator />;
  }

  return (
    <MemoizedPagerView
      questions={questions}
      pagerViewRef={pagerViewRef}
      onAnswered={(index, answer) => {
        if (answer) {
          setCorrectIndexes((prev) => [...prev, index]);
        } else {
          setIncorrectIndexes((prev) => [...prev, index]);
        }
      }}
      onPageSelected={setCurrentQuestionIndex}
      setCorrectIndexes={setCorrectIndexes}
      setIncorrectIndexes={setIncorrectIndexes}
      currentQuestionIndex={currentQuestionIndex}
      navigation={navigation}
      correctIndexes={correctIndexes}
      incorrectIndexes={incorrectIndexes}
      startTimeRef={startTimeRef}
      onBookmark={handleBookmark}
    />
  );
}

interface PagerViewComponentProps {
  questions: Question[];
  pagerViewRef: React.RefObject<PagerView>;
  onAnswered: (index: number, answer: boolean) => void;
  onPageSelected: (index: number) => void;
  setCorrectIndexes: React.Dispatch<React.SetStateAction<number[]>>;
  setIncorrectIndexes: React.Dispatch<React.SetStateAction<number[]>>;
  currentQuestionIndex: number;
  navigation: TestScreenProps['navigation'];
  correctIndexes: number[];
  incorrectIndexes: number[];
  startTimeRef: React.MutableRefObject<number>;
  onBookmark: (questionId: string, isBookmarked: boolean) => void;
}

const MemoizedPagerView = memo(
  function PagerViewComponent({
    questions,
    pagerViewRef,
    onAnswered,
    onPageSelected,
    setCorrectIndexes,
    setIncorrectIndexes,
    currentQuestionIndex,
    navigation,
    correctIndexes,
    incorrectIndexes,
    startTimeRef,
    onBookmark
  }: PagerViewComponentProps) {
    return (
      <PagerView
        ref={pagerViewRef}
        style={{
          flex: 1,
        }}
        initialPage={0}
        onPageSelected={({ nativeEvent }) => {
          onPageSelected(nativeEvent.position);
        }}
      >
        {questions.map((question, index) => (
          <View key={question.id}>
            <QuestionComponent
              question={question}
              questionIndex={index}
              totalQuestions={questions.length}
              onAnswered={(correct) => {
                if (correct) {
                  setCorrectIndexes((prev) => [...prev, index]);
                } else {
                  setIncorrectIndexes((prev) => [...prev, index]);
                }
              }}
              onNext={() => {
                if (index + 1 < questions.length) {
                  // Navigate to the next question
                  pagerViewRef.current?.setPage(index + 1);
                }
              }}
              onBookmark={(isBookmarked) => onBookmark(question.id, isBookmarked)}
              isBookmarked={question.isBookmarked || false}
            />
          </View>
        ))}
      </PagerView>
    );
  },
  (prevProps, curProps) =>
    prevProps.questions.length === curProps.questions.length &&
    prevProps.pagerViewRef === curProps.pagerViewRef &&
    prevProps.correctIndexes.length === curProps.correctIndexes.length &&
    prevProps.incorrectIndexes.length === curProps.incorrectIndexes.length
);
