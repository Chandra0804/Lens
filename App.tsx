import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen, ResultScreen, TestScreen } from "./src/screens";
import { LoginScreen } from "./src/screens/Login";
import { RegisterScreen } from "./src/screens/Register";
import { RootStackParamList } from "./src/types/navigation";
import { UserType } from "./src/screens/Home/HomeScreen";

// Type the Stack navigator with our RootStackParamList
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Use UserType from HomeScreen
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSplashVisible(false);
    }, 3000); // Show splash screen for 3 seconds
    return () => clearTimeout(timeout);
  }, []);

  if (isSplashVisible) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        {!isLoggedIn ? (
          <>
          <Stack.Screen name="Login">
            {(props) => (
              <LoginScreen
              {...props}
              setIsLoggedIn={setIsLoggedIn}
              setUser={setUser} // Pass setUser to update user state
            />
            )}
          </Stack.Screen>
          <Stack.Screen 
            name="Register" 
            component={RegisterScreen}
            options={{
              headerShown: true,
              title: "Create Account"
            }}
          />
          </>
          
        ) : (
          <>
             <Stack.Screen name="Home">
              {(props) => <HomeScreen {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen
              name="Test"
              component={TestScreen}
              options={{
                headerShown: true,
                header: () => null,
              }}
            />
            <Stack.Screen 
              name="Result" 
              component={ResultScreen}
              options={{
                headerShown: false,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// SplashScreen.tsx (unchanged)
function SplashScreen() {
  return (
    <View style={styles.splashContainer}>
      <Image
        source={require("./assets/lens_logo.png")} // Replace with the path to your logo image
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 200,
    height: 200,
  },
});