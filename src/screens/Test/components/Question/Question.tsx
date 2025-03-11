import React from "react";
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
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface Props {
  question: QuestionType;
  questionIndex: number;
  totalQuestions: number;
  onAnswered: (correct: boolean) => void;
  onNext: () => void;
  onBookmark?: (isBookmarked: boolean) => void;
  isBookmarked?: boolean;
}

export function Question({
  question,
  questionIndex,
  totalQuestions,
  onAnswered,
  onNext,
  onBookmark,
  isBookmarked = false,
}: Props) {
  const [timeLeft, setTimeLeft] = useState(90); // Increased time for medical questions
  const [answered, setAnswered] = useState(false);
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    setTimeLeft(90);
    setAnswered(false);
    setBookmarked(isBookmarked);
    setShowHint(false);
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [question, isBookmarked]);

  const handleBookmark = () => {
    const newBookmarkState = !bookmarked;
    setBookmarked(newBookmarkState);
    if (onBookmark) {
      onBookmark(newBookmarkState);
    }
  };

  const toggleHint = () => {
    setShowHint(!showHint);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.progress}>
          Question {questionIndex + 1} of {totalQuestions}
        </Text>
        <View style={styles.rightHeader}>
          {question.difficulty && (
            <View style={[
              styles.difficultyBadge, 
              question.difficulty === 'easy' ? styles.easyBadge : 
              question.difficulty === 'medium' ? styles.mediumBadge : 
              styles.hardBadge
            ]}>
              <Text style={styles.difficultyText}>
                {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
              </Text>
            </View>
          )}
          <Text style={[
            styles.timer, 
            timeLeft < 30 ? styles.timerWarning : 
            timeLeft < 15 ? styles.timerDanger : 
            styles.timerNormal
          ]}>{timeLeft}s</Text>
        </View>
      </View>

      <View style={styles.root}>
        <View style={styles.questionHeader}>
          <Heading text={question.question} fontSize={20} />
          <TouchableOpacity onPress={handleBookmark} style={styles.bookmarkButton}>
            <Icon 
              name={bookmarked ? "bookmark" : "bookmark-outline"} 
              size={24} 
              color={bookmarked ? "#0E7490" : "#666"}
            />
          </TouchableOpacity>
        </View>
        
        {question.subject && (
          <View style={styles.tagContainer}>
            <Text style={styles.subjectTag}>
              {question.subject.charAt(0).toUpperCase() + question.subject.slice(1)}
            </Text>
            {question.topic && (
              <Text style={styles.topicTag}>{question.topic}</Text>
            )}
          </View>
        )}
        
        {question.image && (
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{ uri: question.image.uri }}
              alt={question.image.alt}
            />
          </View>
        )}

        {question.hint && (
          <View style={styles.hintContainer}>
            <TouchableOpacity onPress={toggleHint} style={styles.hintButton}>
              <Icon name={showHint ? "lightbulb-on" : "lightbulb-outline"} size={20} color="#0E7490" />
              <Text style={styles.hintButtonText}>
                {showHint ? "Hide Hint" : "Show Hint"}
              </Text>
            </TouchableOpacity>
            {showHint && (
              <View style={styles.hintContent}>
                <Text style={styles.hintText}>{question.hint}</Text>
              </View>
            )}
          </View>
        )}

        <Options
          options={question.options}
          description={question.answerDescription}
          explanation={question.explanation}
          onAnswered={(correct) => {
            setAnswered(true);
            onAnswered(correct);
          }}
        />

        {answered && (
          <View style={styles.buttonContainer}>
            {question.explanation && !question.explanation.includes(question.answerDescription) && (
              <View style={styles.explanationContainer}>
                <Text style={styles.explanationTitle}>Detailed Explanation:</Text>
                <Text style={styles.explanationText}>{question.explanation}</Text>
              </View>
            )}
            <Pressable style={styles.nextButton} onPress={onNext}>
              <Text style={styles.nextButtonText}>Next Question</Text>
            </Pressable>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0FAFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#93e3fd",
    borderBottomWidth: 1,
    borderBottomColor: "#84d8f3",
  },
  rightHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  progress: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0E7490",
  },
  timer: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  timerNormal: {
    color: "#0E7490",
  },
  timerWarning: {
    color: "#F59E0B",
  },
  timerDanger: {
    color: "#EF4444",
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginRight: 8,
  },
  easyBadge: {
    backgroundColor: "#D1FAE5",
  },
  mediumBadge: {
    backgroundColor: "#FEF3C7",
  },
  hardBadge: {
    backgroundColor: "#FEE2E2",
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: "600",
  },
  root: {
    padding: 16,
    gap: 12,
  },
  questionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  bookmarkButton: {
    padding: 8,
  },
  tagContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  subjectTag: {
    backgroundColor: "#E0F2FE",
    color: "#0369A1",
    fontSize: 12,
    fontWeight: "600",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  topicTag: {
    backgroundColor: "#F0F9FF",
    color: "#0284C7",
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  imageContainer: {
    aspectRatio: 2 / 1,
    borderRadius: 12,
    borderColor: "#cdf1fb",
    borderWidth: 1,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    marginVertical: 10,
  },
  image: {
    flex: 1,
    resizeMode: "contain",
  },
  hintContainer: {
    marginVertical: 8,
  },
  hintButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  hintButtonText: {
    marginLeft: 6,
    color: "#0E7490",
    fontWeight: "600",
  },
  hintContent: {
    backgroundColor: "#E0F7FA",
    padding: 12,
    borderRadius: 8,
    marginTop: 4,
  },
  hintText: {
    color: "#0E7490",
    fontStyle: "italic",
  },
  buttonContainer: {
    marginTop: 16,
  },
  explanationContainer: {
    backgroundColor: "#EFF6FF",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  explanationTitle: {
    fontWeight: "600",
    color: "#1E40AF",
    marginBottom: 4,
  },
  explanationText: {
    color: "#1E3A8A",
    lineHeight: 20,
  },
  nextButton: {
    padding: 14,
    backgroundColor: "#0E7490",
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "flex-end",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
