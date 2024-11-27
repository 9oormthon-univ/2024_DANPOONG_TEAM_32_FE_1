import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import "react-native-reanimated";

import { SafeAreaView, View } from "react-native";
import LottieView from "lottie-react-native";
import WebView from "react-native-webview";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [isLoading, setIsLoading] = useState(true); // 로티 애니메이션 및 웹뷰 로딩 상태 관리

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isLoading ? (
        <View style={{ flex: 1, width: "100%", height: "100%" }}>
          <LottieView
            source={require("../assets/animations/splash-screen.json")}
            style={{ width: "100%", height: "100%" }}
            autoPlay
            loop={false}
            onAnimationFinish={() => setIsLoading(false)}
          />
        </View>
      ) : (
        <WebView
          style={{ flex: 1 }}
          source={{ uri: "https://youthmap.site/home" }}
        />
      )}
    </SafeAreaView>
  );
}
