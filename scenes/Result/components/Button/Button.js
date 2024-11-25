import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

export function Button({ text, textColor, backgroundColor, onPress }) {
  return (
    <Pressable
      style={[
        styles.root,
        {
          backgroundColor: backgroundColor,
        },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.text,
          {
            color: textColor,
          },
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 16,
    width: '100%',
    borderRadius: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: '700',
    alignSelf: 'center',
  },
});