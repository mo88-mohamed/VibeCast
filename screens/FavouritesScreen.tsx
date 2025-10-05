import { View, Text, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFavorites } from '../contexts/FavoritesContext';
import ItemList from '../components/ItemList';
import Header from '../components/Header';

export default function FavouritesScreen() {
  const insets = useSafeAreaInsets();
  const { favorites } = useFavorites();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header title="Favourites" />
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ItemList {...item} />}
        ListEmptyComponent={<Text style={styles.emptyText}>No favorites yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});