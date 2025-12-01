import * as SQLite from 'expo-sqlite';
import { Customer, Order, PaymentMethod } from '../types';

// Database instance
let db: SQLite.SQLiteDatabase | null = null;

// Interface para orders com dados do customer
interface OrderWithCustomer {
  id: number;
  customerId: number;
  items: string;
  total: number;
  paymentMethod: string;
  changeFor: number | null;
  status: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  customerNeighborhood: string;
  customerReference: string;
  formattedItems: string;
}

/**
 * Interface para dados da planilha diária
 */
interface DailyOrderReport {
  date: string;
  customerName: string;
  customerPhone: string;
  orderItems: string;
  orderTotal: number;
  paymentMethod: string;
  orderId: number;
}

/**
 * Initialize the database and create tables if they don't exist
 */
export const initDatabase = async (): Promise<void> => {
  try {
    // Open database
    db = SQLite.openDatabaseSync('frutilize.db');
    
    // Enable foreign keys - DEVE SER FEITO IMEDIATAMENTE
    await db.execAsync('PRAGMA foreign_keys = ON;');
    
    console.log('🔑 Foreign keys enabled');
    
    // Create customers table
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS customers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone TEXT NOT NULL UNIQUE,
        address TEXT NOT NULL,
        neighborhood TEXT NOT NULL,
        reference TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    // Create orders table
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customerId INTEGER NOT NULL,
        items TEXT NOT NULL,
        total REAL NOT NULL,
        paymentMethod TEXT NOT NULL,
        changeFor REAL,
        status TEXT DEFAULT 'pending',
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (customerId) REFERENCES customers (id) ON DELETE CASCADE
      );
    `);
    
    console.log('✅ Database initialized successfully');
    
    // Verificar integridade
    await checkDatabaseIntegrity();
    
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error;
  }
};

/**
 * Check database integrity
 */
export const checkDatabaseIntegrity = async (): Promise<void> => {
  try {
    const database = getDatabase();
    
    // Verificar se as tabelas existem
    const tables = await database.getAllAsync<{ name: string }>(
      "SELECT name FROM sqlite_master WHERE type='table'"
    );
    console.log('📊 Tables in database:', tables);
    
    // Verificar foreign keys
    const foreignKeys = await database.getFirstAsync<{ foreign_keys: number }>(
      'PRAGMA foreign_keys'
    );
    console.log('🔑 Foreign keys enabled:', foreignKeys);
    
    // Contar registros
    const customersCount = await database.getFirstAsync<{ count: number }>(
      'SELECT COUNT(*) as count FROM customers'
    );
    const ordersCount = await database.getFirstAsync<{ count: number }>(
      'SELECT COUNT(*) as count FROM orders'
    );
    
    console.log(`👥 Customers: ${customersCount?.count || 0}, 📦 Orders: ${ordersCount?.count || 0}`);
    
  } catch (error) {
    console.error('Error checking database integrity:', error);
  }
};

/**
 * Get database instance
 */
const getDatabase = (): SQLite.SQLiteDatabase => {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase first.');
  }
  return db;
};

/**
 * Save or update a customer - CORRIGIDA
 */
export const saveCustomer = async (customer: Omit<Customer, 'id' | 'createdAt'>): Promise<number> => {
  try {
    const database = getDatabase();
    
    // Primeiro verificar se o cliente já existe pelo telefone
    const existingCustomer = await getCustomerByPhone(customer.phone);
    
    if (existingCustomer && existingCustomer.id) {
      // CORREÇÃO: Garantir que existingCustomer.id é um número
      const customerId: number = existingCustomer.id;
      
      // Atualizar cliente existente
      await database.runAsync(
        `UPDATE customers 
         SET name = ?, address = ?, neighborhood = ?, reference = ?
         WHERE phone = ?`,
        [customer.name, customer.address, customer.neighborhood, customer.reference || '', customer.phone]
      );
      console.log('✅ Cliente atualizado:', customerId);
      return customerId;
    } else {
      // Inserir novo cliente
      const result = await database.runAsync(
        `INSERT INTO customers (name, phone, address, neighborhood, reference) 
         VALUES (?, ?, ?, ?, ?)`,
        [customer.name, customer.phone, customer.address, customer.neighborhood, customer.reference || '']
      );
      const customerId = result.lastInsertRowId as number;
      console.log('✅ Novo cliente criado:', customerId);
      return customerId;
    }
  } catch (error) {
    console.error('❌ Error saving customer:', error);
    throw error;
  }
};

/**
 * Save customer and order in a single transaction - CORRIGIDA
 */
export const saveCustomerAndOrder = async (
  customerData: Omit<Customer, 'id' | 'createdAt'>,
  cartItems: any[],
  paymentMethod: PaymentMethod,
  changeFor?: number
): Promise<{ customerId: number; orderId: number }> => {
  const database = getDatabase();
  
  try {
    // Iniciar transação
    await database.execAsync('BEGIN TRANSACTION');
    
    try {
      // 1. Salvar ou atualizar o cliente (AGORA FUNCIONANDO)
      const customerId = await saveCustomer(customerData);
      
      console.log('✅ Cliente salvo/atualizado com ID:', customerId);
      
      // 2. Preparar dados do pedido - CORREÇÃO: Garantir que total não seja null/undefined
      const itemsString = JSON.stringify(cartItems);
      
      // CORREÇÃO CRÍTICA: Calcular total corretamente e garantir que não seja NaN
      const total = cartItems.reduce((sum, item) => {
        const itemTotal = (item.price || 0) * (item.quantity || 0);
        return sum + itemTotal;
      }, 0);
      
      // VALIDAÇÃO: Garantir que o total é um número válido
      const validatedTotal = isNaN(total) ? 0 : Number(total.toFixed(2));
      
      console.log('📦 Itens do pedido:', cartItems.length);
      console.log('💰 Total calculado:', validatedTotal);
      
      // 3. Verificar se o customerId é válido
      if (!customerId || customerId <= 0) {
        throw new Error('ID do cliente inválido: ' + customerId);
      }
      
      // 4. Salvar o pedido - CORREÇÃO: Usar validatedTotal garantido
      const orderResult = await database.runAsync(
        'INSERT INTO orders (customerId, items, total, paymentMethod, changeFor, status) VALUES (?, ?, ?, ?, ?, ?)',
        [customerId, itemsString, validatedTotal, paymentMethod, changeFor || null, 'pending']
      );
      
      const orderId = orderResult.lastInsertRowId as number;
      
      // Commit da transação
      await database.execAsync('COMMIT');
      
      console.log(`✅ Customer and order saved successfully. Customer ID: ${customerId}, Order ID: ${orderId}`);
      
      return { customerId, orderId };
      
    } catch (error) {
      // Rollback em caso de erro
      await database.execAsync('ROLLBACK');
      console.error('❌ Error in saveCustomerAndOrder transaction:', error);
      throw error;
    }
    
  } catch (error) {
    console.error('❌ Database error in saveCustomerAndOrder:', error);
    throw new Error('Failed to save customer and order: ' + (error as Error).message);
  }
};

/**
 * Get customer by phone number
 */
export const getCustomerByPhone = async (phone: string): Promise<Customer | null> => {
  try {
    const database = getDatabase();
    const result = await database.getFirstAsync<Customer>(
      'SELECT * FROM customers WHERE phone = ? LIMIT 1',
      [phone]
    );
    return result || null;
  } catch (error) {
    console.error('Error getting customer by phone:', error);
    throw error;
  }
};

/**
 * Get the most recent customer
 */
export const getLastCustomer = async (): Promise<Customer | null> => {
  try {
    const database = getDatabase();
    const result = await database.getFirstAsync<Customer>(
      'SELECT * FROM customers ORDER BY createdAt DESC LIMIT 1'
    );
    return result || null;
  } catch (error) {
    console.error('Error getting last customer:', error);
    throw error;
  }
};

/**
 * Save a new order - CORRIGIDA para validar total e changeFor
 */
export const saveOrder = async (order: Omit<Order, 'id' | 'createdAt'>): Promise<number> => {
  try {
    const database = getDatabase();
    
    // VALIDAÇÃO: Garantir que o total é um número válido
    const validatedTotal = isNaN(order.total) ? 0 : Number(order.total.toFixed(2));
    
    // CORREÇÃO: Converter changeFor para number | null corretamente
    const changeForValue = order.changeFor !== undefined ? order.changeFor : null;
    
    const result = await database.runAsync(
      'INSERT INTO orders (customerId, items, total, paymentMethod, changeFor, status) VALUES (?, ?, ?, ?, ?, ?)',
      [order.customerId, order.items, validatedTotal, order.paymentMethod, changeForValue, order.status]
    );
    return result.lastInsertRowId as number;
  } catch (error) {
    console.error('Error saving order:', error);
    throw error;
  }
};

/**
 * Get orders by customer ID
 */
export const getCustomerOrders = async (customerId: number): Promise<Order[]> => {
  try {
    const database = getDatabase();
    const result = await database.getAllAsync<Order>(
      'SELECT * FROM orders WHERE customerId = ? ORDER BY createdAt DESC',
      [customerId]
    );
    return result;
  } catch (error) {
    console.error('Error getting customer orders:', error);
    throw error;
  }
};

/**
 * Get all orders
 */
export const getAllOrders = async (): Promise<Order[]> => {
  try {
    const database = getDatabase();
    const result = await database.getAllAsync<Order>(
      'SELECT * FROM orders ORDER BY createdAt DESC'
    );
    return result;
  } catch (error) {
    console.error('Error getting all orders:', error);
    throw error;
  }
};

/**
 * Get order by ID
 */
export const getOrderById = async (orderId: number): Promise<Order | null> => {
  try {
    const database = getDatabase();
    const result = await database.getFirstAsync<Order>(
      'SELECT * FROM orders WHERE id = ?',
      [orderId]
    );
    return result || null;
  } catch (error) {
    console.error('Error getting order by id:', error);
    throw error;
  }
};

/**
 * Update order status
 */
export const updateOrderStatus = async (orderId: number, status: string): Promise<void> => {
  try {
    const database = getDatabase();
    await database.runAsync(
      'UPDATE orders SET status = ? WHERE id = ?',
      [status, orderId]
    );
    console.log(`Order ${orderId} status updated to: ${status}`);
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

/**
 * Format order items to display like in cart
 */
export const formatOrderItems = (itemsString: string): string => {
  try {
    const items = JSON.parse(itemsString);
    
    if (!Array.isArray(items)) {
      return 'Itens inválidos';
    }
    
    return items.map(item => {
      const product = item.product;
      const quantity = item.quantity;
      const unit = product.unit || 'un';
      
      if (unit === 'kg') {
        return `${product.name} - ${quantity}kg`;
      } else if (unit === 'un') {
        return `${product.name} - ${quantity} unidade${quantity > 1 ? 's' : ''}`;
      } else {
        return `${product.name} - ${quantity}x`;
      }
    }).join('\n');
    
  } catch (error) {
    console.error('Error formatting order items:', error);
    return 'Erro ao carregar itens';
  }
};

/**
 * Get all orders with customer details and formatted items
 */
export const getAllOrdersWithCustomers = async (): Promise<OrderWithCustomer[]> => {
  try {
    const database = getDatabase();
    const result = await database.getAllAsync<any>(`
      SELECT 
        orders.*,
        customers.name as customerName,
        customers.phone as customerPhone,
        customers.address as customerAddress,
        customers.neighborhood as customerNeighborhood,
        customers.reference as customerReference
      FROM orders
      LEFT JOIN customers ON orders.customerId = customers.id
      ORDER BY orders.createdAt DESC
    `);
    
    // Format items for each order com tipagem correta
    return result.map((order: any) => {
      const formattedItems = formatOrderItems(order.items);
      return {
        id: order.id,
        customerId: order.customerId,
        items: order.items,
        total: order.total,
        paymentMethod: order.paymentMethod,
        changeFor: order.changeFor,
        status: order.status,
        createdAt: order.createdAt,
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        customerAddress: order.customerAddress,
        customerNeighborhood: order.customerNeighborhood,
        customerReference: order.customerReference,
        formattedItems: formattedItems
      };
    });
  } catch (error) {
    console.error('Error getting orders with customers:', error);
    throw error;
  }
};

/**
 * Get all customers
 */
export const getAllCustomers = async (): Promise<Customer[]> => {
  try {
    const database = getDatabase();
    const result = await database.getAllAsync<Customer>(
      'SELECT * FROM customers ORDER BY createdAt DESC'
    );
    return result;
  } catch (error) {
    console.error('Error getting all customers:', error);
    throw error;
  }
};

/**
 * Get complete database log for debugging
 */
export const getDatabaseLog = async (): Promise<{
  timestamp: string;
  customers: Customer[];
  orders: Order[];
  ordersWithCustomers: OrderWithCustomer[];
  summary: {
    totalCustomers: number;
    totalOrders: number;
    pendingOrders: number;
    preparingOrders: number;
    deliveredOrders: number;
    cancelledOrders: number;
  };
}> => {
  try {
    const database = getDatabase();
    
    const customers = await database.getAllAsync<Customer>('SELECT * FROM customers ORDER BY createdAt DESC');
    const orders = await database.getAllAsync<Order>('SELECT * FROM orders ORDER BY createdAt DESC');
    const ordersWithCustomers = await getAllOrdersWithCustomers();
    
    // Contar pedidos por status
    const pendingOrders = orders.filter(order => order.status === 'pending').length;
    const preparingOrders = orders.filter(order => order.status === 'preparing').length;
    const deliveredOrders = orders.filter(order => order.status === 'delivered').length;
    const cancelledOrders = orders.filter(order => order.status === 'cancelled').length;
    
    const summary = {
      totalCustomers: customers.length,
      totalOrders: orders.length,
      pendingOrders: pendingOrders,
      preparingOrders: preparingOrders,
      deliveredOrders: deliveredOrders,
      cancelledOrders: cancelledOrders
    };
    
    return {
      timestamp: new Date().toISOString(),
      customers: customers,
      orders: orders, 
      ordersWithCustomers: ordersWithCustomers,
      summary: summary
    };
  } catch (error) {
    console.error('Error getting database log:', error);
    throw error;
  }
};

/**
 * Print database log to console
 */
export const printDatabaseLog = async (): Promise<void> => {
  try {
    const log = await getDatabaseLog();
    console.log('=== FRUTILIZE DATABASE LOG ===');
    console.log('Timestamp:', log.timestamp);
    console.log('Summary:', log.summary);
    console.log('Customers:', log.customers);
    console.log('Orders:', log.orders);
    console.log('Orders with Customers:', log.ordersWithCustomers);
    console.log('==============================');
  } catch (error) {
    console.error('Error printing database log:', error);
  }
};

/**
 * Check if tables exist (for debugging)
 */
export const checkTables = async (): Promise<void> => {
  try {
    const database = getDatabase();
    const tables = await database.getAllAsync<{ name: string }>(
      "SELECT name FROM sqlite_master WHERE type='table'"
    );
    console.log('Tables in database:', tables);
  } catch (error) {
    console.error('Error checking tables:', error);
  }
};

/**
 * Reset database (use with caution!)
 */
export const resetDatabase = async (): Promise<void> => {
  try {
    if (db) {
      await db.closeAsync();
    }
    await SQLite.deleteDatabaseAsync('frutilize.db');
    db = null;
    await initDatabase();
    console.log('Database reset successfully');
  } catch (error) {
    console.error('Error resetting database:', error);
    throw error;
  }
};

/**
 * Reset database for debugging (use with caution - apenas para desenvolvimento)
 */
export const resetDatabaseForDebug = async (): Promise<void> => {
  try {
    console.log('🔄 Resetting database for debugging...');
    
    if (db) {
      await db.closeAsync();
    }
    
    // Deletar e recriar o banco
    await SQLite.deleteDatabaseAsync('frutilize.db');
    db = null;
    
    // Re-inicializar
    await initDatabase();
    
    console.log('✅ Database reset successfully');
  } catch (error) {
    console.error('Error resetting database:', error);
    throw error;
  }
};

/**
 * Get order statistics
 */
export const getOrderStatistics = async (): Promise<{
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  uniqueCustomers: number;
  statusBreakdown: Array<{ status: string; count: number }>;
}> => {
  try {
    const database = getDatabase();
    
    // Estatísticas principais
    const statsResult = await database.getFirstAsync<{
      totalOrders: number;
      totalRevenue: number;
      averageOrderValue: number;
      uniqueCustomers: number;
    }>(`
      SELECT 
        COUNT(*) as totalOrders,
        COALESCE(SUM(total), 0) as totalRevenue,
        COALESCE(AVG(total), 0) as averageOrderValue,
        COUNT(DISTINCT customerId) as uniqueCustomers
      FROM orders
      WHERE status != 'cancelled'
    `);

    // Estatísticas por status
    const statusStats = await database.getAllAsync<{ status: string; count: number }>(`
      SELECT status, COUNT(*) as count 
      FROM orders 
      GROUP BY status
    `);
    
    // Garantir valores padrão se statsResult for null
    const stats = statsResult || {
      totalOrders: 0,
      totalRevenue: 0,
      averageOrderValue: 0,
      uniqueCustomers: 0
    };
    
    return {
      totalOrders: stats.totalOrders,
      totalRevenue: stats.totalRevenue,
      averageOrderValue: stats.averageOrderValue,
      uniqueCustomers: stats.uniqueCustomers,
      statusBreakdown: statusStats
    };
  } catch (error) {
    console.error('Error getting order statistics:', error);
    throw error;
  }
};

/**
 * Get orders statistics by status (para o admin)
 */
export const getOrdersByStatus = async (): Promise<{
  pending: number;
  preparing: number;
  delivered: number;
  cancelled: number;
  total: number;
}> => {
  try {
    const database = getDatabase();
    const orders = await database.getAllAsync<{ status: string }>('SELECT status FROM orders');
    
    const pending = orders.filter(o => o.status === 'pending').length;
    const preparing = orders.filter(o => o.status === 'preparing').length;
    const delivered = orders.filter(o => o.status === 'delivered').length;
    const cancelled = orders.filter(o => o.status === 'cancelled').length;
    
    return {
      pending,
      preparing,
      delivered,
      cancelled,
      total: orders.length
    };
  } catch (error) {
    console.error('Error getting orders by status:', error);
    throw error;
  }
};

/**
 * Delete customer by ID (apenas para admin)
 */
export const deleteCustomer = async (customerId: number): Promise<void> => {
  try {
    const database = getDatabase();
    await database.runAsync('DELETE FROM customers WHERE id = ?', [customerId]);
    console.log(`Customer ${customerId} deleted`);
  } catch (error) {
    console.error('Error deleting customer:', error);
    throw error;
  }
};

/**
 * Delete order by ID (apenas para admin)
 */
export const deleteOrder = async (orderId: number): Promise<void> => {
  try {
    const database = getDatabase();
    await database.runAsync('DELETE FROM orders WHERE id = ?', [orderId]);
    console.log(`Order ${orderId} deleted`);
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
};

/**
 * Test database connection and basic operations - CORRIGIDA
 */
export const testDatabase = async (): Promise<boolean> => {
  try {
    console.log('🧪 Testing database...');
    
    // Verificar se o banco está inicializado
    const database = getDatabase();
    
    // Testar inserção de cliente
    const testCustomer = {
      name: 'Test Customer',
      phone: '21999999999',
      address: 'Test Address',
      neighborhood: 'Test Neighborhood',
      reference: 'Test Reference'
    };
    
    const customerId = await saveCustomer(testCustomer);
    console.log('✅ Test customer created:', customerId);
    
    // Testar inserção de pedido - CORREÇÃO: Usar changeFor em vez de changeror
    const testOrder = {
      customerId: customerId,
      items: JSON.stringify([{ product: { name: 'Test Product', unit: 'un' }, quantity: 1, price: 10 }]),
      total: 10,
      paymentMethod: 'pix' as PaymentMethod,
      changeFor: undefined, // CORREÇÃO: Usar undefined em vez de null
      status: 'pending'
    };
    
    const orderId = await saveOrder(testOrder);
    console.log('✅ Test order created:', orderId);
    
    // Limpar dados de teste
    await deleteOrder(orderId);
    await deleteCustomer(customerId);
    
    console.log('✅ Database test completed successfully');
    return true;
    
  } catch (error) {
    console.error('❌ Database test failed:', error);
    return false;
  }
};

// ============================================================================
// FUNÇÕES DE EXPORTAÇÃO CSV
// ============================================================================

/**
 * Gera relatório diário de pedidos para uma data específica
 */
export const getDailyOrdersReport = async (targetDate: string): Promise<DailyOrderReport[]> => {
  try {
    const database = getDatabase();
    
    const result = await database.getAllAsync<any>(`
      SELECT 
        orders.id as orderId,
        orders.total as orderTotal,
        orders.items as orderItems,
        orders.paymentMethod as paymentMethod,
        orders.createdAt as orderDate,
        customers.name as customerName,
        customers.phone as customerPhone
      FROM orders
      LEFT JOIN customers ON orders.customerId = customers.id
      WHERE DATE(orders.createdAt) = DATE(?)
      ORDER BY orders.createdAt ASC
    `, [targetDate]);

    return result.map((row: any) => ({
      date: row.orderDate,
      customerName: row.customerName || 'N/A',
      customerPhone: row.customerPhone || 'N/A',
      orderItems: formatOrderItemsForCSV(row.orderItems),
      orderTotal: row.orderTotal,
      paymentMethod: row.paymentMethod,
      orderId: row.orderId
    }));
  } catch (error) {
    console.error('Error getting daily orders report:', error);
    throw error;
  }
};

/**
 * Formata os itens do pedido para CSV
 */
const formatOrderItemsForCSV = (itemsString: string): string => {
  try {
    const items = JSON.parse(itemsString);
    
    if (!Array.isArray(items)) {
      return 'Itens inválidos';
    }
    
    return items.map(item => {
      const product = item.product;
      const quantity = item.quantity;
      const unit = product.unit || 'un';
      const price = item.price || 0;
      const total = price * quantity;
      
      if (unit === 'kg') {
        return `${product.name} - ${quantity}kg - R$ ${total.toFixed(2)}`;
      } else if (unit === 'un') {
        return `${product.name} - ${quantity} un - R$ ${total.toFixed(2)}`;
      } else {
        return `${product.name} - ${quantity}x - R$ ${total.toFixed(2)}`;
      }
    }).join('; ');
    
  } catch (error) {
    console.error('Error formatting order items for CSV:', error);
    return 'Erro ao carregar itens';
  }
};

/**
 * Gera CSV com todos os pedidos de uma data específica
 */
export const generateDailyCSV = async (targetDate: string): Promise<string> => {
  try {
    const dailyOrders = await getDailyOrdersReport(targetDate);
    
    if (dailyOrders.length === 0) {
      return 'Nenhum pedido encontrado para esta data.';
    }

    // Cabeçalho do CSV
    let csv = 'Data,Hora,ID Pedido,Cliente,Telefone,Itens do Pedido,Total,Forma de Pagamento\n';
    
    // Dados dos pedidos
    dailyOrders.forEach(order => {
      const orderDate = new Date(order.date);
      const dateStr = orderDate.toLocaleDateString('pt-BR');
      const timeStr = orderDate.toLocaleTimeString('pt-BR');
      
      // Escapar caracteres especiais para CSV
      const escapeCSV = (str: string) => {
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
          return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
      };

      csv += `${escapeCSV(dateStr)},`;
      csv += `${escapeCSV(timeStr)},`;
      csv += `${order.orderId},`;
      csv += `${escapeCSV(order.customerName)},`;
      csv += `${escapeCSV(order.customerPhone)},`;
      csv += `${escapeCSV(order.orderItems)},`;
      csv += `R$ ${order.orderTotal.toFixed(2)},`;
      csv += `${escapeCSV(order.paymentMethod)}\n`;
    });

    // Total do dia
    const dailyTotal = dailyOrders.reduce((sum, order) => sum + order.orderTotal, 0);
    csv += `\n,,,,,,Total do Dia:,"R$ ${dailyTotal.toFixed(2)}"`;
    
    // Estatísticas
    csv += `\n,,,,,,Total de Pedidos:,${dailyOrders.length}`;
    
    return csv;
  } catch (error) {
    console.error('Error generating daily CSV:', error);
    throw error;
  }
};

/**
 * Gera CSV com todos os pedidos de um intervalo de datas
 */
export const generateDateRangeCSV = async (startDate: string, endDate: string): Promise<string> => {
  try {
    const database = getDatabase();
    
    const result = await database.getAllAsync<any>(`
      SELECT 
        orders.id as orderId,
        orders.total as orderTotal,
        orders.items as orderItems,
        orders.paymentMethod as paymentMethod,
        orders.createdAt as orderDate,
        customers.name as customerName,
        customers.phone as customerPhone
      FROM orders
      LEFT JOIN customers ON orders.customerId = customers.id
      WHERE DATE(orders.createdAt) BETWEEN DATE(?) AND DATE(?)
      ORDER BY orders.createdAt ASC
    `, [startDate, endDate]);

    if (result.length === 0) {
      return 'Nenhum pedido encontrado para este período.';
    }

    // Cabeçalho do CSV
    let csv = 'Data,Hora,ID Pedido,Cliente,Telefone,Itens do Pedido,Total,Forma de Pagamento\n';
    
    let totalRevenue = 0;
    
    // Dados dos pedidos
    result.forEach((row: any) => {
      const orderDate = new Date(row.orderDate);
      const dateStr = orderDate.toLocaleDateString('pt-BR');
      const timeStr = orderDate.toLocaleTimeString('pt-BR');
      const orderItems = formatOrderItemsForCSV(row.orderItems);
      
      totalRevenue += row.orderTotal;

      // Escapar caracteres especiais para CSV
      const escapeCSV = (str: string) => {
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
          return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
      };

      csv += `${escapeCSV(dateStr)},`;
      csv += `${escapeCSV(timeStr)},`;
      csv += `${row.orderId},`;
      csv += `${escapeCSV(row.customerName || 'N/A')},`;
      csv += `${escapeCSV(row.customerPhone || 'N/A')},`;
      csv += `${escapeCSV(orderItems)},`;
      csv += `R$ ${row.orderTotal.toFixed(2)},`;
      csv += `${escapeCSV(row.paymentMethod)}\n`;
    });

    // Totais
    csv += `\n,,,,,,Total do Período:,"R$ ${totalRevenue.toFixed(2)}"`;
    csv += `\n,,,,,,Total de Pedidos:,${result.length}`;
    csv += `\n,,,,,,Ticket Médio:,"R$ ${(totalRevenue / result.length).toFixed(2)}"`;
    
    return csv;
  } catch (error) {
    console.error('Error generating date range CSV:', error);
    throw error;
  }
};

/**
 * Gera relatório completo do mês atual
 */
export const generateMonthlyReport = async (): Promise<string> => {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  
  const startDate = firstDay.toISOString().split('T')[0];
  const endDate = lastDay.toISOString().split('T')[0];
  
  return generateDateRangeCSV(startDate, endDate);
};

/**
 * Lista todas as datas que possuem pedidos
 */
export const getDatesWithOrders = async (): Promise<string[]> => {
  try {
    const database = getDatabase();
    
    const result = await database.getAllAsync<{ orderDate: string }>(`
      SELECT DISTINCT DATE(createdAt) as orderDate 
      FROM orders 
      ORDER BY orderDate DESC
    `);

    return result.map(row => row.orderDate);
  } catch (error) {
    console.error('Error getting dates with orders:', error);
    throw error;
  }
};

/**
 * Função para salvar o CSV em um arquivo (React Native)
 */
export const saveCSVToFile = async (csvData: string, filename: string): Promise<void> => {
  try {
    // Em React Native, você pode usar uma biblioteca como react-native-fs
    // ou compartilhar o CSV diretamente
    console.log('CSV gerado:', filename);
    console.log('Dados:', csvData);
    
    // Aqui você pode implementar a lógica para salvar o arquivo
    // ou compartilhar via email, WhatsApp, etc.
  } catch (error) {
    console.error('Error saving CSV file:', error);
    throw error;
  }
};

/**
 * Hook para exportação de CSV
 */
export const useCSVExport = () => {
  const exportDailyCSV = async (date: string) => {
    try {
      const csv = await generateDailyCSV(date);
      const filename = `pedidos_${date.replace(/-/g, '')}.csv`;
      
      // Salvar ou compartilhar o arquivo
      await saveCSVToFile(csv, filename);
      
      return { success: true, csv, filename };
    } catch (error) {
      console.error('Error exporting CSV:', error);
      return { success: false, error: (error as Error).message };
    }
  };

  const exportMonthlyCSV = async () => {
    try {
      const csv = await generateMonthlyReport();
      const now = new Date();
      const filename = `pedidos_mensal_${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}.csv`;
      
      await saveCSVToFile(csv, filename);
      
      return { success: true, csv, filename };
    } catch (error) {
      console.error('Error exporting monthly CSV:', error);
      return { success: false, error: (error as Error).message };
    }
  };

  return {
    exportDailyCSV,
    exportMonthlyCSV,
    getDatesWithOrders
  };
};