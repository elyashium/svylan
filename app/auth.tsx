import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Theme from '@/constants/Theme';
import Button from '@/components/common/Button';
import Logo from '@/assets/images/logo';
import Input from '@/components/common/Input';
import SocialButton from '@/components/common/SocialButton';
import { UserType } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

type AuthMode = 'signin' | 'signup';

export default function AuthScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const { signIn, signUp, signInWithGoogle, user, setUserType } = useAuth();
  const [authMode, setAuthMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{email?: string; password?: string; confirmPassword?: string}>({});
  const [selectedUserType, setSelectedUserType] = useState<UserType | null>(null);
  const [authStep, setAuthStep] = useState<'credentials' | 'userType'>(
    'credentials'
  );

  // Check if user is already authenticated
  useEffect(() => {
    if (user) {
      setAuthStep('userType');
    }
  }, [user]);

  // Validate form fields
  const validate = () => {
    const newErrors: {email?: string; password?: string; confirmPassword?: string} = {};
    
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    if (authMode === 'signup' && password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle email/password authentication
  const handleAuth = async () => {
    if (!validate()) return;
    
    setLoading(true);
    try {
      if (authMode === 'signin') {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
      setAuthStep('userType');
    } catch (error: any) {
      let errorMessage = 'Authentication failed';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'That email address is already in use!';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'That email address is invalid!';
      } else if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        errorMessage = 'Invalid email or password';
      }
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      setAuthStep('userType');
    } catch (error: any) {
      console.log('Google sign in error:', error);
      Alert.alert('Error', 'Google sign in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    if (selectedUserType) {
      setUserType(selectedUserType);
      router.replace('/(tabs)');
    }
  };

  const toggleAuthMode = () => {
    setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
    setErrors({});
  };

  // Render authentication form
  const renderAuthForm = () => (
    <>
      <View style={styles.header}>
        <Logo width={60} height={60} color={colors.primary} />
        <Text style={[styles.title, { color: colors.text }]}>
          {authMode === 'signin' ? 'Welcome Back' : 'Create Account'}
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {authMode === 'signin' 
            ? 'Sign in to continue to Sylvan' 
            : 'Sign up to get started with Sylvan'}
        </Text>
      </View>

      <View style={styles.formContainer}>
        <Input
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          error={errors.email}
        />
        
        <Input
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          error={errors.password}
        />
        
        {authMode === 'signup' && (
          <Input
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            error={errors.confirmPassword}
          />
        )}

        <Button
          title={authMode === 'signin' ? 'Sign In' : 'Sign Up'}
          onPress={handleAuth}
          loading={loading}
          size="large"
          style={styles.submitButton}
        />

        <View style={styles.divider}>
          <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
          <Text style={[styles.dividerText, { color: colors.textSecondary }]}>or</Text>
          <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
        </View>

        <SocialButton
          provider="google"
          onPress={handleGoogleSignIn}
        />

        <TouchableOpacity onPress={toggleAuthMode} style={styles.toggleContainer}>
          <Text style={[styles.toggleText, { color: colors.textSecondary }]}>
            {authMode === 'signin' 
              ? "Don't have an account? " 
              : "Already have an account? "}
            <Text style={{ color: colors.primary, fontFamily: 'Poppins-SemiBold' }}>
              {authMode === 'signin' ? 'Sign Up' : 'Sign In'}
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );

  // Render user type selection
  const renderUserTypeSelection = () => (
    <>
      <View style={styles.header}>
        <Logo width={60} height={60} color={colors.primary} />
        <Text style={[styles.title, { color: colors.text }]}>Choose Account Type</Text>
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
    </>
  );

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}
      {authStep === 'credentials' ? renderAuthForm() : renderUserTypeSelection()}
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
  formContainer: {
    marginVertical: Theme.spacing.xl,
  },
  submitButton: {
    marginTop: Theme.spacing.s,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Theme.spacing.l,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontFamily: 'Poppins-Regular',
    fontSize: Theme.typography.fontSize.s,
    paddingHorizontal: Theme.spacing.m,
  },
  toggleContainer: {
    marginTop: Theme.spacing.l,
    alignItems: 'center',
  },
  toggleText: {
    fontFamily: 'Poppins-Regular',
    fontSize: Theme.typography.fontSize.m,
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
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
});