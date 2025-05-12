import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Theme from '@/constants/Theme';
import { mockPlants, getPlantHealthData } from '@/data/mockData';
import { Plant } from '@/types';
import { Search, ArrowLeft, Filter, Leaf } from 'lucide-react-native';
import PlantCard from '@/components/common/PlantCard';
import StatusBadge from '@/components/common/StatusBadge';

export default function PlantsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>(mockPlants);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text) {
      const filtered = mockPlants.filter(plant => 
        plant.name.toLowerCase().includes(text.toLowerCase()) ||
        plant.species.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredPlants(filtered);
    } else {
      setFilteredPlants(mockPlants);
    }
  };

  const handlePlantPress = (plant: Plant) => {
    router.push(`/plant/${plant.id}`);
  };

  const renderPlantItem = ({ item }: { item: Plant }) => {
    const health = getPlantHealthData(item.id);
    
    return (
      <TouchableOpacity 
        style={[styles.plantCard, { backgroundColor: colors.card }]}
        onPress={() => handlePlantPress(item)}
        activeOpacity={0.8}
      >
        <View style={styles.imageContainer}>
          <PlantCard plant={item} onPress={handlePlantPress} />
        </View>
        <View style={styles.plantInfo}>
          <View style={styles.nameContainer}>
            <Text style={[styles.plantName, { color: colors.text }]}>{item.name}</Text>
            <Text style={[styles.plantSpecies, { color: colors.textSecondary }]}>{item.species}</Text>
          </View>
          <View style={styles.statusContainer}>
            {health && <StatusBadge status={health.overallStatus} />}
          </View>
        </View>
        <View style={styles.locationRow}>
          <Leaf size={14} color={colors.primary} />
          <Text style={[styles.locationText, { color: colors.textSecondary }]}>{item.location}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Leaf size={26} color={colors.primary} />
          <Text style={[styles.headerTitle, { color: colors.text }]}>My Plants</Text>
        </View>
        <TouchableOpacity 
          style={[styles.filterButton, { backgroundColor: colors.card }]}
        >
          <Filter size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View style={[styles.searchContainer, { backgroundColor: colors.card }]}>
        <Search size={20} color={colors.textSecondary} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search plants..."
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <FlatList
        data={filteredPlants}
        renderItem={renderPlantItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.columnWrapper}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              No plants found. Try a different search term.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Theme.spacing.l,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.l,
    paddingTop: Theme.spacing.m,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: Theme.typography.fontSize.xxl,
    marginLeft: Theme.spacing.s,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: Theme.borderRadius.circle,
    justifyContent: 'center',
    alignItems: 'center',
    ...Theme.shadows.small,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Theme.borderRadius.l,
    paddingHorizontal: Theme.spacing.m,
    marginBottom: Theme.spacing.l,
    height: 54,
    ...Theme.shadows.small,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: Theme.typography.fontSize.m,
    marginLeft: Theme.spacing.s,
    height: '100%',
  },
  listContent: {
    paddingBottom: Theme.spacing.xxl,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.l,
  },
  plantCard: {
    width: '48%',
    borderRadius: Theme.borderRadius.l,
    overflow: 'hidden',
    ...Theme.shadows.small,
    marginBottom: Theme.spacing.m,
  },
  imageContainer: {
    height: 140,
    width: '100%',
  },
  plantInfo: {
    padding: Theme.spacing.m,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  nameContainer: {
    flex: 1,
    paddingRight: Theme.spacing.s,
  },
  statusContainer: {
    marginTop: 2,
  },
  plantName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: Theme.typography.fontSize.m,
    marginBottom: 2,
  },
  plantSpecies: {
    fontFamily: 'Poppins-Regular',
    fontSize: Theme.typography.fontSize.s,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.m,
    paddingBottom: Theme.spacing.m,
  },
  locationText: {
    fontFamily: 'Poppins-Regular',
    fontSize: Theme.typography.fontSize.xs,
    marginLeft: Theme.spacing.xs,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Theme.spacing.xxl,
  },
  emptyText: {
    fontFamily: 'Poppins-Medium',
    fontSize: Theme.typography.fontSize.m,
    textAlign: 'center',
  },
});