import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import { Fonts } from "@/constants";

SplashScreen.preventAutoHideAsync();
const InitialLayout = ({ children }: { children: React.ReactNode }) => {
  const [loaded, error] = useFonts(Fonts);
  React.useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return <>{children}</>;
};

const RootLayout = () => {
  return (
    <InitialLayout>
      <Stack>
        <Stack.Screen name="index" />
      </Stack>
    </InitialLayout>
  );
};

export default RootLayout;
