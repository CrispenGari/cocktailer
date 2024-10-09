import { Text, View, TouchableOpacity, SafeAreaView } from "react-native";
import React from "react";
import { COLORS, FONTS, glasses } from "@/constants";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetFlatList,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { TCocktail } from "@/types";

import { Ionicons } from "@expo/vector-icons";
import { useFavoritesStore } from "@/store/favoritesStore";
import Animated, { SlideInDown } from "react-native-reanimated";
import CocktailGlass from "../CocktailGlass";
import { useRouter } from "expo-router";

interface Props {
  cocktail: TCocktail;
  secondary: boolean;
}
const IngredientsBottomSheet = React.forwardRef<BottomSheetModal, Props>(
  ({ cocktail, secondary }, ref) => {
    const { dismiss } = useBottomSheetModal();
    const colors =
      typeof cocktail.colors === "string"
        ? [cocktail.colors, cocktail.colors]
        : cocktail.colors.length === 1
        ? [cocktail.colors[0], cocktail.colors[0]]
        : cocktail.colors;

    const snapPoints = React.useMemo(() => ["60%"], []);
    const router = useRouter();

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
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        index={0}
        enablePanDownToClose={true}
        enableOverDrag={false}
        backgroundStyle={{
          backgroundColor: secondary ? COLORS.secondary : COLORS.main,
        }}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
          />
        )}
      >
        <BottomSheetView style={{ flex: 1, padding: 10 }}>
          <TouchableOpacity
            onPress={() => {
              dismiss();
              router.push({
                pathname: "/(modals)/[cocktail]",
                params: {
                  cocktail: cocktail.name,
                },
              });
            }}
            style={{ flexDirection: "row", gap: 10 }}
          >
            <CocktailGlass
              colors={colors}
              d={
                // @ts-expect-error
                glasses[cocktail.glass_and_ingredients.glass.replace(/\s/m, "")]
                  ?.d
              }
            />

            <BottomSheetView style={{ flex: 1 }}>
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
            </BottomSheetView>
          </TouchableOpacity>
          <BottomSheetView style={{ paddingTop: 10 }}>
            <Text
              style={{
                fontFamily: FONTS.bold,
                fontSize: 18,
                textDecorationLine: "underline",
              }}
            >
              Ingredients
            </Text>
            <BottomSheetFlatList
              data={cocktail.glass_and_ingredients.ingredients}
              keyExtractor={(_, i) => i.toString()}
              renderItem={({ item: ingredient }) => {
                const volume = (ingredient.amount || 0) * 10;
                return (
                  <BottomSheetView style={{ flexDirection: "row", gap: 5 }}>
                    <View
                      style={{
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
                    <BottomSheetView style={{ flex: 1 }}>
                      <Text
                        style={{ fontFamily: FONTS.bold }}
                        numberOfLines={1}
                      >
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
                    </BottomSheetView>
                    <View
                      style={{
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
                  </BottomSheetView>
                );
              }}
            />
            <BottomSheetView style={{ marginTop: 5 }}>
              <Text
                style={{
                  fontFamily: FONTS.bold,
                  fontSize: 18,
                  textDecorationLine: "underline",
                }}
              >
                Garnish
              </Text>
              <Text
                style={{ fontFamily: FONTS.regular, color: COLORS.tertiary }}
              >
                {cocktail.garnish || "None"}
              </Text>
            </BottomSheetView>
          </BottomSheetView>

          <Animated.View
            style={{
              justifyContent: "flex-end",
              position: "absolute",
              top: 0,
              right: 10,
            }}
            entering={SlideInDown.delay(200).duration(200)}
          >
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
          </Animated.View>
        </BottomSheetView>
        <SafeAreaView>
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
      </BottomSheetModal>
    );
  }
);

export default IngredientsBottomSheet;
