import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Heading } from "../../../../components";
import { Image as ImageType } from "../../../../data/types";
import { Ionicons } from "@expo/vector-icons"; // Ensure this library is installed

export interface Props {
  title: string;
  image?: ImageType;
  numOfQuestions: number;
  duration: number;
  index: number;
  onPress: () => void;
}

export function HomeCard({
  title,
  image,
  numOfQuestions,
  duration,
  index,
  onPress,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        homeCard.root,
        { marginRight: index % 2 === 0 ? 8 : 0 },
      ]}>
      <View style={homeCard.imageContainer}>
        <Image
          style={homeCard.image}
          source={{
            uri: image?.uri,
          }}
        />
        <View style={homeCard.overlay} />
      </View>
      <View style={homeCard.textContainer}>
        <Heading text={title} fontSize={18} color="#0E7490" />
        <View style={homeCard.footer}>
          <View style={homeCard.footerItem}>
            <Ionicons name="help-circle-outline" size={16} color="#0E7490" />
            <Text style={homeCard.footerText}>{numOfQuestions} Questions</Text>
          </View>
          <View style={homeCard.footerItem}>
            <Ionicons name="time-outline" size={16} color="#0E7490" />
            <Text style={homeCard.footerText}>{duration} min</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const homeCard = StyleSheet.create({
  root: {
    flex: 1,
    marginVertical: 8,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
    aspectRatio: 16 / 9,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Subtle dark overlay for text visibility
  },
  textContainer: {
    padding: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  footerItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  footerText: {
    fontSize: 14,
    color: "#0E7490",
    fontWeight: "500",
  },
});