import { Platform, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONTS } from "@/constants";
import CocktailsHeader from "@/components/Headers/CocktailsHeader";
import FavoritesHeader from "@/components/Headers/FavoritesHeader";
import { TouchableOpacity } from "react-native-gesture-handler";
import { onImpact } from "@/utils";
import { useSettingsStore } from "@/store/settingsStore";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import HelpBottomSheet from "@/components/BottomSheets/HelpBottomSheet";

const Layout = () => {
  const width = 350;
  const { settings } = useSettingsStore();
  const helpBottomSheetRef = React.useRef<BottomSheetModal>(null);
  return (
    <>
      <HelpBottomSheet ref={helpBottomSheetRef} />
      <Tabs
        initialRouteName="index"
        screenOptions={{
          tabBarStyle: {
            height:
              width >= 600 ? 70 : Platform.select({ ios: 100, android: 80 }),
            backgroundColor: COLORS.primary,
            position: "absolute",
            elevation: 0,
            borderWidth: 0,
            shadowOpacity: 0,
          },
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: COLORS.tertiary,
          tabBarInactiveTintColor: COLORS.secondary,
          tabBarLabelStyle: {
            fontFamily: FONTS.bold,
            marginTop: width >= 600 ? 10 : -10,
            marginBottom: 10,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Cocktails",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="wine-outline" color={color} size={size} />
            ),
            header: () => <CocktailsHeader />,
          }}
        />
        <Tabs.Screen
          name="favorites"
          options={{
            title: "Favorites",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="heart-outline" color={color} size={size} />
            ),
            header: () => <FavoritesHeader />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            headerStyle: {
              height: Platform.select({ ios: 100, android: 150 }),
              backgroundColor: COLORS.primary,
            },
            headerTitleStyle: {
              fontFamily: FONTS.bold,
            },
            headerRight: () => (
              <TouchableOpacity
                onPress={async () => {
                  if (settings.haptics) {
                    await onImpact();
                  }
                  helpBottomSheetRef.current?.present();
                }}
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: COLORS.main,
                  borderRadius: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 10,
                }}
              >
                <Ionicons name="help" size={18} color={COLORS.black} />
              </TouchableOpacity>
            ),
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings-outline" color={color} size={size} />
            ),
            headerLeft: () => (
              <Image
                style={{
                  width: 80,
                  height: 80,
                  resizeMode: "contain",
                }}
                source={require("@/assets/images/adaptive-icon.png")}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default Layout;
