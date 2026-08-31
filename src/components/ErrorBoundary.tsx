import React, { Component, ErrorInfo, ReactNode } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import colors from '../utile/colors';
import fonts from '../utile/fonts';
import { fs, scale } from '../utile/sizes';
import GradientBackground from './GradientBackground';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (__DEV__) {
      console.warn('[ErrorBoundary] Caught unhandled render error:', error, errorInfo);
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <GradientBackground>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView style={styles.container}>
            <View style={styles.card}>
              <View style={styles.iconCircle}>
                <Text style={styles.iconText}>🙏</Text>
              </View>

              <Text style={styles.title}>कुछ त्रुटि हुई</Text>
              <Text style={styles.subtitle}>Something went wrong</Text>

              <Text style={styles.message}>
                एप्लिकेशन को सुचारू रूप से चलाने के लिए कृपया पुनः प्रयास करें।
                {'\n'}
                Please restart or try again to continue your sadhana.
              </Text>

              <TouchableOpacity
                style={styles.retryButton}
                onPress={this.handleReset}
                activeOpacity={0.8}
              >
                <Text style={styles.retryButtonText}>पुनः प्रयास करें / Try Again</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </GradientBackground>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(20),
  },
  card: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: scale(20),
    padding: scale(24),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(183, 168, 151, 0.25)',
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: scale(4) },
    shadowOpacity: 0.08,
    shadowRadius: scale(10),
    elevation: 3,
  },
  iconCircle: {
    width: scale(64),
    height: scale(64),
    borderRadius: scale(32),
    backgroundColor: 'rgba(251, 148, 55, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(16),
  },
  iconText: {
    fontSize: fs(28),
  },
  title: {
    fontSize: fs(18),
    fontFamily: fonts.Marcellus,
    color: colors.secondary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: fs(13),
    fontFamily: fonts.PoppinsMedium,
    color: colors.ring,
    marginTop: scale(2),
    marginBottom: scale(10),
    textAlign: 'center',
  },
  message: {
    fontSize: fs(12),
    fontFamily: fonts.PoppinsRegular,
    color: colors.mutedForeground,
    textAlign: 'center',
    lineHeight: fs(18),
    marginBottom: scale(20),
  },
  retryButton: {
    backgroundColor: colors.ring,
    paddingHorizontal: scale(24),
    paddingVertical: scale(12),
    borderRadius: scale(25),
    shadowColor: colors.ring,
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.2,
    shadowRadius: scale(4),
    elevation: 2,
  },
  retryButtonText: {
    fontSize: fs(13),
    fontFamily: fonts.PoppinsSemiBold,
    color: colors.white,
  },
});
