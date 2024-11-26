import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import "react-native-reanimated";

import { SafeAreaView, View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import WebView from "react-native-webview";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [isLoading, setIsLoading] = useState(true);
  const [webViewLoaded, setWebViewLoaded] = useState(false);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  const handleAnimationFinish = () => {
    setIsLoading(false);
  };

  if (!loaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.container}>
        {isLoading ? (
          <>
            <View style={styles.animationContainer}>
              <LottieView
                source={require("../assets/animations/splash-screen.json")}
                style={styles.lottie}
                autoPlay
                loop={false}
                onAnimationFinish={handleAnimationFinish}
              />
            </View>

            <View style={styles.hiddenWebView}>
              <WebView
                source={{ uri: "https://youthmap.site/home" }}
                onLoadEnd={() => setWebViewLoaded(true)}
              />
            </View>
          </>
        ) : (
          <WebView
            style={styles.fullScreen}
            source={{ uri: "https://youthmap.site/home" }}
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
  fullScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  hiddenWebView: {
    flex: 0,
    width: 0,
    height: 0,
    opacity: 0,
  },
  lottie: {
    width: "100%",
    height: "100%",
  },
});
