import React, { JSX } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '../../components/themed-text';
import { ThemedView } from '../../components/themed-view';

export default function LayoutScreen(): JSX.Element {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Fruitilize Layout</ThemedText>
      <ThemedText type="default">
        Bem-vindo ao Fruitilize! Organize suas frutas aqui.
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});