import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from "react-native";

export default function ItemCard({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
      />

      <View style={styles.info}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.location}>{item.location}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8
  },
  info: {
    marginLeft: 10,
    justifyContent: "center"
  },
  title: {
    fontWeight: "bold",
    fontSize: 16
  },
  location: {
    color: "gray"
  },
  date: {
    fontSize: 12,
    color: "#888"
  }
});