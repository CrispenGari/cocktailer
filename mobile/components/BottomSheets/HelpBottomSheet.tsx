import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, FONTS } from "@/constants";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import Card from "../Card";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";

interface Props {}
const HelpBottomSheet = React.forwardRef<BottomSheetModal, Props>(({}, ref) => {
  const snapPoints = React.useMemo(() => ["70%"], []);

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
            fontSize: 20,
            textAlign: "center",
          }}
        >
          How does Cocktailer Works?
        </Text>
        <BottomSheetScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Animated.Image
              entering={ZoomIn}
              exiting={ZoomOut}
              style={{
                width: 80,
                height: 80,
                resizeMode: "contain",
                marginBottom: 10,
              }}
              source={require("@/assets/images/adaptive-icon.png")}
            />
          </View>
          <View>
            <Card style={styles.card}>
              <Text style={styles.sectionHeader}>1. Browse Cocktails</Text>
              <Text style={styles.bulletPoint}>
                Cocktailer allows you to explore a wide variety of cocktail
                recipes from around the world, featuring classic drinks and
                modern twists.
              </Text>
            </Card>
          </View>

          <View>
            <Card style={styles.card}>
              <Text style={styles.sectionHeader}>2. Like Your Favorites</Text>
              <Text style={styles.bulletPoint}>
                You can like the cocktails you enjoy the most. This helps the
                app understand your preferences better.
              </Text>
            </Card>
          </View>

          <View>
            <Card style={styles.card}>
              <Text style={styles.sectionHeader}>3. Get Recommendations</Text>
              <Text style={styles.bulletPoint}>
                Based on the cocktails you’ve liked, Cocktailer uses a machine
                learning algorithm to suggest related drinks that match your
                taste.
              </Text>
            </Card>
          </View>

          <View>
            <Card style={styles.card}>
              <Text style={styles.sectionHeader}>4. No Account Needed</Text>
              <Text style={styles.bulletPoint}>
                No need to sign up or log in. You can access the entire library
                of cocktails and get personalized recommendations without
                creating an account.
              </Text>
            </Card>
          </View>

          <View>
            <Card style={styles.card}>
              <Text style={styles.sectionHeader}>5. Age Restriction</Text>
              <Text style={styles.bulletPoint}>
                Cocktailer is designed for users aged 18 and above, ensuring
                content is appropriate for responsible consumption.
              </Text>
            </Card>
          </View>

          <View>
            <Card style={styles.card}>
              <Text style={styles.sectionHeader}>
                6. Explore More with Cocktailer
              </Text>
              <Text style={styles.bulletPoint}>
                The more you interact with the app, the better it becomes at
                understanding your preferences and delivering personalized
                cocktail suggestions tailored to your taste.
              </Text>
            </Card>
          </View>
        </BottomSheetScrollView>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default HelpBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    padding: 10,
    maxWidth: 500,
    alignSelf: "flex-start",
    borderRadius: 5,
    width: "100%",
    backgroundColor: COLORS.primary,
  },
  sectionHeader: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 14,
    marginBottom: 4,
    fontFamily: FONTS.regular,
  },
  bold: {
    fontFamily: FONTS.bold,
  },
});
