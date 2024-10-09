import {
  View,
  SafeAreaView,
  TextInput,
  Platform,
  Keyboard,
} from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useRouter } from "expo-router";
import { COLORS, FONTS } from "@/constants";

interface Props {
  onChangeText: (text: string) => void;
  text: string;
}
const SearchInput = ({ onChangeText, text }: Props) => {
  const router = useRouter();
  const { top } = useSafeAreaInsets();

  const scale = useSharedValue(0);

  const startZoomIn = React.useCallback(() => {
    scale.value = withTiming(1, { duration: 1000 });
  }, []);

  React.useEffect(() => {
    startZoomIn();
  }, []);
  const textInputRef = React.useRef<TextInput>(null);
  const focused = useSharedValue(0);

  const animatedTextInputStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      focused.value,
      [0, 1],
      [COLORS.main, COLORS.primary]
    );
    return {
      backgroundColor,
    };
  });

  const onFocus = () => {
    focused.value = withTiming(1, { duration: 400 });
  };
  const onBlur = () => {
    focused.value = withTiming(0, { duration: 400 });
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS.primary,
      }}
    >
      <View
        style={{
          paddingVertical: 10,
          paddingTop: Platform.select({ android: top + 5 }),
        }}
      >
        <View
          style={{
            gap: 5,
            paddingHorizontal: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              width: 35,
              height: 35,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 35,
            }}
            onPress={() => {
              router.back();
            }}
          >
            <Ionicons name="close-outline" size={18} color={COLORS.black} />
          </TouchableOpacity>
          <Animated.View
            style={[
              animatedTextInputStyle,
              {
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
                width: "100%",
                maxWidth: 450,
                borderRadius: 10,
                gap: 10,
                paddingHorizontal: 20,
                elevation: 5,
                marginVertical: 5,
                shadowOffset: { width: 1, height: 1 },
                shadowRadius: 5,
                shadowOpacity: 0.1,
                flex: 1,
                paddingVertical: Platform.select({ ios: 5, android: 5 }),
                backgroundColor: Platform.select({ ios: COLORS.primary }),
              },
            ]}
          >
            <TextInput
              style={{
                flex: 1,
                fontFamily: FONTS.regular,
                fontSize: 16,
                backgroundColor: COLORS.transparent,
                paddingHorizontal: 10,
              }}
              placeholderTextColor={COLORS.black}
              placeholder="Search Cocktails"
              onFocus={onFocus}
              onBlur={onBlur}
              ref={textInputRef}
              value={text}
              onChangeText={onChangeText}
            />
            <TouchableOpacity
              style={{}}
              onPress={() => {
                onChangeText("");
                Keyboard.dismiss();
                textInputRef.current?.blur();
              }}
            >
              <Ionicons name="close-outline" size={20} color={COLORS.black} />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SearchInput;
