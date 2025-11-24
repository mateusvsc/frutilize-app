// app/(tabs)/index.tsx
import { StyleSheet } from 'react-native';
import { ThemedText } from '../../components/themed-text';
import { ThemedView } from '../../components/themed-view';

export default function IndexScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Fruitilize - Início</ThemedText>
      <ThemedText type="default">
        Bem-vindo ao app Frutilize! Esta é a primeira aba (Home).
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