import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomNavbar from "../components/BottomNavbar";
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from "../theme";
import { usePosts } from "../context/PostsContext";
import * as ImagePicker from "expo-image-picker";

export default function AddItemScreen({ navigation, route }) {
  const { addPost, updatePost } = usePosts();
  const editingPost = route?.params?.editingPost ?? null;
  const isEditMode = Boolean(editingPost);
  const postType = isEditMode
    ? editingPost.postType
    : route?.params?.postType === "lost"
      ? "lost"
      : "found";
  const postTypeLabel = postType === "lost" ? "Lost Item" : "Found Item";
  const [name, setName] = useState(editingPost?.title ?? "");
  const [description, setDescription] = useState(editingPost?.description ?? "");
  const [category, setCategory] = useState(editingPost?.category ?? "");
  const [location, setLocation] = useState(editingPost?.location ?? "");
  const [phoneNumber, setPhoneNumber] = useState(editingPost?.phoneNumber ?? "");
  const [date, setDate] = useState(editingPost?.date ?? "");
  const [imageUri, setImageUri] = useState(editingPost?.imageUri ?? null);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission required", "Please allow gallery access to upload image.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
      aspect: [4, 3]
    });

    if (!result.canceled && result.assets?.length) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!name.trim() || !location.trim()) {
      alert("Please enter at least item name and location.");
      return;
    }

    const today = new Date();
    const fallbackDate = today.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
    const safeLocation = location.trim();
    const safeDate = date.trim() || fallbackDate;

    const payload = {
      title: name.trim(),
      location: safeLocation,
      date: safeDate,
      subtitle: `${safeLocation}, ${safeDate}`,
      description: description.trim() || "No description provided.",
      category: category.trim(),
      phoneNumber: phoneNumber.trim(),
      postType,
      isMine: true,
      imageKey: editingPost?.imageKey ?? null,
      imageUri
    };

    const success = isEditMode
      ? await updatePost(editingPost.id, payload)
      : await addPost(payload);

    if (!success) {
      alert("Could not save to Firebase. Please try again.");
      return;
    }

    alert(isEditMode ? "Post updated!" : `${postTypeLabel} Submitted!`);
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>

        <View>
          <Text style={styles.logoMain}>हरायो-पायो</Text>
          <Text style={styles.logoSub}>Harayo-Payo</Text>
        </View>

        <Text style={styles.menu}>≡</Text>
      </View>

      <ScrollView contentContainerStyle={styles.formContent}>
        <Text style={styles.formTitle}>{isEditMode ? "Edit Post" : `Post ${postTypeLabel}`}</Text>

        {/* Item Name */}
        <TextInput
          placeholder={`${postTypeLabel} Name`}
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        {/* Description */}
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          style={[styles.input, styles.textArea]}
          multiline
        />

        {/* Category */}
        <TextInput
          placeholder="Category"
          value={category}
          onChangeText={setCategory}
          style={styles.input}
        />

        {/* Location */}
        <TextInput
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
          style={styles.input}
        />

        {/* Contact Number */}
        <TextInput
          placeholder="Contact Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          style={styles.input}
        />

        {/* Date */}
        <TextInput
          placeholder="03/15/2026"
          value={date}
          onChangeText={setDate}
          style={styles.input}
        />

        {/* Upload Button */}
        <TouchableOpacity style={styles.uploadBtn} onPress={pickImage}>
          <Text style={styles.uploadText}>📷 Upload Photo</Text>
        </TouchableOpacity>

        <Image
          source={imageUri ? { uri: imageUri } : require("../assets/logo.png")}
          style={styles.previewImage}
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitText}>{isEditMode ? "Update" : "Submit"}</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* Bottom Navbar */}
      <BottomNavbar navigation={navigation} activeTab="Home" />
      </KeyboardAvoidingView>
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
    backgroundColor: COLORS.background
  },
  formContent: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xl
  },
  formTitle: {
    ...TYPOGRAPHY.sectionTitle,
    color: COLORS.secondaryBlue,
    marginBottom: SPACING.md
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: SPACING.lg,
    backgroundColor: COLORS.cardBackground
  },

  back: {
    fontSize: 20
  },

  menu: {
    fontSize: 20
  },

  logoMain: {
    color: COLORS.primaryOrange,
    fontWeight: "bold",
    textAlign: "center"
  },

  logoSub: {
    fontSize: 10,
    textAlign: "center",
    color: COLORS.textSecondary
  },

  input: {
    backgroundColor: COLORS.cardBackground,
    padding: 12,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.md
  },

  textArea: {
    height: 100,
    textAlignVertical: "top"
  },

  uploadBtn: {
    borderWidth: 1,
    borderColor: COLORS.secondaryBlue,
    padding: 12,
    borderRadius: RADIUS.sm,
    alignItems: "center",
    marginTop: 10
  },

  uploadText: {
    fontWeight: "600",
    color: COLORS.secondaryBlue
  },
  previewImage: {
    marginTop: SPACING.md,
    width: "100%",
    height: 180,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.cardBackground
  },

  submitBtn: {
    backgroundColor: COLORS.primaryOrange,
    padding: 12,
    borderRadius: RADIUS.sm,
    alignItems: "center",
    marginTop: 15
  },

  submitText: {
    color: "#fff",
    fontWeight: "bold"
  }
});