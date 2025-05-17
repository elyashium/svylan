import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Theme from '@/constants/Theme';

// Only Google is supported as we only have the Google logo
type SocialProvider = 'google'; 

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
          color: '#FFFFFF', // Standard Google button color
        };
      // Cases for 'facebook' and 'twitter' are removed as their logos are not present.
      // If you add their logos to assets/images, you can re-add those cases.
      default:
        // Fallback to Google details if an unsupported provider is passed,
        // or you could throw an error or return null.
        console.warn(`SocialButton: Provider '${provider}' is not supported or logo is missing. Defaulting to Google.`);
        return {
          logo: require('@/assets/images/google-logo.png'),
          text: 'Continue with Google',
          color: '#FFFFFF',
        };
    }
  };

  const providerDetails = getProviderDetails();

  // If providerDetails is null (e.g., if you choose to return null for unsupported providers),
  // you might want to return null here as well to render nothing.
  if (!providerDetails) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.button,
        { 
          backgroundColor: providerDetails.color,
          borderColor: colors.border, // Using theme border color
        },
        style,
      ]}
    >
      <View style={styles.contentContainer}>
        <Image source={providerDetails.logo} style={styles.logo} />
        <Text style={[styles.text, {color: provider === 'google' ? colors.text : '#FFFFFF' }]}>{providerDetails.text}</Text>
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
    // color will be set dynamically based on provider
  },
}); 