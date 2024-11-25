import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { Heading } from "../../../../../../../../components";

export function Option({ option, description, disabled, bgColor, onPress }) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.root,
        {
          backgroundColor: bgColor,
        },
      ]}
    >
      <Heading text={option} fontSize={16} />
      {description ? <Text>{description}</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#e5e7eb",
  },
});