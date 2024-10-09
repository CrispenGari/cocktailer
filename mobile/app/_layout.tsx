import { Stack, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import { COLORS, FONTS, Fonts } from "@/constants";
import UrqlProvider from "@/providers/UrqlProvider";
import { useNewUserStore } from "@/store/newUserStore";
import { Asset } from "expo-asset";
import { LogBox, Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModalProvider,
  TouchableOpacity,
} from "@gorhom/bottom-sheet";
import SearchInput from "@/components/SearchInput";
import { Ionicons } from "@expo/vector-icons";
import { useSearchTermsStore } from "@/store/searchTerms";

LogBox.ignoreLogs;
LogBox.ignoreAllLogs();
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
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <UrqlProvider>
          <RootLayout />
        </UrqlProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default InitialLayout;
const RootLayout = () => {
  const router = useRouter();
  const { new: isNew } = useNewUserStore();
  const { query, update } = useSearchTermsStore();
  React.useEffect(() => {
    if (!isNew) {
      router.replace("/(tabs)");
    } else {
      router.replace("/");
    }
  }, [isNew]);
  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        options={{
          presentation: Platform.select({
            ios: "modal",
            android: "fullScreenModal",
          }),
          headerTitleStyle: {
            fontFamily: FONTS.bold,
            fontSize: 24,
            color: COLORS.black,
          },
          headerStyle: { backgroundColor: COLORS.primary },
          headerTitleAlign: "center",
          navigationBarHidden: true,
          headerShadowVisible: false,
          headerShown: true,
          header: () => (
            <SearchInput
              text={query.search}
              onChangeText={(text) => {
                update({ ...query, search: text });
              }}
            />
          ),
        }}
        name="(modals)/search"
      />
      <Stack.Screen
        options={{
          presentation: Platform.select({
            ios: "modal",
            android: "fullScreenModal",
          }),
          headerTitleStyle: {
            fontFamily: FONTS.bold,
            fontSize: 24,
            color: COLORS.black,
          },
          headerStyle: { backgroundColor: COLORS.primary },
          headerTitleAlign: "center",
          navigationBarHidden: true,
          headerShadowVisible: false,
          headerShown: true,
          headerLeft: ({}) => (
            <TouchableOpacity
              style={{
                marginRight: 20,
              }}
              activeOpacity={0.7}
              onPress={async () => {
                router.back();
              }}
            >
              <Ionicons name="close-outline" size={30} color={COLORS.black} />
            </TouchableOpacity>
          ),
        }}
        name="(modals)/[cocktail]"
      />
    </Stack>
  );
};
