import React, { useEffect, useState } from "react";
import { ResultScreenProps } from "../../types/navigation";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Share, Alert } from "react-native";
import { ResultsCard, TimeSpentCard, Button } from "./components";
import { SafeAreaBox } from "../../components";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

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
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{percentage}%</Text>
            <Text style={styles.statLabel}>Score</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{formatTime(timeTaken)}</Text>
            <Text style={styles.statLabel}>Time</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {Math.round((timeTaken / 1000) / totalQuestions)}s
            </Text>
            <Text style={styles.statLabel}>Per Question</Text>
          </View>
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
  statsContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    justifyContent: "space-between",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0E7490",
  },
  statLabel: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: "#E5E7EB",
    height: "80%",
    alignSelf: "center",
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