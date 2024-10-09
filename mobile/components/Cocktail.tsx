import { View, TouchableOpacity, Text } from "react-native";
import React from "react";
import { COLORS, FONTS } from "@/constants";
import { TCocktail } from "@/types";
import glasses from "@/assets/data/glasses.json";
import { Ionicons } from "@expo/vector-icons";
import { useFavoritesStore } from "@/store/favoritesStore";
import ContentLoader from "./ContentLoader";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import IngredientsBottomSheet from "./BottomSheets/IngredientsBottomSheet";
import { useRouter } from "expo-router";
import CocktailGlass from "./CocktailGlass";

export const FavoriteCocktail = ({
  cocktail,
  index,
}: {
  cocktail: TCocktail;
  index: number;
}) => {
  const router = useRouter();
  const colors =
    typeof cocktail.colors === "string"
      ? [cocktail.colors, cocktail.colors]
      : cocktail.colors.length === 1
      ? [cocktail.colors[0], cocktail.colors[0]]
      : cocktail.colors;

  const ingredientsBottomSheetRef = React.useRef<BottomSheetModal>(null);
  const [liked, setLiked] = React.useState(false);
  const { add, favorites, remove } = useFavoritesStore();
  React.useEffect(() => {
    const foundInLikes = favorites.find((l) => l.name === cocktail.name);
    setLiked(!!foundInLikes);
  }, [favorites, cocktail]);
  const likeOrUnlike = () => {
    if (liked) {
      remove(cocktail);
    } else {
      add(cocktail);
    }
  };

  return (
    <TouchableOpacity
      style={{
        margin: 5,
        minWidth: 150,
        flex: 1,
        backgroundColor: index % 2 === 0 ? COLORS.secondary : COLORS.main,
        padding: 10,
        borderRadius: 10,
      }}
      onPress={() => {
        router.push({
          pathname: "/(modals)/[cocktail]",
          params: {
            cocktail: cocktail.name,
          },
        });
      }}
    >
      <View style={{ flexDirection: "row", gap: 10 }}>
        <CocktailGlass
          colors={colors}
          containerStyle={{ width: 30, height: 30 }}
          glassDim={{ width: 20, height: 20 }}
          d={
            // @ts-expect-error
            glasses[cocktail.glass_and_ingredients.glass.replace(/\s/m, "")]?.d
          }
        />

        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: FONTS.bold,
              fontSize: 14,
              textDecorationLine: "underline",
            }}
            numberOfLines={1}
          >
            {cocktail.name}
          </Text>
          <Text
            style={{
              fontFamily: FONTS.regular,
              color: COLORS.tertiary,
              fontSize: 12,
            }}
            numberOfLines={1}
          >
            {cocktail.category || "None"}
          </Text>
        </View>
      </View>

      <View style={{ marginTop: 5 }}>
        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: 12,
            textDecorationLine: "underline",
          }}
        >
          Garnish
        </Text>
        <Text style={{ fontFamily: FONTS.regular, color: COLORS.tertiary }}>
          {cocktail.garnish || "None"}
        </Text>
      </View>
      <Text
        onPress={() => ingredientsBottomSheetRef.current?.present()}
        style={{
          textDecorationLine: "underline",
          fontFamily: FONTS.bold,
          marginVertical: 10,
        }}
      >
        See Ingredients
      </Text>
      <View style={{ justifyContent: "flex-end", alignSelf: "flex-end" }}>
        <TouchableOpacity
          style={{
            alignSelf: "flex-end",
            width: 40,
            height: 40,
            backgroundColor: COLORS.primary,
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
      </View>
    </TouchableOpacity>
  );
};

