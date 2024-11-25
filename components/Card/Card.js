import React from "react";
import { View, StyleSheet } from "react-native";

export function Card({ children }) {
  return <View style={card.root}>{children}</View>;
}

const card = StyleSheet.create({
  root: {
    borderRadius: 8,
    borderColor: "#cbd2d9",
    borderWidth: 1,
  },
});