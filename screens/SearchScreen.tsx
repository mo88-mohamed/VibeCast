import React, { useState } from "react";
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, TextInput, useColorScheme, View } from "react-native";
import { podcastItem } from "../types/podcasts";
import FontAwesome from "@react-native-vector-icons/fontawesome";
import { useNavigation } from "@react-navigation/native";
import useApiKey from "../hooks/useApiKey";
import ItemList from "../components/ItemList";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { fetchSearchByTitle } from "../api/api";
// import { TextInput } from 'react-native-gesture-handler';

export default function Search() {
  const colorScheme = useColorScheme();
  const [query, setQuery] = useState<string>("");
  const [data, setData] = useState<podcastItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
const navigation = useNavigation();
const insets = useSafeAreaInsets();
  const {time,key,hash} = useApiKey();
const headerInit :HeadersInit_ ={
          'User-Agent': 'vibeCast App/1.0.0',
        'X-Auth-Date': time.toString(),
        'X-Auth-Key': key,
        'Authorization': hash
}
const handleSearch = async () => {
    if (query.length === 0) return;
    
    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    
    try {
      const results = await fetchSearchByTitle(query);
      setData(results);
    } catch (err: any) {
      setError(err?.message || 'Search failed. Please try again.');
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };
  const retrySearch = () => {
    handleSearch();
  };

  return (
    <View style={{height:"100%",paddingTop: insets.top}}>
      <View style={styles.searchContainer}>
        <FontAwesome name="angle-left" size={35}  onPress={()=>navigation.goBack()} />
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          value={query}
          onChangeText={setQuery}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
        />
        {isLoading ? (
          <ActivityIndicator size="small"  />
        ) : (
          <FontAwesome onPress={handleSearch} name="search" size={24}  />
        )}
      </View>
      
      {error && (
        <View style={styles.errorContainer}>
          <FontAwesome name="exclamation-triangle" size={24} color="#FF3B30" />
          <Text style={styles.errorText}>{error}</Text>
          <Pressable style={styles.retryButton} onPress={retrySearch}>
            <Text style={styles.retryText}>Retry</Text>
          </Pressable>
        </View>
      )}

      <FlatList
        data={data}
        renderItem={({item}) => <ItemList {...item} />}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => {
          if (isLoading) {
            return (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large"  />
                <Text style={styles.loadingText}>Searching podcasts...</Text>
              </View>
            );
          }
          
          if (hasSearched && !error) {
            return (
              <View style={styles.emptyContainer}>
                <FontAwesome name="search" size={48} color="#ccc" />
                <Text style={styles.emptyTitle}>No podcasts found</Text>
                <Text style={styles.emptySubtitle}>
                  Try searching with different keywords or check your spelling
                </Text>
                <Pressable style={styles.searchAgainButton} onPress={() => setQuery('')}>
                  <Text style={styles.searchAgainText}>Search Again</Text>
                </Pressable>
              </View>
            );
          }
          
          return (
            <View style={styles.initialContainer}>
              <FontAwesome name="podcast" size={64} color="#ccc" />
              <Text style={styles.initialTitle}>Discover Podcasts</Text>
              <Text style={styles.initialSubtitle}>
                Search for your favorite podcasts by name, topic, or host
              </Text>
            </View>
          );
        }}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 0,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE6E6',
    padding: 12,
    margin: 10,
    borderRadius: 8,
    gap: 8,
  },
  errorText: {
    flex: 1,
    color: '#FF3B30',
    fontSize: 14,
  },
  retryButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  retryText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 8,
    color: '#333',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  searchAgainButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  searchAgainText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  initialContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  initialTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 8,
    color: '#333',
  },
  initialSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
});