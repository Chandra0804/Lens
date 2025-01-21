import { Heading } from "../../../../components";
import { Question as QuestionType } from "../../../../data/types";
import { Options } from "./components";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useEffect, useState } from "react";

interface Props {
  question: QuestionType;
  questionIndex: number;
  totalQuestions: number;
  onAnswered: (correct: boolean) => void;
  onNext: () => void;
}

export function Question({
  question,
  questionIndex,
  totalQuestions,
  onAnswered,
  onNext,
}: Props) {
  const [timeLeft, setTimeLeft] = useState(30);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    setTimeLeft(30);
    setAnswered(false);
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [question]);

  return (
    <ScrollView>
      <View style={styles.header}>
        <Text style={styles.progress}>
          {questionIndex + 1} of {totalQuestions}
        </Text>
        <Text style={styles.timer}>{timeLeft}s</Text>
      </View>
      <View style={styles.root}>
        <Heading text={question.question} fontSize={20} />
        {question.image && (
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{ uri: question.image.uri }}
              alt={question.image.alt}
            />
          </View>
        )}
        <Options
          options={question.options}
          description={question.answerDescription}
          onAnswered={(correct) => {
            setAnswered(true);
            onAnswered(correct);
          }}
        />
        {answered && (
          <Pressable style={styles.nextButton} onPress={onNext}>
            <Text style={styles.nextButtonText}>Next</Text>
          </Pressable>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  progress: {
    fontSize: 16,
    color: "#333",
  },
  timer: {
    fontSize: 16,
    color: "#ff0000",
  },
  root: {
    padding: 16,
    gap: 8,
  },
  imageContainer: {
    aspectRatio: 2 / 1,
    borderRadius: 12,
    borderColor: "#e5e7eb",
    borderWidth: 1,
    overflow: "hidden",
  },
  image: {
    flex: 1,
    resizeMode: "contain",
  },
  nextButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#0284C7",
    borderRadius: 8,
    alignItems: "center",
    width:100,
    alignSelf: "flex-end",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
