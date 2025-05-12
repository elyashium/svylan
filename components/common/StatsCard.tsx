import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Theme from '@/constants/Theme';

interface StatsCardProps {
  label: string;
  value: string;
  unit?: string;
  icon?: React.ReactNode;
  color?: string;
  style?: object;
  percentage?: number;
}

export default function StatsCard({ 
  label, 
  value, 
  unit, 
  icon, 
  color,
  style,
  percentage 
}: StatsCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  
  const progressPercentage = percentage !== undefined ? percentage : 0;
  
  return (
    <View style={[styles.container, { backgroundColor: colors.card }, style]}>
      <View style={styles.headerContainer}>
        {icon && <View style={[styles.iconContainer, { backgroundColor: `${color || colors.primary}15` }]}>{icon}</View>}
        <Text style={[styles.label, { color: colors.textSecondary }]}>
          {label}
        </Text>
      </View>
      
      <View style={styles.valueContainer}>
        <Text style={[
          styles.value, 
          { color: color || colors.text }
        ]}>
          {value}
        </Text>
        {unit && (
          <Text style={[
            styles.unit, 
            { color: colors.textSecondary }
          ]}>
            {unit}
          </Text>
        )}
      </View>

      {percentage !== undefined && (
        <View style={styles.progressContainer}>
          <View style={[styles.progressBackground, { backgroundColor: `${color || colors.primary}15` }]}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  backgroundColor: color || colors.primary,
                  width: `${progressPercentage}%`
                }
              ]} 
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: Theme.borderRadius.l,
    padding: Theme.spacing.m,
    paddingVertical: Theme.spacing.l,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.s,
  },
  iconContainer: {
    marginRight: Theme.spacing.s,
    width: 32,
    height: 32,
    borderRadius: Theme.borderRadius.circle,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: Theme.typography.fontSize.s,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: Theme.spacing.m,
  },
  value: {
    fontFamily: 'Poppins-Bold',
    fontSize: Theme.typography.fontSize.xxl,
  },
  unit: {
    fontFamily: 'Poppins-Regular',
    fontSize: Theme.typography.fontSize.s,
    marginLeft: Theme.spacing.xs,
  },
  progressContainer: {
    width: '100%',
  },
  progressBackground: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  }
});