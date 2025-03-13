"use client"

import { Stack } from "expo-router"
import { PaperProvider, MD3LightTheme } from "react-native-paper"
import { useFonts } from "expo-font"
import { useCallback } from "react"
import * as SplashScreen from "expo-splash-screen"

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync()

// Custom theme for the Bible app
const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#3f51b5",
    secondary: "#5c6bc0",
    background: "#f5f5f5",
  },
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Roboto: require("@expo-google-fonts/roboto/Roboto_400Regular.ttf"),
    "Roboto-Medium": require("@expo-google-fonts/roboto/Roboto_500Medium.ttf"),
    "Roboto-Bold": require("@expo-google-fonts/roboto/Roboto_700Bold.ttf"),
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <PaperProvider theme={theme}>
      <Stack
        onLayout={onLayoutRootView}
        screenOptions={{
            headerShown: false
        }}
      />
    </PaperProvider>
  )
}

