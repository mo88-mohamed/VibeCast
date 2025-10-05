import { View, Text, FlatList, useColorScheme, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ItemList from '../components/ItemList';
import { podcastItem } from '../types/podcasts';
import useApiKey from '../hooks/useApiKey';
import SearchButton from '../components/searchButton';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const [data ,setData] = useState<podcastItem[] | null |undefined>();
  const [loading, setLoading] = useState(true);
  const {time,key,hash} = useApiKey();
  const insets = useSafeAreaInsets();

  const headerInit :HeadersInit_ ={
    'User-Agent': 'vibeCast App/1.0.0',
  'X-Auth-Date': time.toString(),
  'X-Auth-Key': key,
  'Authorization': hash
}

  useEffect(()=>{
    fetch("https://api.podcastindex.org/api/1.0/podcasts/trending?&lang=ar&pretty",{
      method:"Get",
      headers:headerInit
    }).then(res => res.json())
    .then((res)=>{

            // console.log(res);
      // console.log("-------------------------------------")
      // const r = res.json()
      // console.log(res);
      if(res.status == "true"){
      setData(res.feeds)

      }
    }).finally(() => setLoading(false));
  },[])
  return (
    <View style={styles.container}>
      {/* <SearchBar /> */}
      <View style={{paddingTop: insets.top}}>
        {/* <SearchButton style={{flex:1}} /> */}
        <Text style={{fontSize:20,fontWeight:"bold",marginBottom:10,textAlign:"center"}}>Trending</Text>
        {loading ? (
          <ActivityIndicator size="large" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            style={{}}
            data={data}
            renderItem={(item) => <ItemList {...item.item}></ItemList>}
            keyExtractor={(item, index) => item.id.toString()}
          />
        )}
      </View>
      {/* <Text>Home hello dd</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width:"100%",
  },
  stepContainer: {
    gap: 8,
    // marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});