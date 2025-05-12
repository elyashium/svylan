import { Platform } from 'react-native';
import Colors from './Colors';

export default {
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    s: 4,
    m: 8,
    l: 16,
    xl: 24,
    xxl: 32,
    circle: 9999,
  },
  typography: {
    fontFamily: {
      regular: 'Poppins-Regular',
      medium: 'Poppins-Medium',
      semiBold: 'Poppins-SemiBold',
      bold: 'Poppins-Bold',
    },
    fontSize: {
      xs: 12,
      s: 14,
      m: 16,
      l: 18,
      xl: 20,
      xxl: 24,
      xxxl: 32,
    },
    lineHeight: {
      compact: 1.2, // For headings
      regular: 1.5, // For body text
      spacious: 1.8, // For readable paragraphs
    },
  },
  shadows: Platform.select({
    ios: {
      small: {}, // Empty object - no shadows
      medium: {}, // Empty object - no shadows
    },
    android: {
      small: {
        elevation: 0, // No elevation shadow
      },
      medium: {
        elevation: 0, // No elevation shadow
      },
    },
    default: {
      small: {}, // Empty object - no shadows
      medium: {}, // Empty object - no shadows
    },
  }),
  animation: {
    timing: {
      fast: 200,
      medium: 300,
      slow: 500,
    },
  },
};