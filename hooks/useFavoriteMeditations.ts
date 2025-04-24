import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Meditation } from '../types/Meditation';

const FAVORITES_STORAGE_KEY = 'desert-zen-favorites';

export function useFavoriteMeditations() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      setIsLoading(true);
      const storedFavorites = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
      
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
      
      setIsLoading(false);
    } catch (err) {
      setError('Failed to load favorites');
      setIsLoading(false);
      console.error('Error loading favorites:', err);
    }
  };

  const saveFavorites = async (newFavorites: string[]) => {
    try {
      await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
    } catch (err) {
      setError('Failed to save favorites');
      console.error('Error saving favorites:', err);
    }
  };

  const addFavorite = async (meditationId: string) => {
    try {
      const newFavorites = [...favorites, meditationId];
      setFavorites(newFavorites);
      await saveFavorites(newFavorites);
    } catch (err) {
      setError('Failed to add favorite');
      console.error('Error adding favorite:', err);
    }
  };

  const removeFavorite = async (meditationId: string) => {
    try {
      const newFavorites = favorites.filter(id => id !== meditationId);
      setFavorites(newFavorites);
      await saveFavorites(newFavorites);
    } catch (err) {
      setError('Failed to remove favorite');
      console.error('Error removing favorite:', err);
    }
  };

  const isFavorite = (meditationId: string): boolean => {
    return favorites.includes(meditationId);
  };

  return {
    favorites,
    isLoading,
    error,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
}