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
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import FavoriteSortBottomSheet from "../BottomSheets/FavoriteSortBottomSheet";
import { onImpact } from "@/utils";
import { useSettingsStore } from "@/store/settingsStore";

const FavoritesHeader = () => {
  const { top } = useSafeAreaInsets();
  const { settings } = useSettingsStore();

  const sortFavoritesBottomSheetRef = React.useRef<BottomSheetModal>(null);
  return (
    <>
      <FavoriteSortBottomSheet ref={sortFavoritesBottomSheetRef} />
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
            Favorites
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              width: "100%",
            }}
          >
            <Link href={{ pathname: "/(modals)/search-favorites" }} asChild>
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
                  flex: 1,
                  marginVertical: 5,
                  shadowOffset: { width: 1, height: 1 },
                  shadowRadius: 2,
                  shadowOpacity: 1,
                  paddingVertical: Platform.select({ ios: 5, android: 5 }),
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
                  Search Favorites
                </Text>
                <TouchableOpacity style={{}}>
                  <Ionicons
                    name="search-outline"
                    size={20}
                    color={COLORS.black}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            </Link>
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                borderRadius: 40,
                backgroundColor: COLORS.main,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={async () => {
                if (settings.haptics) {
                  await onImpact();
                }
                sortFavoritesBottomSheetRef.current?.present();
              }}
            >
              <Ionicons name="filter-outline" size={25} color={COLORS.black} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default FavoritesHeader;
