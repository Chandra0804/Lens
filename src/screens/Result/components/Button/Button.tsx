import React from "react";
import { ColorValue, Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  text: string;
  textColor?: ColorValue;
  backgroundColor: ColorValue;
  onPress: () => void;
  borderColor?: ColorValue;
  icon?: string;
}

export function Button({ text, textColor, backgroundColor, onPress, borderColor, icon }: Props) {
  return (
    <Pressable
      style={[
        button.root,
        {
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderWidth: borderColor ? 1 : 0,
        },
      ]}
      onPress={onPress}
    >
      <View style={button.container}>
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            size={18}
            color={textColor as string}
            style={button.icon}
          />
        )}
        <Text
          style={[
            button.text,
            {
              color: textColor,
            },
          ]}
        >
          {text}
        </Text>
      </View>
    </Pressable>
  );
}

const button = StyleSheet.create({
  root: {
    padding: 16,
    width: '100%',
    borderRadius: 8,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: '700',
  },
});
