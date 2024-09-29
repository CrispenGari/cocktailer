import { View, Text } from "react-native";
import React from "react";
import { FONTS } from "@/constants";

const Browse = () => {
  return (
    <View style={{ padding: 10 }}>
      <Text
        style={{
          fontFamily: FONTS.bold,
          fontSize: 20,
        }}
      >
        Explore More
      </Text>
    </View>
  );
};

export default Browse;
