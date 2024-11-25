import React, { useState } from "react";
import { Option as OptionComponent } from "./components";
import { View } from "react-native";

export function Options({ options, description, onAnswered }) {
  const [optionState, setOptionState] = useState({
    answered: false,
    chosenOptionId: null,
  });

  const optionsComponents = options.map((option) => {
    const { answered, chosenOptionId } = optionState;

    const bgColor = (() => {
      if (answered && option.isCorrect) {
        return "#86efac";
      } else if (answered && option.id === chosenOptionId) {
        return "#fca5a5";
      } else {
        return "#fafafa";
      }
    })();

    const answerDescription = answered && option.isCorrect ? description : undefined;

    return (
      <OptionComponent
        option={option.text}
        description={answerDescription}
        disabled={optionState.answered}
        bgColor={bgColor}
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
    <View
      style={{
        gap: 4,
      }}
    >
      {optionsComponents}
    </View>
  );
}