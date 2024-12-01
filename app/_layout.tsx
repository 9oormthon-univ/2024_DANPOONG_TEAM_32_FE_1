import React, { useCallback, useEffect, useState } from "react";
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
  const [appIsReady, setAppIsReady] = useState(false);
  const [animation, setAnimation] = useState(null);

  // 앱 초기화 로직
  useEffect(() => {
    async function prepare() {
      try {
        // 애니메이션 파일 로드
        const anim = require("../assets/animations/splash-screen.json");
        setAnimation(anim);

        // 다른 필요한 리소스들 로드
        await Promise.all([
          // 필요한 다른 리소스 로딩을 여기에 추가
        ]);
      } catch (error) {
        console.error(error);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  // SplashScreen 제어
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  // 앱이 준비되지 않았으면 null 반환
  if (!appIsReady) {
    return null;
  }

  function handleStartLoadWithRequest(event: { url: string }) {
    const { url } = event;

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
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.container}>
        {isLoading && animation ? (
          <View style={styles.animationContainer}>
            <LottieView
              source={animation}
              style={styles.lottieView}
              autoPlay
              loop={false}
              speed={1.0}
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
