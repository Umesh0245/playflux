# 🚀 MySQL Setup Guide for PlayFlux

## ✅ What Changed

Switched from **MongoDB Atlas** to **MySQL** (local database) for easier setup and usage.

---

## 📋 Step-by-Step Commands

### 1. Install MySQL (if not already installed)

**For macOS:**

```bash
brew install mysql
```

**For Linux/Ubuntu:**

```bash
sudo apt-get update
sudo apt-get install mysql-server
```

**For Windows:**
Download from: https://dev.mysql.com/downloads/mysql/

---

### 2. Start MySQL Service

**For macOS:**

```bash
brew services start mysql
```

**For Linux:**

```bash
sudo systemctl start mysql
```

**For Windows:**
MySQL should start automatically, or use MySQL Workbench

---

### 3. Create Database

**Option A: Run the Setup Script (Easiest)**

```bash
./scripts/setup-mysql.sh
```

**Option B: Manual Setup**

```bash
# Login to MySQL (no password by default)
mysql -u root

# Or if you have a password set:
mysql -u root -p

# Create database
CREATE DATABASE playflux;

# Exit MySQL
exit;
```

---

### 4. Install Backend Dependencies

```bash
cd backend
npm install
```

This will install `mysql2` package instead of `mongoose`.

---

### 5. Update Environment Variables (if needed)

File: `backend/.env`

```env
PORT=3000
NODE_ENV=development

# MySQL Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=          # Leave empty if no password set
DB_NAME=playflux

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-vault-prime-2024
JWT_EXPIRE=7d

# CORS
FRONTEND_URL=http://localhost:5174
```

---

### 6. Start the Application

```bash
./start-all.sh
```

**What happens:**

- ✅ Connects to MySQL
- ✅ **Automatically creates tables** (users, products, orders, cart)
- ✅ Starts backend on http://localhost:3000
- ✅ Starts frontend on http://localhost:5174

---

## 🎯 Testing Signup/Login

### 1. Open Application

```
http://localhost:5174
```

### 2. Sign Up

- Click **"Signup"**
- Enter your details:
  - Name: Test User
  - Email: test@example.com
  - Password: Test123456
- Click **"Create account"**

### 3. Verify in MySQL

```bash
# Login to MySQL
mysql -u root

# Use playflux database
USE playflux;

# View all users
SELECT * FROM users;

# You should see your user with:
# - id (auto-increment)
# - name
# - email
# - password (hashed with bcrypt)
# - avatar
# - role (user)
# - created_at
# - updated_at
```

---

## 📊 Database Tables Created Automatically

### 1. **users** table

```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- name (VARCHAR)
- email (VARCHAR, UNIQUE)
- password (VARCHAR, hashed)
- avatar (TEXT)
- role (ENUM: user, admin)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### 2. **products** table

```sql
- id (VARCHAR, PRIMARY KEY)
- name (VARCHAR)
- price (DECIMAL)
- image (TEXT)
- rating (INT)
- category (VARCHAR)
- description (TEXT)
- features (JSON)
- in_stock (BOOLEAN)
- stock (INT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### 3. **orders** table

```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- user_id (INT, FOREIGN KEY)
- total (DECIMAL)
- status (ENUM: processing, shipped, delivered)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### 4. **order_items** table

```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- order_id (INT, FOREIGN KEY)
- product_id (VARCHAR, FOREIGN KEY)
- quantity (INT)
- price (DECIMAL)
```

### 5. **cart** table

```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- user_id (INT, FOREIGN KEY)
- product_id (VARCHAR, FOREIGN KEY)
- quantity (INT)
- created_at (TIMESTAMP)
```

---

## 🔍 Useful MySQL Commands

### View all databases:

```sql
SHOW DATABASES;
```

### Use playflux database:

```sql
USE playflux;
```

### View all tables:

```sql
SHOW TABLES;
```

### View table structure:

```sql
DESCRIBE users;
DESCRIBE products;
```

### View all users:

```sql
SELECT id, name, email, role, created_at FROM users;
```

### Count users:

```sql
SELECT COUNT(*) FROM users;
```

### Delete all data (careful!):

```sql
TRUNCATE TABLE users;
```

### Drop database (careful!):

```sql
DROP DATABASE playflux;
```

---

## 🐛 Troubleshooting

### Error: "Can't connect to MySQL server"

**Check if MySQL is running:**

```bash
# macOS
brew services list | grep mysql

# Linux
sudo systemctl status mysql
```

**Restart MySQL:**

```bash
# macOS
brew services restart mysql

# Linux
sudo systemctl restart mysql
```

---

### Error: "Access denied for user 'root'"

**Set/Reset MySQL root password:**

```bash
# macOS
mysql -u root

# Then in MySQL:
ALTER USER 'root'@'localhost' IDENTIFIED BY 'yourpassword';
FLUSH PRIVILEGES;
exit;

# Update backend/.env:
DB_PASSWORD=yourpassword
```

---

### Error: "Database 'playflux' doesn't exist"

```bash
mysql -u root -e "CREATE DATABASE playflux;"
```

---

### Error: "mysql2 module not found"

```bash
cd backend
npm install mysql2
```

---

## ✅ Advantages of MySQL over MongoDB Atlas

1. **✅ No Internet Required** - Works completely offline
2. **✅ No IP Whitelisting** - No network restrictions
3. **✅ Faster Setup** - Install and run locally
4. **✅ Easy to View Data** - Use MySQL Workbench or command line
5. **✅ Better for Learning** - Standard SQL queries
6. **✅ Free Forever** - No cloud costs or limits

---

## 🎊 You're All Set!

Run this command to start everything:

```bash
./start-all.sh
```

**What works now:**

- ✅ Signup saves users to MySQL
- ✅ Login authenticates from MySQL
- ✅ All data persists in local database
- ✅ Fast and reliable
- ✅ No internet connection needed!

---

## 📝 Quick Reference

**Start MySQL:**

```bash
brew services start mysql
```

**Create Database:**

```bash
mysql -u root -e "CREATE DATABASE playflux"
```

**Install Dependencies:**

```bash
cd backend && npm install
```

**Start App:**

```bash
./start-all.sh
```

**View Users:**

```bash
mysql -u root -e "SELECT * FROM playflux.users"
```

---

**Need help?** Check if MySQL is running:

```bash
mysql -u root -e "SELECT 1"
```

If this returns `1`, MySQL is working! 🎉
