import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Theme from '@/constants/Theme';

type SocialProvider = 'google' | 'facebook' | 'twitter';

interface SocialButtonProps {
  provider: SocialProvider;
  onPress: () => void;
  style?: object;
}

export default function SocialButton({
  provider,
  onPress,
  style,
}: SocialButtonProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  
  const getProviderDetails = () => {
    switch (provider) {
      case 'google':
        return {
          logo: require('@/assets/images/google-logo.png'),
          text: 'Continue with Google',
          color: '#FFFFFF',
        };
      case 'facebook':
        return {
          logo: require('@/assets/images/facebook-logo.png'),
          text: 'Continue with Facebook',
          color: '#1877F2',
        };
      case 'twitter':
        return {
          logo: require('@/assets/images/twitter-logo.png'),
          text: 'Continue with Twitter',
          color: '#1DA1F2',
        };
      default:
        return {
          logo: require('@/assets/images/google-logo.png'),
          text: 'Continue with Google',
          color: '#FFFFFF',
        };
    }
  };

  const providerDetails = getProviderDetails();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.button,
        { 
          backgroundColor: providerDetails.color,
          borderColor: colors.border,
        },
        style,
      ]}
    >
      <View style={styles.contentContainer}>
        <Image source={providerDetails.logo} style={styles.logo} />
        <Text style={styles.text}>{providerDetails.text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: Theme.borderRadius.m,
    paddingVertical: Theme.spacing.m,
    paddingHorizontal: Theme.spacing.xl,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.m,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: Theme.spacing.m,
  },
  text: {
    fontFamily: 'Poppins-Medium',
    fontSize: Theme.typography.fontSize.m,
    color: '#000000',
  },
}); 