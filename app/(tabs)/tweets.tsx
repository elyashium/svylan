import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Theme from '@/constants/Theme';
import { mockTweets, mockPlants } from '@/data/mockData';
import TweetCard from '@/components/tweets/TweetCard';
import { Twitter } from 'lucide-react-native';

export default function TweetsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  // Sort tweets by createdAt, newest first
  const sortedTweets = [...mockTweets].sort((a, b) => 
    b.createdAt.getTime() - a.createdAt.getTime()
  );

  // Get plant name by ID for the header
  const getPlantName = (plantId: string) => {
    const plant = mockPlants.find(p => p.id === plantId);
    return plant ? plant.name : 'Unknown Plant';
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Twitter size={28} color={colors.primary} />
          <Text style={[styles.headerTitle, { color: colors.text }]}>Plant Tweets</Text>
        </View>
        <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
          Your plants are talking. Are you listening?
        </Text>
      </View>

      <FlatList
        data={sortedTweets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.tweetContainer}>
            <Text style={[styles.tweetPlantName, { color: colors.primary }]}>
              {getPlantName(item.plantId)}
            </Text>
            <TweetCard tweet={item} />
          </View>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              No tweets yet. Your plants seem to be quiet today.
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
    marginBottom: Theme.spacing.xl,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.s,
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: Theme.typography.fontSize.xxl,
    marginLeft: Theme.spacing.s,
  },
  headerSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: Theme.typography.fontSize.m,
  },
  listContent: {
    paddingBottom: Theme.spacing.xxl,
  },
  tweetContainer: {
    marginBottom: Theme.spacing.m,
  },
  tweetPlantName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: Theme.typography.fontSize.m,
    marginBottom: Theme.spacing.xs,
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