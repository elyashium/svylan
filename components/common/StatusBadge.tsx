import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

type StatusType = 'excellent' | 'good' | 'fair' | 'poor' | 'critical';

interface StatusBadgeProps {
  status: StatusType;
  size?: 'small' | 'medium' | 'large';
}

export default function StatusBadge({ status, size = 'medium' }: StatusBadgeProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  
  const getStatusColor = (status: StatusType) => {
    switch (status) {
      case 'excellent':
        return colors.success;
      case 'good':
        return '#8BC34A'; // Light green
      case 'fair':
        return colors.warning;
      case 'poor':
        return '#FF5722'; // Deep orange
      case 'critical':
        return colors.error;
      default:
        return colors.info;
    }
  };

  const getSizeStyles = (size: 'small' | 'medium' | 'large') => {
    switch (size) {
      case 'small':
        return {
          container: { paddingVertical: 2, paddingHorizontal: 6, borderRadius: 4 },
          text: { fontSize: 10 },
        };
      case 'large':
        return {
          container: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8 },
          text: { fontSize: 14 },
        };
      default:
        return {
          container: { paddingVertical: 4, paddingHorizontal: 8, borderRadius: 6 },
          text: { fontSize: 12 },
        };
    }
  };

  const sizeStyles = getSizeStyles(size);
  const statusColor = getStatusColor(status);

  return (
    <View style={[
      styles.container, 
      sizeStyles.container, 
      { backgroundColor: `${statusColor}20` } // 20% opacity of the status color
    ]}>
      <Text style={[
        styles.text, 
        sizeStyles.text, 
        { color: statusColor }
      ]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
  },
  text: {
    fontFamily: 'Poppins-Medium',
    textTransform: 'capitalize',
  },
});