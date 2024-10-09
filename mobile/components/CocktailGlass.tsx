import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import React from "react";
import { COLORS } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";
import { SvgComponent } from "./SvgComponent";

const CocktailGlass = ({
  colors,
  d,
  containerStyle,
  glassDim,
}: {
  colors: string[];
  d: string;
  containerStyle?: StyleProp<ViewStyle>;
  glassDim?: {
    width: number;
    height: number;
  };
}) => {
  return (
    <LinearGradient
      colors={colors}
      style={[
        {
          justifyContent: "center",
          alignItems: "center",
          minWidth: 50,
          height: 50,
          backgroundColor: COLORS.main,
          borderRadius: 10,
        },
        containerStyle,
      ]}
      start={{
        x: 0,
        y: 1,
      }}
      end={{
        x: 0,
        y: 0,
      }}
    >
      <SvgComponent
        d={d}
        fill={COLORS.white}
        height={typeof glassDim === "undefined" ? 30 : glassDim.height}
        width={typeof glassDim === "undefined" ? 30 : glassDim.width}
        stroke={COLORS.black}
        strokeWidth={StyleSheet.hairlineWidth}
      />
    </LinearGradient>
  );
};

export default CocktailGlass;
