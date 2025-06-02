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
    // Comment out or remove the mockLocationRequest
    /*
    const mockLocationRequest = async () => {
      // ... mock implementation ...
    };
    mockLocationRequest();
    */
    
    // Real implementation:
    const getLocation = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, errorMsg: null })); // Set loading true at the start
        const { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status !== 'granted') {
          setState(prev => ({
            ...prev,
            errorMsg: 'Permission to access location was denied',
            permissionGranted: false,
            loading: false,
            // Optionally, keep region as default or set to a specific state
          }));
          return;
        }
        
        // It's good practice to set a timeout for getCurrentPositionAsync
        // in case it hangs indefinitely.
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced, // You can adjust accuracy
        });
        const userLocationData = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        
        setState({ // Set the full state in one go
          userLocation: userLocationData,
          errorMsg: null,
          permissionGranted: true,
          loading: false,
          region: { // Update region based on user's actual location
            latitude: userLocationData.latitude,
            longitude: userLocationData.longitude,
            latitudeDelta: 0.02, // Zoom level - adjust as needed
            longitudeDelta: 0.01, // Zoom level - adjust as needed
          },
        });
      } catch (error) {
        console.error("Error getting location:", error); // Log the actual error
        setState(prev => ({
          ...prev,
          errorMsg: "Failed to get location. Please ensure location services are enabled.", // More specific error
          userLocation: null, // Clear location on error
          permissionGranted: status === 'granted', // Keep permission status if known
          loading: false,
        }));
      }
    };
    
    getLocation();
  }, []); // Empty dependency array, so it runs once on mount

  return state;
};

// remove the default export if you have `export const useLocation`
// export default useLocation; 