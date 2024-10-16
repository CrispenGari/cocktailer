import { ScrollView } from "react-native";
import React from "react";
import { COLORS } from "@/constants";
import TopChoice from "@/components/TopChoice";
import Suggestions from "@/components/Suggestions";
import Browse from "@/components/Browse";
const Page = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: COLORS.primary }}
      contentContainerStyle={{
        paddingBottom: 100,
      }}
    >
      <TopChoice />
      <Suggestions />
      <Browse />
    </ScrollView>
  );
};

export default Page;
