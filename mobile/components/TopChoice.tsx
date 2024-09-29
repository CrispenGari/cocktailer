import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { COLORS, FONTS } from "@/constants";
import { SvgComponent } from "./SvgComponent";
import glasses from "@/assets/data/glasses.json";
import { LinearGradient } from "expo-linear-gradient";

const cocktail = {
  iba: true,
  name: "Old Fashioned",
  colors: ["#E74A03", "#F1A507"],
  glass_and_ingredients: {
    glass: "Old Fashioned",
    ingredients: [
      {
        unit: "cl",
        amount: 4.5,
        ingredient: "Whiskey",
        label: "Bourbon or rye whiskey",
        abv: 40,
        taste: null,
      },
      {
        unit: null,
        amount: "2 dashes",
        ingredient: "Angostura bitters",
        label: null,
        abv: 44,
        taste: "bitter",
      },
      {
        unit: null,
        amount: "1",
        ingredient: "Sugar",
        label: "Sugar cube",
        abv: 0,
        taste: "sweet",
      },
      {
        unit: null,
        amount: null,
        ingredient: "Few dashes plain water",
        label: null,
        abv: null,
        taste: null,
      },
    ],
  },
  category: "Before Dinner Cocktail",
  garnish: "Orange slice and cherry",
  preparation:
    "Place sugar cube in old-fashioned glass and saturate with bitters, add a dash of plain water. Muddle until dissolve. Fill the glass with ice cubes and add whisky.",
};
const TopChoice = () => {
  const colors =
    typeof cocktail.colors === "string"
      ? [cocktail.colors, cocktail.colors]
      : cocktail.colors.length === 1
      ? [cocktail.colors[0], cocktail.colors[0]]
      : cocktail.colors;
  return (
    <TouchableOpacity
      style={{
        width: "100%",
        height: 200,
        backgroundColor: COLORS.main,
        padding: 20,
        gap: 20,
      }}
    >
      <Text
        style={{
          fontFamily: FONTS.bold,
          fontSize: 22,
        }}
      >
        Your Best Favorite Cocktail.
      </Text>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: FONTS.bold,
              fontSize: 16,
            }}
          >
            {cocktail.name}
          </Text>
          <Text style={{ fontFamily: FONTS.regular }}>{cocktail.category}</Text>
          <Text
            style={{
              fontFamily: FONTS.regular,
              color: COLORS.tertiary,
            }}
          >
            {cocktail.garnish}
          </Text>
        </View>

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
            // @ts-expect-error
            d={glasses[cocktail.glass_and_ingredients.glass.replace(" ", "")].d}
            fill={COLORS.white}
            height={30}
            width={30}
            stroke={COLORS.black}
            strokeWidth={StyleSheet.hairlineWidth}
          />
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

export default TopChoice;
