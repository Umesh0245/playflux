import dotenv from 'dotenv';
import { pool, connectDB } from '../config/database.js';

dotenv.config();

const seedProducts = [
  // Keyboards (15 products)
  { id: "kb-1", name: "Mechanical RGB Keyboard", price: 149.99, image: "/images/keyboard.jpg", rating: 5, category: "Keyboard", description: "Premium mechanical keyboard with customizable RGB lighting and Cherry MX switches", features: ["Cherry MX Red Switches", "Per-key RGB", "USB-C Connection", "N-key Rollover"], inStock: true, stock: 50 },
  { id: "kb-2", name: "Wireless Gaming Keyboard", price: 129.99, image: "/images/keyboard.jpg", rating: 4, category: "Keyboard", description: "Compact wireless mechanical keyboard with low-latency connection", features: ["Wireless 2.4GHz", "Hot-swappable switches", "Aluminum frame", "40-hour battery"], inStock: true, stock: 35 },
  { id: "kb-3", name: "TKL Mechanical Keyboard", price: 119.99, image: "/images/keyboard.jpg", rating: 5, category: "Keyboard", description: "Tenkeyless design perfect for competitive gaming", features: ["Compact TKL layout", "Doubleshot PBT keycaps", "Detachable cable", "Programmable keys"], inStock: true, stock: 40 },
  { id: "kb-4", name: "RGB Mechanical Keyboard Pro", price: 179.99, image: "/images/keyboard.jpg", rating: 5, category: "Keyboard", description: "Full-size mechanical keyboard with premium build quality", features: ["Aircraft-grade aluminum", "Hot-swap sockets", "Dynamic RGB effects", "Magnetic wrist rest"], inStock: true, stock: 25 },
  { id: "kb-5", name: "Mini Keyboard 60%", price: 99.99, image: "/images/keyboard.jpg", rating: 4, category: "Keyboard", description: "Ultra-compact 60% layout for minimalist setups", features: ["60% compact design", "Bluetooth 5.0", "Rechargeable battery", "Custom keymaps"], inStock: true, stock: 60 },
  
  // Mice (20 products)
  { id: "ms-1", name: "Pro Gaming Mouse", price: 89.99, image: "/images/mouse.jpg", rating: 5, category: "Mouse", description: "Professional gaming mouse with high-precision sensor", features: ["20,000 DPI sensor", "8 programmable buttons", "RGB lighting", "Ergonomic design"], inStock: true, stock: 100 },
  { id: "ms-2", name: "Wireless Gaming Mouse", price: 69.99, image: "/images/mouse.jpg", rating: 4, category: "Mouse", description: "Lightweight wireless mouse with long battery life", features: ["Wireless 2.4GHz", "16,000 DPI", "70-hour battery", "Lightweight 60g"], inStock: true, stock: 80 },
  { id: "ms-3", name: "Ultra-Light Gaming Mouse", price: 79.99, image: "/images/mouse.jpg", rating: 5, category: "Mouse", description: "Featherweight mouse for competitive gaming", features: ["Honeycomb shell", "48g weight", "PAW3370 sensor", "PTFE feet"], inStock: true, stock: 70 },
  { id: "ms-4", name: "Ergonomic Wireless Mouse", price: 49.99, image: "/images/mouse.jpg", rating: 4, category: "Mouse", description: "Comfortable mouse for all-day use", features: ["Ergonomic shape", "Silent clicks", "Bluetooth", "Precision scroll"], inStock: true, stock: 90 },
  { id: "ms-5", name: "RGB Gaming Mouse Pro", price: 99.99, image: "/images/mouse.jpg", rating: 5, category: "Mouse", description: "Premium RGB gaming mouse with advanced features", features: ["25,000 DPI", "10 buttons", "Customizable RGB", "On-board memory"], inStock: true, stock: 55 },
  
  // Headsets (10 products)
  { id: "hs-1", name: "Wireless Gaming Headset", price: 199.99, image: "/images/headset.jpg", rating: 4, category: "Headset", description: "Premium wireless headset with 7.1 surround sound", features: ["7.1 Surround sound", "50mm drivers", "Wireless 2.4GHz", "20-hour battery"], inStock: true, stock: 45 },
  { id: "hs-2", name: "Premium Gaming Headset", price: 299.99, image: "/images/headset.jpg", rating: 5, category: "Headset", description: "Flagship gaming headset with studio quality", features: ["Hi-Res audio certified", "Planar magnetic drivers", "Wireless + wired", "Noise cancellation"], inStock: true, stock: 20 },
  { id: "hs-3", name: "Budget Gaming Headset", price: 49.99, image: "/images/headset.jpg", rating: 3, category: "Headset", description: "Affordable gaming headset with good sound", features: ["40mm drivers", "Wired connection", "LED lighting", "Padded ear cups"], inStock: true, stock: 100 },
  { id: "hs-4", name: "Pro Gaming Headset", price: 179.99, image: "/images/headset.jpg", rating: 5, category: "Headset", description: "Professional-grade gaming headset", features: ["Studio-quality sound", "Detachable mic", "Aluminum frame", "Memory foam"], inStock: true, stock: 35 },
  { id: "hs-5", name: "Wireless Headset RGB", price: 159.99, image: "/images/headset.jpg", rating: 4, category: "Headset", description: "RGB wireless headset with great battery", features: ["RGB lighting", "30-hour battery", "USB-C charging", "Discord certified"], inStock: true, stock: 40 },
  
  // Monitors (10 products)
  { id: "mn-1", name: "4K Gaming Monitor 27\"", price: 499.99, image: "/images/monitor.jpg", rating: 5, category: "Monitor", description: "Ultra HD 4K gaming monitor with HDR", features: ["4K UHD 3840x2160", "144Hz refresh", "1ms response", "HDR400"], inStock: true, stock: 30 },
  { id: "mn-2", name: "Ultrawide Curved Monitor", price: 699.99, image: "/images/monitor.jpg", rating: 5, category: "Monitor", description: "34-inch curved ultrawide for immersive gaming", features: ["3440x1440 resolution", "100Hz refresh", "1800R curvature", "AMD FreeSync"], inStock: true, stock: 20 },
  { id: "mn-3", name: "240Hz Gaming Monitor", price: 449.99, image: "/images/monitor.jpg", rating: 5, category: "Monitor", description: "Ultra-fast 240Hz for competitive gaming", features: ["1920x1080 FHD", "240Hz refresh", "0.5ms response", "G-Sync Compatible"], inStock: true, stock: 25 },
  { id: "mn-4", name: "Budget Gaming Monitor", price: 179.99, image: "/images/monitor.jpg", rating: 4, category: "Monitor", description: "Affordable 24-inch gaming monitor", features: ["1920x1080 FHD", "75Hz refresh", "5ms response", "FreeSync"], inStock: true, stock: 50 },
  { id: "mn-5", name: "Premium 4K Monitor", price: 899.99, image: "/images/monitor.jpg", rating: 5, category: "Monitor", description: "Top-tier 4K monitor for gaming and productivity", features: ["4K UHD", "165Hz refresh", "0.5ms response", "HDR600", "USB-C"], inStock: true, stock: 15 },
  
  // Controllers (5 products)
  { id: "ct-1", name: "Wireless Pro Controller", price: 69.99, image: "/images/controller.jpg", rating: 5, category: "Controller", description: "Professional wireless controller", features: ["Wireless connectivity", "Hall effect sticks", "Rechargeable battery", "Customizable buttons"], inStock: true, stock: 60 },
  { id: "ct-2", name: "Elite Gaming Controller", price: 179.99, image: "/images/controller.jpg", rating: 5, category: "Controller", description: "Premium controller with swappable parts", features: ["Adjustable tension", "Paddles", "Trigger stops", "Carry case"], inStock: true, stock: 25 },
  { id: "ct-3", name: "Budget Controller", price: 29.99, image: "/images/controller.jpg", rating: 3, category: "Controller", description: "Affordable wired controller", features: ["Wired USB", "Standard layout", "LED indicator", "Plug and play"], inStock: true, stock: 100 },
  { id: "ct-4", name: "Fight Stick Pro", price: 249.99, image: "/images/controller.jpg", rating: 5, category: "Controller", description: "Arcade-style fight stick", features: ["Sanwa buttons", "Tournament legal", "Heavy base", "Customizable art"], inStock: true, stock: 15 },
  { id: "ct-5", name: "Racing Wheel", price: 399.99, image: "/images/controller.jpg", rating: 5, category: "Controller", description: "Force feedback racing wheel", features: ["900° rotation", "Force feedback", "Pedals included", "Compatible with PC/Console"], inStock: true, stock: 10 }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('🗑️  Clearing existing products...');
    await pool.execute('DELETE FROM products');

    console.log('📦 Seeding products...');
    
    // Insert products one by one
    for (const product of seedProducts) {
      await pool.execute(
        `INSERT INTO products (id, name, price, image, rating, category, description, features, in_stock, stock)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          product.id,
          product.name,
          product.price,
          product.image,
          product.rating,
          product.category,
          product.description,
          JSON.stringify(product.features),
          product.inStock,
          product.stock
        ]
      );
    }

    console.log(`✅ Successfully seeded ${seedProducts.length} products`);
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    await pool.end();
    process.exit(1);
  }
};

seedDatabase();
