import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { Plant } from '@/types';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Theme from '@/constants/Theme';
import { Leaf } from 'lucide-react-native';

interface PlantCardProps {
  plant: Plant;
  onPress: (plant: Plant) => void;
}

export default function PlantCard({ plant, onPress }: PlantCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress(plant)}
      style={[styles.container, { backgroundColor: colors.primary }]}
    >
      <Image 
        source={{ uri: plant.image }} 
        style={styles.image} 
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <View style={styles.contentContainer}>
          <Text style={styles.name} numberOfLines={1}>{plant.name}</Text>
          <View style={styles.locationContainer}>
            <Leaf size={14} color="#FFFFFF" />
            <Text style={styles.location} numberOfLines={1}>{plant.location}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    borderRadius: Theme.borderRadius.l,
    overflow: 'hidden',
    ...Theme.shadows.small,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  contentContainer: {
    padding: Theme.spacing.m,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  name: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: Theme.typography.fontSize.m,
    color: '#FFFFFF',
    marginBottom: Theme.spacing.xs,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontFamily: 'Poppins-Regular',
    fontSize: Theme.typography.fontSize.s,
    color: '#FFFFFF',
    textTransform: 'capitalize',
    marginLeft: Theme.spacing.xs,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});