import React from "react";
import { TextInput, StyleSheet } from "react-native";

export default function Input({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  multiline = false
}) {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      multiline={multiline}
      style={[styles.input, multiline && styles.textArea]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ddd"
  },
  textArea: {
    height: 100,
    textAlignVertical: "top"
  }
});