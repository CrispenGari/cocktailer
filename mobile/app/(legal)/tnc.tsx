import { Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { Stack } from "expo-router";

import { COLORS, FONTS } from "@/constants";
import Card from "@/components/Card";
import Animated, { SlideInLeft, SlideInRight } from "react-native-reanimated";

const Page = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Terms of Service",
          headerLargeTitle: false,
          headerLargeTitleShadowVisible: true,
          headerShadowVisible: false,
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        <Animated.View entering={SlideInLeft.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Text style={styles.sectionHeader}>1. Introduction</Text>
            <Text style={styles.bulletPoint}>
              Welcome to Cocktailer. By using our app, you agree to these terms
              of service. Please read them carefully.
            </Text>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInRight.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Text style={styles.sectionHeader}>2. Eligibility</Text>
            <Text style={styles.bulletPoint}>
              <Text style={styles.bold}>Age Requirement:</Text> You must be at
              least 18 years old to use this app. By using Cocktailer, you
              confirm that you meet this age requirement.
            </Text>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInLeft.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Text style={styles.sectionHeader}>3. Cocktail Suggestions</Text>
            <Text style={styles.bulletPoint}>
              <Text style={styles.bold}>Suggestions:</Text> Our app uses machine
              learning algorithms to recommend cocktails based on your
              preferences and top-liked cocktails.
            </Text>
            <Text style={styles.bulletPoint}>
              <Text style={styles.bold}>Accuracy:</Text> We strive to provide
              accurate suggestions but cannot guarantee the appropriateness of
              all cocktail recommendations.
            </Text>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInRight.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Text style={styles.sectionHeader}>4. Privacy</Text>
            <Text style={styles.bulletPoint}>
              <Text style={styles.bold}>Personal Information:</Text> We do not
              require user accounts, but we collect and protect any interaction
              data as per our Privacy Policy.
            </Text>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInLeft.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Text style={styles.sectionHeader}>5. Changes to Terms</Text>
            <Text style={styles.bulletPoint}>
              <Text style={styles.bold}>Modifications:</Text> We may modify
              these terms at any time. Significant changes will be communicated
              through the app.
            </Text>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInRight.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Text style={styles.sectionHeader}>6. Contact Us</Text>
            <Text style={styles.bulletPoint}>
              <Text style={styles.bold}>Support:</Text> If you have any
              questions or concerns, please contact us at crispengari@gmail.com
            </Text>
          </Card>
        </Animated.View>
      </ScrollView>
    </>
  );
};

export default Page;

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
    paddingVertical: 20,
    marginBottom: 10,
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
    color: COLORS.tertiary,
  },
});
