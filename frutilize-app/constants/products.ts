import { Product } from '../types/index';

export const PRODUCTS: Product[] = [
  // 🍎 Frutas
  { id: '1', name: 'Abacate', price: 14.99, category: 'frutas', unit: 'kg', emoji: '🥑', available: true },
  { id: '2', name: 'Abacaxi', price: 4.99, category: 'frutas', unit: 'un', emoji: '🍍', available: true },
  { id: '3', name: 'Ameixa', price: 11.99, category: 'frutas', unit: 'kg', emoji: '🍑', available: true },
  { id: '4', name: 'Amora', price: 5.99, category: 'frutas', unit: 'bdj', emoji: '🫐', available: true },
  { id: '5', name: 'Banana d\'água', price: 5.99, category: 'frutas', unit: 'kg', emoji: '🍌', available: true },
  { id: '6', name: 'Banana ouro', price: 8.99, category: 'frutas', unit: 'kg', emoji: '🍌', available: true },
  { id: '7', name: 'Banana prata', price: 6.99, category: 'frutas', unit: 'kg', emoji: '🍌', available: true },
  { id: '8', name: 'Banana terra', price: 7.99, category: 'frutas', unit: 'kg', emoji: '🍌', available: true },
  { id: '9', name: 'Caju', price: 7.99, category: 'frutas', unit: 'bdj', emoji: '🌰', available: true },
  { id: '10', name: 'Cereja', price: 9.99, category: 'frutas', unit: 'bdj', emoji: '❤', available: true },
  { id: '11', name: 'Coco seco', price: 6.99, category: 'frutas', unit: 'kg', emoji: '🥥', available: true },
  { id: '12', name: 'Coco verde', price: 4.99, category: 'frutas', unit: 'un', emoji: '🥥', available: true },
  { id: '13', name: 'Goiaba', price: 3.99, category: 'frutas', unit: 'bdj', emoji: '🍈', available: true },
  { id: '14', name: 'Kiwi', price: 29.99, category: 'frutas', unit: 'kg', emoji: '🥝', available: true },
  { id: '15', name: 'Laranja lima', price: 7.99, category: 'frutas', unit: 'kg', emoji: '🍊', available: true },
  { id: '16', name: 'Laranja pera', price: 4.99, category: 'frutas', unit: 'kg', emoji: '🍊', available: true },
  { id: '17', name: 'Laranja seleta', price: 7.99, category: 'frutas', unit: 'kg', emoji: '🍊', available: true },
  { id: '18', name: 'Laranja', price: 7.99, category: 'frutas', unit: 'saco', emoji: '🍊', available: true },
  { id: '19', name: 'Limão', price: 2.99, category: 'frutas', unit: 'kg', emoji: '🍋', available: true },
  { id: '20', name: 'Maçã argentina', price: 14.99, category: 'frutas', unit: 'kg', emoji: '🍎', available: true },
  { id: '21', name: 'Maçã fuji', price: 14.99, category: 'frutas', unit: 'kg', emoji: '🍎', available: true },
  { id: '22', name: 'Maçã gala', price: 13.99, category: 'frutas', unit: 'kg', emoji: '🍎', available: true },
  { id: '23', name: 'Maçã', price: 6.99, category: 'frutas', unit: 'saquinho', emoji: '🍎', available: true },
  { id: '24', name: 'Maçã verde', price: 19.99, category: 'frutas', unit: 'kg', emoji: '🍏', available: true },
  { id: '25', name: 'Mamão formosa', price: 8.99, category: 'frutas', unit: 'kg', emoji: '🍈', available: true },
  { id: '26', name: 'Mamão papaia', price: 2.99, category: 'frutas', unit: 'un', emoji: '⭐', available: true },
  { id: '27', name: 'Manga carlotinha', price: 4.99, category: 'frutas', unit: 'kg', emoji: '🥭', available: true },
  { id: '28', name: 'Manga espada', price: 2.99, category: 'frutas', unit: 'kg', emoji: '🥭', available: true },
  { id: '29', name: 'Manga palmer', price: 5.99, category: 'frutas', unit: 'kg', emoji: '🥭', available: true },
  { id: '30', name: 'Manga tommy', price: 4.99, category: 'frutas', unit: 'kg', emoji: '🥭', available: true },
  { id: '31', name: 'Maracujá', price: 6.99, category: 'frutas', unit: 'kg', emoji: '🍋', available: true },
  { id: '32', name: 'Melancia', price: 3.99, category: 'frutas', unit: 'kg', emoji: '🍉', available: true },
  { id: '33', name: 'Melancia baby', price: 5.99, category: 'frutas', unit: 'kg', emoji: '🍉', available: true },
  { id: '34', name: 'Melão', price: 5.99, category: 'frutas', unit: 'kg', emoji: '🍈', available: true },
  { id: '35', name: 'Morango', price: 5.99, category: 'frutas', unit: 'bdj', emoji: '🍓', available: true },
  { id: '36', name: 'Pera d\'água', price: 19.99, category: 'frutas', unit: 'kg', emoji: '🍐', available: true },
  { id: '37', name: 'Pera portuguesa', price: 24.99, category: 'frutas', unit: 'kg', emoji: '🍐', available: true },
  { id: '38', name: 'Pêssego', price: 8.99, category: 'frutas', unit: 'kg', emoji: '🍑', available: true },
  { id: '39', name: 'Tangerina importada', price: 14.99, category: 'frutas', unit: 'kg', emoji: '🧡', available: true },
  { id: '40', name: 'Uva roxa', price: 6.99, category: 'frutas', unit: 'cx', emoji: '🍇', available: true },
  { id: '41', name: 'Uva verde', price: 5.99, category: 'frutas', unit: 'cx', emoji: '🍇', available: true },

  // Produtos Indisponíveis (Frutas)
  { id: '42', name: 'Caja', price: 0, category: 'frutas', unit: 'un', emoji: '❌', available: false },
  { id: '43', name: 'Caqui', price: 0, category: 'frutas', unit: 'un', emoji: '🍂', available: false },
  { id: '44', name: 'Carambola', price: 0, category: 'frutas', unit: 'un', emoji: '⭐', available: false },
  { id: '45', name: 'Jabuticaba', price: 0, category: 'frutas', unit: 'bdj', emoji: '⚫', available: false },
  { id: '46', name: 'Limão siciliano', price: 0, category: 'frutas', unit: 'kg', emoji: '🍋', available: false },
  { id: '47', name: 'Maracujá poupa', price: 0, category: 'frutas', unit: 'un', emoji: '🥤', available: false },
  { id: '48', name: 'Melancia amarela', price: 0, category: 'frutas', unit: 'kg', emoji: '⭐', available: false },
  { id: '49', name: 'Pera bandeja', price: 0, category: 'frutas', unit: 'un', emoji: '🍐', available: false },
  { id: '50', name: 'Pinha', price: 0, category: 'frutas', unit: 'un', emoji: '🫶🏽', available: false },
  { id: '51', name: 'Pitaya', price: 0, category: 'frutas', unit: 'un', emoji: '🐉', available: false },
  { id: '52', name: 'Roma', price: 0, category: 'frutas', unit: 'un', emoji: '🍎', available: false },
  { id: '53', name: 'Tangerina pokan', price: 0, category: 'frutas', unit: 'kg', emoji: '🍊', available: false },
  { id: '54', name: 'Uva rosada', price: 0, category: 'frutas', unit: 'cx', emoji: '🍇', available: false },

  // 🥕 Legumes
  { id: '55', name: 'Abóbora', price: 3.99, category: 'legumes', unit: 'kg', emoji: '🎃', available: true },
  { id: '56', name: 'Abobrinha', price: 1.99, category: 'legumes', unit: 'kg', emoji: '🥒', available: true },
  { id: '57', name: 'Aipim', price: 3.99, category: 'legumes', unit: 'kg', emoji: '🌱', available: true },
  { id: '58', name: 'Alho roxo', price: 19.99, category: 'legumes', unit: 'kg', emoji: '🧄', available: true },
  { id: '59', name: 'Alho roxo', price: 4.99, category: 'legumes', unit: 'bdj', emoji: '🧄', available: true },
  { id: '60', name: 'Alho dente solto', price: 24.99, category: 'legumes', unit: 'kg', emoji: '🧄', available: true },
  { id: '61', name: 'Batata asterix', price: 3.99, category: 'legumes', unit: 'kg', emoji: '🥔', available: true },
  { id: '62', name: 'Batata baroa', price: 3.99, category: 'legumes', unit: 'bdj', emoji: '🥔', available: true },
  { id: '63', name: 'Batata calabresa', price: 4.99, category: 'legumes', unit: 'kg', emoji: '🥔', available: true },
  { id: '64', name: 'Batata doce', price: 3.99, category: 'legumes', unit: 'kg', emoji: '🍠', available: true },
  { id: '65', name: 'Batata doce branca', price: 5.99, category: 'legumes', unit: 'kg', emoji: '🤍', available: true },
  { id: '66', name: 'Batata lavada', price: 3.99, category: 'legumes', unit: 'kg', emoji: '🥔', available: true },
  { id: '67', name: 'Berinjela', price: 2.99, category: 'legumes', unit: 'kg', emoji: '🍆', available: true },
  { id: '68', name: 'Beterraba', price: 2.99, category: 'legumes', unit: 'kg', emoji: '💜', available: true },
  { id: '69', name: 'Brócolis americano', price: 2.99, category: 'legumes', unit: 'un', emoji: '🥦', available: true },
  { id: '70', name: 'Brócolis comum', price: 3.99, category: 'legumes', unit: 'un', emoji: '🥦', available: true },
  { id: '71', name: 'Cebola', price: 3.99, category: 'legumes', unit: 'kg', emoji: '🧅', available: true },
  { id: '72', name: 'Cebola roxa', price: 5.99, category: 'legumes', unit: 'kg', emoji: '🧅', available: true },
  { id: '73', name: 'Cenoura', price: 3.99, category: 'legumes', unit: 'kg', emoji: '🥕', available: true },
  { id: '74', name: 'Chuchu', price: 2.99, category: 'legumes', unit: 'kg', emoji: '🥒', available: true },
  { id: '75', name: 'Couve-flor', price: 5.99, category: 'legumes', unit: 'un', emoji: '🥦', available: true },
  { id: '76', name: 'Ervilha', price: 4.99, category: 'legumes', unit: 'bdj', emoji: '🌱', available: true },
  { id: '77', name: 'Gengibre', price: 14.99, category: 'legumes', unit: 'kg', emoji: '🫚', available: true },
  { id: '78', name: 'Inhame', price: 4.99, category: 'legumes', unit: 'kg', emoji: '🌱', available: true },
  { id: '79', name: 'Inhame cara', price: 9.99, category: 'legumes', unit: 'kg', emoji: '🌱', available: true },
  { id: '80', name: 'Jiló', price: 5.99, category: 'legumes', unit: 'kg', emoji: '🍏', available: true },
  { id: '81', name: 'Maxixe', price: 3.99, category: 'legumes', unit: 'bdj', emoji: '🥒', available: true },
  { id: '82', name: 'Milho verde', price: 0.99, category: 'legumes', unit: 'un', emoji: '🌽', available: true },
  { id: '83', name: 'Pepino', price: 3.99, category: 'legumes', unit: 'kg', emoji: '🥒', available: true },
  { id: '84', name: 'Pepino japonês', price: 4.99, category: 'legumes', unit: 'kg', emoji: '🥒', available: true },
  { id: '85', name: 'Pimenta', price: 4.99, category: 'legumes', unit: 'bdj', emoji: '🌶', available: true },
  { id: '86', name: 'Pimentão', price: 4.99, category: 'legumes', unit: 'kg', emoji: '🫑', available: true },
  { id: '87', name: 'Pimentão colorido', price: 9.99, category: 'legumes', unit: 'kg', emoji: '🫑', available: true },
  { id: '88', name: 'Quiabo', price: 4.99, category: 'legumes', unit: 'bdj', emoji: '🌱', available: true },
  { id: '89', name: 'Repolho roxo', price: 3.99, category: 'legumes', unit: 'kg', emoji: '🥬', available: true },
  { id: '90', name: 'Repolho verde', price: 2.99, category: 'legumes', unit: 'kg', emoji: '🥬', available: true },
  { id: '91', name: 'Tomate italiano', price: 1.99, category: 'legumes', unit: 'kg', emoji: '🍅', available: true },
  { id: '92', name: 'Tomate cereja', price: 1.99, category: 'legumes', unit: 'cx', emoji: '🍅', available: true },
  { id: '93', name: 'Tomatinho doce', price: 1.99, category: 'legumes', unit: 'cx', emoji: '🍅', available: true },
  { id: '94', name: 'Vagem francesa', price: 2.99, category: 'legumes', unit: 'bdj', emoji: '🌱', available: true },
  { id: '95', name: 'Vagem macarrão', price: 5.99, category: 'legumes', unit: 'kg', emoji: '🌱', available: true },

  // Legumes Indisponíveis
  { id: '96', name: 'Tomate carmem', price: 0, category: 'legumes', unit: 'kg', emoji: '🍅', available: false },

  // 🥬 Verduras
  { id: '97', name: 'Agrião', price: 1.99, category: 'verduras', unit: 'un', emoji: '🌿', available: true },
  { id: '98', name: 'Alecrim', price: 1.99, category: 'verduras', unit: 'un', emoji: '🌿', available: true },
  { id: '99', name: 'Alface americana', price: 4.99, category: 'verduras', unit: 'un', emoji: '🥬', available: true },
  { id: '100', name: 'Alface crespa', price: 1.99, category: 'verduras', unit: 'un', emoji: '🥬', available: true },
  { id: '101', name: 'Alface lisa', price: 1.99, category: 'verduras', unit: 'un', emoji: '🥬', available: true },
  { id: '102', name: 'Alho poró', price: 4.99, category: 'verduras', unit: 'un', emoji: '🌱', available: true },
  { id: '103', name: 'Cheiro verde', price: 1.99, category: 'verduras', unit: 'un', emoji: '🌿', available: true },
  { id: '104', name: 'Chicória', price: 1.99, category: 'verduras', unit: 'un', emoji: '🌱', available: true },
  { id: '105', name: 'Coentro', price: 1.99, category: 'verduras', unit: 'un', emoji: '🌿', available: true },
  { id: '106', name: 'Couve mineira', price: 1.99, category: 'verduras', unit: 'un', emoji: '🥬', available: true },
  { id: '107', name: 'Espinafre', price: 1.99, category: 'verduras', unit: 'un', emoji: '🌿', available: true },
  { id: '108', name: 'Hortelã', price: 1.99, category: 'verduras', unit: 'un', emoji: '🌿', available: true },
  { id: '109', name: 'Louro', price: 1.99, category: 'verduras', unit: 'un', emoji: '🍃', available: true },
  { id: '110', name: 'Rúcula', price: 1.99, category: 'verduras', unit: 'un', emoji: '🌿', available: true },
  { id: '111', name: 'Salsa penca', price: 1.99, category: 'verduras', unit: 'un', emoji: '🌱', available: true },

  // 🥤 Bebidas
  { id: '112', name: 'Água c/ gás', price: 2.99, category: 'bebidas', unit: '500ml', emoji: '💧', available: true },
  { id: '113', name: 'Água s/ gás', price: 1.99, category: 'bebidas', unit: '500ml', emoji: '💧', available: true },
  { id: '114', name: 'Água de coco', price: 4.99, category: 'bebidas', unit: '500ml', emoji: '🥥', available: true },
  { id: '115', name: 'Coca-cola', price: 11.99, category: 'bebidas', unit: '2L', emoji: '🥤', available: true },
  { id: '116', name: 'Coca-cola', price: 5.99, category: 'bebidas', unit: 'lata', emoji: '🥤', available: true },
  { id: '117', name: 'Gatorade', price: 8.99, category: 'bebidas', unit: 'un', emoji: '⚡', available: true },
  { id: '118', name: 'Guaraná antártica', price: 5.99, category: 'bebidas', unit: 'lata', emoji: '🥤', available: true },
  { id: '119', name: 'Guaravita', price: 2.99, category: 'bebidas', unit: 'un', emoji: '🍹', available: true },
  { id: '120', name: 'H2O', price: 6.99, category: 'bebidas', unit: '500ml', emoji: '🍋', available: true },

  // 🛒 Outros
  { id: '121', name: 'Mel', price: 4.99, category: 'outros', unit: '250ml', emoji: '🍯', available: true },
  { id: '122', name: 'Amendoim Doce', price: 2.50, category: 'outros', unit: 'un', emoji: '🥜', available: true },
  { id: '123', name: 'Ovos brancos', price: 11.99, category: 'outros', unit: '20un', emoji: '🥚', available: true },
  { id: '124', name: 'Ovos brancos', price: 8.99, category: 'outros', unit: 'dúzia', emoji: '🥚', available: true },
  { id: '125', name: 'Ovos vermelhos', price: 10.99, category: 'outros', unit: 'dúzia', emoji: '🥚', available: true },
  { id: '126', name: 'Tapioca', price: 4.99, category: 'outros', unit: 'un', emoji: '🌾', available: true },
  { id: '127', name: 'Temperos diversos', price: 4.99, category: 'outros', unit: 'un', emoji: '🌿', available: true },
];

export const CATEGORIES = [
  { id: 'all', name: 'Todos', emoji: '🛒' },
  { id: 'frutas', name: 'Frutas', emoji: '🍎' },
  { id: 'legumes', name: 'Legumes', emoji: '🥕' },
  { id: 'verduras', name: 'Verduras', emoji: '🥬' },
  { id: 'bebidas', name: 'Bebidas', emoji: '🥤' },
  { id: 'outros', name: 'Outros', emoji: '🛒' },
];

// Função auxiliar para filtrar apenas produtos disponíveis
export const getAvailableProducts = (): Product[] => {
  return PRODUCTS.filter(product => product.available);
};

// Função para obter produtos por categoria
export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'all') {
    return getAvailableProducts();
  }
  return getAvailableProducts().filter(product => product.category === category);
};