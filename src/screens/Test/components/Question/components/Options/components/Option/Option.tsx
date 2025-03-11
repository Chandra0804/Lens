import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface Props {
  option: string;
  description?: string;
  disabled: boolean;
  bgColor: string;
  borderColor: string;
  isCorrect?: boolean;
  isWrong?: boolean;
  onPress: () => void;
}

export function Option({
  option,
  description,
  disabled,
  bgColor,
  borderColor,
  isCorrect,
  isWrong,
  onPress,
}: Props) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.root,
        {
          backgroundColor: bgColor,
          borderColor: borderColor,
          opacity: pressed && !disabled ? 0.9 : 1,
          transform: [{ scale: pressed && !disabled ? 0.995 : 1 }],
        },
      ]}
    >
      <View style={styles.optionContainer}>
        <Text style={styles.optionText}>{option}</Text>
        {isCorrect && (
          <Icon name="check-circle" size={22} color="#10B981" style={styles.icon} />
        )}
        {isWrong && (
          <Icon name="close-circle" size={22} color="#EF4444" style={styles.icon} />
        )}
      </View>
      
      {description ? (
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Explanation:</Text>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
    elevation: 1,
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1F2937",
    flex: 1,
  },
  icon: {
    marginLeft: 8,
  },
  descriptionContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  descriptionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0E7490",
    marginBottom: 4,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#374151",
  },
});
