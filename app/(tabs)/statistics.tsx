import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Animated, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Theme from '@/constants/Theme';
import { mockPlants, mockSensorData } from '@/data/mockData';
import { BarChart, LineChart } from 'react-native-chart-kit';
import { ChartConfig } from 'react-native-chart-kit/dist/HelperTypes';
import { Plant } from '@/types';
import { ChartBar as BarChart3, Droplets, CloudSun, Thermometer, Gauge } from 'lucide-react-native';
import Button from '@/components/common/Button';

export default function StatisticsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const screenWidth = Dimensions.get('window').width - Theme.spacing.l * 2;
  
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [activeMetric, setActiveMetric] = useState<'water' | 'humidity' | 'light' | 'temperature'>('water');
  const tabIndicatorPosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate the tab indicator when activeMetric changes
    const position = activeMetric === 'water' ? 0 : 
                     activeMetric === 'humidity' ? 1 : 
                     activeMetric === 'light' ? 2 : 3;
    
    Animated.spring(tabIndicatorPosition, {
      toValue: position,
      useNativeDriver: true,
      tension: 100,
      friction: 10
    }).start();
  }, [activeMetric]);

  const chartConfig: ChartConfig = {
    backgroundGradientFrom: colors.card,
    backgroundGradientTo: colors.card,
    color: (opacity = 1) => `rgba(56, 166, 106, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.7,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
    labelColor: () => colors.textSecondary,
    propsForLabels: {
      fontFamily: 'Poppins-Regular',
      fontSize: 10,
    },
  };

  // Generate some mock data for the charts
  const weeklyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: activeMetric === 'water' 
          ? [40, 35, 28, 20, 45, 38, 30] 
          : activeMetric === 'humidity'
          ? [60, 65, 62, 58, 63, 67, 65]
          : activeMetric === 'light'
          ? [70, 65, 80, 75, 68, 72, 78]
          : [22, 23, 24, 25, 24, 23, 22], // temperature
        color: (opacity = 1) => `rgba(56, 166, 106, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const plantsData = {
    labels: mockPlants.slice(0, 3).map(p => p.name.substring(0, 5) + '...'),
    datasets: [
      {
        data: mockPlants.slice(0, 3).map(p => mockSensorData[p.id]?.waterLevel || 0),
      },
    ],
  };

  const getActiveMetricIcon = () => {
    switch (activeMetric) {
      case 'water':
        return <Droplets size={24} color={colors.primary} />;
      case 'humidity':
        return <Gauge size={24} color={colors.info} />;
      case 'light':
        return <CloudSun size={24} color={colors.warning} />;
      case 'temperature':
        return <Thermometer size={24} color={colors.error} />;
    }
  };

  const getActiveMetricLabel = () => {
    switch (activeMetric) {
      case 'water':
        return 'Water Level';
      case 'humidity':
        return 'Humidity';
      case 'light':
        return 'Light';
      case 'temperature':
        return 'Temperature';
    }
  };

  const getActiveMetricUnit = () => {
    switch (activeMetric) {
      case 'water':
      case 'humidity':
      case 'light':
        return '%';
      case 'temperature':
        return '°C';
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Sticky Header */}
      <View style={[styles.stickyHeader, { backgroundColor: colors.background }]}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <BarChart3 size={28} color={colors.primary} />
            <Text style={[styles.headerTitle, { color: colors.text }]}>Statistics</Text>
          </View>
          <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
            Monitor your plants' vital metrics over time
          </Text>
        </View>
      </View>
      
      <ScrollView 
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={[styles.contentContainer, { paddingTop: 100 }]} // Add padding for sticky header
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <View style={styles.sectionHeader}>
            <View style={styles.metricHeader}>
              <View style={styles.iconWrapper}>
                {getActiveMetricIcon()}
              </View>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                {getActiveMetricLabel()}
              </Text>
            </View>
            <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
              Weekly Overview
            </Text>
          </View>
          
          <View style={styles.chartContainer}>
            <LineChart
              data={weeklyData}
              width={screenWidth - Theme.spacing.l * 2}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
              withInnerLines={false}
              withOuterLines={true}
              yAxisSuffix={getActiveMetricUnit()}
            />
          </View>

          <View style={styles.metricTabsContainer}>
            <View style={styles.metricTabsWrapper}>
              <Animated.View 
                style={[
                  styles.tabIndicator, 
                  { 
                    backgroundColor: colors.primary,
                    transform: [{ 
                      translateX: tabIndicatorPosition.interpolate({
                        inputRange: [0, 1, 2, 3],
                        outputRange: [0, (Dimensions.get('window').width - Theme.spacing.xxl * 2) / 4, 
                                      (Dimensions.get('window').width - Theme.spacing.xxl * 2) / 4 * 2, 
                                      (Dimensions.get('window').width - Theme.spacing.xxl * 2) / 4 * 3]
                      }) 
                    }] 
                  }
                ]} 
              />
              <TouchableOpacity 
                style={styles.metricTab}
                onPress={() => setActiveMetric('water')}
                activeOpacity={0.7}
              >
                <Droplets 
                  size={22} 
                  color={activeMetric === 'water' ? '#FFFFFF' : colors.textSecondary} 
                />
                <Text style={[
                  styles.tabLabel, 
                  { color: activeMetric === 'water' ? '#FFFFFF' : colors.textSecondary }
                ]}>
                  Water
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.metricTab}
                onPress={() => setActiveMetric('humidity')}
                activeOpacity={0.7}
              >
                <Gauge 
                  size={22} 
                  color={activeMetric === 'humidity' ? '#FFFFFF' : colors.textSecondary} 
                />
                <Text style={[
                  styles.tabLabel, 
                  { color: activeMetric === 'humidity' ? '#FFFFFF' : colors.textSecondary }
                ]}>
                  Humid
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.metricTab}
                onPress={() => setActiveMetric('light')}
                activeOpacity={0.7}
              >
                <CloudSun 
                  size={22} 
                  color={activeMetric === 'light' ? '#FFFFFF' : colors.textSecondary} 
                />
                <Text style={[
                  styles.tabLabel, 
                  { color: activeMetric === 'light' ? '#FFFFFF' : colors.textSecondary }
                ]}>
                  Light
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.metricTab}
                onPress={() => setActiveMetric('temperature')}
                activeOpacity={0.7}
              >
                <Thermometer 
                  size={22} 
                  color={activeMetric === 'temperature' ? '#FFFFFF' : colors.textSecondary} 
                />
                <Text style={[
                  styles.tabLabel, 
                  { color: activeMetric === 'temperature' ? '#FFFFFF' : colors.textSecondary }
                ]}>
                  Temp
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Plant Comparison</Text>
          <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
            Water levels across plants
          </Text>
          
          <View style={styles.chartContainer}>
            <BarChart
              data={plantsData}
              width={screenWidth - Theme.spacing.l * 2}
              height={220}
              chartConfig={chartConfig}
              style={styles.chart}
              withInnerLines={false}
              yAxisSuffix="%"
              yAxisLabel=""
              showValuesOnTopOfBars
            />
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: colors.primaryLight }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Insights</Text>
          
          <View style={[styles.insightCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.insightTitle, { color: colors.text }]}>
              Water Conservation
            </Text>
            <Text style={[styles.insightDescription, { color: colors.textSecondary }]}>
              Your plants used 15% less water this week compared to last week. Keep up the good work!
            </Text>
          </View>
          
          <View style={[styles.insightCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.insightTitle, { color: colors.text }]}>
              Growth Patterns
            </Text>
            <Text style={[styles.insightDescription, { color: colors.textSecondary }]}>
              Your Monstera is showing 20% faster growth than typical for its species at this age.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: Theme.spacing.l,
    paddingBottom: Theme.spacing.xxl,
  },
  stickyHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    padding: Theme.spacing.l,
    paddingTop: 60,
    paddingBottom: Theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
    elevation: 2,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  header: {
    marginBottom: Theme.spacing.s,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.xs,
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: Theme.typography.fontSize.xxl,
    marginLeft: Theme.spacing.s,
  },
  headerSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: Theme.typography.fontSize.m,
    marginBottom: Theme.spacing.s,
  },
  section: {
    borderRadius: Theme.borderRadius.l,
    padding: Theme.spacing.l,
    marginBottom: Theme.spacing.l,
    ...Theme.shadows.small,
  },
  sectionHeader: {
    marginBottom: Theme.spacing.m,
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.xs,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: Theme.borderRadius.circle,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.s,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: Theme.typography.fontSize.l,
  },
  sectionSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: Theme.typography.fontSize.s,
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: Theme.spacing.m,
  },
  chart: {
    borderRadius: Theme.borderRadius.m,
  },
  metricTabsContainer: {
    marginTop: Theme.spacing.l,
    alignItems: 'center',
    paddingBottom: Theme.spacing.m,
  },
  metricTabsWrapper: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: Theme.borderRadius.l,
    height: 60,
    width: Dimensions.get('window').width - Theme.spacing.xxl * 2,
    position: 'relative',
    justifyContent: 'space-between',
  },
  metricTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    zIndex: 1,
  },
  tabIndicator: {
    position: 'absolute',
    width: (Dimensions.get('window').width - Theme.spacing.xxl * 2) / 4,
    height: '100%',
    borderRadius: Theme.borderRadius.l,
    zIndex: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tabLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    marginTop: 2,
  },
  insightCard: {
    borderRadius: Theme.borderRadius.m,
    padding: Theme.spacing.m,
    marginBottom: Theme.spacing.m,
    ...Theme.shadows.small,
  },
  insightTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: Theme.typography.fontSize.m,
    marginBottom: Theme.spacing.xs,
  },
  insightDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: Theme.typography.fontSize.s,
    lineHeight: Theme.typography.lineHeight.regular * Theme.typography.fontSize.s,
  },
});