import { COLORS, FONTS, glasses } from "@/constants";
import { TCocktail } from "@/types";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import CocktailGlass from "./CocktailGlass";
import { useSearchHistoryStore } from "@/store/searchHistoryStore";
import { useRouter } from "expo-router";

interface ItemProps {
  cocktail: TCocktail;
}
export const HistoryItem = ({ cocktail }: ItemProps) => {
  const router = useRouter();
  const { add, remove } = useSearchHistoryStore();
  const colors =
    typeof cocktail.colors === "string"
      ? [cocktail.colors, cocktail.colors]
      : cocktail.colors.length === 1
      ? [cocktail.colors[0], cocktail.colors[0]]
      : cocktail.colors;

  const openAndAddToHistory = () => {
    add(cocktail);
    router.push({
      pathname: "/(modals)/[cocktail]",
      params: { cocktail: cocktail.name },
    });
  };
  const removeFromHistory = () => {
    remove(cocktail);
  };
  return (
    <Swipeable
      overshootLeft={false}
      friction={3}
      overshootFriction={8}
      enableTrackpadTwoFingerGesture
      renderRightActions={(_progress, _dragX) => {
        return (
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              minWidth: 80,
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5,
              backgroundColor: COLORS.tertiary,
            }}
            onPress={removeFromHistory}
          >
            <Text style={{ fontFamily: FONTS.bold, color: COLORS.white }}>
              Remove
            </Text>
          </TouchableOpacity>
        );
      }}
      containerStyle={{
        maxWidth: 500,
        width: "100%",
        alignSelf: "center",
      }}
    >
      <TouchableOpacity
        style={{
          maxWidth: 500,
          width: "100%",
          flexDirection: "row",
          gap: 10,
          padding: 10,
          alignSelf: "center",
          alignItems: "center",
          paddingVertical: 5,
          borderRadius: 5,
        }}
        onPress={openAndAddToHistory}
      >
        <MaterialIcons name="history" size={24} color={COLORS.tertiary} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: FONTS.bold }}>{cocktail.name}</Text>
          <Text
            style={{ fontFamily: FONTS.regular, fontSize: 12, lineHeight: 15 }}
            numberOfLines={1}
          >
            {cocktail.name}
          </Text>
        </View>
        <CocktailGlass
          colors={colors}
          containerStyle={{
            width: 30,
            height: 30,
          }}
          glassDim={{ height: 20, width: 20 }}
          d={
            // @ts-expect-error
            glasses[cocktail.glass_and_ingredients.glass.replace(/\s/m, "")]?.d
          }
        />
      </TouchableOpacity>
    </Swipeable>
  );
};

export const ResultItem = ({ cocktail }: ItemProps) => {
  const { add } = useSearchHistoryStore();
  const router = useRouter();
  const colors =
    typeof cocktail.colors === "string"
      ? [cocktail.colors, cocktail.colors]
      : cocktail.colors.length === 1
      ? [cocktail.colors[0], cocktail.colors[0]]
      : cocktail.colors;

  const openAndAddToHistory = () => {
    add(cocktail);
    router.push({
      pathname: "/(modals)/[cocktail]",
      params: { cocktail: cocktail.name },
    });
  };

  return (
    <TouchableOpacity
      style={{
        maxWidth: 500,
        width: "100%",
        flexDirection: "row",
        gap: 10,
        padding: 10,
        alignSelf: "center",
        alignItems: "center",
        paddingVertical: 5,
        borderRadius: 5,
      }}
      onPress={openAndAddToHistory}
    >
      <CocktailGlass
        colors={colors}
        d={
          // @ts-expect-error
          glasses[cocktail.glass_and_ingredients.glass.replace(/\s/m, "")]?.d
        }
        containerStyle={{
          width: 30,
          height: 30,
        }}
        glassDim={{ height: 20, width: 20 }}
      />
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: FONTS.bold }}>{cocktail.name}</Text>
        <Text
          style={{ fontFamily: FONTS.regular, fontSize: 12, lineHeight: 15 }}
          numberOfLines={1}
        >
          {cocktail.category}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
