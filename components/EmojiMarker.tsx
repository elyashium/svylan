import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GeoLocation } from '@/types';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface EmojiMarkerProps {
  emoji: string;
  plantId: string;
  title?: string;
  showPulse?: boolean;
}

/**
 * A component that displays an emoji with an optional title.
 * This is a simplified version that doesn't depend on react-native-maps.
 */
const EmojiMarker: React.FC<EmojiMarkerProps> = ({
  emoji,
  plantId,
  title,
  showPulse = false,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const handlePress = () => {
    // Navigate to the plant detail page
    router.push(`/plant/${plantId}`);
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <View style={styles.markerContainer}>
        {showPulse && <View style={[styles.pulse, { borderColor: colors.primary }]} />}
        <View style={[styles.emojiContainer, { backgroundColor: colors.card }]}>
          <Text style={styles.emoji}>{emoji}</Text>
        </View>
        {title && (
          <View style={[styles.titleContainer, { backgroundColor: colors.card }]}>
            <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
              {title}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiContainer: {
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  emoji: {
    fontSize: 24,
  },
  titleContainer: {
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 4,
    maxWidth: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pulse: {
    position: 'absolute',
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 3,
    opacity: 0.4,
    backgroundColor: 'transparent',
    zIndex: -1,
  },
});

export default EmojiMarker; 