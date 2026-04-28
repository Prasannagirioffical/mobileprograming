import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, RADIUS, SPACING } from "../theme";

const tabs = [
  { key: "Home", label: "Home", icon: "⌂" },
  { key: "MyPosts", label: "My Posts", icon: "▤" },
  { key: "Profile", label: "Profile", icon: "◉" }
];

export default function BottomNavbar({ navigation, activeTab }) {
  return (
    <View style={styles.navbar}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;

        return (
          <TouchableOpacity
            key={tab.key}
            style={[styles.navItem, isActive && styles.activeNavItem]}
            activeOpacity={0.8}
            onPress={() => !isActive && navigation.navigate(tab.key)}
          >
            <Text style={[styles.navIcon, isActive && styles.activeNavIcon]}>{tab.icon}</Text>
            <Text style={[styles.navLabel, isActive && styles.activeNavLabel]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.sm,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.cardBackground
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.md
  },
  activeNavItem: {
    backgroundColor: "#FFF1E8"
  },
  navIcon: {
    color: COLORS.textSecondary,
    fontSize: 20,
    marginBottom: 4
  },
  activeNavIcon: {
    color: COLORS.primaryOrange
  },
  navLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: "600"
  },
  activeNavLabel: {
    color: COLORS.primaryOrange,
    fontWeight: "700"
  }
});
