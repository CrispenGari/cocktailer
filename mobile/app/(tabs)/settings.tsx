import {
  Alert,
  Linking,
  Platform,
  ScrollView,
  Share,
  StyleSheet,
  Text,
} from "react-native";
import React from "react";
import { useSettingsStore } from "@/store/settingsStore";
import SettingItem from "@/components/SettingItem";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { COLORS, FONTS } from "@/constants";
import { onImpact, onFetchUpdateAsync, rateApp } from "@/utils";
import Card from "@/components/Card";
import * as Constants from "expo-constants";
import { useRouter } from "expo-router";
import { useSearchHistoryStore } from "@/store/searchHistoryStore";
import { useSearchTermsStore } from "@/store/searchTerms";
import { useNewUserStore } from "@/store/newUserStore";
import { useFavoritesStore } from "@/store/favoritesStore";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import HelpBottomSheet from "@/components/BottomSheets/HelpBottomSheet";

const Page = () => {
  const { settings, update, restore: restoreSettings } = useSettingsStore();
  const { clear: clearSearchHistory } = useSearchHistoryStore();
  const { restore: restoreSearchTerms } = useSearchTermsStore();
  const { toggle } = useNewUserStore();
  const { clear: clearFavorites } = useFavoritesStore();
  const router = useRouter();
  const helpBottomSheetRef = React.useRef<BottomSheetModal>(null);
  return (
    <>
      <HelpBottomSheet ref={helpBottomSheetRef} />
      <ScrollView
        style={{ flex: 1, backgroundColor: COLORS.primary }}
        contentContainerStyle={{
          paddingBottom: 100,
          padding: 10,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{
            textAlign: "center",
            color: COLORS.tertiary,
            fontFamily: FONTS.bold,
          }}
        >
          {Constants.default.expoConfig?.name}{" "}
          {Constants.default.expoConfig?.version}
        </Text>
        <Text style={styles.headerText}>Misc</Text>
        <Card>
          <SettingItem
            subtitle={
              settings.haptics
                ? "In app haptics are ONN."
                : "In app haptics are OFF."
            }
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              update({ ...settings, haptics: !settings.haptics });
            }}
            title="App Haptics"
            Icon={
              <MaterialIcons name="vibration" size={18} color={COLORS.black} />
            }
          />
          <SettingItem
            subtitle="Check for new updates."
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              await onFetchUpdateAsync();
            }}
            title="Updates"
            Icon={
              <MaterialIcons name="update" size={18} color={COLORS.black} />
            }
          />
          <SettingItem
            subtitle="Reset settings to default."
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }

              Alert.alert(
                "Resetting Settings to Default",
                "Are you sure you want to reset the settings to default?",
                [
                  {
                    text: "Yes",
                    onPress: async () => {
                      if (settings.haptics) {
                        restoreSearchTerms();
                        restoreSettings();
                        clearFavorites();
                        clearSearchHistory();
                        toggle();
                      }
                    },
                    style: "default",
                  },
                  {
                    text: "No",
                    style: "cancel",
                    onPress: async () => {
                      if (settings.haptics) {
                        await onImpact();
                      }
                    },
                  },
                ],
                {
                  cancelable: false,
                }
              );
            }}
            title="Reset Settings"
            Icon={
              <Ionicons name="refresh-sharp" size={18} color={COLORS.black} />
            }
          />
        </Card>

        <Text style={styles.headerText}>Storage and History</Text>
        <Card>
          <SettingItem
            subtitle="Clear cocktails in favorites."
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              Alert.alert(
                "Clearing Search Favorites",
                "Are you sure you want to clear your favorites Cocktails list?",
                [
                  {
                    text: "Yes",
                    onPress: async () => {
                      if (settings.haptics) {
                        clearFavorites();
                      }
                    },
                    style: "default",
                  },
                  {
                    text: "No",
                    style: "cancel",
                    onPress: async () => {
                      if (settings.haptics) {
                        await onImpact();
                      }
                    },
                  },
                ],
                {
                  cancelable: false,
                }
              );
            }}
            title="Clear Favorites"
            Icon={
              <MaterialIcons
                name="heart-broken"
                size={18}
                color={COLORS.black}
              />
            }
          />
          <SettingItem
            subtitle={"Clear all search history."}
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              Alert.alert(
                "Clearing Search History",
                "Are you sure you want to clear the search history?",
                [
                  {
                    text: "Yes",
                    onPress: async () => {
                      if (settings.haptics) {
                        restoreSearchTerms();
                        clearSearchHistory();
                      }
                    },
                    style: "default",
                  },
                  {
                    text: "No",
                    style: "cancel",
                    onPress: async () => {
                      if (settings.haptics) {
                        await onImpact();
                      }
                    },
                  },
                ],
                {
                  cancelable: false,
                }
              );
            }}
            title="Clear Search History"
            Icon={
              <MaterialIcons name="clear-all" size={18} color={COLORS.black} />
            }
          />
        </Card>
        <Text style={styles.headerText}>Support</Text>
        <Card>
          <SettingItem
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              await rateApp();
            }}
            title="Rate Cocktailer"
            Icon={
              <Ionicons name="star-outline" size={18} color={COLORS.black} />
            }
            subtitle={
              Platform.select({
                ios: "Rate this app on AppStore.",
                android: "Rate this app on Play Store.",
              }) || "Rate this app on Play Store."
            }
          />
          <SettingItem
            subtitle="Tell other cocktail lovers about cocktailer."
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              await Share.share(
                {
                  url: "https://github.com/CrispenGari/cocktailer",
                  message:
                    "Master of Cocktails: Download at https://github.com/CrispenGari/cocktailer",
                  title: "Share cocktailer with a Friend",
                },
                { dialogTitle: "Share cocktailer", tintColor: COLORS.tertiary }
              );
            }}
            title="Tell a Friend"
            Icon={
              <Ionicons name="heart-outline" size={18} color={COLORS.black} />
            }
          />

          <SettingItem
            subtitle="Understand how cocktailer works."
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              helpBottomSheetRef.current?.present();
            }}
            title="How Does Cocktailer Works?"
            Icon={<Ionicons name="help" size={18} color={COLORS.black} />}
          />
          <SettingItem
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              const res = await Linking.canOpenURL(
                "https://github.com/CrispenGari/cocktailer/issues"
              );
              if (res) {
                Linking.openURL(
                  "https://github.com/CrispenGari/cocktailer/issues"
                );
              }
            }}
            title="Report an Issue"
            Icon={
              <Ionicons name="logo-github" size={18} color={COLORS.black} />
            }
            subtitle="Report a bug to github."
          />
        </Card>
        <Text style={styles.headerText}>Legal</Text>
        <Card>
          <SettingItem
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              router.navigate("/(legal)/tnc");
            }}
            title="Terms of Service"
            Icon={
              <Ionicons
                name="document-text-outline"
                size={18}
                color={COLORS.black}
              />
            }
            subtitle="Terms and Conditions for cocktailer."
          />
          <SettingItem
            subtitle="Privacy Policy of cocktailer."
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              router.navigate("/(legal)/pp");
            }}
            title="Privacy Policy"
            Icon={
              <Ionicons
                name="document-text-outline"
                size={18}
                color={COLORS.black}
              />
            }
          />
        </Card>
      </ScrollView>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  headerText: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    marginLeft: 10,
    marginTop: 10,
  },
});
