import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, StatusBar, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useTheme } from '../../hooks/useTheme';
import { AudioPlayerControls } from '../../components/AudioPlayerControls';
import { getMeditationById } from '../../data/meditations';
import Spacing from '../../constants/Spacing';
import Typography from '../../constants/Typography';
import { ArrowLeft, Clock } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function MeditationScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useTheme();
  
  const meditation = getMeditationById(id as string);
  
  useEffect(() => {
    if (!meditation) {
      router.back();
    }
  }, [meditation, router]);
  
  if (!meditation) {
    return null;
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: meditation.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.7)', 'transparent', 'rgba(0,0,0,0.7)']}
            style={styles.gradient}
          />
        </View>

        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <View style={styles.backButtonInner}>
            <ArrowLeft color="white" size={24} />
          </View>
        </TouchableOpacity>
        
        <ScrollView style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <Text style={[styles.title, { color: theme.text }]}>
              {meditation.title}
            </Text>
            
            <View style={styles.metaContainer}>
              <View style={styles.metaRow}>
                <View 
                  style={[
                    styles.categoryBadge,
                    { backgroundColor: theme.secondaryLight }
                  ]}
                >
                  <Text 
                    style={[
                      styles.categoryText,
                      { color: theme.primaryDark }
                    ]}
                  >
                    {meditation.category.replace(/-/g, ' ')}
                  </Text>
                </View>
                
                <View style={styles.lengthContainer}>
                  <Clock size={14} color={theme.textTertiary} />
                  <Text 
                    style={[
                      styles.lengthText,
                      { color: theme.textTertiary }
                    ]}
                  >
                    {meditation.length}
                  </Text>
                </View>
              </View>
            </View>
            
            <Text style={[styles.description, { color: theme.textSecondary }]}>
              {meditation.description}
            </Text>
          </View>
          
          <AudioPlayerControls 
            audioUri={meditation.audioUrl}
            title={meditation.title}
          />
          
          <View style={styles.infoSection}>
            <Text style={[styles.infoTitle, { color: theme.text }]}>
              How to practice
            </Text>
            <Text style={[styles.infoText, { color: theme.textSecondary }]}>
              Find a quiet, comfortable place where you won't be disturbed. Sit or lie down in a comfortable position. Take a few deep breaths to center yourself before starting the meditation.
            </Text>
            <Text style={[styles.infoText, { color: theme.textSecondary }]}>
              Allow yourself to fully experience the meditation without judgment. If your mind wanders, gently bring your attention back to the guide's voice.
            </Text>
          </View>
          
          <View style={styles.infoSection}>
            <Text style={[styles.infoTitle, { color: theme.text }]}>
              Benefits
            </Text>
            <Text style={[styles.infoText, { color: theme.textSecondary }]}>
              Regular practice of this meditation can help reduce stress, improve focus, and promote overall mental wellbeing. Many practitioners report improved sleep quality and reduced anxiety.
            </Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    height: 240,
    width: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 16,
    zIndex: 10,
  },
  backButtonInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    paddingTop: Spacing.lg,
  },
  headerContainer: {
    paddingHorizontal: Spacing.md,
  },
  title: {
    fontSize: Typography.fontSizes.xxl,
    fontFamily: 'Inter-Bold',
    marginBottom: Spacing.sm,
  },
  metaContainer: {
    marginBottom: Spacing.md,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  categoryBadge: {
    borderRadius: 12,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
  },
  categoryText: {
    fontSize: Typography.fontSizes.sm,
    fontFamily: 'Inter-Medium',
    textTransform: 'capitalize',
  },
  lengthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  lengthText: {
    fontSize: Typography.fontSizes.sm,
    fontFamily: 'Inter-Regular',
  },
  description: {
    fontSize: Typography.fontSizes.md,
    fontFamily: 'Inter-Regular',
    lineHeight: Typography.lineHeights.body * Typography.fontSizes.md,
  },
  infoSection: {
    paddingHorizontal: Spacing.md,
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
  },
  infoTitle: {
    fontSize: Typography.fontSizes.lg,
    fontFamily: 'Inter-Bold',
    marginBottom: Spacing.sm,
  },
  infoText: {
    fontSize: Typography.fontSizes.md,
    fontFamily: 'Inter-Regular',
    lineHeight: Typography.lineHeights.body * Typography.fontSizes.md,
    marginBottom: Spacing.md,
  },
});