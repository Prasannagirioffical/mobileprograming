import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from "../theme";

export default function SettingsScreen({ navigation }) {
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }]
          });
        }
      }
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Manage your preferences and account actions.</Text>

        <View style={styles.card}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.85}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
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
    padding: SPACING.lg
  },
  title: {
    ...TYPOGRAPHY.header,
    marginBottom: SPACING.sm
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    marginBottom: SPACING.lg
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md
  },
  logoutButton: {
    backgroundColor: COLORS.error,
    borderRadius: RADIUS.sm,
    paddingVertical: 12,
    alignItems: "center"
  },
  logoutText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14
  }
});
