import c from "@/assets/data/cocktails.json";
import g from "@/assets/data/glasses.json";

export const cocktails = c;
export const glasses = g;

export const COLORS = {
  main: "#EDDFE0",
  primary: "#F5F5F7",
  secondary: "#B7B7B7",
  tertiary: "#705C53",
  white: "#ffffff",
  black: "#000000",
  transparent: "transparent",
};

export const Fonts = {
  MuseoModernoBold: require("@/assets/fonts/MuseoModerno-Bold.ttf"),
  MuseoModernoRegular: require("@/assets/fonts/MuseoModerno-Regular.ttf"),
};

export const FONTS = {
  regular: "MuseoModernoRegular",
  bold: "MuseoModernoBold",
};

export const SERVER_URL = "https://cocktailer.onrender.com/graphql";

export const STORAGE_NAMES = {
  SETTINGS: "settings:",
  FAVORITES: "favorites:",
  NEW_TO_APP: "new:",
  SEARCH_HISTORY: "search_history:",
  SEARCH_TERMS: "search_terms:",
};

export const remarks = [
  {
    text: "Welcome to our cocktail suggestion app, where every sip tells a story!",
    image: require("@/assets/images/bg/0.png"),
  },
  {
    text: "You must be 18+ (or the legal drinking age in your country) to use this app. Please enjoy responsibly.",
    image: require("@/assets/images/bg/1.png"),
  },
  {
    text: "Discover a world of cocktails! Our app suggests personalized drink recipes based on your taste preferences and available ingredients.",
    image: require("@/assets/images/bg/2.png"),
  },
  {
    text: "Love a specific cocktail? Our AI tool will recommend the best alternative cocktails based on your favorites!",
    image: require("@/assets/images/bg/3.png"),
  },
];
