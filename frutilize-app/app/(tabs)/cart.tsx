import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, Alert, View } from 'react-native';
import { ThemedView } from '../../components/themed-view';
import { ThemedText } from '../../components/themed-text';
import CartItem from '../../components/ui/CartItem';
import { useCart } from '../../hooks/useCart';
import { sendWhatsAppOrder, formatPrice } from '../../utils/whatsapp';

export default function CartScreen(): React.JSX.Element {
  const { items, clearCart, getTotal, getTotalItems } = useCart();
  const total = getTotal();
  const totalItems = getTotalItems();

  const handleCheckout = async () => {
    if (items.length === 0) {
      Alert.alert('Carrinho vazio', 'Adicione itens ao carrinho antes de finalizar o pedido.');
      return;
    }

    try {
      await sendWhatsAppOrder(items, total);
      clearCart();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível enviar o pedido para o WhatsApp.');
    }
  };

  // Tela de carrinho vazio - completamente centralizada
  if (items.length === 0) {
    return (
      <View style={styles.emptyScreenContainer}>
        <ThemedView style={styles.emptyContainer}>
          <ThemedText style={styles.emptyEmoji}>🛒</ThemedText>
          <ThemedText type="title" style={styles.emptyTitle}>
            Carrinho vazio
          </ThemedText>
          <ThemedText type="default" style={styles.emptyDescription}>
            Adicione alguns produtos deliciosos ao seu carrinho!
          </ThemedText>
        </ThemedView>
      </View>
    );
  }

  // Tela de carrinho com itens
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>Meu Carrinho</ThemedText>
        <ThemedText type="default" style={styles.itemCount}>
          {totalItems} {totalItems === 1 ? 'item' : 'itens'}
        </ThemedText>
      </ThemedView>

      <FlatList
        data={items}
        keyExtractor={(item) => item.product.id}
        renderItem={({ item }) => <CartItem item={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        style={styles.flatList}
      />

      <ThemedView style={styles.footer}>
        <ThemedView style={styles.totalContainer}>
          <ThemedText type="subtitle">Total:</ThemedText>
          <ThemedText type="subtitle">{formatPrice(total)}</ThemedText>
        </ThemedView>

        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <ThemedText style={styles.checkoutText}>📱 Enviar Pedido para WhatsApp</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  // Container especial para tela vazia
  emptyScreenContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF', // ou a cor do seu tema
  },
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 20,
  },
  itemCount: {
    opacity: 0.7,
    fontSize: 14,
  },
  flatList: {
    flex: 1,
  },
  list: {
    padding: 8,
    flexGrow: 1,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  checkoutButton: {
    backgroundColor: '#2E8B57',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    marginBottom: 12,
    textAlign: 'center',
    fontSize: 20,
  },
  emptyDescription: {
    textAlign: 'center',
    opacity: 0.7,
    fontSize: 16,
    lineHeight: 22,
  },
});