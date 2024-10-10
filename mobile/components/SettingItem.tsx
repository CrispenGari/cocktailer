import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, FONTS } from "@/constants";

interface SettingItemProps {
  Icon: React.ReactNode;
  title: string;
  subtitle: string;
  onPress: () => void;
}
const SettingItem = ({ Icon, title, onPress, subtitle }: SettingItemProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        gap: 10,
        paddingHorizontal: 20,
        marginBottom: 2,
      }}
    >
      {Icon}
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: FONTS.bold, flexShrink: 18 }}>{title}</Text>
        <Text
          style={{
            fontFamily: FONTS.regular,
            fontSize: 12,
            color: COLORS.tertiary,
          }}
        >
          {subtitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SettingItem;
