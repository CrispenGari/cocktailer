import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, FONTS } from "@/constants";
import cocktails from "@/assets/data/cocktails.json";
import { ListCocktail } from "./Cocktail";
import { onImpact } from "@/utils";
import { useSettingsStore } from "@/store/settingsStore";

const Browse = () => {
  const [limit, setLimit] = React.useState(11);
  const { settings } = useSettingsStore();
  return (
    <View style={{ padding: 10, gap: 3 }}>
      <View style={{ marginBottom: 15 }}>
        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: 20,
          }}
        >
          Explore More
        </Text>
        <Text style={{ color: COLORS.tertiary, fontFamily: FONTS.regular }}>
          A list of cocktails available.
        </Text>
      </View>
      {cocktails.slice(0, limit).map((cocktail, index) => (
        <ListCocktail key={index} cocktail={cocktail as any} />
      ))}

      {cocktails.length > limit ? (
        <TouchableOpacity
          onPress={async () => {
            if (settings.haptics) {
              await onImpact();
            }
            setLimit((l) => l + 10);
          }}
          style={{ marginVertical: 10, alignSelf: "center" }}
        >
          <Text
            style={{ fontFamily: FONTS.bold, textDecorationLine: "underline" }}
          >
            Load More
          </Text>
        </TouchableOpacity>
      ) : (
        <Text
          style={{ fontFamily: FONTS.bold, textDecorationLine: "underline" }}
        >
          No more cocktails available.
        </Text>
      )}
    </View>
  );
};

export default Browse;
