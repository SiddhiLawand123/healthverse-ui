import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { MotiView } from 'moti';

export default function OnboardingSlide1() {
  return (
    <View style={styles.container}>
      <MotiView
        from={{ opacity: 0, translateY: -30 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 800, delay: 200 }}
        style={styles.heroContainer}
      >
        <MotiView
          from={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 100,
            delay: 400,
          }}
          style={styles.imageContainer}
        >
          <Image
            source={require('../assets/images/Gemini_Generated_Image_lf4jhdlf4jhdlf4j.png')}
            style={styles.doctorImage}
            resizeMode="cover"
          />
        </MotiView>

        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.15, scale: 1.2 }}
          transition={{
            type: 'timing',
            duration: 2000,
            loop: true,
            repeatReverse: true,
          }}
          style={styles.glowCircle}
        />
      </MotiView>

      <MotiView
        from={{ opacity: 0, translateY: 30 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 600, delay: 600 }}
        style={styles.textContainer}
      >
        <Text style={styles.title}>HealthVerse</Text>
        <Text style={styles.description}>
          One place for all your medical records.
        </Text>
      </MotiView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  heroContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60,
    height: 360,
  },
  imageContainer: {
    width: 280,
    height: 280,
    borderRadius: 140,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: 'rgba(59, 130, 246, 0.35)',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 12,
  },
  doctorImage: {
    width: '100%',
    height: '100%',
  },
  glowCircle: {
    position: 'absolute',
    width: 340,
    height: 340,
    borderRadius: 170,
    backgroundColor: '#3b82f6',
    zIndex: -1,
  },
  textContainer: {
    alignItems: 'center',
    maxWidth: 320,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#1a1a2e',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 17,
    fontWeight: '400',
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 26,
  },
});
