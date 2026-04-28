import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomNavbar from "./BottomNavbar";
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from "../theme";

export default function ProfileScreen({ navigation }) {
  const menuItems = [
    { id: "posts", icon: "▤", label: "My Posts", badge: "4", badgeStyle: "gray", route: "MyPosts" },
    { id: "notifications", icon: "↻", label: "Notifications", badge: "3", badgeStyle: "orange", route: "Notifications" },
    { id: "edit", icon: "✎", label: "Edit Profile", route: "EditProfile" },
    { id: "settings", icon: "⚙", label: "Settings", route: "Settings" }
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>👤</Text>
        </View>

        <View style={styles.menuSection}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuCard}
              activeOpacity={0.8}
              onPress={() => navigation.navigate(item.route)}
            >
              <View style={styles.iconBox}>
                <Text style={styles.iconText}>{item.icon}</Text>
              </View>

              <Text style={styles.menuLabel}>{item.label}</Text>

              {item.badge ? (
                <View
                  style={[
                    styles.badge,
                    item.badgeStyle === "orange" ? styles.orangeBadge : styles.grayBadge
                  ]}
                >
                  <Text
                    style={[
                      styles.badgeText,
                      item.badgeStyle === "orange" && styles.orangeBadgeText
                    ]}
                  >
                    {item.badge}
                  </Text>
                </View>
              ) : (
                <View style={styles.badgePlaceholder} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.bottomNavWrap}>
          <BottomNavbar navigation={navigation} activeTab="Profile" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 48,
    paddingHorizontal: SPACING.lg
  },

  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40
  },
  avatarText: {
    fontSize: 34
  },

  menuSection: {
    paddingHorizontal: 4
  },
  menuCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.cardBackground,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 14,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.primaryOrange,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12
  },
  iconText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700"
  },
  menuLabel: {
    flex: 1,
    ...TYPOGRAPHY.sectionTitle,
    fontWeight: "600"
  },
  badge: {
    minWidth: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8
  },
  grayBadge: {
    backgroundColor: "#E9EDF2"
  },
  orangeBadge: {
    backgroundColor: COLORS.primaryOrange
  },
  badgeText: {
    fontSize: 17 / 2,
    fontWeight: "700",
    color: COLORS.textSecondary
  },
  orangeBadgeText: {
    color: "#fff"
  },
  badgePlaceholder: {
    width: 28,
    height: 28
  },
  bottomNavWrap: {
    marginTop: "auto"
  }
});