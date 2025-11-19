import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';
import LoginCard from '../../components/LoginCard';
import { authService } from '../../services/MockAuthService';
import { Role } from '../../components/RoleSelector';

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const router = useRouter();

  const handleContinue = async (phone: string, role: Role) => {
    setLoading(true);
    setError(undefined);

    try {
      const response = await authService.requestOtp(phone, '+91', role);

      if (response.success && response.requestId) {
        router.push({
          pathname: '/otp',
          params: {
            requestId: response.requestId,
            phone,
            role,
            expiresIn: response.expiresIn?.toString() || '60',
          },
        });
      } else {
        setError(response.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0A0E27', '#1a1f3a', '#2d1b4e', '#1a1f3a', '#0A0E27']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <MotiView
        from={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1.5 }}
        transition={{
          type: 'timing',
          duration: 10000,
          loop: true,
          repeatReverse: true,
        }}
        style={styles.glowOrb1}
      />

      <MotiView
        from={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 0.1, scale: 0.8 }}
        transition={{
          type: 'timing',
          duration: 12000,
          loop: true,
          repeatReverse: true,
        }}
        style={styles.glowOrb2}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <MotiView
              from={{ opacity: 0, translateY: -20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                type: 'spring',
                damping: 15,
                delay: 200,
              }}
            >
              <View style={styles.logoContainer}>
                <LinearGradient
                  colors={['#00F5FF', '#00B8D4']}
                  style={styles.logoGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.logoText}>H</Text>
                </LinearGradient>
              </View>
              <Text style={styles.tagline}>Your family's lifelong health timeline.</Text>
            </MotiView>
          </View>

          <View style={styles.cardContainer}>
            <LoginCard onContinue={handleContinue} loading={loading} error={error} />
          </View>

          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1200 }}
            style={styles.footer}
          >
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.footerLink}>
                New here? <Text style={styles.footerLinkBold}>Create an account</Text>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.footerLink}>
                Trouble logging in? <Text style={styles.footerLinkBold}>Contact support</Text>
              </Text>
            </TouchableOpacity>
          </MotiView>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E27',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  glowOrb1: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: '#00F5FF',
    top: -100,
    right: -100,
  },
  glowOrb2: {
    position: 'absolute',
    width: 350,
    height: 350,
    borderRadius: 175,
    backgroundColor: '#8B5CF6',
    bottom: -80,
    left: -80,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 48,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#00F5FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  logoGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 40,
    fontWeight: '800',
    color: '#0A0E27',
  },
  tagline: {
    fontSize: 17,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.75)',
    textAlign: 'center',
    letterSpacing: 0.3,
    lineHeight: 24,
  },
  cardContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 32,
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
    marginTop: 24,
  },
  footerLink: {
    fontSize: 14,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.5)',
    textAlign: 'center',
  },
  footerLinkBold: {
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
  },
});
