import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  useWindowDimensions
} from "react-native";
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

export default function HomeScreen({ navigation }) {
  const { posts } = usePosts();
  const { width } = useWindowDimensions();
  const cardImageSize = Math.max(56, Math.min(74, width * 0.16));

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

      {/* Search Bar */}
      <TextInput
        placeholder="Search Items..."
        style={styles.search}
      />

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.lostBtn}
          onPress={() => navigation.navigate("AddItem", { postType: "lost" })}
        >
          <Text style={styles.btnText}>Post Lost Item</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.foundBtn}
          onPress={() => navigation.navigate("AddItem", { postType: "found" })}
        >
          <Text style={styles.btnText}>Post Found Item</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Listings */}
      <Text style={styles.heading}>Recent Listings</Text>

      <ScrollView style={styles.list}>
        {posts.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => navigation.navigate("ItemDetail", item)}
            activeOpacity={0.85}
          >
            <Image
              source={
                item.imageUri
                  ? { uri: item.imageUri }
                  : imageMap[item.imageKey] ?? imageMap.logo
              }
              style={[styles.image, { width: cardImageSize, height: cardImageSize }]}
            />
            <View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
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
        ))}

      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavbar navigation={navigation} activeTab="Home" />

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
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
    backgroundColor: COLORS.background
  },
  list: {
    width: "100%"
  },

  search: {
    backgroundColor: COLORS.cardBackground,
    padding: 10,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.lg
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SPACING.lg
  },

  lostBtn: {
    backgroundColor: COLORS.primaryOrange,
    padding: 10,
    borderRadius: RADIUS.sm,
    width: "48%",
    alignItems: "center"
  },

  foundBtn: {
    backgroundColor: COLORS.secondaryBlue,
    padding: 10,
    borderRadius: RADIUS.sm,
    width: "48%",
    alignItems: "center"
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold"
  },

  heading: {
    ...TYPOGRAPHY.sectionTitle,
    marginBottom: SPACING.sm
  },

  card: {
    flexDirection: "row",
    backgroundColor: COLORS.cardBackground,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center"
  },

  image: {
    borderRadius: 8,
    marginRight: 10
  },

  title: {
    fontWeight: "bold",
    fontSize: 14,
    color: COLORS.textPrimary
  },

  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 12
  },
  typeTag: {
    alignSelf: "flex-start",
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    marginTop: 6
  },
  lostTag: {
    backgroundColor: "#FFE8D8"
  },
  foundTag: {
    backgroundColor: "#E7F0FF"
  },
  typeTagText: {
    fontSize: 11,
    color: COLORS.textPrimary,
    fontWeight: "600"
  }
});