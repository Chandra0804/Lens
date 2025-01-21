import { HeaderBackButton } from "@react-navigation/elements";
import { useRef } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  current: number;
  correct: number[];
  incorrect: number[];
  numOfQuestions: number;
  onQuestionTouch: (index: number) => void;
  onBackPress: () => void;
}

function HeaderContainer({ children }: { children: React.ReactNode }) {
  const { top } = useSafeAreaInsets();
  return (
    <View style={[headerContainer.root, { paddingTop: top }]}>{children}</View>
  );
}

const headerContainer = StyleSheet.create({
  root: {
    backgroundColor: "#93e3fd",
  },
});

export function Header({ current, numOfQuestions, onBackPress }: Props) {
  return (
    <HeaderContainer>
      <View style={header.root}>
        <HeaderBackButton labelVisible={false} onPress={onBackPress} />
        <Text style={header.summary}>
          {/* {current + 1} of {numOfQuestions} */}
        </Text>
      </View>
    </HeaderContainer>
  );
}

const header = StyleSheet.create({
  root: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Platform.select({
      android: 8,
      default: 0,
    }),
    paddingHorizontal: 16,
  },
  summary: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
});
