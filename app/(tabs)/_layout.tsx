import React from 'react';
import { Tabs } from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Home, Leaf, ChartBar as BarChart3, Map } from 'lucide-react-native';
import Theme from '@/constants/Theme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tabIconSelected,
        tabBarInactiveTintColor: colors.tabIconDefault,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          height: 65,
          paddingBottom: 10,
          paddingTop: 10,
          paddingHorizontal: Theme.spacing.s,
          ...Theme.shadows.small,
        },
        tabBarLabelStyle: {
          fontFamily: 'Poppins-Medium',
          fontSize: 12,
          marginTop: 2,
        },
        tabBarIconStyle: {
          marginBottom: -2,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
          tabBarLabel: "Home"
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          tabBarIcon: ({ color, size }) => <BarChart3 size={size} color={color} />,
          tabBarLabel: "Stats"
        }}
      />
      <Tabs.Screen
        name="plants"
        options={{
          tabBarIcon: ({ color, size }) => <Leaf size={size} color={color} />,
          tabBarLabel: "Plants"
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          tabBarIcon: ({ color, size }) => <Map size={size} color={color} />,
          tabBarLabel: "Map"
        }}
      />
      
      {/* Hidden tabs - will be accessed from the hamburger menu */}
      <Tabs.Screen
        name="tweets"
        options={{
          href: null, // Makes it not appear in the tab bar
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          href: null, // Makes it not appear in the tab bar
        }}
      />
    </Tabs>
  );
}