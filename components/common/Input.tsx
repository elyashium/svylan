import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Theme from '@/constants/Theme';

interface InputProps {
  label?: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  error?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCompleteType?: string;
  style?: object;
}

export default function Input({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  error,
  keyboardType = 'default',
  autoCapitalize = 'none',
  style,
}: InputProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={[styles.label, { color: colors.text }]}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          { 
            backgroundColor: colors.card,
            borderColor: error ? colors.error : colors.border,
            color: colors.text,
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={colors.gray[500]}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
      {error && <Text style={[styles.error, { color: colors.error }]}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.m,
  },
  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: Theme.typography.fontSize.s,
    marginBottom: Theme.spacing.xs,
  },
  input: {
    height: 50,
    borderRadius: Theme.borderRadius.m,
    paddingHorizontal: Theme.spacing.m,
    borderWidth: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: Theme.typography.fontSize.m,
  },
  error: {
    fontFamily: 'Poppins-Regular',
    fontSize: Theme.typography.fontSize.xs,
    marginTop: Theme.spacing.xs,
  },
}); 