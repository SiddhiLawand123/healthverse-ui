import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { User, Stethoscope, FlaskConical } from 'lucide-react-native';

export type Role = 'patient' | 'doctor' | 'lab';

interface RoleSelectorProps {
  selectedRole: Role;
  onSelectRole: (role: Role) => void;
}

const roles: { id: Role; label: string; icon: typeof User }[] = [
  { id: 'patient', label: 'Patient', icon: User },
  { id: 'doctor', label: 'Doctor', icon: Stethoscope },
  { id: 'lab', label: 'Lab', icon: FlaskConical },
];

export default function RoleSelector({ selectedRole, onSelectRole }: RoleSelectorProps) {
  return (
    <View style={styles.container}>
      {roles.map((role, index) => {
        const Icon = role.icon;
        const isSelected = selectedRole === role.id;

        return (
          <TouchableOpacity
            key={role.id}
            onPress={() => onSelectRole(role.id)}
            activeOpacity={0.7}
          >
            <MotiView
              from={{ opacity: 0, translateY: 20 }}
              animate={{
                opacity: 1,
                translateY: 0,
                scale: isSelected ? 1.05 : 1,
              }}
              transition={{
                type: 'spring',
                damping: 15,
                stiffness: 150,
                delay: index * 100,
              }}
              style={[
                styles.chip,
                isSelected && styles.chipSelected,
              ]}
            >
              {isSelected && (
                <MotiView
                  from={{ opacity: 0 }}
                  animate={{ opacity: 0.15 }}
                  transition={{
                    type: 'timing',
                    duration: 1500,
                    loop: true,
                    repeatReverse: true,
                  }}
                  style={styles.chipGlow}
                />
              )}

              <Icon
                size={18}
                color={isSelected ? '#00F5FF' : 'rgba(255, 255, 255, 0.5)'}
                strokeWidth={2}
              />
              <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                {role.label}
              </Text>
            </MotiView>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    position: 'relative',
    overflow: 'hidden',
  },
  chipSelected: {
    backgroundColor: 'rgba(0, 245, 255, 0.1)',
    borderColor: 'rgba(0, 245, 255, 0.4)',
    shadowColor: '#00F5FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  chipGlow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#00F5FF',
  },
  chipText: {
    fontSize: 15,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.6)',
    letterSpacing: 0.3,
  },
  chipTextSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
