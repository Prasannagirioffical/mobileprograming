import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomNavbar from "../components/BottomNavbar";
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from "../theme";
import { usePosts } from "../context/PostsContext";

const imageMap = {
  wallet: require("../assets/wallet.png"),
  bag: require("../assets/bag.png"),
  watch: require("../assets/watch.png"),
  logo: require("../assets/logo.png")
};

export default function MyPostsScreen({ navigation }) {
  const { posts, deletePost } = usePosts();
  const myPosts = posts.filter((item) => item.isMine);

  const handleDelete = (postId) => {
    Alert.alert("Delete Post", "Are you sure you want to delete this post?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const success = await deletePost(postId);
          if (!success) {
            Alert.alert("Error", "Could not delete post from Firebase.");
          }
        }
      }
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>My Posts</Text>
        <Text style={styles.subtitle}>Items you posted as lost or found.</Text>

        <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
          {myPosts.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>No posts yet</Text>
              <Text style={styles.emptyText}>Post a lost/found item from Home screen.</Text>
            </View>
          ) : (
            myPosts.map((item) => (
              <View key={item.id} style={styles.card}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("ItemDetail", item)}
                  activeOpacity={0.85}
                  style={styles.cardMain}
                >
                  <Image
                    source={
                      item.imageUri
                        ? { uri: item.imageUri }
                        : imageMap[item.imageKey] ?? imageMap.logo
                    }
                    style={styles.image}
                  />
                  <View style={styles.info}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                    <View
                      style={[
                        styles.typeTag,
                        item.postType === "lost" ? styles.lostTag : styles.foundTag
                      ]}
                    >
                      <Text style={styles.typeTagText}>
                        {item.postType === "lost" ? "Lost" : "Found"}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>

                <View style={styles.actionsRow}>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.editButton]}
                    onPress={() => navigation.navigate("AddItem", { editingPost: item })}
                  >
                    <Text style={styles.actionText}>Edit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={() => handleDelete(item.id)}
                  >
                    <Text style={styles.actionText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </ScrollView>

        <BottomNavbar navigation={navigation} activeTab="MyPosts" />
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
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm
  },
  title: {
    ...TYPOGRAPHY.sectionTitle,
    marginBottom: SPACING.sm
  },
  subtitle: {
    ...TYPOGRAPHY.caption,
    marginBottom: SPACING.md
  },
  list: {
    flex: 1
  },
  listContent: {
    paddingBottom: SPACING.md
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    marginBottom: SPACING.md
  },
  cardMain: {
    flexDirection: "row",
    alignItems: "center"
  },
  image: {
    width: 58,
    height: 58,
    borderRadius: RADIUS.sm,
    marginRight: SPACING.md
  },
  info: {
    flex: 1
  },
  cardTitle: {
    ...TYPOGRAPHY.body,
    fontWeight: "700",
    marginBottom: 2
  },
  cardSubtitle: {
    ...TYPOGRAPHY.caption,
    marginBottom: SPACING.sm
  },
  typeTag: {
    alignSelf: "flex-start",
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4
  },
  lostTag: {
    backgroundColor: "#FFE8D8"
  },
  foundTag: {
    backgroundColor: "#E7F0FF"
  },
  typeTagText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.textPrimary
  },
  actionsRow: {
    flexDirection: "row",
    marginTop: SPACING.md,
    gap: SPACING.sm
  },
  actionButton: {
    flex: 1,
    borderRadius: RADIUS.sm,
    paddingVertical: SPACING.sm,
    alignItems: "center"
  },
  editButton: {
    backgroundColor: COLORS.secondaryBlue
  },
  deleteButton: {
    backgroundColor: COLORS.error
  },
  actionText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700"
  },
  emptyCard: {
    marginTop: SPACING.md,
    backgroundColor: COLORS.cardBackground,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: RADIUS.md,
    padding: SPACING.lg
  },
  emptyTitle: {
    ...TYPOGRAPHY.sectionTitle,
    marginBottom: 6
  },
  emptyText: {
    ...TYPOGRAPHY.body
  }
});
