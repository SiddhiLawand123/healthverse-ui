import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { ArrowLeft, FlaskConical, User, Stethoscope, Building2, CheckSquare, FileText, Image as ImageIcon, Upload, X } from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTheme, lightTheme, darkTheme } from '../../contexts/ThemeContext';

interface UploadedFile {
  id: string;
  name: string;
  type: 'pdf' | 'image';
}

export default function ProcessRequestScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { isDark } = useTheme();
  const colors = isDark ? darkTheme : lightTheme;

  const requestData = params.requestData ? JSON.parse(params.requestData as string) : null;
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  if (!requestData) {
    return null;
  }

  const handleUploadPdf = () => {
    const newFile: UploadedFile = {
      id: Date.now().toString(),
      name: `report_CBC_23Nov.pdf`,
      type: 'pdf',
    };
    setUploadedFiles([...uploadedFiles, newFile]);
  };

  const handleUploadImage = () => {
    const newFile: UploadedFile = {
      id: Date.now().toString(),
      name: `file_Lipid_23Nov.png`,
      type: 'image',
    };
    setUploadedFiles([...uploadedFiles, newFile]);
  };

  const handleRemoveFile = (id: string) => {
    setUploadedFiles(uploadedFiles.filter(file => file.id !== id));
  };

  const handleSubmit = () => {
    router.push({
      pathname: '/success-confirmation',
      params: {
        requestData: JSON.stringify(requestData),
        uploadedFiles: JSON.stringify(uploadedFiles),
      },
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.containerBg }]}>
      <LinearGradient colors={colors.background} style={styles.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} />

      <View style={[styles.header, { paddingTop: Platform.OS === 'ios' ? 50 : (StatusBar.currentHeight || 0) + 10 }]}>
        <TouchableOpacity onPress={() => router.back()} style={[styles.backButton, { backgroundColor: colors.accentLight }]}>
          <ArrowLeft size={22} color={colors.accent} strokeWidth={2} />
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <FlaskConical size={24} color={colors.accent} strokeWidth={2} />
          <Text style={[styles.headerTitle, { color: colors.text }]}>Process Request</Text>
        </View>

        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 100, type: 'spring' }}
          style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}
        >
          <View style={styles.cardHeader}>
            <View style={[styles.iconBadge, { backgroundColor: `${colors.accent}15` }]}>
              <User size={20} color={colors.accent} strokeWidth={2} />
            </View>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Patient Info</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.textTertiary }]}>Name:</Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>{requestData.patient}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.textTertiary }]}>Patient ID:</Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>{requestData.patientId}</Text>
          </View>
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 200, type: 'spring' }}
          style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}
        >
          <View style={styles.cardHeader}>
            <View style={[styles.iconBadge, { backgroundColor: 'rgba(16, 185, 129, 0.15)' }]}>
              <Stethoscope size={20} color="#10b981" strokeWidth={2} />
            </View>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Doctor & Hospital</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.textTertiary }]}>Doctor:</Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>{requestData.doctor}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.textTertiary }]}>Hospital:</Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>{requestData.hospital}</Text>
          </View>
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 300, type: 'spring' }}
          style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}
        >
          <View style={styles.cardHeader}>
            <View style={[styles.iconBadge, { backgroundColor: 'rgba(245, 158, 11, 0.15)' }]}>
              <CheckSquare size={20} color="#f59e0b" strokeWidth={2} />
            </View>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Requested Tests</Text>
          </View>
          {requestData.tests.map((test: string, index: number) => (
            <View key={index} style={styles.testItem}>
              <View style={[styles.testCheckbox, { backgroundColor: `${colors.accent}15`, borderColor: colors.accent }]}>
                <Text style={[styles.checkmark, { color: colors.accent }]}>✓</Text>
              </View>
              <Text style={[styles.testName, { color: colors.text }]}>{test}</Text>
            </View>
          ))}
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 400, type: 'spring' }}
          style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}
        >
          <View style={styles.cardHeader}>
            <View style={[styles.iconBadge, { backgroundColor: 'rgba(59, 130, 246, 0.15)' }]}>
              <Upload size={20} color="#3b82f6" strokeWidth={2} />
            </View>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Upload Report</Text>
          </View>

          <View style={styles.uploadButtons}>
            <TouchableOpacity onPress={handleUploadPdf} style={styles.uploadButton} activeOpacity={0.7}>
              <LinearGradient
                colors={['#ef4444', '#dc2626']}
                style={styles.uploadGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <FileText size={20} color="#ffffff" strokeWidth={2} />
                <Text style={styles.uploadButtonText}>Upload PDF</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleUploadImage} style={styles.uploadButton} activeOpacity={0.7}>
              <LinearGradient
                colors={['#8b5cf6', '#7c3aed']}
                style={styles.uploadGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <ImageIcon size={20} color="#ffffff" strokeWidth={2} />
                <Text style={styles.uploadButtonText}>Upload Image</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {uploadedFiles.length > 0 && (
            <View style={styles.uploadedFilesContainer}>
              <Text style={[styles.uploadedFilesTitle, { color: colors.textSecondary }]}>
                Uploaded Files ({uploadedFiles.length})
              </Text>
              {uploadedFiles.map((file) => (
                <MotiView
                  key={file.id}
                  from={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring' }}
                  style={[styles.fileItem, { backgroundColor: colors.containerBg, borderColor: colors.cardBorder }]}
                >
                  <View style={styles.fileLeft}>
                    <View style={[styles.fileIcon, { backgroundColor: file.type === 'pdf' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(139, 92, 246, 0.15)' }]}>
                      {file.type === 'pdf' ? (
                        <FileText size={16} color="#ef4444" strokeWidth={2} />
                      ) : (
                        <ImageIcon size={16} color="#8b5cf6" strokeWidth={2} />
                      )}
                    </View>
                    <View style={styles.fileInfo}>
                      <Text style={[styles.fileName, { color: colors.text }]}>{file.name}</Text>
                      <Text style={[styles.fileType, { color: colors.textTertiary }]}>
                        {file.type === 'pdf' ? 'PDF Document' : 'Image File'}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => handleRemoveFile(file.id)} style={styles.removeButton}>
                    <X size={18} color={colors.textSecondary} strokeWidth={2} />
                  </TouchableOpacity>
                </MotiView>
              ))}
            </View>
          )}
        </MotiView>
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: colors.containerBg, borderTopColor: colors.cardBorder }]}>
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={uploadedFiles.length === 0}
          style={[styles.submitButton, uploadedFiles.length === 0 && styles.submitButtonDisabled]}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={uploadedFiles.length === 0 ? ['#94a3b8', '#64748b'] : ['#10b981', '#059669']}
            style={styles.submitGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Upload size={20} color="#ffffff" strokeWidth={2} />
            <Text style={styles.submitButtonText}>Mark as Processed + Upload Report</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 12,
    backgroundColor: 'transparent',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 120,
  },
  card: {
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  iconBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
    gap: 8,
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    width: 90,
  },
  infoValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    flex: 1,
  },
  testItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  testCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
  },
  testName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    flex: 1,
  },
  uploadButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  uploadButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  uploadGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
  },
  uploadButtonText: {
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  uploadedFilesContainer: {
    marginTop: 8,
  },
  uploadedFilesTitle: {
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 12,
  },
  fileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
  },
  fileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  fileIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 2,
  },
  fileType: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
  },
  removeButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    borderTopWidth: 1,
  },
  submitButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
  },
  submitButtonText: {
    fontSize: 15,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
});
