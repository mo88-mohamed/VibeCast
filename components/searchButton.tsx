// import { Colors } from "@/constants/theme";
// import { FontAwesome } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
import FontAwesome from "@react-native-vector-icons/fontawesome";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/MainNavigation';
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  type ViewProps,
} from "react-native";
// import { ThemedText } from "./themed-text";

type NavigationProp = StackNavigationProp<RootStackParamList>;

export default function SearchButton({ style, ...rest }: ViewProps) {
  const navigation = useNavigation<NavigationProp>();
  const colorScheme = useColorScheme();
  return (
    <View style={styles.topBarContainer}>
      {/* <Button title="Search"  color={"#fff"} onPress={() => {router.navigate('/search')}} /> */}
      <TouchableOpacity
        style={[styles.button, style]}
        onPress={() => {
          navigation.navigate("Search");
        }}
      >
        <FontAwesome
          name="search"
          size={20}
          // color={Colors[colorScheme ?? "light"].tint}
        />
        <Text>search</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.favButton]} onPress={() => navigation.navigate('MainTabs', { screen: 'Favourites' })}>
        <FontAwesome
          name="heart-o"
          size={20}
          // color={Colors[colorScheme ?? "light"].tint}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    // margin: 10,
    padding: 15,
    // backgroundColor: "#fff",
    borderRadius: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    width: "100%",
    flex: 1,
  },
  favButton: {
    borderWidth: 1,
    borderRadius: 15,
    width: 55,
    height: 55,
    // textAlign:"center"
    display: "flex",
    alignItems: "center",
    // flex:,
    justifyContent: "center",
    // padding:10
  },
  topBarContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // justifyContent:"space-between",

    width: "100%",
    gap: 8,
    // backgroundColor: "yellow",
    padding: 10,
  },
});
