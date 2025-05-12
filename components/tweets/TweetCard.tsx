import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Tweet } from '@/types';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Theme from '@/constants/Theme';
import { formatRelativeTime } from '@/utils/formatUtils';
import { MessageCircle } from 'lucide-react-native';

interface TweetCardProps {
  tweet: Tweet;
}

export default function TweetCard({ tweet }: TweetCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const getSentimentIcon = () => {
    const iconColor = getSentimentColor();
    return <MessageCircle size={20} color={iconColor} />;
  };

  const getSentimentColor = () => {
    switch (tweet.sentiment) {
      case 'happy':
        return colors.success;
      case 'neutral':
        return colors.info;
      case 'annoyed':
        return colors.warning;
      case 'distressed':
        return colors.error;
      default:
        return colors.textSecondary;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <View style={styles.header}>
        <View style={styles.sentimentIconContainer}>
          {getSentimentIcon()}
        </View>
        <Text style={[styles.time, { color: colors.textSecondary }]}>
          {formatRelativeTime(tweet.createdAt)}
        </Text>
      </View>
      <Text style={[styles.message, { color: colors.text }]}>
        {tweet.message}
      </Text>
      
      {tweet.message.includes('#') && (
        <View style={styles.tagsContainer}>
          {tweet.message
            .split(' ')
            .filter(word => word.startsWith('#'))
            .map((tag, index) => (
              <Text 
                key={index} 
                style={[styles.tag, { color: colors.primary }]}
              >
                {tag}
              </Text>
            ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: Theme.borderRadius.m,
    padding: Theme.spacing.m,
    marginBottom: Theme.spacing.m,
    ...Theme.shadows.small,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.s,
  },
  sentimentIconContainer: {
    marginRight: Theme.spacing.s,
  },
  time: {
    fontFamily: 'Poppins-Regular',
    fontSize: Theme.typography.fontSize.s,
  },
  message: {
    fontFamily: 'Poppins-Regular',
    fontSize: Theme.typography.fontSize.m,
    lineHeight: Theme.typography.lineHeight.regular * Theme.typography.fontSize.m,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: Theme.spacing.s,
  },
  tag: {
    fontFamily: 'Poppins-Medium',
    fontSize: Theme.typography.fontSize.s,
    marginRight: Theme.spacing.s,
    marginBottom: Theme.spacing.xs,
  },
});