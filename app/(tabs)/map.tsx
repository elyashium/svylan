import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { router } from 'expo-router';
import useLocation from '@/hooks/useLocation';
import { mockPlants } from '@/data/mockData';
import { mockPlantGeoLocations, getPlantEmoji } from '@/data/mockPlantLocations';
import Theme from '@/constants/Theme';
import { MapPin } from 'lucide-react-native';

export default function MapScreen() {
  const { loading, errorMsg } = useLocation();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const [plantsWithLocations, setPlantsWithLocations] = useState([]);

  useEffect(() => {
    // Combine plant data with location data
    const plantsData = mockPlants.map(plant => {
      const locationInfo = mockPlantGeoLocations[plant.id];
      if (!locationInfo) return null;
      
      return {
        ...plant,
        geoLocation: locationInfo.geoLocation,
        region: locationInfo.region,
        emoji: getPlantEmoji(plant.species)
      };
    }).filter(Boolean); // Remove null entries
    
    setPlantsWithLocations(plantsData);
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.text }]}>Loading plant map...</Text>
      </SafeAreaView>
    );
  }

  if (errorMsg) {
    return (
      <SafeAreaView style={[styles.errorContainer, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorTitle, { color: colors.error }]}>
          Error loading location
        </Text>
        <Text style={[styles.errorText, { color: colors.textSecondary }]}>
          {errorMsg}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Plant Map
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.textDim }]}>
          {plantsWithLocations.length} plants tracked
        </Text>
      </View>
      
      <View style={styles.mapFallbackContainer}>
        <Text style={[styles.fallbackText, { color: colors.textSecondary }]}>
          Map visualization is currently unavailable.
          {'\n'}
          Below are your tracked plants and their locations.
        </Text>
      </View>
      
      <ScrollView style={styles.plantList}>
        {plantsWithLocations.map((plant) => (
          <TouchableOpacity 
            key={plant.id} 
            style={[styles.plantCard, { backgroundColor: colors.card }]}
            onPress={() => router.push(`/plant/${plant.id}`)}
            activeOpacity={0.7}
          >
            <View style={styles.plantImageContainer}>
              <Image 
                source={{ uri: plant.image }} 
                style={styles.plantImage}
                resizeMode="cover"
              />
              <Text style={styles.emojiOverlay}>{plant.emoji}</Text>
            </View>
            
            <View style={styles.plantInfo}>
              <Text style={[styles.plantName, { color: colors.text }]}>
                {plant.name}
              </Text>
              <Text style={[styles.plantSpecies, { color: colors.textSecondary }]}>
                {plant.species}
              </Text>
              
              <View style={styles.locationContainer}>
                <MapPin size={14} color={colors.primary} style={styles.locationIcon} />
                <Text style={[styles.locationText, { color: colors.primary }]}>
                  {plant.region}
                </Text>
              </View>
              
              <View style={styles.coordinateRow}>
                <Text style={[styles.coordinates, { color: colors.textDim }]}>
                  {plant.geoLocation.latitude.toFixed(4)}, {plant.geoLocation.longitude.toFixed(4)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
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
  mapFallbackContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    lineHeight: 22,
  },
  plantList: {
    flex: 1,
    padding: 16,
  },
  plantCard: {
    flexDirection: 'row',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    ...Theme.shadows.small,
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
    fontFamily: 'Poppins-SemiBold',
  },
  plantSpecies: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
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
    fontFamily: 'Poppins-Medium',
  },
  coordinateRow: {
    marginTop: 4,
  },
  coordinates: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
}); 