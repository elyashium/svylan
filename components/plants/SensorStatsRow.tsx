import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Droplets, Thermometer, CloudSun } from 'lucide-react-native';
import StatsCard from '@/components/common/StatsCard';
import { PlantSensorData } from '@/types';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { formatPercentage, formatTemperature } from '@/utils/formatUtils';
import Theme from '@/constants/Theme';

interface SensorStatsRowProps {
  sensorData: PlantSensorData;
}

export default function SensorStatsRow({ sensorData }: SensorStatsRowProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const getWaterColor = (level: number) => {
    if (level <= 20) return colors.error;
    if (level <= 40) return colors.warning;
    return colors.primary;
  };

  const getHumidityColor = (level: number) => {
    if (level <= 30) return colors.warning;
    if (level >= 80) return colors.warning;
    return colors.primary;
  };

  const getLightColor = (level: number) => {
    if (level <= 30) return colors.warning;
    if (level >= 90) return colors.warning;
    return colors.info;
  };

  const getTemperatureColor = (temp: number) => {
    if (temp <= 10) return colors.info;
    if (temp >= 30) return colors.warning;
    return colors.success;
  };

  // Convert temperature to percentage for visual display (0-40C → 0-100%)
  const temperaturePercentage = Math.min(Math.max((sensorData.temperature / 40) * 100, 0), 100);

  return (
    <View style={styles.container}>
      <StatsCard
        label="Water"
        value={formatPercentage(sensorData.waterLevel)}
        icon={<Droplets size={22} color={getWaterColor(sensorData.waterLevel)} />}
        color={getWaterColor(sensorData.waterLevel)}
        percentage={sensorData.waterLevel}
        style={styles.card}
      />
      <StatsCard
        label="Light"
        value={formatPercentage(sensorData.light)}
        icon={<CloudSun size={22} color={getLightColor(sensorData.light)} />}
        color={getLightColor(sensorData.light)}
        percentage={sensorData.light}
        style={styles.card}
      />
      <StatsCard
        label="Temp"
        value={formatTemperature(sensorData.temperature)}
        icon={<Thermometer size={22} color={getTemperatureColor(sensorData.temperature)} />}
        color={getTemperatureColor(sensorData.temperature)}
        percentage={temperaturePercentage}
        style={styles.card}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Theme.spacing.l,
    marginBottom: Theme.spacing.m,
  },
  card: {
    flex: 1,
    marginHorizontal: Theme.spacing.xs,
  },
});