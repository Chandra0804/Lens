import React from "react";
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  timeTaken?: number;
}

export function TimeSpentCard({ timeTaken }: Props) {
  if (!timeTaken) return;

  const totalSeconds = Math.floor(timeTaken / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return (
    <View style={timeSpentCard.root}>
      <Text style={timeSpentCard.timeSpentLabel}>Time spent (mm:ss):</Text>
      <Text style={timeSpentCard.timeSpentText}>
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </Text>
    </View>
  );
}

const timeSpentCard = StyleSheet.create({
  root: {
    width: '100%',
    gap: 16,
    padding: 16,
    borderRadius: 24,
    borderColor: '#e5e7eb',
    borderWidth: 1,
    alignSelf: 'center',
    backgroundColor: "#ffffff",
  },
  timeSpentLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  timeSpentText: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: "#0284C7",
  },
});
