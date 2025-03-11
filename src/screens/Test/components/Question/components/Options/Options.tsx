import React from "react";
import { useState } from 'react';
import { Option as OptionComponent } from './components';
import { Option } from '../../../../../../data/types';
import { View, StyleSheet, Text } from 'react-native';

interface Props {
  options: Option[];
  description: string;
  explanation?: string;
  onAnswered: (correct: boolean) => void;
}

export function Options({ options, description, explanation, onAnswered }: Props) {
  const [optionState, setOptionState] = useState<{
    answered: boolean;
    chosenOptionId: string | null;
  }>({
    answered: false,
    chosenOptionId: null,
  });

  const optionsComponents = options.map((option) => {
    const { answered, chosenOptionId } = optionState;

    const bgColor = (() => {
      if (answered && option.isCorrect) {
        return '#D1FAE5'; // Soft green for correct answer
      } else if (answered && option.id === chosenOptionId && !option.isCorrect) {
        return '#FEE2E2'; // Soft red for incorrect chosen answer
      } else {
        return '#FFFFFF'; // White background for unanswered
      }
    })();

    const borderColor = (() => {
      if (answered && option.isCorrect) {
        return '#34D399'; // Darker green border for correct
      } else if (answered && option.id === chosenOptionId && !option.isCorrect) {
        return '#F87171'; // Darker red border for incorrect
      } else {
        return '#E5E7EB'; // Light gray border for unanswered
      }
    })();

    // Show description only for the correct answer when answered
    const answerDescription = answered && option.isCorrect ? description : undefined;

    return (
      <OptionComponent
        option={option.text}
        description={answerDescription}
        disabled={optionState.answered}
        bgColor={bgColor}
        borderColor={borderColor}
        isCorrect={answered && option.isCorrect}
        isWrong={answered && option.id === chosenOptionId && !option.isCorrect}
        onPress={() => {
          onAnswered(option.isCorrect);
          setOptionState({
            answered: true,
            chosenOptionId: option.id,
          });
        }}
        key={option.id}
      />
    );
  });

  return (
    <View style={styles.container}>
      <Text style={styles.optionsLabel}>Choose the correct answer:</Text>
      <View style={styles.optionsContainer}>
        {optionsComponents}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  optionsLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0E7490',
    marginBottom: 8,
  },
  optionsContainer: {
    gap: 8,
  }
});
