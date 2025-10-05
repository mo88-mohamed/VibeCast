import React, { createContext, useState, useContext, ReactNode } from 'react';
import { podcastItem } from '../types/podcasts';

interface FavoritesContextType {
  favorites: podcastItem[];
  addFavorite: (podcast: podcastItem) => void;
  removeFavorite: (podcastId: number) => void;
  isFavorited: (podcastId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<podcastItem[]>([]);

  const addFavorite = (podcast: podcastItem) => {
    setFavorites((prevFavorites) => [...prevFavorites, podcast]);
  };

  const removeFavorite = (podcastId: number) => {
    setFavorites((prevFavorites) => prevFavorites.filter((p) => p.id !== podcastId));
  };

  const isFavorited = (podcastId: number) => {
    return favorites.some((p) => p.id === podcastId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorited }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
