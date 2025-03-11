import React from "react";
import { HeaderBackButton } from "@react-navigation/elements";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface Props {
  current: number;
  correct: number[];
  incorrect: number[];
  numOfQuestions: number;
  testName?: string;
  subject?: string;
  onQuestionTouch: (index: number) => void;
  onBackPress: () => void;
}

function HeaderContainer({ children }: { children: React.ReactNode }) {
  const { top } = useSafeAreaInsets();
  return (
    <View style={[headerContainer.root, { paddingTop: top }]}>{children}</View>
  );
}

const headerContainer = StyleSheet.create({
  root: {
    backgroundColor: "#93e3fd",
    borderBottomWidth: 1,
    borderBottomColor: "#84d8f3",
  },
});

export function Header({ 
  current, 
  correct, 
  incorrect,
  numOfQuestions, 
  testName, 
  subject,
  onQuestionTouch,
  onBackPress 
}: Props) {
  // Format subject and test names for display
  const displaySubject = subject 
    ? subject.charAt(0).toUpperCase() + subject.slice(1) 
    : '';
  
  const displayTestName = testName 
    ? testName.charAt(0).toUpperCase() + testName.slice(1) 
    : '';
    
  // Calculate progress
  const answeredCount = correct.length + incorrect.length;
  const progressPercent = Math.round((answeredCount / numOfQuestions) * 100);
  
  return (
    <HeaderContainer>
      <View style={styles.headerTop}>
        <HeaderBackButton 
          labelVisible={false} 
          onPress={onBackPress} 
          tintColor="#0E7490"
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {displaySubject || displayTestName || "Quiz"}
          </Text>
          {displaySubject && displayTestName && displaySubject !== displayTestName && (
            <Text style={styles.subtitle}>{displayTestName}</Text>
          )}
        </View>
        <View style={styles.scoreContainer}>
          <View style={styles.scoreItem}>
            <Icon name="check-circle" size={16} color="#10B981" />
            <Text style={[styles.scoreText, styles.correctText]}>{correct.length}</Text>
          </View>
          <View style={styles.scoreItem}>
            <Icon name="close-circle" size={16} color="#EF4444" />
            <Text style={[styles.scoreText, styles.incorrectText]}>{incorrect.length}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBarBackground}>
          <View 
            style={[
              styles.progressBarFill, 
              { width: `${progressPercent}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          {current + 1} of {numOfQuestions} ({progressPercent}%)
        </Text>
      </View>
      
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.questionsIndicatorContainer}
      >
        {Array.from({ length: numOfQuestions }).map((_, index) => {
          let backgroundColor = "#FFFFFF";
          let textColor = "#0E7490";
          
          if (correct.includes(index)) {
            backgroundColor = "#10B981";
            textColor = "#FFFFFF";
          } else if (incorrect.includes(index)) {
            backgroundColor = "#EF4444";
            textColor = "#FFFFFF";
          } else if (index === current) {
            backgroundColor = "#0E7490";
            textColor = "#FFFFFF";
          }
          
          return (
            <TouchableOpacity
              key={index}
              style={[styles.questionIndicator, { backgroundColor }]}
              onPress={() => onQuestionTouch(index)}
            >
              <Text style={[styles.questionIndicatorText, { color: textColor }]}>
                {index + 1}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </HeaderContainer>
  );
}

const styles = StyleSheet.create({
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Platform.select({
      android: 8,
      default: 4,
    }),
    paddingHorizontal: 8,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0E7490",
  },
  subtitle: {
    fontSize: 12,
    color: "#0E7490",
    opacity: 0.8,
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: 90,
  },
  scoreItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  scoreText: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 2,
  },
  correctText: {
    color: "#047857",
  },
  incorrectText: {
    color: "#B91C1C",
  },
  progressContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#0E7490",
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: "#0E7490",
    fontWeight: "600",
    marginTop: 4,
    textAlign: "center",
  },
  questionsIndicatorContainer: {
    paddingHorizontal: 12,
    paddingBottom: 12,
    gap: 8,
  },
  questionIndicator: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  questionIndicatorText: {
    fontSize: 12,
    fontWeight: "600",
  },
});
