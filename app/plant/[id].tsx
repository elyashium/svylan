import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Theme from '@/constants/Theme';
import { mockPlants, getPlantSensorData, getPlantHealthData, getPlantTweets } from '@/data/mockData';
import { ArrowLeft, Timer, Leaf, Activity, ChevronDown, ChevronUp, Droplet } from 'lucide-react-native';
import StatusBadge from '@/components/common/StatusBadge';
import SensorStatsRow from '@/components/plants/SensorStatsRow';
import { formatTimeInMinutes } from '@/utils/formatUtils';
import TweetCard from '@/components/tweets/TweetCard';

export default function PlantDetailScreen() {
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const [showRecommendations, setShowRecommendations] = useState(false);
  
  const plant = mockPlants.find(p => p.id === id);
  const sensorData = plant ? getPlantSensorData(plant.id) : undefined;
  const healthData = plant ? getPlantHealthData(plant.id) : undefined;
  const tweets = plant ? getPlantTweets(plant.id) : [];

  // Define styles that depend on colors here
  const dynamicStyles = {
    activeTab: {
      borderBottomWidth: 2,
      borderBottomColor: colors.primary,
    },
    activeTabText: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: Theme.typography.fontSize.m,
      color: colors.primary,
    }
  };

  if (!plant || !sensorData || !healthData) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={[styles.backButton, { backgroundColor: colors.card }]}
            onPress={() => router.back()}
          >
            <ArrowLeft size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
        <View style={styles.notFoundContainer}>
          <Text style={[styles.notFoundText, { color: colors.textSecondary }]}>
            Plant not found
          </Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <TouchableOpacity 
          style={[styles.backButton, { backgroundColor: 'rgba(255,255,255,0.3)' }]}
          onPress={() => router.back()}
        >
          <ArrowLeft size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={[styles.plantImageContainer, { backgroundColor: colors.primary }]}>
        <Image source={{ uri: plant.image }} style={styles.plantImage} />
        <View style={styles.plantOverlay}>
          <View style={styles.plantInfo}>
            <Text style={styles.plantName}>{plant.name}</Text>
            <Text style={styles.plantSpecies}>{plant.species}</Text>
            <View style={styles.plantMetaRow}>
              <View style={styles.plantMetaItem}>
                <Text style={styles.plantMetaText}>{plant.age} weeks</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statsRow}>
          <View style={[styles.statItem, { backgroundColor: colors.card }]}>
            <Text style={[styles.statValue, { color: colors.text }]}>19<Text style={styles.statUnit}>%</Text></Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Humidity</Text>
          </View>
          
          <View style={[styles.statItem, { backgroundColor: colors.card }]}>
            <Text style={[styles.statValue, { color: colors.text }]}>86<Text style={styles.statUnit}>%</Text></Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Fertilizer</Text>
          </View>
          
          <View style={[styles.statItem, { backgroundColor: colors.card }]}>
            <Text style={[styles.statValue, { color: colors.text }]}>36<Text style={styles.statUnit}>min</Text></Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Next watering</Text>
          </View>
        </View>

        <View style={[styles.wateringCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.alertText, { color: colors.error }]}>
            Please fill the water tank!
          </Text>
        </View>

        <SensorStatsRow sensorData={sensorData} />

        <View style={styles.tabsContainer}>
          <TouchableOpacity style={[styles.tabButton, dynamicStyles.activeTab]}>
            <Text style={dynamicStyles.activeTabText}>Statistics</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButton}>
            <Text style={[styles.tabText, { color: colors.textSecondary }]}>Information</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.healthSection, { backgroundColor: colors.card }]}>
          <View style={styles.healthHeader}>
            <View style={styles.healthTitleContainer}>
              <View style={[styles.iconCircle, { backgroundColor: `${colors.primary}20` }]}>
                <Activity size={20} color={colors.primary} />
              </View>
              <Text style={[styles.healthTitle, { color: colors.text }]}>Health Report</Text>
            </View>
            <TouchableOpacity
              onPress={() => setShowRecommendations(!showRecommendations)}
              style={styles.expandButton}
            >
              {showRecommendations ? (
                <ChevronUp size={22} color={colors.textSecondary} />
              ) : (
                <ChevronDown size={22} color={colors.textSecondary} />
              )}
            </TouchableOpacity>
          </View>

          {healthData.issues.length > 0 ? (
            <View style={styles.issuesContainer}>
              {healthData.issues.map((issue, index) => (
                <View 
                  key={index} 
                  style={[
                    styles.issueItem, 
                    { 
                      backgroundColor: issue.severity === 'high' 
                        ? `${colors.error}15` 
                        : issue.severity === 'medium'
                        ? `${colors.warning}15`
                        : `${colors.info}15` 
                    }
                  ]}
                >
                  <Text style={[
                    styles.issueMessage, 
                    { 
                      color: issue.severity === 'high' 
                        ? colors.error 
                        : issue.severity === 'medium'
                        ? colors.warning
                        : colors.info 
                    }
                  ]}>
                    {issue.message}
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={[styles.noIssuesText, { color: colors.success }]}>
              No issues detected. Your plant is healthy!
            </Text>
          )}

          {showRecommendations && (
            <View style={styles.recommendationsContainer}>
              <Text style={[styles.recommendationsTitle, { color: colors.text }]}>
                Recommendations
              </Text>
              {healthData.recommendations.map((recommendation, index) => (
                <View key={index} style={styles.recommendationItem}>
                  <Text style={[styles.recommendationText, { color: colors.textSecondary }]}>
                    • {recommendation}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {tweets.length > 0 && (
          <View style={styles.tweetsSection}>
            <View style={styles.sectionTitleRow}>
              <View style={[styles.iconCircle, { backgroundColor: `${colors.info}20` }]}>
                <Leaf size={20} color={colors.info} />
              </View>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Latest Tweets
              </Text>
            </View>
            {tweets.slice(0, 2).map((tweet) => (
              <TweetCard key={tweet.id} tweet={tweet} />
            ))}
            {tweets.length > 2 && (
              <TouchableOpacity 
                style={[styles.viewMoreButton, { borderColor: colors.primary }]}
                onPress={() => router.push('/tweets')}
              >
                <Text style={[styles.viewMoreText, { color: colors.primary }]}>
                  View more tweets
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: Theme.spacing.xxl,
  },
  header: {
    position: 'absolute',
    top: 60,
    left: Theme.spacing.l,
    zIndex: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: Theme.borderRadius.circle,
    justifyContent: 'center',
    alignItems: 'center',
    ...Theme.shadows.small,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 150,
  },
  notFoundText: {
    fontFamily: 'Poppins-Medium',
    fontSize: Theme.typography.fontSize.l,
  },
  plantImageContainer: {
    height: 340,
    width: '100%',
  },
  plantImage: {
    width: '100%',
    height: '100%',
    opacity: 0.9,
  },
  plantOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  plantInfo: {
    padding: Theme.spacing.l,
  },
  plantName: {
    fontFamily: 'Poppins-Bold',
    fontSize: Theme.typography.fontSize.xxl,
    color: '#FFFFFF',
    marginBottom: Theme.spacing.xs,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  plantSpecies: {
    fontFamily: 'Poppins-Regular',
    fontSize: Theme.typography.fontSize.m,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: Theme.spacing.s,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  plantMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  plantMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Theme.spacing.l,
  },
  plantMetaText: {
    fontFamily: 'Poppins-Medium',
    fontSize: Theme.typography.fontSize.s,
    color: '#FFFFFF',
    marginLeft: Theme.spacing.xs,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  statsContainer: {
    padding: Theme.spacing.l,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.m,
  },
  statItem: {
    width: '31%',
    borderRadius: 10,
    padding: Theme.spacing.s,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
  },
  statUnit: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    opacity: 0.8,
  },
  statLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    marginTop: 2,
  },
  wateringCard: {
    borderRadius: Theme.borderRadius.l,
    padding: Theme.spacing.m,
    marginBottom: Theme.spacing.m,
    ...Theme.shadows.small,
  },
  alertText: {
    fontFamily: 'Poppins-Medium',
    fontSize: Theme.typography.fontSize.m,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginVertical: Theme.spacing.l,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  tabButton: {
    paddingVertical: Theme.spacing.s,
    paddingHorizontal: Theme.spacing.m,
    marginRight: Theme.spacing.l,
  },
  tabText: {
    fontFamily: 'Poppins-Regular',
    fontSize: Theme.typography.fontSize.m,
  },
  healthSection: {
    borderRadius: Theme.borderRadius.l,
    padding: Theme.spacing.l,
    marginTop: Theme.spacing.l,
    ...Theme.shadows.small,
  },
  healthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.m,
  },
  healthTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: Theme.borderRadius.circle,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.s,
  },
  healthTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: Theme.typography.fontSize.l,
  },
  expandButton: {
    width: 40,
    height: 40,
    borderRadius: Theme.borderRadius.circle,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
  },
  issuesContainer: {
    marginBottom: Theme.spacing.m,
  },
  issueItem: {
    borderRadius: Theme.borderRadius.m,
    padding: Theme.spacing.m,
    marginBottom: Theme.spacing.s,
  },
  issueMessage: {
    fontFamily: 'Poppins-Medium',
    fontSize: Theme.typography.fontSize.s,
  },
  noIssuesText: {
    fontFamily: 'Poppins-Medium',
    fontSize: Theme.typography.fontSize.m,
    textAlign: 'center',
    padding: Theme.spacing.m,
  },
  recommendationsContainer: {
    marginTop: Theme.spacing.m,
    padding: Theme.spacing.m,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: Theme.borderRadius.m,
  },
  recommendationsTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: Theme.typography.fontSize.m,
    marginBottom: Theme.spacing.s,
  },
  recommendationItem: {
    marginBottom: Theme.spacing.s,
  },
  recommendationText: {
    fontFamily: 'Poppins-Regular',
    fontSize: Theme.typography.fontSize.s,
    lineHeight: Theme.typography.lineHeight.regular * Theme.typography.fontSize.s,
  },
  tweetsSection: {
    marginTop: Theme.spacing.l,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.m,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: Theme.typography.fontSize.l,
  },
  viewMoreButton: {
    borderWidth: 1,
    borderRadius: Theme.borderRadius.m,
    padding: Theme.spacing.m,
    alignItems: 'center',
    marginTop: Theme.spacing.m,
  },
  viewMoreText: {
    fontFamily: 'Poppins-Medium',
    fontSize: Theme.typography.fontSize.m,
  },
});