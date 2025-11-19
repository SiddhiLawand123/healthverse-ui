import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { MotiView } from 'moti';
import { KeyRound, Lock, ShieldCheck, ChevronRight } from 'lucide-react-native';
import MobileInput from './MobileInput';
import PrimaryButton from './PrimaryButton';
import RoleSelector, { Role } from './RoleSelector';

interface LoginCardProps {
  onContinue: (phone: string, role: Role) => void;
  loading: boolean;
  error?: string;
}

export default function LoginCard({ onContinue, loading, error }: LoginCardProps) {
  const [phone, setPhone] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role>('patient');
  const [isFocused, setIsFocused] = useState(false);

  const isPhoneValid = phone.length === 10 && /^\d+$/.test(phone);

  const handleContinue = () => {
    if (isPhoneValid && !loading) {
      onContinue(phone, selectedRole);
    }
  };

  return (
    <MotiView
      from={{ opacity: 0, translateY: 50 }}
      animate={{
        opacity: 1,
        translateY: 0,
        scale: isFocused ? 1.02 : 1,
      }}
      transition={{
        type: 'spring',
        damping: 20,
        stiffness: 100,
        delay: 400,
      }}
      style={styles.container}
    >
      {Platform.OS === 'ios' || Platform.OS === 'android' ? (
        <BlurView intensity={20} tint="dark" style={styles.blurContainer}>
          <View style={styles.content}>
            <CardContent
              phone={phone}
              setPhone={setPhone}
              selectedRole={selectedRole}
              setSelectedRole={setSelectedRole}
              error={error}
              isPhoneValid={isPhoneValid}
              loading={loading}
              handleContinue={handleContinue}
              setIsFocused={setIsFocused}
            />
          </View>
        </BlurView>
      ) : (
        <View style={[styles.blurContainer, styles.webBlur]}>
          <View style={styles.content}>
            <CardContent
              phone={phone}
              setPhone={setPhone}
              selectedRole={selectedRole}
              setSelectedRole={setSelectedRole}
              error={error}
              isPhoneValid={isPhoneValid}
              loading={loading}
              handleContinue={handleContinue}
              setIsFocused={setIsFocused}
            />
          </View>
        </View>
      )}
    </MotiView>
  );
}

interface CardContentProps {
  phone: string;
  setPhone: (phone: string) => void;
  selectedRole: Role;
  setSelectedRole: (role: Role) => void;
  error?: string;
  isPhoneValid: boolean;
  loading: boolean;
  handleContinue: () => void;
  setIsFocused: (focused: boolean) => void;
}

function CardContent({
  phone,
  setPhone,
  selectedRole,
  setSelectedRole,
  error,
  isPhoneValid,
  loading,
  handleContinue,
  setIsFocused,
}: CardContentProps) {
  return (
    <>
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 600, duration: 400 }}
      >
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>
      </MotiView>

      <View style={styles.formContainer}>
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 700 }}
        >
          <RoleSelector selectedRole={selectedRole} onSelectRole={setSelectedRole} />
        </MotiView>

        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 800 }}
        >
          <MobileInput
            value={phone}
            onChangeText={setPhone}
            error={error}
            onSubmit={handleContinue}
          />
        </MotiView>

        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: 'spring',
            damping: 15,
            delay: 900,
          }}
        >
          <PrimaryButton
            title="Continue"
            onPress={handleContinue}
            disabled={!isPhoneValid}
            loading={loading}
          />
        </MotiView>

        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1000 }}
          style={styles.alternativeOptions}
        >
          <Text style={styles.alternativeTitle}>Or login with</Text>
          <AlternativeOption icon={KeyRound} label="Login with mPIN" />
          <AlternativeOption icon={Lock} label="Login with Password" />
          <AlternativeOption icon={ShieldCheck} label="Login using ABHA ID" />
        </MotiView>
      </View>
    </>
  );
}

interface AlternativeOptionProps {
  icon: typeof KeyRound;
  label: string;
}

function AlternativeOption({ icon: Icon, label }: AlternativeOptionProps) {
  return (
    <TouchableOpacity style={styles.alternativeOption} activeOpacity={0.7}>
      <Icon size={18} color="rgba(255, 255, 255, 0.5)" strokeWidth={2} />
      <Text style={styles.alternativeLabel}>{label}</Text>
      <ChevronRight size={16} color="rgba(255, 255, 255, 0.3)" strokeWidth={2} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 28,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  blurContainer: {
    width: '100%',
    borderRadius: 28,
  },
  webBlur: {
    backgroundColor: 'rgba(26, 31, 58, 0.7)',
  },
  content: {
    padding: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 32,
  },
  formContainer: {
    width: '100%',
  },
  alternativeOptions: {
    marginTop: 32,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  alternativeTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.4)',
    marginBottom: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  alternativeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    marginBottom: 10,
  },
  alternativeLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.7)',
  },
});
