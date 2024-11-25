import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function TimeSpentCard({ timeTaken }) {
  if (!timeTaken) return null;

  const totalSeconds = Math.floor(timeTaken / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return (
    <View style={styles.root}>
      <Text style={styles.timeSpentLabel}>Time spent (mm:ss):</Text>
      <Text style={styles.timeSpentText}>
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    gap: 16,
    padding: 16,
    borderRadius: 24,
    borderColor: '#cbd2d9',
    borderWidth: 1,
    alignSelf: 'center',
  },
  timeSpentLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#737373',
  },
  timeSpentText: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});