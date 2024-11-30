import React, { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import LottieView from "lottie-react-native";
import { View, StyleSheet, Platform } from "react-native";
import WebView from "react-native-webview";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as Linking from "expo-linking";
import SendIntentAndroid from "react-native-send-intent";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  function handleStartLoadWithRequest(event: { url: string }) {
    const { url } = event; // event.url을 사용할 때 변수로 추출

    if (url.startsWith("http://") || url.startsWith("https://")) {
      return true;
    } else if (Platform.OS === "android" && url.startsWith("intent")) {
      SendIntentAndroid.openChromeIntent(url).then(() => {
        return false;
      });
      return false;
    }
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    return false;
  }

  return (
    <SafeAreaProvider>
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
            onShouldStartLoadWithRequest={handleStartLoadWithRequest}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
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
