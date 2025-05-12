import { useEffect } from 'react';
import { Stack, Redirect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useAppFonts } from '@/hooks/useFonts';
import { View, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  useFrameworkReady();
  const { fontsLoaded, fontError } = useAppFonts();
  const colorScheme = useColorScheme();

  // Return null until fonts are loaded
  if (!fontsLoaded && !fontError) {
    return null;
  }

  // Redirect to main app directly
  return (
    <View style={[
      styles.container, 
      { backgroundColor: Colors[colorScheme].background }
    ]}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ redirect: true }} />
        <Stack.Screen name="auth" options={{ redirect: true }} />
        <Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />
        <Stack.Screen name="+not-found" options={{ presentation: 'modal' }} />
      </Stack>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Redirect href="/(tabs)" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});