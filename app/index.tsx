import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Theme from '@/constants/Theme';
import Logo from '@/assets/images/logo';
import Button from '@/components/common/Button';

export default function SplashScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  useEffect(() => {
    // Auto navigate after a delay
    const timer = setTimeout(() => {
      router.replace('/auth');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    router.replace('/auth');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <View style={styles.logoContainer}>
        <Logo width={120} height={120} color="#FFFFFF" />
        <Text style={styles.title}>Sylvan</Text>
        <Text style={styles.subtitle}>Emotion-Aware Smart Farming</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg' }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Get Started"
          onPress={handleGetStarted}
          variant="secondary"
          size="large"
          style={{ backgroundColor: '#FFFFFF' }}
          textStyle={{ color: colors.primary }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: Theme.spacing.xl,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: Theme.spacing.xxl,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 42,
    color: '#FFFFFF',
    marginTop: Theme.spacing.m,
  },
  subtitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: Theme.typography.fontSize.m,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    borderRadius: Theme.borderRadius.xl,
    overflow: 'hidden',
    ...Theme.shadows.medium,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    marginBottom: Theme.spacing.xl,
  },
});