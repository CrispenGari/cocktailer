import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { cocktails, COLORS, FONTS } from "@/constants";
import { useSearchTermsStore } from "@/store/searchTerms";
import { useSearchHistoryStore } from "@/store/searchHistoryStore";
import { HistoryItem, ResultItem } from "@/components/SearchItem";
import { onImpact } from "@/utils";
import { useSettingsStore } from "@/store/settingsStore";

const Page = () => {
  const { query } = useSearchTermsStore();
  const [limits, setLimits] = React.useState({
    history: 11,
    results: 11,
  });
  const { searches } = useSearchHistoryStore();
  const { settings } = useSettingsStore();
  const results = cocktails.filter((c) =>
    c.name.toLowerCase().includes(query.search.trim().toLowerCase())
  );

  return (
    <>
      <ScrollView
        style={{ flex: 1, backgroundColor: COLORS.primary, padding: 10 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {!!query.search ? (
          results.length === 0 ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
              }}
            >
              <Text style={{ fontFamily: FONTS.regular, textAlign: "center" }}>
                No matches for the query "{query.search}".
              </Text>
            </View>
          ) : (
            results
              .slice(0, limits.results)
              .map((cocktail, index) => (
                <ResultItem key={index} cocktail={cocktail as any} />
              ))
          )
        ) : searches.length === 0 ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
            }}
          >
            <Text style={{ fontFamily: FONTS.regular, textAlign: "center" }}>
              Search Cocktails
            </Text>
          </View>
        ) : (
          searches
            .slice(0, limits.results)
            .map((cocktail, index) => (
              <HistoryItem key={index} cocktail={cocktail as any} />
            ))
        )}

        {query.search ? (
          results.length > limits.results ? (
            <TouchableOpacity
              onPress={async () => {
                if (settings.haptics) {
                  await onImpact();
                }
                setLimits((s) => ({
                  ...s,
                  results: s.results + 10,
                }));
              }}
              style={{ marginVertical: 10, alignSelf: "center" }}
            >
              <Text
                style={{
                  fontFamily: FONTS.bold,
                  textDecorationLine: "underline",
                }}
              >
                Load More Results
              </Text>
            </TouchableOpacity>
          ) : (
            <Text
              style={{
                fontFamily: FONTS.bold,
                textDecorationLine: "underline",
              }}
            ></Text>
          )
        ) : searches.length > limits.history ? (
          <TouchableOpacity
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              setLimits((s) => ({
                ...s,
                history: s.history + 10,
              }));
            }}
            style={{ marginVertical: 10, alignSelf: "center" }}
          >
            <Text
              style={{
                fontFamily: FONTS.bold,
                textDecorationLine: "underline",
              }}
            >
              Load More Histories
            </Text>
          </TouchableOpacity>
        ) : (
          <Text
            style={{ fontFamily: FONTS.bold, textDecorationLine: "underline" }}
          ></Text>
        )}
      </ScrollView>
    </>
  );
};

export default Page;
