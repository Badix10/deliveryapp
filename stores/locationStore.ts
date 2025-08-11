import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface Location {
  address: string;
  city: string;
  latitude?: number;
  longitude?: number;
}

interface LocationStore {
  currentLocation: Location;
  savedLocations: Location[];
  setCurrentLocation: (location: Location) => void;
  addSavedLocation: (location: Location) => void;
  removeSavedLocation: (index: number) => void;
}

export const useLocationStore = create<LocationStore>()(
  persist(
    (set) => ({
      currentLocation: {
        address: 'Sterling place, Brooklyn',
        city: 'Brooklyn',
        latitude: 40.6782,
        longitude: -73.9442,
      },
      savedLocations: [
        {
          address: 'Sterling place, Brooklyn',
          city: 'Brooklyn',
          latitude: 40.6782,
          longitude: -73.9442,
        },
        {
          address: 'Times Square, Manhattan',
          city: 'Manhattan',
          latitude: 40.7580,
          longitude: -73.9855,
        },
      ],
      setCurrentLocation: (location) =>
        set({ currentLocation: location }),
      addSavedLocation: (location) =>
        set((state) => ({
          savedLocations: [...state.savedLocations, location],
        })),
      removeSavedLocation: (index) =>
        set((state) => ({
          savedLocations: state.savedLocations.filter((_, i) => i !== index),
        })),
    }),
    {
      name: 'location-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);