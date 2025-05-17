import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Theme from '@/constants/Theme';
import { mockPlants, getPlantSensorData, getPlantHealthData, getPlantTweets } from '@/data/mockData';
import { getPlantLocationInfo } from '@/data/mockPlantLocations';
import { ArrowLeft, Timer, Leaf, Activity, ChevronDown, ChevronUp, Droplet, MapPin } from 'lucide-react-native';
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
  const locationInfo = plant ? getPlantLocationInfo(plant.id) : null;

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
              {locationInfo && (
                <View style={styles.plantMetaItem}>
                  <MapPin size={16} color="#FFFFFF" style={{ marginRight: 4 }} />
                  <Text style={styles.plantMetaText}>{locationInfo.region}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>

      {locationInfo && (
        <View style={[styles.locationCard, { backgroundColor: colors.card }]}>
          <View style={styles.locationHeader}>
            <View style={[styles.iconCircle, { backgroundColor: `${colors.info}20` }]}>
              <MapPin size={20} color={colors.info} />
            </View>
            <Text style={[styles.locationTitle, { color: colors.text }]}>Location</Text>
          </View>
          <View style={styles.locationDetails}>
            <Text style={[styles.locationRegion, { color: colors.text }]}>Region: {locationInfo.region}</Text>
            <Text style={[styles.locationCoords, { color: colors.textSecondary }]}>
              Coordinates: {locationInfo.geoLocation.latitude.toFixed(4)}, {locationInfo.geoLocation.longitude.toFixed(4)}
            </Text>
          </View>
        </View>
      )}

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
    paddingBottom: 80,
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  backButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  notFoundText: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  plantImageContainer: {
    height: 350,
    width: '100%',
  },
  plantImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  plantOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 30,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  plantInfo: {
    width: '100%',
  },
  plantName: {
    color: '#FFFFFF',
    fontSize: 28,
    fontFamily: 'Poppins-SemiBold',
  },
  plantSpecies: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginBottom: 8,
  },
  plantMetaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  plantMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    paddingVertical: 4,
  },
  plantMetaText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  statsContainer: {
    padding: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 20,
  },
  statItem: {
    flex: 1,
    borderRadius: Theme.borderRadius.m,
    padding: 16,
    alignItems: 'center',
    ...Theme.shadows.small,
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
  },
  statUnit: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginTop: 5,
  },
  wateringCard: {
    borderRadius: Theme.borderRadius.l,
    padding: Theme.spacing.m,
    marginTop: Theme.spacing.l,
    alignItems: 'center',
    justifyContent: 'center',
    ...Theme.shadows.small,
  },
  alertText: {
    fontFamily: 'Poppins-Medium',
    fontSize: Theme.typography.fontSize.m,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    borderBottomWidth: 1,
    marginHorizontal: -10,
    paddingHorizontal: 10,
  },
  tabButton: {
    paddingBottom: 10,
    marginRight: 20,
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
  locationCard: {
    borderRadius: Theme.borderRadius.l,
    padding: Theme.spacing.l,
    marginHorizontal: Theme.spacing.l,
    marginTop: Theme.spacing.l,
    marginBottom: Theme.spacing.m,
    ...Theme.shadows.small,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.m,
  },
  locationTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: Theme.typography.fontSize.l,
    marginLeft: Theme.spacing.m,
  },
  locationDetails: {
    paddingLeft: Theme.spacing.m,
  },
  locationRegion: {
    fontFamily: 'Poppins-Medium',
    fontSize: Theme.typography.fontSize.m,
    marginBottom: Theme.spacing.s,
  },
  locationCoords: {
    fontFamily: 'Poppins-Regular',
    fontSize: Theme.typography.fontSize.s,
  },
});