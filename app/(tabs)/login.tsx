import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';
import { User, Stethoscope, FlaskConical, Heart, Activity, Microscope } from 'lucide-react-native';
import { authFlowService, Role } from '../../services/AuthFlowService';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function LoginScreen() {
  const [selectedRole, setSelectedRole] = useState<Role>('patient');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const roles: {
    id: Role;
    label: string;
    icon: typeof User;
    gradient: string[];
    description: string;
    decorIcon: typeof Heart;
  }[] = [
    {
      id: 'patient',
      label: 'Patient',
      icon: User,
      gradient: ['#3b82f6', '#2563eb'],
      description: 'Access your health records',
      decorIcon: Heart,
    },
    {
      id: 'doctor',
      label: 'Doctor',
      icon: Stethoscope,
      gradient: ['#10b981', '#059669'],
      description: 'Manage your patients',
      decorIcon: Activity,
    },
    {
      id: 'lab',
      label: 'Lab',
      icon: FlaskConical,
      gradient: ['#f59e0b', '#d97706'],
      description: 'Process test reports',
      decorIcon: Microscope,
    },
  ];

  const isPhoneValid = phone.length === 10 && /^\d+$/.test(phone);

  const handleContinue = async () => {
    if (!isPhoneValid || loading) return;

    setLoading(true);
    setError('');

    try {
      const response = await authFlowService.requestOtp(phone, selectedRole);

      if (response.success && response.requestId) {
        router.push({
          pathname: '/verify-otp',
          params: {
            requestId: response.requestId,
            phone,
            role: selectedRole,
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
        colors={['#0f1419', '#1a1f2e', '#0f1419']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
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
          <MotiView
            from={{ opacity: 0, translateY: -30 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 600 }}
            style={styles.header}
          >
            <View style={styles.logoContainer}>
              <LinearGradient
                colors={['#3b82f6', '#2563eb']}
                style={styles.logoGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.logoText}>H</Text>
              </LinearGradient>
            </View>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>
          </MotiView>

          <MotiView
            from={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', delay: 200, damping: 15 }}
            style={styles.card}
          >
            <Text style={styles.label}>I am a...</Text>
            <View style={styles.rolesContainer}>
              {roles.map((role, index) => {
                const Icon = role.icon;
                const DecorIcon = role.decorIcon;
                const isSelected = selectedRole === role.id;
                const isCenter = index === 1;

                return (
                  <MotiView
                    key={role.id}
                    from={{ opacity: 0, scale: 0.8, rotateY: '45deg' }}
                    animate={{
                      opacity: 1,
                      scale: isSelected ? 1.05 : isCenter ? 0.95 : 0.85,
                      rotateY: '0deg',
                      translateY: isSelected ? -8 : 0,
                    }}
                    transition={{
                      delay: 300 + index * 100,
                      type: 'spring',
                      damping: 12,
                      stiffness: 100,
                    }}
                    style={[styles.roleWrapper, isCenter && styles.roleWrapperCenter]}
                  >
                    <TouchableOpacity
                      onPress={() => setSelectedRole(role.id)}
                      activeOpacity={0.7}
                      style={styles.roleButton}
                    >
                      <LinearGradient
                        colors={
                          isSelected
                            ? role.gradient
                            : ['rgba(30, 41, 59, 0.6)', 'rgba(30, 41, 59, 0.4)']
                        }
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={[styles.roleGradient, isSelected && styles.roleGradientSelected]}
                      >
                        <MotiView
                          animate={{
                            scale: isSelected ? [1, 1.1, 1] : 1,
                          }}
                          transition={{
                            type: 'timing',
                            duration: 1000,
                            loop: isSelected,
                          }}
                          style={styles.iconCircle}
                        >
                          <Icon
                            size={28}
                            color={isSelected ? '#ffffff' : '#94a3b8'}
                            strokeWidth={2}
                          />
                        </MotiView>

                        {isSelected && (
                          <MotiView
                            from={{ opacity: 0, scale: 0.5, rotate: '-180deg' }}
                            animate={{ opacity: 0.15, scale: 1.2, rotate: '0deg' }}
                            transition={{ type: 'spring', delay: 100 }}
                            style={styles.decorIconWrapper}
                          >
                            <DecorIcon size={48} color="#ffffff" strokeWidth={1} />
                          </MotiView>
                        )}

                        <View style={styles.roleInfo}>
                          <Text
                            style={[
                              styles.roleText,
                              isSelected && styles.roleTextSelected,
                            ]}
                          >
                            {role.label}
                          </Text>
                          <Text
                            style={[
                              styles.roleDescription,
                              isSelected && styles.roleDescriptionSelected,
                            ]}
                          >
                            {role.description}
                          </Text>
                        </View>

                        {isSelected && (
                          <MotiView
                            from={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: 'spring', delay: 200 }}
                            style={styles.checkmark}
                          >
                            <View style={styles.checkmarkCircle}>
                              <Text style={styles.checkmarkText}>✓</Text>
                            </View>
                          </MotiView>
                        )}
                      </LinearGradient>
                    </TouchableOpacity>
                  </MotiView>
                );
              })}
            </View>

            <View style={styles.divider} />

            <Text style={styles.label}>Mobile Number</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.countryCode}>+91</Text>
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={(text) => {
                  setPhone(text);
                  setError('');
                }}
                keyboardType="phone-pad"
                maxLength={10}
                placeholder="Enter 10-digit number"
                placeholderTextColor="#475569"
                onSubmitEditing={handleContinue}
                returnKeyType="done"
              />
            </View>

            {error && (
              <MotiView
                from={{ opacity: 0, translateY: -10 }}
                animate={{ opacity: 1, translateY: 0 }}
                style={styles.errorContainer}
              >
                <Text style={styles.errorText}>{error}</Text>
              </MotiView>
            )}

            <TouchableOpacity
              onPress={handleContinue}
              disabled={!isPhoneValid || loading}
              activeOpacity={0.8}
              style={[styles.button, (!isPhoneValid || loading) && styles.buttonDisabled]}
            >
              <LinearGradient
                colors={!isPhoneValid || loading ? ['#334155', '#1e293b'] : ['#3b82f6', '#2563eb']}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <Text style={styles.buttonText}>Continue</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </MotiView>

          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 800 }}
            style={styles.footer}
          >
            <Text style={styles.footerText}>
              By continuing, you agree to our Terms & Privacy Policy
            </Text>
          </MotiView>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f1419',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    marginBottom: 24,
  },
  logoGradient: {
    width: 72,
    height: 72,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  logoText: {
    fontSize: 36,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#94a3b8',
  },
  card: {
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.1)',
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 20,
    letterSpacing: 0.3,
  },
  rolesContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
    paddingHorizontal: 4,
  },
  roleWrapper: {
    flex: 1,
  },
  roleWrapperCenter: {
    zIndex: 1,
  },
  roleButton: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  roleGradient: {
    padding: 16,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.1)',
    minHeight: 140,
    position: 'relative',
    overflow: 'hidden',
  },
  roleGradientSelected: {
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    zIndex: 2,
  },
  decorIconWrapper: {
    position: 'absolute',
    top: -10,
    right: -10,
    zIndex: 0,
  },
  roleInfo: {
    alignItems: 'center',
    zIndex: 2,
  },
  roleText: {
    fontSize: 15,
    fontFamily: 'Inter-Bold',
    color: '#94a3b8',
    marginBottom: 4,
  },
  roleTextSelected: {
    color: '#ffffff',
  },
  roleDescription: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 16,
  },
  roleDescriptionSelected: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  checkmark: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 3,
  },
  checkmarkCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  checkmarkText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(148, 163, 184, 0.1)',
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.2)',
    marginBottom: 16,
  },
  countryCode: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#cbd5e1',
    marginRight: 12,
    paddingRight: 12,
    borderRightWidth: 1,
    borderRightColor: 'rgba(148, 163, 184, 0.2)',
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
    paddingVertical: 16,
  },
  errorContainer: {
    marginBottom: 16,
  },
  errorText: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    color: '#ef4444',
  },
  button: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonGradient: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  footer: {
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: 24,
  },
  footerText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 18,
  },
});
