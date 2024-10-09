import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { cocktails, COLORS, FONTS, remarks, glasses } from "@/constants";
import Animated, { SlideInDown, SlideInRight } from "react-native-reanimated";
import CocktailGlass from "@/components/CocktailGlass";
import { useFavoritesStore } from "@/store/favoritesStore";
import { TCocktail } from "@/types";
import { Ionicons } from "@expo/vector-icons";

const Page = () => {
  const { cocktail: name } = useLocalSearchParams<{
    cocktail: string;
  }>();
  const cocktail = cocktails.find((c) => c.name === name);
  const index = cocktails.findIndex((c) => c.name === name);
  const image = remarks[index === -1 ? 0 : index]?.image;
  const colors =
    typeof cocktail === "undefined"
      ? []
      : typeof cocktail.colors === "string"
      ? [cocktail.colors, cocktail.colors]
      : cocktail.colors.length === 1
      ? [cocktail.colors[0], cocktail.colors[0]]
      : cocktail.colors;

  const [liked, setLiked] = React.useState(false);
  const { add, favorites, remove } = useFavoritesStore();

  React.useEffect(() => {
    if (cocktail) {
      const foundInLikes = favorites.find((l) => l.name === cocktail.name);
      setLiked(!!foundInLikes);
    }
  }, [favorites, cocktail]);

  const likeOrUnlike = () => {
    if (!!!cocktail) return;
    if (liked) {
      remove(cocktail as TCocktail);
    } else {
      add(cocktail as TCocktail);
    }
  };
  if (!!!cocktail) return null;

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerTitle: name,
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, backgroundColor: COLORS.primary }}
        contentContainerStyle={{
          paddingBottom: 150,
          paddingHorizontal: 10,
          paddingTop: 10,
        }}
      >
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Animated.Image
            style={{
              width: 50,
              height: 50,
              resizeMode: "contain",
              marginBottom: 10,
            }}
            source={image}
            entering={SlideInRight.delay(500).duration(500)}
          />
        </View>

        <View
          style={[
            styles.card,
            {
              gap: 10,
              alignItems: "flex-start",
              justifyContent: "space-between",
              flexDirection: "row",
            },
          ]}
        >
          <View
            style={{
              flex: 1,
            }}
          >
            <Text style={styles.muted}>Name</Text>
            <Text style={{ fontFamily: FONTS.bold, fontSize: 20 }}>
              {cocktail?.name}
            </Text>
          </View>
          <CocktailGlass
            colors={colors}
            d={
              // @ts-expect-error
              glasses[cocktail.glass_and_ingredients.glass.replace(/\s/m, "")]
                ?.d
            }
          />
        </View>
        <View style={[styles.card]}>
          <Text style={styles.muted}>Ingredients</Text>
          {cocktail.glass_and_ingredients.ingredients.map((ingredient, key) => {
            const volume = ((ingredient.amount as any) || 0) * 10;
            return (
              <View
                key={key}
                style={{ flexDirection: "row", marginBottom: 3, gap: 5 }}
              >
                <View
                  style={{
                    backgroundColor: COLORS.main,
                    justifyContent: "center",
                    alignItems: "center",
                    width: 50,
                    height: 40,
                    borderRadius: 5,
                  }}
                >
                  <Text style={{ fontFamily: FONTS.bold, fontSize: 12 }}>
                    {ingredient.abv || 0}%
                  </Text>
                  <Text
                    style={{
                      fontFamily: FONTS.regular,
                      color: COLORS.tertiary,
                      fontSize: 10,
                    }}
                  >
                    abv
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: FONTS.bold }} numberOfLines={1}>
                    {ingredient.ingredient}
                  </Text>
                  <Text
                    style={{
                      fontFamily: FONTS.regular,
                      color: COLORS.tertiary,
                    }}
                    numberOfLines={1}
                  >
                    {ingredient.label || ingredient.ingredient}
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: COLORS.secondary,
                    justifyContent: "center",
                    alignItems: "center",
                    width: 50,
                    height: 40,
                    borderRadius: 5,
                  }}
                >
                  <Text style={{ fontFamily: FONTS.bold, fontSize: 12 }}>
                    {Number.isNaN(volume) || volume === 0
                      ? "-"
                      : `${volume.toFixed(1)}ml`}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={[styles.card]}>
          <Text style={styles.muted}>Category</Text>
          <Text style={{ fontFamily: FONTS.bold, fontSize: 20 }}>
            {cocktail.category}
          </Text>
        </View>
        <View style={[styles.card]}>
          <Text style={styles.muted}>Garnish</Text>
          <Text style={{ fontFamily: FONTS.bold, fontSize: 20 }}>
            {cocktail.garnish || "none"}
          </Text>
        </View>
        <View style={[styles.card]}>
          <Text style={styles.muted}>Mixology</Text>
          <Text style={{ fontFamily: FONTS.bold, fontSize: 18 }}>
            {cocktail.preparation}
          </Text>
        </View>
      </ScrollView>
      <SafeAreaView>
        <Animated.View
          style={{
            justifyContent: "flex-end",
            marginRight: 10,
            marginTop: 10,
          }}
          entering={SlideInDown.delay(200).duration(200)}
        >
          <TouchableOpacity
            style={{
              alignSelf: "flex-end",
              width: 40,
              height: 40,
              backgroundColor: COLORS.main,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 40,
            }}
            onPress={likeOrUnlike}
          >
            <Ionicons
              name={liked ? "thumbs-up" : "thumbs-up-outline"}
              size={24}
              color={COLORS.tertiary}
            />
          </TouchableOpacity>
        </Animated.View>
        <View style={{ padding: 10, paddingBottom: 0 }}>
          <Text
            style={{
              marginBottom: 25,
              fontFamily: FONTS.regular,
              color: COLORS.tertiary,
              textAlign: "center",
            }}
          >
            {liked
              ? "You liked this cocktail."
              : "This cocktail is not in your favorites."}
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.primary,
    padding: 10,
    width: "100%",
    elevation: 5,
    borderRadius: 10,
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: COLORS.main,
  },
  muted: { color: COLORS.tertiary, fontFamily: FONTS.regular },
});
