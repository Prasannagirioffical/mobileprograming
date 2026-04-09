import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";


const listings = [
  {
    id: "1",
    title: "Black Wallet",
    location: "Kathmandu, Mar 4",
    image: require("./assets/a.png"),
  },
  {
    id: "2",
    title: "School Bag",
    location: "Kathmandu, Mar 7",
    image: require("./assets/b.png"),
  },
  {
    id: "3",
    title: "Watch",
    location: "Kathmandu, Mar 7",
    image: require("./assets/c.png"),
  },
];

export default function App() {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />

      <View style={styles.textBox}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.location}</Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>

      {/* Main Content */}
      <SafeAreaView style={styles.container}>

        {/* 🔍 Search */}
        <TextInput
          placeholder="🔍 Search Items......"
          style={styles.searchBar}
        />


        <View style={styles.buttonContainer}>

          <TouchableOpacity style={styles.lostBtn}>
            <Text style={styles.btnText}>
              Post{"\n"}Lost Item
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.foundBtn}>
            <Text style={styles.btnText}>
              Post{"\n"}Found Item
            </Text>
          </TouchableOpacity>

        </View>


        <Text style={styles.heading}>
          Recent Listings
        </Text>


        <FlatList
          data={listings}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 100,
          }}
        />

      </SafeAreaView>


      <View style={styles.navbar}>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.activeIcon}>🏠</Text>
          <Text style={styles.activeText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.icon}>📍</Text>
          <Text style={styles.text}>Map</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.icon}>📄</Text>
          <Text style={styles.text}>My Posts</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.icon}>👤</Text>
          <Text style={styles.text}>Profile</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

// styles
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f4f6fa",
    paddingHorizontal: 15,
  },


  searchBar: {
    marginTop: 120,
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
    marginBottom: 18,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  lostBtn: {
    backgroundColor: "#ff7a1a",
    paddingVertical: 14,
    borderRadius: 10,
    width: "48%",
    alignItems: "center",
  },

  foundBtn: {
    backgroundColor: "#004e92",
    paddingVertical: 14,
    borderRadius: 10,
    width: "48%",
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },

  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#444",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
  },

  image: {
    width: 65,
    height: 65,
    borderRadius: 8,
  },

  textBox: {
    marginLeft: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 3,
  },

  subtitle: {
    color: "#777",
    fontSize: 13,
  },


  navbar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#eee",
    marginBottom: 20,
  },

  navItem: {
    alignItems: "center",
  },

  icon: {
    fontSize: 18,
    color: "#777",
  },

  text: {
    fontSize: 12,
    color: "#777",
  },

  activeIcon: {
    fontSize: 18,
  },

  activeText: {
    fontSize: 12,
    color: "#ff7a1a",
    fontWeight: "bold",
  },

});