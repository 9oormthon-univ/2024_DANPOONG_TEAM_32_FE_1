import React, { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import LottieView from "lottie-react-native";
import { SafeAreaView, View, StyleSheet } from "react-native";
import WebView from "react-native-webview";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.container}>
        {isLoading ? (
          <View style={styles.animationContainer}>
            <LottieView
              source={require("../assets/animations/splash-screen.json")}
              style={styles.lottieView}
              autoPlay
              loop={false}
              onAnimationFinish={() => setIsLoading(false)}
            />
          </View>
        ) : (
          <WebView
            style={styles.webView}
            source={{ uri: "https://youthmap.site/login" }}
          />
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  animationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: -150,
  },
  webView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  lottieView: {
    width: "100%",
    height: "100%",
  },
});
