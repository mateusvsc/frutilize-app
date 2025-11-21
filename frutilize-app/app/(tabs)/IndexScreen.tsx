import React, { JSX } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '../../components/themed-text';
import { ThemedView } from '../../components/themed-view';

export default function IndexScreen(): JSX.Element {
  const fruits = ['Maçã', 'Banana', 'Laranja', 'Uva', 'Morango', 'Abacaxi'];

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Índice de Frutas</ThemedText>
      <ScrollView style={styles.scrollView}>
        {fruits.map((fruit, index) => (
          <ThemedView key={index} style={styles.fruitItem}>
            <ThemedText type="defaultSemiBold">{fruit}</ThemedText>
          </ThemedView>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollView: {
    marginTop: 20,
  },
  fruitItem: {
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    backgroundColor: 'rgba(46, 139, 87, 0.1)',
  },
});