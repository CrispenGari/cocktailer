import { View, Text, FlatList } from "react-native";
import React from "react";
import { COLORS, FONTS } from "@/constants";

import cocktails from "@/assets/data/cocktails.json";

import Cocktail from "./Cocktail";

const Suggestions = () => {
  return (
    <View style={{ padding: 10 }}>
      <View style={{ marginBottom: 15 }}>
        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: 20,
          }}
        >
          Have You Tasted?
        </Text>
        <Text style={{ color: COLORS.tertiary, fontFamily: FONTS.regular }}>
          Suggestions based on your best favorite cocktail.
        </Text>
      </View>
      <FlatList
        horizontal
        data={cocktails.slice(0, 11)}
        keyExtractor={(item) => item.name}
        renderItem={({ item, index }) => (
          <Cocktail index={index} cocktail={item as any} />
        )}
        contentContainerStyle={{ gap: 10 }}
      />
    </View>
  );
};

export default Suggestions;
