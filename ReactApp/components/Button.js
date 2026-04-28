import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function Button({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#1e3a8a",
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
    alignItems: "center"
  },
  text: {
    color: "#fff",
    fontWeight: "bold"
  }
});