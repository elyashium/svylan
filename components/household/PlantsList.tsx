import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Plant } from '@/types';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Theme from '@/constants/Theme';
import PlantCard from '@/components/common/PlantCard';
import { ChevronRight } from 'lucide-react-native';

interface PlantsListProps {
  title: string;
  plants: Plant[];
  onPlantPress: (plant: Plant) => void;
  onSeeAllPress?: () => void;
  seeAllVisible?: boolean;
}

export default function PlantsList({ 
  title, 
  plants, 
  onPlantPress, 
  onSeeAllPress,
  seeAllVisible = true
}: PlantsListProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  if (plants.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        {seeAllVisible && onSeeAllPress && (
          <TouchableOpacity onPress={onSeeAllPress} style={styles.seeAllButton}>
            <Text style={[styles.seeAllText, { color: colors.primary }]}>See all</Text>
            <ChevronRight size={16} color={colors.primary} />
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={plants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.plantCardContainer}>
            <PlantCard 
              plant={item} 
              onPress={onPlantPress} 
            />
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.m,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: Theme.typography.fontSize.xl,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontFamily: 'Poppins-Medium',
    fontSize: Theme.typography.fontSize.s,
    marginRight: Theme.spacing.xs,
  },
  plantCardContainer: {
    width: 160,
    height: 180,
    marginRight: Theme.spacing.m,
  },
  listContent: {
    paddingRight: Theme.spacing.m,
  },
});