import mysql from 'mysql2/promise';

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

export const connectDB = async () => {
  try {
    // Test connection
    const connection = await pool.getConnection();
    console.log('✅ MySQL connected successfully');
    console.log('📍 Database:', process.env.DB_NAME || 'playflux');
    connection.release();

    // Create tables if they don't exist
    await createTables();
  } catch (error: any) {
    console.error('❌ MySQL connection error:', error.message);
    console.log('');
    console.log('⚠️  IMPORTANT: Make sure MySQL is running:');
    console.log('   1. brew services start mysql');
    console.log('   2. mysql -u root -p (test login)');
    console.log('   3. Check password in backend/.env');
    console.log('');
    process.exit(1);
  }
};

const createTables = async () => {
  try {
    // Users table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
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
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(255) PRIMARY KEY,
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
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        total DECIMAL(10, 2) NOT NULL,
        status ENUM('processing', 'shipped', 'delivered') DEFAULT 'processing',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // Order items table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INT PRIMARY KEY AUTO_INCREMENT,
        order_id INT NOT NULL,
        product_id VARCHAR(255) NOT NULL,
        quantity INT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      )
    `);

    // Cart table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS cart (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        product_id VARCHAR(255) NOT NULL,
        quantity INT NOT NULL DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      )
    `);

    console.log('✅ Database tables created/verified');
  } catch (error: any) {
    console.error('❌ Error creating tables:', error.message);
    throw error;
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  await pool.end();
  console.log('MySQL connection pool closed');
  process.exit(0);
});