const Cocktail = ({
  cocktail,
  index,
}: {
  cocktail: TCocktail;
  index: number;
}) => {
  const router = useRouter();
  const colors =
    typeof cocktail.colors === "string"
      ? [cocktail.colors, cocktail.colors]
      : cocktail.colors.length === 1
      ? [cocktail.colors[0], cocktail.colors[0]]
      : cocktail.colors;

  const ingredientsBottomSheetRef = React.useRef<BottomSheetModal>(null);
  const [liked, setLiked] = React.useState(false);
  const { add, favorites, remove } = useFavoritesStore();
  React.useEffect(() => {
    const foundInLikes = favorites.find((l) => l.name === cocktail.name);
    setLiked(!!foundInLikes);
  }, [favorites, cocktail]);
  const likeOrUnlike = () => {
    if (liked) {
      remove(cocktail);
    } else {
      add(cocktail);
    }
  };

  return (
    <>
      <IngredientsBottomSheet
        ref={ingredientsBottomSheetRef}
        cocktail={cocktail}
        secondary={index % 2 === 0}
      />
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: index % 2 === 0 ? COLORS.secondary : COLORS.main,
          borderRadius: 10,
          width: 300,
          height: 380,
        }}
        onPress={() => {
          router.push({
            pathname: "/(modals)/[cocktail]",
            params: {
              cocktail: cocktail.name,
            },
          });
        }}
      >
        <View style={{ flexDirection: "row", gap: 10 }}>
          <CocktailGlass
            colors={colors}
            d={
              // @ts-expect-error
              glasses[cocktail.glass_and_ingredients.glass.replace(/\s/m, "")]
                ?.d
            }
          />

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
              {cocktail.category || "None"}
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
            .map((ingredient, key) => {
              const volume = (ingredient.amount || 0) * 10;
              return (
                <View
                  key={key}
                  style={{ flexDirection: "row", marginBottom: 3, gap: 5 }}
                >
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
                      {Number.isNaN(volume) || volume === 0
                        ? "-"
                        : `${volume.toFixed(1)}ml`}
                    </Text>
                  </View>
                </View>
              );
            })}

          {cocktail.glass_and_ingredients.ingredients.length > 3 ? (
            <Text
              onPress={() => ingredientsBottomSheetRef.current?.present()}
              style={{
                textDecorationLine: "underline",
                fontFamily: FONTS.bold,
                marginVertical: 10,
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

        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <TouchableOpacity
            style={{
              alignSelf: "flex-end",
              width: 40,
              height: 40,
              backgroundColor: COLORS.primary,
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
        </View>
      </TouchableOpacity>
    </>
  );
};

export default Cocktail;

export const CocktailSkeleton = ({ index }: { index: number }) => {
  return (
    <View
      style={{
        padding: 10,
        backgroundColor: index % 2 === 0 ? COLORS.secondary : COLORS.main,
        borderRadius: 10,
        width: 300,
        height: 380,
      }}
    >
      <View style={{ flexDirection: "row", gap: 10 }}>
        <ContentLoader
          style={{
            justifyContent: "center",
            alignItems: "center",
            minWidth: 50,
            height: 50,
            borderRadius: 10,
          }}
        />

        <View style={{ flex: 1, gap: 5 }}>
          <ContentLoader style={{ width: 150, height: 15, borderRadius: 5 }} />
          <ContentLoader style={{ width: 100, height: 10, borderRadius: 5 }} />
        </View>
      </View>

      <View style={{ marginTop: 5 }}>
        <ContentLoader
          style={{ width: 150, height: 20, borderRadius: 5, marginBottom: 5 }}
        />

        {Array(3)
          .fill(null)
          .map((_, key) => {
            return (
              <View
                key={key}
                style={{ flexDirection: "row", gap: 5, marginBottom: 3 }}
              >
                <ContentLoader
                  style={{
                    width: 50,
                    height: 40,
                    borderRadius: 5,
                  }}
                />

                <View style={{ flex: 1, gap: 5 }}>
                  <ContentLoader
                    style={{ width: 150, height: 15, borderRadius: 5 }}
                  />
                  <ContentLoader
                    style={{ width: 100, height: 10, borderRadius: 5 }}
                  />
                </View>
                <ContentLoader
                  style={{
                    width: 50,
                    height: 40,
                    borderRadius: 5,
                  }}
                />
              </View>
            );
          })}
      </View>
      <View style={{ marginTop: 5, gap: 5 }}>
        <ContentLoader
          style={{ width: 150, height: 20, borderRadius: 5, marginBottom: 5 }}
        />
        <ContentLoader style={{ width: "100%", height: 15, borderRadius: 5 }} />
        <ContentLoader style={{ width: "50%", height: 15, borderRadius: 5 }} />
      </View>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <ContentLoader
          style={{
            width: 40,
            height: 40,
            alignSelf: "flex-end",
            borderRadius: 40,
          }}
        />
      </View>
    </View>
  );
};

export const ListCocktail = ({ cocktail }: { cocktail: TCocktail }) => {
  const router = useRouter();
  const colors =
    typeof cocktail.colors === "string"
      ? [cocktail.colors, cocktail.colors]
      : cocktail.colors.length === 1
      ? [cocktail.colors[0], cocktail.colors[0]]
      : cocktail.colors;

  const [liked, setLiked] = React.useState(false);
  const { add, favorites, remove } = useFavoritesStore();
  React.useEffect(() => {
    const foundInLikes = favorites.find((l) => l.name === cocktail.name);
    setLiked(!!foundInLikes);
  }, [favorites, cocktail]);
  const likeOrUnlike = () => {
    if (liked) {
      remove(cocktail);
    } else {
      add(cocktail);
    }
  };
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        gap: 10,
        backgroundColor: COLORS.main,
        padding: 10,
        borderRadius: 5,
      }}
      onPress={() => {
        router.push({
          pathname: "/(modals)/[cocktail]",
          params: {
            cocktail: cocktail.name,
          },
        });
      }}
    >
      <View style={{ flexDirection: "row", gap: 10, flex: 1 }}>
        <CocktailGlass
          colors={colors}
          d={
            // @ts-expect-error
            glasses[cocktail.glass_and_ingredients.glass.replace(/\s/m, "")]?.d
          }
        />
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
            {cocktail.category || "None"}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          alignSelf: "flex-end",
          width: 40,
          height: 40,
          backgroundColor: COLORS.primary,
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
    </TouchableOpacity>
  );
};
