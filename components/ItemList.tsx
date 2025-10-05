import React from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image, Platform } from "react-native";
import { podcastItem } from "../types/podcasts";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/MainNavigation';

type PodcastListNavigationProp = StackNavigationProp<RootStackParamList, 'Podcast'>;

export default function ItemList({ ...pod }: podcastItem) {
    // const router = useRouter();

  // console.log(pod)
  // console.log(pod.title)
  const navigation = useNavigation<PodcastListNavigationProp>();
  return (
    <View >
      <TouchableOpacity 
        style={style.container} 
        onPress={() => navigation.navigate('Podcast', { ...pod })}
      >
        <Image source={{ uri: pod?.image }} style={style.image} />
        <View style={style.textContainer}>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={style.title}
          >
            {pod.title}
          </Text>
          <Text style={style.author}>{pod.author}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    borderRadius: 12,
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    color: "#888",
  },
});
