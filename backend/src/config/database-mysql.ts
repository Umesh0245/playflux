import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Create connection pool
export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'playflux',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection and create tables
export const connectDB = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ MySQL connected successfully');
    console.log('📍 Database:', process.env.DB_NAME || 'playflux');
    
    // Create tables if they don't exist
    await createTables(connection);
    
    connection.release();
  } catch (error: any) {
    console.error('❌ MySQL connection error:', error.message);
    console.log('');
    console.log('⚠️  IMPORTANT: To connect to MySQL:');
    console.log('   1. Install MySQL: brew install mysql (macOS)');
    console.log('   2. Start MySQL: brew services start mysql');
    console.log('   3. Create database: mysql -u root -e "CREATE DATABASE playflux"');
    console.log('   4. Update backend/.env with your MySQL credentials');
    console.log('');
    process.exit(1);
  }
};

// Create database tables
async function createTables(connection: any) {
  // Users table
  await connection.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      avatar TEXT,
      role ENUM('user', 'admin') DEFAULT 'user',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  // Products table
  await connection.query(`
    CREATE TABLE IF NOT EXISTS products (
      id VARCHAR(50) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      image TEXT,
      rating INT DEFAULT 0,
      category VARCHAR(100),
      description TEXT,
      features JSON,
      in_stock BOOLEAN DEFAULT true,
      stock INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  // Orders table
  await connection.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      total DECIMAL(10, 2) NOT NULL,
      status ENUM('processing', 'shipped', 'delivered') DEFAULT 'processing',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // Order items table
  await connection.query(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      order_id INT NOT NULL,
      product_id VARCHAR(50) NOT NULL,
      quantity INT NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    )
  `);

  // Cart table
  await connection.query(`
    CREATE TABLE IF NOT EXISTS cart (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      product_id VARCHAR(50) NOT NULL,
      quantity INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
      UNIQUE KEY unique_cart_item (user_id, product_id)
    )
  `);

  console.log('✅ Database tables created/verified');
}

// Get a connection from the pool
export const getConnection = async () => {
  return await pool.getConnection();
};

// Close the pool
export const closePool = async () => {
  await pool.end();
};
