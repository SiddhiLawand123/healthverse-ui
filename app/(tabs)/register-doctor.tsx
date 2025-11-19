import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Stethoscope, User, FileText } from 'lucide-react-native';
import { authFlowService } from '../../services/AuthFlowService';

export default function RegisterDoctorScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { phone } = params;

  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    registrationNumber: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isFormValid = formData.name.trim() && formData.specialization.trim() && formData.registrationNumber.trim();

  const handleRegister = async () => {
    if (!isFormValid || loading) return;

    setLoading(true);
    setError('');

    try {
      const response = await authFlowService.registerDoctor(phone as string, formData);

      if (response.success) {
        router.replace('/doctor-home');
      } else {
        setError(response.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
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
            <View style={styles.iconContainer}>
              <LinearGradient
                colors={['#10b981', '#059669']}
                style={styles.iconGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Stethoscope size={32} color="#ffffff" strokeWidth={2} />
              </LinearGradient>
            </View>
            <Text style={styles.title}>Doctor Registration</Text>
            <Text style={styles.subtitle}>Complete your professional profile</Text>
          </MotiView>

          <MotiView
            from={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', delay: 200, damping: 15 }}
            style={styles.card}
          >
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <View style={styles.inputContainer}>
                <User size={20} color="#94a3b8" strokeWidth={2} />
                <TextInput
                  style={styles.input}
                  value={formData.name}
                  onChangeText={(text) => setFormData({ ...formData, name: text })}
                  placeholder="Dr. John Doe"
                  placeholderTextColor="#475569"
                  returnKeyType="next"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Specialization</Text>
              <View style={styles.inputContainer}>
                <Stethoscope size={20} color="#94a3b8" strokeWidth={2} />
                <TextInput
                  style={styles.input}
                  value={formData.specialization}
                  onChangeText={(text) => setFormData({ ...formData, specialization: text })}
                  placeholder="e.g., Cardiologist"
                  placeholderTextColor="#475569"
                  returnKeyType="next"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Registration Number</Text>
              <View style={styles.inputContainer}>
                <FileText size={20} color="#94a3b8" strokeWidth={2} />
                <TextInput
                  style={styles.input}
                  value={formData.registrationNumber}
                  onChangeText={(text) => setFormData({ ...formData, registrationNumber: text })}
                  placeholder="Medical Council Registration No."
                  placeholderTextColor="#475569"
                  returnKeyType="done"
                  onSubmitEditing={handleRegister}
                />
              </View>
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
              onPress={handleRegister}
              disabled={!isFormValid || loading}
              activeOpacity={0.8}
              style={[styles.button, (!isFormValid || loading) && styles.buttonDisabled]}
            >
              <LinearGradient
                colors={!isFormValid || loading ? ['#334155', '#1e293b'] : ['#10b981', '#059669']}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <Text style={styles.buttonText}>Complete Registration</Text>
                )}
              </LinearGradient>
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
  iconContainer: {
    marginBottom: 20,
  },
  iconGradient: {
    width: 80,
    height: 80,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    color: '#94a3b8',
  },
  card: {
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.1)',
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#cbd5e1',
    marginBottom: 10,
    letterSpacing: 0.5,
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
    gap: 12,
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
});
