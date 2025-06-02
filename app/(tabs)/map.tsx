import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Text, /* Image, TouchableOpacity, ScrollView, */ Dimensions } from 'react-native'; // Commented out unused imports
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
// import { router } from 'expo-router'; // Temporarily unused
import { useLocation } from '@/hooks/useLocation';
// import { mockPlants } from '@/data/mockData'; // Temporarily unused
// import { mockPlantGeoLocations, getPlantEmoji } from '@/data/mockPlantLocations'; // Temporarily unused
// import Theme from '@/constants/Theme'; // Temporarily unused
// import { MapPin } from 'lucide-react-native'; // Temporarily unused
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // Marker removed for extreme simplification
import { Plant, GeoLocation } from '@/types'; // Plant and GeoLocation might not be needed in this simplified version

// Define a type for plants with location data (temporarily unused)
/*
interface PlantWithLocation extends Plant {
  geoLocation: GeoLocation;
  region: string;
  emoji: string;
}
*/

export default function MapScreen() {
  const { userLocation, loading, errorMsg, region } = useLocation();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  // const [plantsWithLocations, setPlantsWithLocations] = useState<PlantWithLocation[]>([]); // Temporarily unused
  // const [mapReady, setMapReady] = useState(false); // Temporarily unused

  // useEffect for plantsData can be commented out for this test
  /*
  useEffect(() => {
    const plantsData = mockPlants.map(plant => {
      const locationInfo = mockPlantGeoLocations[plant.id];
      if (!locationInfo) return null;
      return {
        ...plant,
        geoLocation: locationInfo.geoLocation,
        region: locationInfo.region,
        emoji: getPlantEmoji(plant.species)
      };
    }).filter(Boolean) as PlantWithLocation[];
    setPlantsWithLocations(plantsData);
  }, []);
  */

  // Use a combined loading check
  if (loading || (!region && !userLocation && !errorMsg) ) {
    return (
      <SafeAreaView style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.text }]}>Loading map data...</Text>
      </SafeAreaView>
    );
  }

  if (errorMsg) {
    return (
      <SafeAreaView style={[styles.errorContainer, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorTitle, { color: colors.error }]}>Error loading location</Text>
        <Text style={[styles.errorText, { color: colors.textSecondary }]}>{errorMsg}</Text>
      </SafeAreaView>
    );
  }

  // A default region in case region from useLocation is not immediately available
  const defaultTestRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const currentRegion = region || (userLocation ? {
    latitude: userLocation.latitude,
    longitude: userLocation.longitude,
    latitudeDelta: 0.02, // Default zoom
    longitudeDelta: 0.01  // Default zoom
  } : defaultTestRegion);


  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Plant Map (Simplified Test)</Text>
      </View>
      
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={currentRegion} // Use the determined region
          // All other props are removed for this basic test:
          // showsUserLocation={true}
          // showsMyLocationButton={true}
          // showsCompass={true}
          // onMapReady={() => console.log("Map is ready")}
        >
          {/* No Markers or other children for this basic test */}
        </MapView>
      </View>
      
      {/* The ScrollView with the plant list is removed for this simplified test */}
      {/* <ScrollView style={styles.plantList}> ... </ScrollView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
  },
  loadingContainer: { // Ensure loading/error takes full screen if map can't render
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  errorContainer: { // Ensure loading/error takes full screen if map can't render
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  mapContainer: { // This can be a fixed height or flex: 1 depending on desired layout
    // height: Dimensions.get('window').height * 0.4, // Previous fixed height
    flex: 1, // Let map try to take available space below header
    width: '100%',
    // borderBottomWidth: 1, // Removed as list is gone
    // borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  // Styles for markers, plant list, etc., are kept but not used in this simplified version.
  // They can be removed if this simplified version works and you build up from here.
  markerContainer: {
    alignItems: 'center',
  },
  markerBubble: {
    // borderRadius: 20, // Example style
    // padding: 8,
  },
  markerEmoji: {
    fontSize: 20,
  },
  plantList: { // Style kept if you reintroduce the list
    // flex: 1,
    padding: 16,
  },
  listTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 12,
  },
  // ... other styles that were present e.g. plantCard, plantImageContainer etc.
  // You can copy them back from your original code if this test passes and you rebuild features.
  plantCard: {
    flexDirection: 'row',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    // ...Theme.shadows.small, // Assuming Theme is imported
  },
  plantImageContainer: {
    width: 100,
    height: 100,
    position: 'relative',
  },
  plantImage: {
    width: '100%',
    height: '100%',
  },
  emojiOverlay: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    fontSize: 24,
  },
  plantInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  plantName: {
    fontSize: 16,
    // fontFamily: 'Poppins-SemiBold',
  },
  plantSpecies: {
    fontSize: 12,
    // fontFamily: 'Poppins-Regular',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationIcon: {
    marginRight: 4,
  },
  locationText: {
    fontSize: 14,
    // fontFamily: 'Poppins-Medium',
  },
  coordinateRow: {
    marginTop: 4,
  },
  coordinates: {
    fontSize: 12,
    // fontFamily: 'Poppins-Regular',
  },
  mapFallbackContainer: { // Style for fallback, not used here
    // display: 'none',
  },
  fallbackText: { // Style for fallback, not used here
    // fontSize: 14,
    // fontFamily: 'Poppins-Regular',
    // textAlign: 'center',
    // lineHeight: 22,
  },
});