import React, { JSX } from 'react';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '../../components/themed-text';
import { ThemedView } from '../../components/themed-view';
import ParallaxScrollView from '../../components/parallax-scroll-view';

export default function ExploreScreen(): JSX.Element {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A8E6CF', dark: '#1B5E20' }}
      headerImage={
        <Ionicons
          size={310}
          name="leaf-outline"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explorar Frutas</ThemedText>
      </ThemedView>
      <ThemedText>
        Descubra novas frutas e suas propriedades nutritivas.
      </ThemedText>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#2E8B57',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
});