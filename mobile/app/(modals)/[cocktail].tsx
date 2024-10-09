import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const Page = () => {
  return (
    <>
      <Stack.Screen options={{ headerShown: true }} />
      <View>
        <Text>Name Page</Text>
      </View>
    </>
  );
};

export default Page;
