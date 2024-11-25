import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Heading from "../../../../components/Heading";

export function HomeCard({
  title,
  image,
  numOfQuestions,
  duration,
  index,
  onPress,
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.root, { marginRight: index % 2 === 0 ? 8 : 0 }]}>
      <View style={styles.aspectRatio}>
        <Image
          style={styles.image}
          source={{
            uri: image?.uri,
          }}
          alt={image?.alt}
        />
      </View>
      <View style={styles.textContainer}>
        <Heading text={title} fontSize={18} />
        <View style={styles.footer}>
          <Text style={styles.footerText}>{numOfQuestions} Questions</Text>
          <Text style={styles.footerText}>{duration} min</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginVertical: 8,
    borderRadius: 8,
    borderColor: "#cbd2d9",
    borderWidth: 1,
    overflow: "hidden",
  },
  aspectRatio: {
    aspectRatio: 16 / 7,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  textContainer: {
    padding: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  footerText: {
    fontSize: 12,
    color: "#718096",
  },
});