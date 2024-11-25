import React from "react";
import { StyleSheet, Text } from "react-native";

export function Heading({ text, fontSize, color }) {
  return <Text style={[header.root, { fontSize, color }]}>{text}</Text>;
}

const header = StyleSheet.create({
  root: {
    fontWeight: "bold",
  },
});