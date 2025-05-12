import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Theme from '@/constants/Theme';
import Button from '@/components/common/Button';
import Logo from '@/assets/images/logo';
import { UserType } from '@/types';

export default function AuthScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const [selectedUserType, setSelectedUserType] = useState<UserType | null>(null);

  const handleContinue = () => {
    if (selectedUserType) {
      router.replace('/(tabs)');
    }
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Logo width={60} height={60} color={colors.primary} />
        <Text style={[styles.title, { color: colors.text }]}>Welcome to Sylvan</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Choose your account type to get started
        </Text>
      </View>

      <View style={styles.optionsContainer}>
        <View 
          style={[
            styles.optionCard, 
            { 
              backgroundColor: colors.card,
              borderColor: selectedUserType === 'household' ? colors.primary : colors.border,
            }
          ]}
          onTouchEnd={() => setSelectedUserType('household')}
        >
          <Image
            source={{ uri: 'https://images.pexels.com/photos/6231713/pexels-photo-6231713.jpeg' }}
            style={styles.optionImage}
            resizeMode="cover"
          />
          <View style={styles.optionContent}>
            <Text style={[styles.optionTitle, { color: colors.text }]}>Household</Text>
            <Text style={[styles.optionDescription, { color: colors.textSecondary }]}>
              Monitor your home plants with smart sensors and receive personalized care recommendations.
            </Text>
          </View>
        </View>

        <View 
          style={[
            styles.optionCard, 
            { 
              backgroundColor: colors.card,
              borderColor: selectedUserType === 'commercial' ? colors.primary : colors.border,
            }
          ]}
          onTouchEnd={() => setSelectedUserType('commercial')}
        >
          <Image
            source={{ uri: 'https://images.pexels.com/photos/1112080/pexels-photo-1112080.jpeg' }}
            style={styles.optionImage}
            resizeMode="cover"
          />
          <View style={styles.optionContent}>
            <Text style={[styles.optionTitle, { color: colors.text }]}>Commercial</Text>
            <Text style={[styles.optionDescription, { color: colors.textSecondary }]}>
              Manage farms and greenhouses at scale with advanced monitoring tools and insights.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Continue"
          onPress={handleContinue}
          disabled={!selectedUserType}
          size="large"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: Theme.spacing.xl,
    justifyContent: 'space-between',
    minHeight: '100%',
  },
  header: {
    alignItems: 'center',
    marginTop: Theme.spacing.xl,
    marginBottom: Theme.spacing.xl,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: Theme.typography.fontSize.xxxl,
    marginTop: Theme.spacing.m,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: Theme.typography.fontSize.m,
    textAlign: 'center',
    marginTop: Theme.spacing.s,
    marginHorizontal: Theme.spacing.l,
  },
  optionsContainer: {
    marginVertical: Theme.spacing.xl,
  },
  optionCard: {
    borderRadius: Theme.borderRadius.l,
    overflow: 'hidden',
    marginBottom: Theme.spacing.l,
    borderWidth: 2,
    ...Theme.shadows.small,
  },
  optionImage: {
    width: '100%',
    height: 140,
  },
  optionContent: {
    padding: Theme.spacing.l,
  },
  optionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: Theme.typography.fontSize.xl,
    marginBottom: Theme.spacing.s,
  },
  optionDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: Theme.typography.fontSize.m,
    lineHeight: Theme.typography.lineHeight.regular * Theme.typography.fontSize.m,
  },
  buttonContainer: {
    marginTop: Theme.spacing.l,
    marginBottom: Theme.spacing.xl,
  },
});