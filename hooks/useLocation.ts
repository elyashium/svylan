import { useState, useEffect } from 'react';
import { GeoLocation } from '@/types';
import * as Location from 'expo-location';
import { defaultMapRegion } from '@/data/mockPlantLocations';

interface LocationState {
  userLocation: GeoLocation | null;
  errorMsg: string | null;
  permissionGranted: boolean;
  loading: boolean;
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
}

export const useLocation = () => {
  const [state, setState] = useState<LocationState>({
    userLocation: null,
    errorMsg: null,
    permissionGranted: false,
    loading: true,
    region: defaultMapRegion,
  });

  useEffect(() => {
    // For now, we'll just mock the location with a timeout to simulate loading
    // In the future, this will be replaced with actual Expo Location API calls
    const mockLocationRequest = async () => {
      try {
        // Simulate permission request and loading delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock successful location retrieval
        const mockUserLocation = {
          latitude: defaultMapRegion.latitude,
          longitude: defaultMapRegion.longitude,
        };
        
        setState({
          userLocation: mockUserLocation,
          errorMsg: null,
          permissionGranted: true,
          loading: false,
          region: {
            ...defaultMapRegion,
            latitude: mockUserLocation.latitude,
            longitude: mockUserLocation.longitude,
          },
        });
      } catch (error) {
        setState(prev => ({
          ...prev,
          errorMsg: "Failed to get location",
          loading: false,
        }));
      }
    };

    mockLocationRequest();
    
    // Comment out real implementation for now, but this is how it would be done:
    /* 
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status !== 'granted') {
          setState(prev => ({
            ...prev,
            errorMsg: 'Permission to access location was denied',
            loading: false,
          }));
          return;
        }
        
        const location = await Location.getCurrentPositionAsync({});
        const userLocation = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        
        setState({
          userLocation,
          errorMsg: null,
          permissionGranted: true,
          loading: false,
          region: {
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
        });
      } catch (error) {
        setState(prev => ({
          ...prev,
          errorMsg: "Failed to get location",
          loading: false,
        }));
      }
    };
    
    getLocation();
    */
  }, []);

  return state;
};

export default useLocation; 