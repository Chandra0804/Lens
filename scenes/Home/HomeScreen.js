import React from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import HomeCard from "./components/HomeCard"; // Adjust import if needed
import Heading from "../../components/Heading";
import SafeAreaBox from "../../components/SafeAreaBox";
import { data } from "./data";

export function HomeScreen({ navigation }) {
  return (
    <SafeAreaBox>
      <ScrollView>
        <View style={styles.rootContainer}>
          <WelcomeCard />

          <Text style={styles.title}>Tests</Text>

          <FlatList
            scrollEnabled={false}
            numColumns={2}
            data={data}
            renderItem={({ item, index }) => (
              <HomeCard
                title={item.title}
                image={item.image}
                numOfQuestions={item.numOfQuestions}
                duration={item.duration}
                index={index}
                onPress={() => {
                  navigation.navigate("Test", {
                    title: item.title,
                    testName: item.testName,
                  });
                }}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ScrollView>
    </SafeAreaBox>
  );
}

function WelcomeCard() {
  return (
    <View style={styles.welcomeCard}>
      <Heading text="Quiz App" fontSize={24} color="#fafafa" />
      <Text style={styles.welcomeCardText}>
        Welcome to the Quiz App! Get ready to test your knowledge!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    padding: 16,
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#525252",
  },
  welcomeCard: {
    backgroundColor: "#4B5563",
    gap: 16,
    borderRadius: 24,
    padding: 24,
  },
  welcomeCardText: {
    color: "#fafafa",
    fontWeight: "500",
  },
});

export default HomeScreen; 