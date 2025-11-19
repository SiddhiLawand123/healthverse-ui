import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export default function PrimaryButton({ title, onPress, disabled = false, loading = false }: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={styles.container}
    >
      <MotiView
        animate={{
          scale: disabled ? 1 : 1,
        }}
        transition={{
          type: 'timing',
          duration: 150,
        }}
        style={styles.buttonWrapper}
      >
        <LinearGradient
          colors={disabled ? ['#444', '#555'] : ['#FFB84D', '#FF6B6B']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          {loading && (
            <MotiView
              from={{ opacity: 0.3 }}
              animate={{ opacity: 0.6 }}
              transition={{
                type: 'timing',
                duration: 1000,
                loop: true,
                repeatReverse: true,
              }}
              style={styles.shimmer}
            />
          )}
          {loading ? (
            <ActivityIndicator size="small" color="#0A0E27" />
          ) : (
            <Text style={styles.text}>{title}</Text>
          )}
        </LinearGradient>
      </MotiView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#FFB84D',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  buttonWrapper: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  shimmer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0A0E27',
    letterSpacing: 0.5,
  },
});
