import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { COLORS, FONTS } from "@/constants";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetView,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { TOrder, useSettingsStore } from "@/store/settingsStore";

interface Props {}
const FavoriteSortBottomSheet = React.forwardRef<BottomSheetModal, Props>(
  ({}, ref) => {
    const { dismiss } = useBottomSheetModal();
    const snapPoints = React.useMemo(() => ["20%"], []);
    const { settings, update } = useSettingsStore();
    const updateOrder = (order: TOrder) => {
      update({
        ...settings,
        order,
      });
      dismiss();
    };
    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        index={0}
        enablePanDownToClose={true}
        enableOverDrag={false}
        backgroundStyle={{
          backgroundColor: COLORS.primary,
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
          <Text
            style={{
              fontFamily: FONTS.bold,
              marginBottom: 10,
            }}
          >
            Sort Favorites
          </Text>
          {[
            {
              order: "asc",
              label: "Newly Favored First",
            },
            {
              order: "desc",
              label: "Newly Favored Last",
            },
          ].map((order) => (
            <TouchableOpacity
              key={order.order}
              onPress={() => updateOrder(order.order as TOrder)}
              style={{
                gap: 10,
                flexDirection: "row",
                paddingVertical: 5,
              }}
            >
              <View
                style={{
                  borderWidth: StyleSheet.hairlineWidth,
                  width: 20,
                  height: 20,
                  padding: 2,
                  borderColor: COLORS.tertiary,
                  borderRadius: 20,
                }}
              >
                {settings.order === order.order ? (
                  <View
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 20,
                      backgroundColor: COLORS.tertiary,
                    }}
                  />
                ) : null}
              </View>
              <Text
                style={{
                  fontFamily: FONTS.regular,
                }}
              >
                {order.label}
              </Text>
            </TouchableOpacity>
          ))}
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default FavoriteSortBottomSheet;
