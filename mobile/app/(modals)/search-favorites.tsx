import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useSearchTermsStore } from "@/store/searchTerms";
import { COLORS, FONTS } from "@/constants";
import { useFavoritesStore } from "@/store/favoritesStore";
import { FavoriteCocktail } from "@/components/Cocktail";

const Page = () => {
  const { query } = useSearchTermsStore();

  const { favorites: cocktails } = useFavoritesStore();
  const results = cocktails.filter((c) =>
    c.name.toLowerCase().includes(query.favorites.trim().toLowerCase())
  );

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: COLORS.primary, padding: 10 }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      {!!query.favorites ? (
        results.length === 0 ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
            }}
          >
            <Text style={{ fontFamily: FONTS.regular, textAlign: "center" }}>
              No matches for the query "{query.favorites}".
            </Text>
          </View>
        ) : (
          results.map((cocktail, index) => (
            <FavoriteCocktail
              index={index}
              key={index}
              cocktail={cocktail as any}
            />
          ))
        )
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
          }}
        >
          <Text style={{ fontFamily: FONTS.regular, textAlign: "center" }}>
            Search Favorite Cocktails
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Page;
