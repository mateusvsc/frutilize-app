import { CartItem } from '../types';
import { Linking } from 'react-native';

export const formatPrice = (price: number): string => {
  return `R$ ${price.toFixed(2).replace('.', ',')}`;
};

export const generateOrderMessage = (items: CartItem[], total: number): string => {
  const phoneNumber = '5521968982850'; // (21) 96898-2850
  
  let message = `🍎 *PEDIDO FRUTILIZE* 🛒\n\n`;
  message += `*Itens do pedido:*\n`;
  
  items.forEach((item, index) => {
    const itemTotal = item.product.price * item.quantity;
    message += `${index + 1}. ${item.product.emoji} ${item.product.name} - ${item.quantity} ${item.product.unit} - ${formatPrice(itemTotal)}\n`;
  });
  
  message += `\n*Total: ${formatPrice(total)}*\n\n`;
  message += `💚 Obrigado pelo pedido! 💚\n`;
  message += `Entraremos em contato para confirmar.`;
  
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};

export const sendWhatsAppOrder = async (items: CartItem[], total: number): Promise<void> => {
  const url = generateOrderMessage(items, total);
  
  const supported = await Linking.canOpenURL(url);
  
  if (supported) {
    await Linking.openURL(url);
  } else {
    throw new Error('Não foi possível abrir o WhatsApp');
  }
};