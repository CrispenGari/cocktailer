import { Stack, useRouter, useSegments } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import { Fonts } from "@/constants";
import UrqlProvider from "@/providers/UrqlProvider";
import { useNewUserStore } from "@/store/newUserStore";
import { Asset } from "expo-asset";

SplashScreen.preventAutoHideAsync();
const InitialLayout = () => {
  const [loaded, error] = useFonts(Fonts);

  React.useEffect(() => {
    const cacheImages = async () => {
      const images = [
        require("@/assets/images/bg/0.png"),
        require("@/assets/images/bg/1.png"),
        require("@/assets/images/bg/2.png"),
        require("@/assets/images/bg/3.png"),
      ];
      const cache = images.map((image) =>
        Asset.fromModule(image).downloadAsync()
      );
      await Promise.all(cache);
    };

    cacheImages();
  }, []);
  React.useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <UrqlProvider>
      <RootLayout />
    </UrqlProvider>
  );
};

export default InitialLayout;
const RootLayout = () => {
  const router = useRouter();
  const segments = useSegments();
  const { new: isNew } = useNewUserStore();
  React.useEffect(() => {
    const inTabsGroup = segments[0] === "(tabs)";
    if (!isNew && !inTabsGroup) {
      router.replace("/(tabs)/");
    } else if (isNew && inTabsGroup) {
      router.replace("/");
    }
  }, [isNew, segments]);
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
};
