import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import type { podcastItem, Episode } from '../types/podcasts';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import useApiKey from '../hooks/useApiKey';
import { useFavorites } from '../contexts/FavoritesContext';
import { fetchEpisodesByFeedId } from '../api/api';
import { useNavigation } from '@react-navigation/native';
type PodcastScreenRouteProp = RouteProp<{ params: podcastItem }, 'params'>;

export default function PodcastScreen() {
  const { params: pod } = useRoute<PodcastScreenRouteProp>();
  const { favorites, addFavorite, removeFavorite, isFavorited } = useFavorites();
  const [isFavoritedState, setIsFavoritedState] = useState(isFavorited(pod.id));
const [episodes ,setEpisodes] = useState<Episode[] | null |undefined>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigation();
  // const episodes: episodeItem[] = pod?.episodes || [
  //   { id: 1, title: 'Episode 1: The Beginning', duration: '30:25', url: '' },
  //   { id: 2, title: 'Episode 2: The Middle', duration: '45:10', url: '' },
  //   { id: 3, title: 'Episode 3: The End', duration: '60:00', url: '' },
  //   { id: 4, title: 'Special Episode: Behind the Scenes', duration: '25:55', url: '' },
  // ];
  const {time,key,hash} = useApiKey();
  const headerInit :HeadersInit_ ={
    'User-Agent': 'vibeCast App/1.0.0',
  'X-Auth-Date': time.toString(),
  'X-Auth-Key': key,
  'Authorization': hash
}
  const toggleFavorite = () => {
    if (isFavoritedState) {
      removeFavorite(pod.id);
    } else {
      addFavorite(pod);
    }
    setIsFavoritedState(!isFavoritedState);
  };
  useEffect(()=>{
    // fetch(`https://api.podcastindex.org/api/1.0/episodes/byfeedid?id=${pod.id}`,{
    //   method:"Get",
    //   headers:headerInit
    // }).then(res => res.json())
    // .then((res)=>{

    //         // console.log(res);
    //   // console.log("-------------------------------------")
    //   // const r = res.json()
    //   console.log(res);
    //   if(res.status == "true"){
    //     setEpisodes(res.items)

    //   }
    // }).finally(() => setLoading(false));
    fetchEpisodesByFeedId(pod.id).then((res)=>{
      setEpisodes(res)
    }).finally(() => setLoading(false));
  },[])
  

  return (
    <View style={styles.container}>
      <Image source={{ uri: pod?.image }} style={styles.image} />
      <View style={styles.header}>
        <Text style={styles.title}>{pod?.title}</Text>
        <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
          <FontAwesome 
            name={isFavoritedState ? 'heart' : 'heart-o'}
            size={32}
            color={isFavoritedState ? '#E91E63' : '#555'}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.author}>{pod?.author}</Text>
      <Text style={styles.description}>{pod?.description || 'No description available.'}</Text>

      <View style={styles.episodesContainer}>
        <Text style={styles.episodesTitle}>Episodes</Text>
        {loading ? (
          <ActivityIndicator size="large" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={episodes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.episodeItem} onPress={()=>navigate.navigate('Audio',{...item})}>
                <View style={styles.episodeDetails}>
                  <Text style={styles.episodeTitle}>{item.title}</Text>
                  <Text style={styles.episodeDuration}>{item.duration}</Text>
                </View>
                <TouchableOpacity>
                  <FontAwesome name="play-circle" size={32} color="#E91E63" />
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: 300,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    color: '#333',
  },
  favoriteButton: {
    paddingLeft: 16,
  },
  author: {
    fontSize: 18,
    color: '#666',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#444',
    paddingHorizontal: 20,
    lineHeight: 24,
    marginBottom: 20,
  },
  episodesContainer: {
    paddingHorizontal: 20,
  },
  episodesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  episodeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  episodeDetails: {
    flex: 1,
  },
  episodeTitle: {
    fontSize: 16,
    color: '#333',
  },
  episodeDuration: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
});
