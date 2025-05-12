const tintColor = '#2f95dc';

// Define the main color scheme
const colorScheme = {
    text: '#0F1E0C',
    textSecondary: '#4A5C54',
  background: '#F5F9F7',            // Light background for most screens
  homeBackground: '#0B3C26',         // Darker green background for the home screen
    card: '#F0F7EB',
  primary: '#1E7A4A',
  primaryDark: '#125C35',
  primaryLight: '#E8F5EE',
  secondary: '#64B08F',
  accent: '#FF9D45',
  border: '#E2EAE5',
  tint: tintColor,
    tabIconDefault: '#8A9D94',
  tabIconSelected: '#1E7A4A',
  success: '#2E9D50',
  warning: '#F58A07',
  error: '#E53935',
  info: '#0288D1',
    gray: {
    100: '#F7FAF8',
    200: '#E2EAE5',
    300: '#D4DFD8',
      400: '#B8C5BE',
      500: '#8A9D94',
      600: '#5F7268',
      700: '#4A5C54',
      800: '#364339',
      900: '#0F1E0C',
    },
};

// Export a structure that maintains backward compatibility
export default {
  ...colorScheme,
  light: colorScheme,
  dark: colorScheme,
};