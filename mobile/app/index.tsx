import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import TypeWriter from "react-native-typewriter";
import { COLORS, FONTS, remarks } from "@/constants";
import Animated, {
  SlideInDown,
  SlideInUp,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

const Page = () => {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      setIndex((s) => (s + 1) % remarks.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);
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
    </LinearGradient>
  );
};

export default Page;
