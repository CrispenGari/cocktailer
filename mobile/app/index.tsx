import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import TypeWriter from "react-native-typewriter";
import { COLORS, FONTS, remarks } from "@/constants";
import Animated, {
  SlideInDown,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { useNewUserStore } from "@/store/newUserStore";
import { onImpact } from "@/utils";
import { useSettingsStore } from "@/store/settingsStore";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import HelpBottomSheet from "@/components/BottomSheets/HelpBottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Page = () => {
  const [index, setIndex] = React.useState(0);
  const { toggle } = useNewUserStore();
  const { settings } = useSettingsStore();
  const router = useRouter();
  const helpBottomSheetRef = React.useRef<BottomSheetModal>(null);
  const { top } = useSafeAreaInsets();

  React.useEffect(() => {
    const id = setInterval(() => {
      setIndex((s) => (s + 1) % remarks.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const openApp = async () => {
    if (settings.haptics) {
      await onImpact();
    }
    toggle();
  };
  return (
    <LinearGradient
      colors={[COLORS.main, COLORS.tertiary]}
      style={{
        justifyContent: "center",
        alignItems: "center",
        minWidth: 50,
        height: 50,
        flex: 1,
        borderRadius: 10,
      }}
      start={{
        x: 0,
        y: 1,
      }}
      end={{
        x: 0,
        y: 0,
      }}
    >
      <HelpBottomSheet ref={helpBottomSheetRef} />
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
          position: "absolute",
          top: top + 10,
          right: 10,
        }}
      >
        <Ionicons name="help" size={18} color={COLORS.black} />
      </TouchableOpacity>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Animated.Image
          entering={ZoomIn}
          exiting={ZoomOut}
          style={{
            width: 200,
            height: 200,
            resizeMode: "contain",
            marginBottom: 30,
          }}
          source={require("@/assets/images/adaptive-icon.png")}
        />
      </View>
      <View
        style={{
          flex: 1,
          width: "100%",
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <TypeWriter
          style={{
            textAlign: "center",
            fontFamily: FONTS.regular,
            fontSize: 20,
            maxWidth: 300,
            alignSelf: "center",
          }}
          typing={1}
          maxDelay={-50}
        >
          {remarks[index].text}
        </TypeWriter>
      </View>
      <Animated.View
        entering={SlideInDown.delay(200).duration(200)}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          gap: 30,
        }}
      >
        <TouchableOpacity
          style={{
            borderRadius: 999,
            backgroundColor: COLORS.primary,
            padding: 8,
            width: "100%",
            maxWidth: 300,
            alignItems: "center",
          }}
          onPress={openApp}
        >
          <Text style={{ fontFamily: FONTS.regular, fontSize: 20 }}>
            Explore
          </Text>
        </TouchableOpacity>
        <Animated.Image
          entering={ZoomIn}
          exiting={ZoomOut}
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
            marginBottom: 30,
          }}
          source={remarks[index].image}
        />
      </Animated.View>

      <SafeAreaView>
        <View
          style={{
            padding: 20,
          }}
        >
          <Text style={{ fontFamily: FONTS.regular }}>
            By using our app you are automatically agreeing with our{" "}
            <Text
              style={{
                fontFamily: FONTS.bold,
                textDecorationLine: "underline",
              }}
              onPress={async () => {
                if (settings.haptics) {
                  await onImpact();
                }
                router.push({
                  pathname: "/(legal)/tnc",
                });
              }}
            >
              Terms and Conditions
            </Text>{" "}
            and our{" "}
            <Text
              onPress={async () => {
                if (settings.haptics) {
                  await onImpact();
                }
                router.push({
                  pathname: "/(legal)/pp",
                });
              }}
              style={{
                fontFamily: FONTS.bold,
                textDecorationLine: "underline",
              }}
            >
              Privacy Policy.
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Page;
