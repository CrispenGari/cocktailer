import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import React from "react";
import { COLORS, FONTS } from "@/constants";
import { TCocktail } from "@/types";
import { LinearGradient } from "expo-linear-gradient";
import { SvgComponent } from "./SvgComponent";
import glasses from "@/assets/data/glasses.json";

const Cocktail = ({
  cocktail,
  index,
}: {
  cocktail: TCocktail;
  index: number;
}) => {
  const colors =
    typeof cocktail.colors === "string"
      ? [cocktail.colors, cocktail.colors]
      : cocktail.colors.length === 1
      ? [cocktail.colors[0], cocktail.colors[0]]
      : cocktail.colors;
  return (
    <TouchableOpacity
      style={{
        padding: 10,
        backgroundColor: index % 2 === 0 ? COLORS.secondary : COLORS.main,
        borderRadius: 10,
        width: 260,
        height: 320,
      }}
    >
      <View style={{ flexDirection: "row", gap: 10 }}>
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
            d={
              // @ts-expect-error
              glasses[cocktail.glass_and_ingredients.glass.replace(/\s/m, "")]
                ?.d
            }
            fill={COLORS.white}
            height={30}
            width={30}
            stroke={COLORS.black}
            strokeWidth={StyleSheet.hairlineWidth}
          />
        </LinearGradient>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: FONTS.bold,
              fontSize: 18,
              textDecorationLine: "underline",
            }}
          >
            {cocktail.name}
          </Text>
          <Text
            style={{
              fontFamily: FONTS.regular,
            }}
          >
            {cocktail.category}
          </Text>
        </View>
      </View>

      <View style={{ marginTop: 5 }}>
        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: 18,
            textDecorationLine: "underline",
          }}
        >
          Ingredients
        </Text>

        {cocktail.glass_and_ingredients.ingredients
          .slice(0, 3)
          .map((ingredient, key) => (
            <View key={key} style={{ flexDirection: "row", gap: 5 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: FONTS.bold }}>
                  {ingredient.ingredient}
                </Text>
                <Text
                  style={{ fontFamily: FONTS.regular, color: COLORS.tertiary }}
                >
                  {ingredient.label || ingredient.ingredient} ● {ingredient.abv}
                  %
                </Text>
              </View>
              <View
                style={{
                  backgroundColor:
                    index % 2 !== 0 ? COLORS.secondary : COLORS.main,
                  justifyContent: "center",
                  alignItems: "center",
                  width: 50,
                  height: 40,
                  borderRadius: 5,
                }}
              >
                <Text style={{ fontFamily: FONTS.bold, fontSize: 12 }}>
                  {((ingredient.amount || 0) * 10).toFixed(1)}ml
                </Text>
              </View>
            </View>
          ))}

        {cocktail.glass_and_ingredients.ingredients.length > 3 ? (
          <Text
            style={{
              textDecorationLine: "underline",
              fontFamily: FONTS.bold,
              marginTop: 5,
            }}
          >
            See all ingredients
          </Text>
        ) : null}
      </View>
      <View style={{ marginTop: 5 }}>
        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: 18,
            textDecorationLine: "underline",
          }}
        >
          Garnish
        </Text>
        <Text style={{ fontFamily: FONTS.regular, color: COLORS.tertiary }}>
          {cocktail.garnish || "None"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Cocktail;
