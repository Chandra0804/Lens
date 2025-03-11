import React, { useEffect, useState } from "react";
import { ResultScreenProps } from "../../types/navigation";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Share, Alert, Dimensions } from "react-native";
import { ResultsCard, TimeSpentCard, Button } from "./components";
import { SafeAreaBox } from "../../components";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';

type ResultScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Result'>;
  route: RouteProp<RootStackParamList, 'Result'>;
};

const SCREEN_WIDTH = Dimensions.get('window').width;

export function ResultScreen({ navigation, route }: ResultScreenProps) {
  const { correctAnswers, totalQuestions, timeTaken, subject, moduleId, userId } = route.params;
  
  const [performanceText, setPerformanceText] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [improvementAreas, setImprovementAreas] = useState<string[]>([]);
  const [resultSaved, setResultSaved] = useState(false);
  
  // Calculate percentage score
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  
  // Format time taken
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  // Save result to server
  useEffect(() => {
    if (userId && !resultSaved) {
      saveResultToServer();
    }
    
    // Set performance feedback based on score
    if (percentage >= 90) {
      setPerformanceText("Excellent!");
      setFeedbackMessage("Outstanding performance! You've mastered this topic.");
    } else if (percentage >= 75) {
      setPerformanceText("Very Good!");
      setFeedbackMessage("Great job! You have a solid understanding of this topic.");
    } else if (percentage >= 60) {
      setPerformanceText("Good");
      setFeedbackMessage("You're on the right track, but there's room for improvement.");
    } else if (percentage >= 40) {
      setPerformanceText("Fair");
      setFeedbackMessage("You should spend more time reviewing this topic.");
    } else {
      setPerformanceText("Needs Improvement");
      setFeedbackMessage("Don't worry! This topic needs more focused study.");
    }
    
    // Set improvement areas based on subject
    if (subject) {
      switch(subject.toLowerCase()) {
        case 'anatomy':
          setImprovementAreas(["Upper Limb", "Head & Neck", "Neuroanatomy"]);
          break;
        case 'pharmacology':
          setImprovementAreas(["Cardiovascular Drugs", "Antimicrobials", "CNS Drugs"]);
          break;
        case 'physiology':
          setImprovementAreas(["Cardiovascular System", "Respiratory System", "Endocrine System"]);
          break;
        default:
          setImprovementAreas(["Topic 1", "Topic 2", "Topic 3"]);
      }
    }
  }, [percentage, subject, userId]);
  
  const saveResultToServer = async () => {
    try {
      const response = await fetch("https://lens-67p4.onrender.com/api/results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId,
          subject: subject || "general",
          moduleId: moduleId || "general",
          score: percentage,
          totalQuestions,
          timeTaken,
          correctAnswers,
          wrongAnswers: totalQuestions - correctAnswers
        })
      });
      
      if (response.ok) {
        setResultSaved(true);
      }
    } catch (error) {
      console.error("Error saving result:", error);
    }
  };
  
  const shareResult = async () => {
    try {
      const subjectText = subject ? ` in ${subject}` : '';
      await Share.share({
        message: 
          `I scored ${percentage}% (${correctAnswers}/${totalQuestions})${subjectText} on the Lens Medical Quiz app for NEET PG preparation!`
      });
    } catch (error) {
      Alert.alert("Error", "Failed to share your result");
    }
  };
  
  const getGrade = (percentage: number) => {
    if (percentage >= 90) return { grade: 'A+', color: '#22c55e' };
    if (percentage >= 80) return { grade: 'A', color: '#10b981' };
    if (percentage >= 70) return { grade: 'B', color: '#0ea5e9' };
    if (percentage >= 60) return { grade: 'C', color: '#f59e0b' };
    if (percentage >= 50) return { grade: 'D', color: '#f97316' };
    return { grade: 'F', color: '#ef4444' };
  };

  const { grade, color } = getGrade(percentage);

  const getFeedback = (percentage: number) => {
    if (percentage >= 90) return 'Excellent! You have mastered this topic!';
    if (percentage >= 80) return 'Great job! Keep up the good work!';
    if (percentage >= 70) return 'Good performance! Room for improvement.';
    if (percentage >= 60) return 'Fair attempt. More practice needed.';
    if (percentage >= 50) return 'You passed, but need more study.';
    return 'Keep practicing. You can do better!';
  };

  return (
    <SafeAreaBox>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.navigate("Home")}
        >
          <Icon 
            name="arrow-left" 
            size={24} 
            color="#0E7490" 
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Quiz Results</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.resultSummary}>
          <Text style={styles.performanceText}>{performanceText}</Text>
          <Text style={styles.feedbackMessage}>{feedbackMessage}</Text>
        </View>
        
        <View style={styles.cardContainer}>
          <ResultsCard
            correctAnswers={correctAnswers}
            totalQuestions={totalQuestions}
          />
          <TimeSpentCard timeTaken={timeTaken} />
        </View>
        
        <View style={styles.scoreContainer}>
          <View style={[styles.gradeCircle, { borderColor: color }]}>
            <Text style={[styles.grade, { color }]}>{grade}</Text>
            <Text style={[styles.percentage, { color }]}>
              {Math.round(percentage)}%
            </Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Icon name="check-circle" size={24} color="#22c55e" />
              <Text style={styles.statLabel}>Correct</Text>
              <Text style={styles.statValue}>{correctAnswers}</Text>
            </View>

            <View style={styles.statItem}>
              <Icon name="close-circle" size={24} color="#ef4444" />
              <Text style={styles.statLabel}>Wrong</Text>
              <Text style={styles.statValue}>{totalQuestions - correctAnswers}</Text>
            </View>

            <View style={styles.statItem}>
              <Icon name="clock-outline" size={24} color="#0ea5e9" />
              <Text style={styles.statLabel}>Time</Text>
              <Text style={styles.statValue}>
                {formatTime(timeTaken)}
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedbackTitle}>Feedback</Text>
          <Text style={styles.feedbackText}>{getFeedback(percentage)}</Text>
        </View>
        
        {improvementAreas.length > 0 && (
          <View style={styles.improvementContainer}>
            <Text style={styles.improvementTitle}>Areas to Focus On:</Text>
            {improvementAreas.map((area, index) => (
              <View key={index} style={styles.improvementItem}>
                <Icon name="book-open-page-variant" size={18} color="#0E7490" />
                <Text style={styles.improvementText}>{area}</Text>
              </View>
            ))}
          </View>
        )}
        
        <View style={styles.buttonContainer}>
          <Button
            text="Retake Quiz"
            textColor="#0E7490"
            backgroundColor="#E0F2FE"
            borderColor="#0E7490"
            icon="reload"
            onPress={() => {
              navigation.goBack();
            }}
          />
          
          <Button
            text="Share Result"
            textColor="#FFFFFF"
            backgroundColor="#10B981"
            icon="share-variant"
            onPress={shareResult}
          />
          
          <Button
            text="Return to Home"
            textColor="#FFFFFF"
            backgroundColor="#0E7490"
            icon="home"
            onPress={() => navigation.navigate("Home")}
          />
        </View>
      </ScrollView>
    </SafeAreaBox>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    backgroundColor: "#93e3fd",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#0E7490",
  },
  backButton: {
    padding: 8,
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#F0FAFF",
  },
  scrollContent: {
    paddingBottom: 30,
  },
  resultSummary: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
    margin: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  performanceText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0E7490",
    marginBottom: 8,
  },
  feedbackMessage: {
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 24,
  },
  cardContainer: {
    marginHorizontal: 16,
    gap: 16,
    marginBottom: 16,
  },
  scoreContainer: {
    alignItems: 'center',
    padding: 20,
  },
  gradeCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  grade: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  percentage: {
    fontSize: 18,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    color: '#64748b',
    fontSize: 14,
    marginVertical: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  feedbackContainer: {
    padding: 20,
    backgroundColor: '#f8fafc',
    margin: 20,
    borderRadius: 12,
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 8,
  },
  feedbackText: {
    fontSize: 16,
    color: '#334155',
    lineHeight: 24,
  },
  improvementContainer: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  improvementTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0E7490",
    marginBottom: 12,
  },
  improvementItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  improvementText: {
    marginLeft: 12,
    fontSize: 15,
    color: "#374151",
  },
  buttonContainer: {
    marginHorizontal: 16,
    gap: 12,
  },
});