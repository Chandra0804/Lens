import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function SafeAreaBox({ children }) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        marginTop: insets.top,
        marginBottom: insets.bottom,
        marginLeft: insets.left,
        marginRight: insets.right,
        flex: 1,
      }}
    >
      {children}
    </View>
  );
}

export default SafeAreaBox;