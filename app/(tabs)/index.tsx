import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, RefreshControl, TouchableOpacity, Animated } from 'react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Theme from '@/constants/Theme';
import { getDefaultUser } from '@/data/mockData';
import { mockPlants, getPlantSensorData, getPlantHealthData } from '@/data/mockData';
import { Bell, Menu, X, Twitter, Settings, Plus } from 'lucide-react-native';
import PlantsList from '@/components/household/PlantsList';
import StatusBadge from '@/components/common/StatusBadge';
import Logo from '@/assets/images/logo';
import { Plant } from '@/types';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const [refreshing, setRefreshing] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuAnimation = React.useRef(new Animated.Value(0)).current;
  
  const user = getDefaultUser();
  const indoorPlants = mockPlants.filter(plant => plant.location === 'indoor' && plant.userId === user.id);
  const outdoorPlants = mockPlants.filter(plant => plant.location === 'outdoor' && plant.userId === user.id);

  // Find plants with issues
  const plantsWithIssues = mockPlants
    .filter(plant => {
      const health = getPlantHealthData(plant.id);
      return health && (health.overallStatus === 'poor' || health.overallStatus === 'critical');
    })
    .filter(plant => plant.userId === user.id);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handlePlantPress = (plant: Plant) => {
    router.push(`/plant/${plant.id}`);
  };

  const toggleMenu = () => {
    const toValue = menuOpen ? 0 : 1;
    Animated.spring(menuAnimation, {
      toValue,
      useNativeDriver: true,
      tension: 80,
      friction: 10,
    }).start();
    setMenuOpen(!menuOpen);
  };

  // Sidebar menu animation styles
  const sidebarTranslateX = menuAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-250, 0],
  });

  const overlayOpacity = menuAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5],
  });

  const navigateToScreen = (screen: string) => {
    toggleMenu();
    setTimeout(() => {
      router.push(screen as any);
    }, 300);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView 
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.menuButton} 
            onPress={toggleMenu}
          >
            <Menu size={24} color={colors.text} />
          </TouchableOpacity>
          
          <View style={styles.logoContainer}>
          
            <Text style={[styles.headerTitle, { color: colors.text }]}>Svylan</Text>
          </View>
          
          <TouchableOpacity style={styles.notificationIcon}>
            <Bell size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {plantsWithIssues.length > 0 && (
          <View style={[styles.alertsContainer, { backgroundColor: `${colors.error}15` }]}>
            <Text style={[styles.alertsTitle, { color: colors.error }]}>
              Plants needing attention
            </Text>
            {plantsWithIssues.map(plant => {
              const health = getPlantHealthData(plant.id);
              return (
                <TouchableOpacity 
                  key={plant.id}
                  style={styles.alertItem}
                  onPress={() => handlePlantPress(plant)}
                >
                  <Image source={{ uri: plant.image }} style={styles.alertPlantImage} />
                  <View style={styles.alertContent}>
                    <Text style={[styles.alertPlantName, { color: colors.text }]}>{plant.name}</Text>
                    {health && health.issues.length > 0 && (
                      <Text style={[styles.alertMessage, { color: colors.error }]}>
                        {health.issues[0].message}
                      </Text>
                    )}
                  </View>
                  <StatusBadge status={health?.overallStatus || 'critical'} />
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        <PlantsList 
          title="Indoor Plants" 
          plants={indoorPlants} 
          onPlantPress={handlePlantPress}
          onSeeAllPress={() => router.push('/plants')}
        />

        <PlantsList 
          title="Outdoor Plants" 
          plants={outdoorPlants} 
          onPlantPress={handlePlantPress}
          onSeeAllPress={() => router.push('/plants')}
        />

        <View style={[styles.exploreSection, { backgroundColor: colors.card }]}>
          <Text style={[styles.exploreTitle, { color: colors.text }]}>Explore</Text>
          <Text style={[styles.exploreSubtitle, { color: colors.textSecondary }]}>
            Discover new plants and advanced care techniques
          </Text>
          
          <View style={styles.featuredContainer}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/3511755/pexels-photo-3511755.jpeg' }} 
              style={styles.featuredImage} 
            />
            <View style={[styles.featuredContent, { backgroundColor: colors.primary }]}>
              <Text style={styles.featuredTitle}>Emotional Intelligence in Plants</Text>
              <Text style={styles.featuredSubtitle}>
                Learn how plants communicate their needs through bioelectrical signals
              </Text>
              <TouchableOpacity 
                style={[styles.featuredButton, { backgroundColor: '#FFFFFF' }]}
                onPress={() => {}}
              >
                <Text style={[styles.featuredButtonText, { color: colors.primary }]}>
                  Read More
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.addPlantButton, { backgroundColor: colors.primary }]}
          onPress={() => {}}
        >
          <Plus size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </ScrollView>

      {/* Overlay */}
      {menuOpen && (
        <Animated.View 
          style={[
            styles.overlay, 
            { 
              opacity: overlayOpacity,
              backgroundColor: 'black',
            }
          ]}
          pointerEvents={menuOpen ? 'auto' : 'none'}
          onTouchStart={toggleMenu}
        />
      )}

      {/* Sidebar Menu */}
      <Animated.View
        style={[
          styles.sidebarMenu,
          {
            transform: [{ translateX: sidebarTranslateX }],
            backgroundColor: colors.card,
          },
        ]}
      >
        <View style={styles.sidebarHeader}>
          <View style={styles.sidebarLogoContainer}>
            <Text style={[styles.sidebarTitle, { color: colors.text }]}>Svylan</Text>
          </View>
          <TouchableOpacity onPress={toggleMenu}>
            <X size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.sidebarContent}>
          <TouchableOpacity 
            style={styles.sidebarItem} 
            onPress={() => navigateToScreen('/tweets')}
          >
            <Twitter size={24} color={colors.text} />
            <Text style={[styles.sidebarItemText, { color: colors.text }]}>Tweets</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.sidebarItem}
            onPress={() => navigateToScreen('/settings')}
          >
            <Settings size={24} color={colors.text} />
            <Text style={[styles.sidebarItemText, { color: colors.text }]}>Settings</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: Theme.spacing.l,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: Theme.typography.fontSize.xxl,
    marginLeft: Theme.spacing.s,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertsContainer: {
    borderRadius: Theme.borderRadius.l,
    padding: Theme.spacing.m,
    marginBottom: Theme.spacing.xl,
  },
  alertsTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: Theme.typography.fontSize.m,
    marginBottom: Theme.spacing.m,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.m,
  },
  alertPlantImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  alertContent: {
    flex: 1,
    marginLeft: Theme.spacing.m,
    marginRight: Theme.spacing.s,
  },
  alertPlantName: {
    fontFamily: 'Poppins-Medium',
    fontSize: Theme.typography.fontSize.m,
    marginBottom: Theme.spacing.xs,
  },
  alertMessage: {
    fontFamily: 'Poppins-Regular',
    fontSize: Theme.typography.fontSize.s,
  },
  exploreSection: {
    borderRadius: Theme.borderRadius.l,
    padding: Theme.spacing.l,
    marginTop: Theme.spacing.m,
    marginBottom: Theme.spacing.xxl,
  },
  exploreTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: Theme.typography.fontSize.xl,
    marginBottom: Theme.spacing.xs,
  },
  exploreSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: Theme.typography.fontSize.s,
    marginBottom: Theme.spacing.l,
  },
  featuredContainer: {
    borderRadius: Theme.borderRadius.l,
    overflow: 'hidden',
    ...Theme.shadows.small,
  },
  featuredImage: {
    width: '100%',
    height: 160,
  },
  featuredContent: {
    padding: Theme.spacing.l,
  },
  featuredTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: Theme.typography.fontSize.l,
    color: '#FFFFFF',
    marginBottom: Theme.spacing.xs,
  },
  featuredSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: Theme.typography.fontSize.s,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: Theme.spacing.m,
  },
  featuredButton: {
    paddingVertical: Theme.spacing.s,
    paddingHorizontal: Theme.spacing.m,
    borderRadius: Theme.borderRadius.m,
    alignSelf: 'flex-start',
  },
  featuredButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: Theme.typography.fontSize.s,
  },
  addPlantButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    ...Theme.shadows.medium,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  sidebarMenu: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 250,
    height: '100%',
    zIndex: 2,
    padding: Theme.spacing.l,
  },
  sidebarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
    paddingTop: 50,
  },
  sidebarLogoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sidebarTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: Theme.typography.fontSize.xl,
    marginLeft: Theme.spacing.s,
  },
  sidebarContent: {
    marginTop: Theme.spacing.xl,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Theme.spacing.m,
  },
  sidebarItemText: {
    fontFamily: 'Poppins-Medium',
    fontSize: Theme.typography.fontSize.l,
    marginLeft: Theme.spacing.l,
  },
});