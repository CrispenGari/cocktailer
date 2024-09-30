import { View, Text, FlatList } from "react-native";
import React from "react";
import { COLORS, FONTS } from "@/constants";
import cocktails from "@/assets/data/cocktails.json";
import Cocktail, { CocktailSkeleton } from "./Cocktail";
import { useFavoritesStore } from "@/store/favoritesStore";
import { graphql } from "@/graphql";
import { useQuery } from "urql";
const shuffledCocktails = cocktails.sort(() => Math.random() - 0.5);
const RecommendationQuery = graphql(`
  query RecomentationQuery($input: RecommendationInput!) {
    recommendation(input: $input) {
      error {
        field
        message
      }
      recommendations {
        name
        similarity
      }
    }
  }
`);
const Suggestions = () => {
  const { favorites } = useFavoritesStore();
  const top = favorites.length === 0 ? shuffledCocktails[0] : favorites[0];
  const [{ fetching, data }] = useQuery({
    query: RecommendationQuery,
    variables: {
      input: { name: top.name },
    },
  });

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

      {fetching || !!!data?.recommendation?.recommendations ? (
        <FlatList
          data={Array(10).fill(null)}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ index }) => <CocktailSkeleton index={index} />}
          contentContainerStyle={{ gap: 10 }}
          horizontal
          decelerationRate={0.9}
          snapToInterval={150}
          snapToAlignment={"start"}
          showsHorizontalScrollIndicator={false}
          disableIntervalMomentum={true}
        />
      ) : (
        <FlatList
          horizontal
          decelerationRate={0.9}
          snapToInterval={150}
          snapToAlignment={"start"}
          showsHorizontalScrollIndicator={false}
          disableIntervalMomentum={true}
          data={data.recommendation.recommendations}
          keyExtractor={(item) => item?.name!}
          renderItem={({ item, index }) => {
            const cocktail = cocktails.find((c) => c.name === item?.name);
            if (!!!cocktail) return <CocktailSkeleton index={index} />;
            return <Cocktail index={index} cocktail={cocktail as any} />;
          }}
          contentContainerStyle={{ gap: 10 }}
        />
      )}
    </View>
  );
};

export default Suggestions;
