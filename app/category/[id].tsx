import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useTheme } from '../../hooks/useTheme';
import { MeditationCard } from '../../components/MeditationCard';
import { categories } from '../../data/categories';
import { getMeditationsByCategory } from '../../data/meditations';
import Spacing from '../../constants/Spacing';
import Typography from '../../constants/Typography';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ArrowLeft } from 'lucide-react-native';
import { Meditation } from '../../types/Meditation';

export default function CategoryScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useTheme();
  
  const category = categories.find(cat => cat.id === id);
  const meditations = getMeditationsByCategory(id as string);
  
  if (!category) {
    router.back();
    return null;
  }

  const renderItem = ({ item }: { item: Meditation }) => (
    <MeditationCard meditation={item} />
  );

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: category.name,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft color={theme.text} size={24} />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: theme.background,
          },
          headerTintColor: theme.text,
          headerShadowVisible: false,
        }} 
      />
      
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.headerContainer}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            {category.name}
          </Text>
          <Text style={[styles.headerDescription, { color: theme.textSecondary }]}>
            {category.description}
          </Text>
          
          <View style={styles.lengthsContainer}>
            <Text style={[styles.lengthsTitle, { color: theme.text }]}>
              Available Durations:
            </Text>
            <View style={styles.lengthBadgesContainer}>
              {category.availableLengths.map((length, index) => (
                <View 
                  key={index} 
                  style={[
                    styles.lengthBadge,
                    { backgroundColor: theme.secondaryLight }
                  ]}
                >
                  <Text 
                    style={[
                      styles.lengthText,
                      { color: theme.primaryDark }
                    ]}
                  >
                    {length}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.meditationsContainer}>
          <Text style={[styles.meditationsTitle, { color: theme.text }]}>
            {meditations.length} {meditations.length === 1 ? 'Meditation' : 'Meditations'}
          </Text>
          
          <FlatList
            data={meditations}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
                  No meditations available in this category yet.
                </Text>
              </View>
            }
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    padding: Spacing.md,
  },
  headerTitle: {
    fontSize: Typography.fontSizes.xxl,
    fontFamily: 'Inter-Bold',
    marginBottom: Spacing.sm,
  },
  headerDescription: {
    fontSize: Typography.fontSizes.md,
    fontFamily: 'Inter-Regular',
    marginBottom: Spacing.lg,
    lineHeight: Typography.lineHeights.body * Typography.fontSizes.md,
  },
  lengthsContainer: {
    marginBottom: Spacing.md,
  },
  lengthsTitle: {
    fontSize: Typography.fontSizes.md,
    fontFamily: 'Inter-Medium',
    marginBottom: Spacing.sm,
  },
  lengthBadgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  lengthBadge: {
    borderRadius: 12,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    marginRight: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  lengthText: {
    fontSize: Typography.fontSizes.sm,
    fontFamily: 'Inter-Medium',
  },
  divider: {
    height: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  meditationsContainer: {
    flex: 1,
    padding: Spacing.md,
  },
  meditationsTitle: {
    fontSize: Typography.fontSizes.lg,
    fontFamily: 'Inter-Bold',
    marginBottom: Spacing.md,
  },
  listContent: {
    paddingBottom: Spacing.lg,
  },
  emptyContainer: {
    padding: Spacing.lg,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
});