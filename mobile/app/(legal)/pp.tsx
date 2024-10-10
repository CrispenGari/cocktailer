import { Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { COLORS, FONTS } from "@/constants";
import Card from "@/components/Card";
import Animated, { SlideInLeft, SlideInRight } from "react-native-reanimated";

const PrivacyPolicy = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Privacy Policy",
          headerLargeTitle: false,
          headerLargeTitleShadowVisible: true,
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
              Welcome to Cocktailer. We are committed to protecting your
              privacy. This Privacy Policy outlines how we collect, use, and
              safeguard your information.
            </Text>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInRight.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Text style={styles.sectionHeader}>2. Information We Collect</Text>
            <Text style={styles.bulletPoint}>
              <Text style={styles.bold}>Non-Personal Information:</Text> We may
              collect non-personal data, such as app usage statistics, to
              improve user experience. No personal identification information is
              required to use the app.
            </Text>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInLeft.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Text style={styles.sectionHeader}>3. How We Use Information</Text>
            <Text style={styles.bulletPoint}>
              <Text style={styles.bold}>App Functionality:</Text> We use
              non-personal information to analyze how users interact with the
              app to improve suggestions and overall experience.
            </Text>
            <Text style={styles.bulletPoint}>
              <Text style={styles.bold}>No Third-Party Sharing:</Text> Your data
              will not be shared with any third-party services or advertisers.
            </Text>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInRight.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Text style={styles.sectionHeader}>4. Data Security</Text>
            <Text style={styles.bulletPoint}>
              <Text style={styles.bold}>Security Measures:</Text> We implement
              security measures to protect your data from unauthorized access or
              misuse.
            </Text>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInLeft.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Text style={styles.sectionHeader}>
              5. Changes to Privacy Policy
            </Text>
            <Text style={styles.bulletPoint}>
              <Text style={styles.bold}>Policy Updates:</Text> We may update
              this policy occasionally. Any significant changes will be
              communicated through the app.
            </Text>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInRight.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Text style={styles.sectionHeader}>6. Contact Us</Text>
            <Text style={styles.bulletPoint}>
              <Text style={styles.bold}>Questions:</Text> If you have any
              questions or concerns about our privacy practices, please contact
              us at crispengari@gmail.com.
            </Text>
          </Card>
        </Animated.View>
      </ScrollView>
    </>
  );
};

export default PrivacyPolicy;

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
