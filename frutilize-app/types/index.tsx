export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'frutas' | 'legumes' | 'verduras' | 'bebidas' | 'outros';
  unit: string;
  emoji: string;
  available: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getTotalItems: () => number;
}