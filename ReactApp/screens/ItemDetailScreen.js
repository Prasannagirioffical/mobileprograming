import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  Linking,
  Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomNavbar from "../components/BottomNavbar";
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from "../theme";

const imageMap = {
  wallet: require("../assets/wallet.png"),
  bag: require("../assets/bag.png"),
  watch: require("../assets/watch.png"),
  logo: require("../assets/logo.png")
};

export default function ItemDetailsScreen({ navigation, route }) {
  const { width } = useWindowDimensions();
  const item = route?.params ?? {};
  const title = item.title ?? "Watch";
  const location = item.location ?? "Kathmandu";
  const date = item.date ?? "March 7, 2026";
  const description =
    item.description ??
    "I found this watch today and tried to hand it into the library. But they cannot take it unless it was found in the library.";
  const imageSource = item.imageUri ? { uri: item.imageUri } : imageMap[item.imageKey] ?? imageMap.logo;
  const imageSize = Math.max(120, Math.min(170, width * 0.4));
  const titleSize = Math.max(24, Math.min(34, width * 0.08));
  const locationSize = Math.max(16, Math.min(24, width * 0.055));
  const descriptionSize = Math.max(15, Math.min(20, width * 0.047));

  const handleWhatsAppMessage = async () => {
    const phoneNumber = String(item.phoneNumber ?? "").replace(/[^\d]/g, "");
    if (!phoneNumber) {
      Alert.alert("Missing Number", "Phone number is not available for this post.");
      return;
    }

    const text = encodeURIComponent(`Hi, I am contacting you about "${title}".`);
    const url = `https://wa.me/${phoneNumber}?text=${text}`;

    try {
      const supported = await Linking.canOpenURL(url);
      if (!supported) {
        Alert.alert("Unavailable", "WhatsApp could not be opened on this device.");
        return;
      }
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert("Error", "Could not open WhatsApp.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

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

      <ScrollView contentContainerStyle={styles.content}>

        {/* Image */}
        <Image
          source={imageSource}
          style={[styles.image, { width: imageSize, height: imageSize }]}
        />

        {/* Title */}
        <Text style={[styles.title, { fontSize: titleSize }]}>{title}</Text>
        <Text style={[styles.location, { fontSize: locationSize }]}>{location}</Text>

        <View style={styles.divider} />

        {/* Description Header */}
        <View style={styles.descHeader}>
          <Text style={styles.descTitle}>Description:</Text>
          <Text style={styles.date}>{date}</Text>
        </View>

        {/* Description */}
        <Text style={[styles.description, { fontSize: descriptionSize }]}>{description}</Text>

        <TouchableOpacity style={styles.whatsappBtn} onPress={handleWhatsAppMessage}>
          <Text style={styles.btnText}>WhatsApp Message</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* Bottom Navbar */}
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
    backgroundColor: COLORS.background
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: SPACING.md,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: COLORS.cardBackground,
    borderColor: COLORS.border,
    borderWidth: 1
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

  content: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl
  },

  image: {
    alignSelf: "center",
    borderRadius: RADIUS.sm,
    marginTop: 18
  },

  title: {
    ...TYPOGRAPHY.header,
    fontWeight: "700",
    marginTop: 18,
    marginLeft: 20,
    color: COLORS.textPrimary
  },

  location: {
    marginLeft: 20,
    color: COLORS.secondaryBlue,
    marginBottom: 14
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: 16
  },

  descHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 10
  },

  descTitle: {
    ...TYPOGRAPHY.sectionTitle
  },

  date: {
    ...TYPOGRAPHY.caption
  },

  description: {
    marginHorizontal: 20,
    marginTop: 5,
    ...TYPOGRAPHY.body
  },

  whatsappBtn: {
    backgroundColor: COLORS.primaryOrange,
    padding: 12,
    borderRadius: RADIUS.sm,
    marginTop: 24,
    alignItems: "center"
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold"
  }
});