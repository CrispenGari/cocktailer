import { View, Text, SafeAreaView, Platform } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { COLORS } from "@/constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CocktailHeader = ({ cocktail }: { cocktail: string }) => {
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS.primary,
      }}
    >
      <View
        style={{
          paddingBottom: 14,
          paddingTop: Platform.select({ ios: 0, android: top }),
          width: "100%",
          paddingHorizontal: 20,
        }}
      >
        <Text style={{}}>{cocktail}</Text>
      </View>
    </SafeAreaView>
  );
};

export default CocktailHeader;
