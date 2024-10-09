import { StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";
import { SvgComponent } from "./SvgComponent";

const CocktailGlass = ({ colors, d }: { colors: string[]; d: string }) => {
  return (
    <LinearGradient
      colors={colors}
      style={{
        justifyContent: "center",
        alignItems: "center",
        minWidth: 50,
        height: 50,
        backgroundColor: COLORS.main,
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
      <SvgComponent
        d={d}
        fill={COLORS.white}
        height={30}
        width={30}
        stroke={COLORS.black}
        strokeWidth={StyleSheet.hairlineWidth}
      />
    </LinearGradient>
  );
};

export default CocktailGlass;
