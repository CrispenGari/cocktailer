import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useFavoritesStore } from "@/store/favoritesStore";
import { COLORS, FONTS } from "@/constants";
import { FavoriteCocktail } from "@/components/Cocktail";
import { useSettingsStore } from "@/store/settingsStore";

const Page = () => {
  const { favorites } = useFavoritesStore();
  const { settings } = useSettingsStore();
  const [favs, setFavs] = React.useState(favorites);

  React.useEffect(() => {
    if (settings.order === "asc") {
      setFavs(favorites);
    } else {
      setFavs([...favorites].reverse());
    }
  }, [settings, favorites]);

  if (favorites.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          padding: 20,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontFamily: FONTS.regular,
            color: COLORS.tertiary,
          }}
        >
          You don't have any Cocktails that are marked favorites.
        </Text>
      </View>
    );
  }
  return (
    <ScrollView
      style={{
        flex: 1,
      }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 100,
        padding: 10,
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-evenly",
      }}
    >
      {favs.map((cocktail, index) => (
        <FavoriteCocktail key={index} index={index} cocktail={cocktail} />
      ))}
    </ScrollView>
  );
};

export default Page;
