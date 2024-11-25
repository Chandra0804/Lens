import { memo, useEffect, useRef, useState } from "react";
import {
  Header,
  LoadingIndicator,
  Question as QuestionComponent,
} from "./components";
import PagerView from "react-native-pager-view";
import { View } from "react-native";
import { shuffleArray } from "./shuffle";
import { flagQuestions } from "../../data";
import { solarSystemQuestions } from "../../data/solarSystem";

export function TestScreen({ navigation, route }) {
  const category = route.params.testName;

  const [questions, setQuestions] = useState([]);
  const startTimeRef = useRef(Date.now());
  const pagerViewRef = useRef(null);

  // States needed for the header
  const [correctIndexes, setCorrectIndexes] = useState([]);
  const [incorrectIndexes, setIncorrectIndexes] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Load questions based on category
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

  // Update header based on current state
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
    currentQuestionIndex,
    correctIndexes,
    incorrectIndexes,
    questions.length,
    pagerViewRef,
  ]);

  // Check if test is completed
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
    />
  );
}

const MemoizedPagerView = memo(
  function PagerViewComponent({
    questions,
    pagerViewRef,
    onAnswered,
    onPageSelected,
  }) {
    console.log("MemoizedPagerView");
    return (
      <PagerView
        ref={pagerViewRef}
        style={{ flex: 1 }}
        initialPage={0}
        onPageSelected={({ nativeEvent }) => {
          onPageSelected(nativeEvent.position);
        }}
      >
        {questions.map((question, index) => (
          <View key={question.id}>
            <QuestionComponent
              question={question}
              onAnswered={(correct) => onAnswered(index, correct)}
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