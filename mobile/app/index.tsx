import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SvgComponent } from "@/components/SvgComponent";
import glasses from "@/assets/data/glasses.json";
import { FONTS } from "@/constants";
import { useQuery } from "urql";
import { RecommendationQuery } from "@/tada";

const Page = () => {
  const [{ fetching, data }, refetchQuery] = useQuery({
    query: RecommendationQuery,
    variables: { input: { name: "Mimosa" } },
  });
  data?.recommendation;
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontFamily: FONTS.bold }}>Page</Text>

      <View
        style={{
          width: 50,
          justifyContent: "center",
          alignContent: "center",
          height: 50,
          borderRadius: 50,
          backgroundColor: "lightpink",
        }}
      >
        <SvgComponent
          width={25}
          height={50}
          fill={"red"}
          d={glasses.Hurricane.d}
          stroke={"white"}
          strokeWidth={StyleSheet.hairlineWidth}
        />
      </View>
    </View>
  );
};

export default Page;
