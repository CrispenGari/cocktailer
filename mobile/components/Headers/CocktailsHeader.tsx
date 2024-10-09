import {
  View,
  Text,
  SafeAreaView,
  Platform,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONTS } from "@/constants";
import { Link } from "expo-router";

const CocktailsHeader = () => {
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
        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: 20,
          }}
        >
          coktailer
        </Text>

        <Link href={{ pathname: "/(modals)/search" }} asChild>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 10,
              maxWidth: 450,
              borderRadius: 10,
              gap: 10,
              paddingHorizontal: 20,
              elevation: 5,
              marginVertical: 5,
              shadowOffset: { width: 1, height: 1 },
              shadowRadius: 2,
              shadowOpacity: 1,
              paddingVertical: Platform.select({ ios: 5, android: 8 }),
              backgroundColor: Platform.select({
                ios: COLORS.primary,
                android: COLORS.primary,
              }),
            }}
          >
            <Text
              style={{
                flex: 1,
                fontFamily: FONTS.regular,
                fontSize: 16,
                backgroundColor: COLORS.transparent,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 5,
                color: COLORS.secondary,
              }}
            >
              Search cocktails
            </Text>
            <TouchableOpacity style={{}}>
              <Ionicons name="search-outline" size={20} color={COLORS.black} />
            </TouchableOpacity>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default CocktailsHeader;
