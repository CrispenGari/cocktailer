import { View, Text, Platform } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONTS } from "@/constants";

const Layout = () => {
  const width = 350;
  return (
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
        headerShown: true,
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
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
