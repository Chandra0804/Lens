import { memo, useEffect, useRef, useState } from "react";
import {
  Header,
  LoadingIndicator,
  Question as QuestionComponent,
} from "./components";
import PagerView from "react-native-pager-view";
import { TestScreenProps } from "../types";

import { View } from "react-native";
import { shuffleArray } from "./shuffle";
import { Question } from "../../data/types";
import { flagQuestions } from "../../data";
import { solarSystemQuestions } from "../../data/solarSystem";
import React from "react";

export function TestScreen({ navigation, route }: TestScreenProps) {
  const category = route.params.testName;
  const [questions, setQuestions] = useState<Question[]>([]);
  const startTimeRef = useRef<number>(Date.now());
  const pagerViewRef = useRef<PagerView>(null);

  const [correctIndexes, setCorrectIndexes] = useState<number[]>([]);
  const [incorrectIndexes, setIncorrectIndexes] = useState<number[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const questions = (() => {
      switch (category) {
        case "flags":
          return flagQuestions;
        case "solarSystem":
          return solarSystemQuestions;
      }
    })();
    setQuestions(shuffleArray(questions));
    console.log("useEffect: load questions");
  }, [category]);

  useEffect(() => {
    if (questions.length > 0) {
      navigation.setOptions({
        header: () => (
          <Header
            current={currentQuestionIndex}
            numOfQuestions={questions.length}
            correct={correctIndexes}
            incorrect={incorrectIndexes}
            onQuestionTouch={(index) => {
              pagerViewRef.current?.setPage(index);
            }}
            onBackPress={navigation.goBack}
          />
        ),
      });
    }
    console.log("useEffect: update header");
  }, [
    navigation,
    questions.length,
    correctIndexes.length,
    incorrectIndexes.length,
    startTimeRef,
  ]);

  useEffect(() => {
    if (
      questions.length > 0 &&
      questions.length === correctIndexes.length + incorrectIndexes.length
    ) {
      navigation.push("Result", {
        correctAnswers: correctIndexes.length,
        totalQuestions: questions.length,
        timeTaken: Date.now() - startTimeRef.current,
      });
    }
    console.log("useEffect: check if test is done");
  }, [
    navigation,
    questions.length,
    correctIndexes.length,
    incorrectIndexes.length,
    startTimeRef,
  ]);

  console.log("TestScreen");

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
  navigation: any;
  correctIndexes: number[];
  incorrectIndexes: number[];
  startTimeRef: React.MutableRefObject<number>;
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
    startTimeRef
  }: PagerViewComponentProps) {
    console.log("MemoizedPagerView");
    console.log(correctIndexes)

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
              } else {
              }
            }}
          />
        </View>
        ))}
      </PagerView>
    );
  },
  (prevProps, curProps) =>
    prevProps.questions.length === curProps.questions.length &&
    prevProps.pagerViewRef === curProps.pagerViewRef
);
