import React from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, Image } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Theme from '@/constants/Theme';
import { getDefaultUser } from '@/data/mockData';
import { Settings as SettingsIcon, Bell, User, Wifi, Shield, CircleHelp as HelpCircle, LogOut, ChevronRight } from 'lucide-react-native';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(colorScheme === 'dark');
  const [offlineModeEnabled, setOfflineModeEnabled] = React.useState(false);

  const user = getDefaultUser();

  const SettingItem = ({ 
    icon, 
    title, 
    description, 
    hasSwitch, 
    switchValue, 
    onSwitchChange,
    onPress,
    showChevron = true
  }: {
    icon: React.ReactNode;
    title: string;
    description?: string;
    hasSwitch?: boolean;
    switchValue?: boolean;
    onSwitchChange?: (value: boolean) => void;
    onPress?: () => void;
    showChevron?: boolean;
  }) => (
    <TouchableOpacity 
      style={[styles.settingItem, { borderBottomColor: colors.border }]}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingIconContainer}>
        {icon}
      </View>
      <View style={styles.settingContent}>
        <Text style={[styles.settingTitle, { color: colors.text }]}>{title}</Text>
        {description && (
          <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
            {description}
          </Text>
        )}
      </View>
      {hasSwitch ? (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: colors.gray[300], true: `${colors.primary}80` }}
          thumbColor={switchValue ? colors.primary : colors.gray[400]}
        />
      ) : showChevron ? (
        <ChevronRight size={20} color={colors.textSecondary} />
      ) : null}
    </TouchableOpacity>
  );

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <SettingsIcon size={28} color={colors.primary} />
        <Text style={[styles.headerTitle, { color: colors.text }]}>Settings</Text>
      </View>

      <View style={[styles.profileSection, { backgroundColor: colors.card }]}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg' }}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={[styles.profileName, { color: colors.text }]}>{user.name}</Text>
          <Text style={[styles.profileEmail, { color: colors.textSecondary }]}>{user.email}</Text>
          <Text style={[styles.accountType, { color: colors.primary }]}>
            {user.userType === 'household' ? 'Household Account' : 'Commercial Account'}
          </Text>
        </View>
      </View>

      <View style={[styles.settingsSection, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Preferences</Text>

        <SettingItem
          icon={<Bell size={20} color={colors.primary} />}
          title="Notifications"
          description="Receive alerts about your plants"
          hasSwitch
          switchValue={notificationsEnabled}
          onSwitchChange={setNotificationsEnabled}
        />

        <SettingItem
          icon={<User size={20} color={colors.primary} />}
          title="Account Settings"
          description="Manage your account details"
          onPress={() => {}}
        />

        <SettingItem
          icon={<Wifi size={20} color={colors.primary} />}
          title="Offline Mode"
          description="Use app without internet connection"
          hasSwitch
          switchValue={offlineModeEnabled}
          onSwitchChange={setOfflineModeEnabled}
        />
      </View>

      <View style={[styles.settingsSection, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>App Settings</Text>

        <SettingItem
          icon={<Shield size={20} color={colors.primary} />}
          title="Privacy & Security"
          onPress={() => {}}
        />

        <SettingItem
          icon={<HelpCircle size={20} color={colors.primary} />}
          title="Help & Support"
          description="Get help with using Sylvan"
          onPress={() => {}}
        />
      </View>

      <TouchableOpacity 
        style={[styles.logoutButton, { backgroundColor: `${colors.error}15` }]}
        onPress={() => {}}
      >
        <LogOut size={20} color={colors.error} />
        <Text style={[styles.logoutText, { color: colors.error }]}>Log Out</Text>
      </TouchableOpacity>

      <Text style={[styles.versionText, { color: colors.textSecondary }]}>
        Version 1.0.0
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: Theme.spacing.l,
    paddingTop: 60,
    paddingBottom: Theme.spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: Theme.typography.fontSize.xxl,
    marginLeft: Theme.spacing.s,
  },
  profileSection: {
    borderRadius: Theme.borderRadius.l,
    padding: Theme.spacing.l,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.l,
    ...Theme.shadows.small,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: Theme.spacing.l,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: Theme.typography.fontSize.l,
    marginBottom: Theme.spacing.xs,
  },
  profileEmail: {
    fontFamily: 'Poppins-Regular',
    fontSize: Theme.typography.fontSize.s,
    marginBottom: Theme.spacing.xs,
  },
  accountType: {
    fontFamily: 'Poppins-Medium',
    fontSize: Theme.typography.fontSize.s,
  },
  settingsSection: {
    borderRadius: Theme.borderRadius.l,
    padding: Theme.spacing.m,
    marginBottom: Theme.spacing.l,
    ...Theme.shadows.small,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: Theme.typography.fontSize.s,
    marginBottom: Theme.spacing.m,
    marginLeft: Theme.spacing.xs,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Theme.spacing.m,
    borderBottomWidth: 1,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.m,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: Theme.typography.fontSize.m,
    marginBottom: Theme.spacing.xs,
  },
  settingDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: Theme.typography.fontSize.s,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Theme.spacing.m,
    borderRadius: Theme.borderRadius.m,
    marginTop: Theme.spacing.m,
    marginBottom: Theme.spacing.l,
  },
  logoutText: {
    fontFamily: 'Poppins-Medium',
    fontSize: Theme.typography.fontSize.m,
    marginLeft: Theme.spacing.s,
  },
  versionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: Theme.typography.fontSize.xs,
    textAlign: 'center',
  },
});