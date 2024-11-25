import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export function LoadingIndicator() {
  return (
    <View style={styles.root}>
      <ActivityIndicator size="large" color="#525252" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});