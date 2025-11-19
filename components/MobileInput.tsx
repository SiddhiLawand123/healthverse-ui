import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MotiView } from 'moti';
import { Phone } from 'lucide-react-native';

interface MobileInputProps {
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  onSubmit?: () => void;
}

export default function MobileInput({ value, onChangeText, error, onSubmit }: MobileInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const isValid = value.length === 10 && /^\d+$/.test(value);

  return (
    <View style={styles.container}>
      <MotiView
        animate={{
          borderColor: error ? '#FF6B6B' : isFocused ? '#00F5FF' : 'rgba(255, 255, 255, 0.15)',
          shadowOpacity: isFocused ? 0.2 : 0,
        }}
        transition={{
          type: 'timing',
          duration: 200,
        }}
        style={styles.inputContainer}
      >
        <View style={styles.iconWrapper}>
          <Phone size={20} color={isFocused ? '#00F5FF' : 'rgba(255, 255, 255, 0.4)'} strokeWidth={2} />
        </View>

        <TouchableOpacity style={styles.countryCode}>
          <Text style={styles.countryCodeText}>🇮🇳 +91</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder="Mobile Number"
          placeholderTextColor="rgba(255, 255, 255, 0.3)"
          keyboardType="phone-pad"
          maxLength={10}
          autoFocus
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onSubmitEditing={onSubmit}
          returnKeyType="done"
        />

        {isValid && (
          <MotiView
            from={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: 'spring',
              damping: 12,
            }}
            style={styles.checkmark}
          >
            <View style={styles.checkmarkCircle}>
              <Text style={styles.checkmarkText}>✓</Text>
            </View>
          </MotiView>
        )}
      </MotiView>

      {error && (
        <MotiView
          from={{ opacity: 0, translateX: -10 }}
          animate={{ opacity: 1, translateX: 0 }}
          style={styles.errorContainer}
        >
          <Text style={styles.errorText}>{error}</Text>
        </MotiView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 4,
    height: 64,
  },
  iconWrapper: {
    marginRight: 12,
  },
  countryCode: {
    paddingRight: 12,
    borderRightWidth: 1,
    borderRightColor: 'rgba(255, 255, 255, 0.1)',
    marginRight: 12,
  },
  countryCodeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  input: {
    flex: 1,
    fontSize: 17,
    fontWeight: '500',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  checkmark: {
    marginLeft: 8,
  },
  checkmarkCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#00F5FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0A0E27',
  },
  errorContainer: {
    marginTop: 8,
    paddingLeft: 16,
  },
  errorText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#FF6B6B',
  },
});
