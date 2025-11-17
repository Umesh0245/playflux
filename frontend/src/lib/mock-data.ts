// Professional gaming gear images from Unsplash with cohesive bright aesthetics
const keyboardImages = [
  "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80", // RGB mechanical keyboard
  "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80", // Compact mechanical keyboard
  "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&q=80", // Modern gaming keyboard
  "https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?w=800&q=80", // Wireless keyboard
  "https://images.unsplash.com/photo-1602489602098-07ec19edaa19?w=800&q=80", // Mechanical keyboard closeup
];

const mouseImages = [
  "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80", // Gaming mouse RGB
  "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&q=80", // Wireless gaming mouse
  "https://images.unsplash.com/photo-1563297007-0686b7003af7?w=800&q=80", // Pro gaming mouse
  "https://images.unsplash.com/photo-1629429407756-2907d3788da5?w=800&q=80", // Modern mouse
  "https://images.unsplash.com/photo-1586920740099-e48f76c5c0ff?w=800&q=80", // Gaming mouse side view
];

const headsetImages = [
  "https://images.unsplash.com/photo-1599669454699-248893623440?w=800&q=80", // Professional gaming headset
  "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800&q=80", // Wireless headphones
  "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80", // Gaming headset RGB
  "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80", // Premium headphones
  "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=800&q=80", // Modern headset
];

const monitorImages = [
  "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80", // Curved gaming monitor
  "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&q=80", // Ultrawide monitor
  "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=800&q=80", // Gaming monitor setup
  "https://images.unsplash.com/photo-1629825276228-b3d498f7b56d?w=800&q=80", // Modern display
  "https://images.unsplash.com/photo-1587202372583-49330a15584d?w=800&q=80", // Professional monitor
];

const controllerImages = [
  "https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=800&q=80", // Gaming controller
  "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&q=80", // Xbox style controller
  "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&q=80", // Pro controller
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80", // Gaming gamepad
  "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800&q=80", // Modern controller
];

const chairImages = [
  "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&q=80", // Modern gaming chair
  "https://images.unsplash.com/photo-1598300188904-e9bc892fe5c6?w=800&q=80", // Executive gaming chair
  "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&q=80", // Ergonomic chair
  "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&q=80", // Professional gaming chair
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80", // Racing style chair
];

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  images: string[]; // Multiple images for gallery
  rating: number;
  category: string;
  description: string;
  features: string[];
  inStock: boolean;
}

const generateProducts = (): Product[] => {
  const products: Product[] = [];
  
  // Keyboards (15 products)
  const keyboards = [
    { name: "Mechanical RGB Keyboard", price: 149.99, rating: 5, description: "Premium mechanical keyboard with customizable RGB lighting and Cherry MX switches", features: ["Cherry MX Red Switches", "Per-key RGB", "USB-C Connection", "N-key Rollover"] },
    { name: "Wireless Gaming Keyboard", price: 129.99, rating: 4, description: "Compact wireless mechanical keyboard with low-latency connection", features: ["Wireless 2.4GHz", "Hot-swappable switches", "Aluminum frame", "40-hour battery"] },
    { name: "TKL Mechanical Keyboard", price: 119.99, rating: 5, description: "Tenkeyless design perfect for competitive gaming", features: ["Compact TKL layout", "Doubleshot PBT keycaps", "Detachable cable", "Programmable keys"] },
    { name: "RGB Mechanical Keyboard Pro", price: 179.99, rating: 5, description: "Full-size mechanical keyboard with premium build quality", features: ["Aircraft-grade aluminum", "Hot-swap sockets", "Dynamic RGB effects", "Magnetic wrist rest"] },
    { name: "Mini Keyboard 60%", price: 99.99, rating: 4, description: "Ultra-compact 60% layout for minimalist setups", features: ["60% compact design", "Bluetooth 5.0", "Rechargeable battery", "Custom keymaps"] },
    { name: "Ergonomic Keyboard Split", price: 159.99, rating: 4, description: "Split ergonomic design for comfortable typing", features: ["Split ergonomic layout", "Adjustable tilt", "Tactile switches", "Palm rests included"] },
    { name: "Low Profile Keyboard", price: 139.99, rating: 4, description: "Slim mechanical keyboard with low-profile switches", features: ["Low-profile switches", "Aluminum top plate", "USB passthrough", "Media controls"] },
    { name: "Gaming Keyboard Elite", price: 199.99, rating: 5, description: "Premium gaming keyboard with advanced features", features: ["Optical switches", "OLED display", "Dedicated macro keys", "Cloud sync profiles"] },
    { name: "Backlit Keyboard", price: 79.99, rating: 4, description: "Budget-friendly keyboard with white LED backlighting", features: ["White LED backlight", "Membrane switches", "Spill-resistant", "Quiet operation"] },
    { name: "Wireless Office Keyboard", price: 59.99, rating: 3, description: "Comfortable keyboard for office work", features: ["Wireless connectivity", "Long battery life", "Quiet keys", "Plug-and-play"] },
    { name: "RGB Keyboard Full Size", price: 89.99, rating: 4, description: "Full-size RGB keyboard with great value", features: ["Rainbow RGB effects", "Anti-ghosting", "Multimedia keys", "Braided cable"] },
    { name: "Mechanical Keyboard Pro", price: 169.99, rating: 5, description: "Professional-grade mechanical keyboard", features: ["Premium switches", "Solid metal frame", "PBT keycaps", "Customizable RGB"] },
    { name: "Compact Wireless Keyboard", price: 109.99, rating: 4, description: "Portable wireless keyboard for on-the-go", features: ["Bluetooth multi-device", "Compact design", "Rechargeable", "Universal compatibility"] },
    { name: "Gaming Keyboard RGB", price: 119.99, rating: 4, description: "RGB gaming keyboard with responsive keys", features: ["Dynamic RGB lighting", "Fast response", "Anti-ghosting keys", "Durable construction"] },
    { name: "Mechanical Keyboard Custom", price: 189.99, rating: 5, description: "Fully customizable mechanical keyboard", features: ["Hot-swappable switches", "Custom keycaps", "RGB per-key", "Programmable macros"] },
  ];
  
  keyboards.forEach((kb, i) => products.push({
    id: `kb-${i + 1}`,
    ...kb,
    image: keyboardImages[i % keyboardImages.length],
    images: [...keyboardImages], // All images for gallery
    category: "Keyboard",
    inStock: true
  }));

  // Mice (20 products)
  const mice = [
    { name: "Pro Gaming Mouse", price: 89.99, rating: 5, description: "Professional gaming mouse with high-precision sensor", features: ["20,000 DPI sensor", "8 programmable buttons", "RGB lighting", "Ergonomic design"] },
    { name: "Wireless Gaming Mouse", price: 69.99, rating: 4, description: "Lightweight wireless mouse with long battery life", features: ["Wireless 2.4GHz", "16,000 DPI", "70-hour battery", "Lightweight 60g"] },
    { name: "Ultra-Light Gaming Mouse", price: 79.99, rating: 5, description: "Featherweight mouse for competitive gaming", features: ["Honeycomb shell", "48g weight", "PAW3370 sensor", "PTFE feet"] },
    { name: "Ergonomic Wireless Mouse", price: 49.99, rating: 4, description: "Comfortable mouse for all-day use", features: ["Ergonomic shape", "Silent clicks", "Bluetooth", "Precision scroll"] },
    { name: "RGB Gaming Mouse Pro", price: 99.99, rating: 5, description: "Premium RGB gaming mouse with advanced features", features: ["25,000 DPI", "10 buttons", "Customizable RGB", "On-board memory"] },
    { name: "Ambidextrous Gaming Mouse", price: 74.99, rating: 4, description: "Symmetrical design for left and right-handed users", features: ["Ambidextrous design", "18,000 DPI", "8 buttons", "Lightweight"] },
    { name: "Wireless Office Mouse", price: 29.99, rating: 3, description: "Simple wireless mouse for everyday tasks", features: ["Wireless 2.4GHz", "Comfortable grip", "Long battery", "Plug-and-play"] },
    { name: "Vertical Ergonomic Mouse", price: 59.99, rating: 4, description: "Vertical design reduces wrist strain", features: ["Vertical orientation", "Adjustable DPI", "Wireless", "Ergonomic comfort"] },
    { name: "MMO Gaming Mouse", price: 119.99, rating: 5, description: "12-button mouse perfect for MMO games", features: ["12 side buttons", "RGB zones", "High precision", "Customizable profiles"] },
    { name: "Lightweight Pro Mouse", price: 84.99, rating: 5, description: "Ultra-light professional gaming mouse", features: ["55g weight", "Wireless charging", "20,000 DPI", "RGB lighting"] },
    { name: "Bluetooth Travel Mouse", price: 39.99, rating: 3, description: "Compact mouse ideal for travel", features: ["Bluetooth 5.0", "Portable size", "Silent buttons", "Multi-device"] },
    { name: "Gaming Mouse Elite", price: 129.99, rating: 5, description: "Top-tier gaming mouse with all features", features: ["Dual wireless modes", "26,000 DPI", "100-hour battery", "Charging dock"] },
    { name: "Wired Gaming Mouse", price: 54.99, rating: 4, description: "Reliable wired gaming mouse", features: ["16,000 DPI", "RGB backlight", "6 buttons", "Braided cable"] },
    { name: "Trackball Mouse Wireless", price: 64.99, rating: 4, description: "Precision trackball for detailed work", features: ["Trackball design", "Wireless", "Precision control", "Ergonomic"] },
    { name: "Gaming Mouse RGB", price: 44.99, rating: 3, description: "Budget RGB gaming mouse", features: ["7,200 DPI", "RGB effects", "6 buttons", "Comfortable grip"] },
    { name: "Wireless Mouse Slim", price: 34.99, rating: 3, description: "Slim wireless mouse for portability", features: ["Ultra-slim design", "Wireless", "Rechargeable", "Quiet clicks"] },
    { name: "Pro FPS Gaming Mouse", price: 94.99, rating: 5, description: "Optimized for FPS gaming", features: ["Perfect sensor", "Low latency", "Light weight", "Durable switches"] },
    { name: "Gaming Mouse Modular", price: 109.99, rating: 4, description: "Customizable modular gaming mouse", features: ["Swappable parts", "Adjustable weight", "RGB lighting", "Wireless"] },
    { name: "Left-Handed Gaming Mouse", price: 79.99, rating: 4, description: "Gaming mouse designed for left-handed users", features: ["Left-handed design", "High DPI", "Programmable buttons", "RGB"] },
    { name: "Gaming Mouse Wireless Pro", price: 89.99, rating: 5, description: "Professional wireless gaming performance", features: ["Hero sensor", "60-hour battery", "LIGHTSPEED wireless", "PowerPlay compatible"] },
  ];
  
  mice.forEach((m, i) => products.push({
    id: `ms-${i + 1}`,
    ...m,
    image: mouseImages[i % mouseImages.length],
    images: [...mouseImages], // All images for gallery
    category: "Mouse",
    inStock: true
  }));

  // Headsets (18 products)
  const headsets = [
    { name: "Wireless Gaming Headset", price: 199.99, rating: 4, description: "Premium wireless headset with 7.1 surround sound", features: ["7.1 Surround sound", "50mm drivers", "Wireless 2.4GHz", "20-hour battery"] },
    { name: "Premium Gaming Headset", price: 299.99, rating: 5, description: "Flagship gaming headset with studio quality", features: ["Hi-Res audio certified", "Planar magnetic drivers", "Wireless + wired", "Noise cancellation"] },
    { name: "Budget Gaming Headset", price: 49.99, rating: 3, description: "Affordable gaming headset with good sound", features: ["40mm drivers", "Wired connection", "LED lighting", "Padded ear cups"] },
    { name: "Pro Gaming Headset", price: 179.99, rating: 5, description: "Professional-grade gaming headset", features: ["Studio-quality sound", "Detachable mic", "Aluminum frame", "Memory foam"] },
    { name: "Wireless Headset RGB", price: 159.99, rating: 4, description: "RGB wireless headset with great battery", features: ["RGB lighting", "30-hour battery", "USB-C charging", "Discord certified"] },
    { name: "Noise Cancelling Headset", price: 249.99, rating: 5, description: "Active noise cancellation for immersive gaming", features: ["Active ANC", "Bluetooth + wireless", "35-hour battery", "Premium comfort"] },
    { name: "Wired Gaming Headset", price: 79.99, rating: 4, description: "Reliable wired headset for gaming", features: ["3.5mm jack", "Clear microphone", "Soft ear pads", "In-line controls"] },
    { name: "Surround Sound Headset", price: 139.99, rating: 4, description: "Immersive 7.1 surround sound experience", features: ["Virtual 7.1", "50mm neodymium", "USB connection", "Volume control"] },
    { name: "Bluetooth Gaming Headset", price: 119.99, rating: 4, description: "Multi-platform Bluetooth headset", features: ["Bluetooth 5.0", "Low latency", "Foldable design", "Built-in mic"] },
    { name: "Esports Gaming Headset", price: 189.99, rating: 5, description: "Tournament-ready gaming headset", features: ["Pro-grade audio", "Competition mic", "Durable build", "Carry case included"] },
    { name: "RGB Wired Headset", price: 89.99, rating: 4, description: "Wired headset with vibrant RGB", features: ["RGB ear cups", "Bass boost", "Breathable cushions", "Adjustable headband"] },
    { name: "Wireless Headset Elite", price: 229.99, rating: 5, description: "Elite wireless gaming experience", features: ["Lossless audio", "Multi-device", "Quick charge", "Premium materials"] },
    { name: "Gaming Headset Compact", price: 69.99, rating: 3, description: "Compact gaming headset for small heads", features: ["Compact size", "Lightweight", "Clear audio", "Inline mic"] },
    { name: "Studio Gaming Headset", price: 279.99, rating: 5, description: "Studio-quality gaming headset", features: ["Audiophile grade", "Open-back design", "Velour pads", "Premium cable"] },
    { name: "Gaming Headset Value", price: 59.99, rating: 3, description: "Great value gaming headset", features: ["Good sound quality", "Comfortable fit", "Durable build", "Affordable price"] },
    { name: "VR Gaming Headset Audio", price: 149.99, rating: 4, description: "Optimized for VR gaming", features: ["3D spatial audio", "VR compatible", "Lightweight design", "Adjustable mic"] },
    { name: "Wireless Headset Pro", price: 209.99, rating: 5, description: "Professional wireless gaming audio", features: ["Pro wireless tech", "Broadcast quality mic", "Memory foam padding", "50-hour battery"] },
    { name: "Gaming Headset RGB Pro", price: 169.99, rating: 4, description: "RGB gaming headset with premium features", features: ["Customizable RGB", "DTS:X Ultra", "Metal construction", "Leather ear pads"] },
  ];
  
  headsets.forEach((h, i) => products.push({
    id: `hs-${i + 1}`,
    ...h,
    image: headsetImages[i % headsetImages.length],
    images: [...headsetImages], // All images for gallery
    category: "Headset",
    inStock: true
  }));

  // Monitors (17 products)
  const monitors = [
    { name: "Curved Gaming Monitor 27\"", price: 449.99, rating: 5, description: "Immersive curved 27\" gaming display", features: ["27\" 1440p", "165Hz refresh rate", "1ms response", "HDR400"] },
    { name: "Ultra-Wide Gaming Monitor 34\"", price: 699.99, rating: 5, description: "Ultra-wide monitor for maximum immersion", features: ["34\" ultrawide", "144Hz", "Curved 1800R", "G-Sync compatible"] },
    { name: "4K Gaming Monitor", price: 549.99, rating: 5, description: "Crystal clear 4K gaming experience", features: ["4K UHD", "144Hz", "IPS panel", "HDR600"] },
    { name: "Budget Gaming Monitor 24\"", price: 179.99, rating: 3, description: "Affordable 1080p gaming monitor", features: ["24\" 1080p", "75Hz", "FreeSync", "VA panel"] },
    { name: "Pro Gaming Monitor 27\"", price: 799.99, rating: 5, description: "Professional esports gaming monitor", features: ["27\" 1440p", "240Hz", "0.5ms response", "G-Sync Ultimate"] },
    { name: "Ultrawide Curved 49\"", price: 1299.99, rating: 5, description: "Massive 49\" super ultrawide monitor", features: ["49\" 32:9 aspect", "240Hz", "QLED", "Picture-by-picture"] },
    { name: "Portable Gaming Monitor", price: 299.99, rating: 4, description: "15.6\" portable gaming display", features: ["15.6\" 1080p", "USB-C powered", "144Hz", "HDR"] },
    { name: "Gaming Monitor 32\"", price: 399.99, rating: 4, description: "Large 32\" gaming monitor", features: ["32\" 1440p", "165Hz", "Curved", "FreeSync Premium"] },
    { name: "OLED Gaming Monitor", price: 1499.99, rating: 5, description: "Premium OLED gaming display", features: ["27\" OLED", "240Hz", "0.03ms response", "True HDR"] },
    { name: "144Hz Gaming Monitor", price: 249.99, rating: 4, description: "Fast 144Hz gaming monitor", features: ["24\" 1080p", "144Hz", "TN panel", "Low input lag"] },
    { name: "Vertical Gaming Monitor", price: 329.99, rating: 4, description: "Portrait-oriented gaming monitor", features: ["27\" vertical", "165Hz", "IPS", "Pivot stand"] },
    { name: "Mini LED Gaming Monitor", price: 899.99, rating: 5, description: "Advanced Mini LED technology", features: ["32\" 4K", "Mini LED backlight", "1152 zones", "HDR1000"] },
    { name: "Gaming Monitor 240Hz", price: 649.99, rating: 5, description: "Ultra-fast 240Hz esports monitor", features: ["24.5\" 1080p", "240Hz", "IPS", "Reflex analyzer"] },
    { name: "Budget 4K Monitor", price: 349.99, rating: 3, description: "Affordable 4K display", features: ["27\" 4K", "60Hz", "IPS", "HDR support"] },
    { name: "Gaming Monitor HDR", price: 479.99, rating: 4, description: "HDR gaming monitor with great colors", features: ["27\" 1440p", "144Hz", "HDR600", "Quantum dot"] },
    { name: "Curved Monitor 27\"", price: 299.99, rating: 4, description: "Curved gaming monitor with great value", features: ["27\" 1080p", "144Hz", "Curved 1500R", "FreeSync"] },
    { name: "Gaming Monitor Elite", price: 1099.99, rating: 5, description: "Elite gaming monitor with all features", features: ["32\" 4K", "240Hz", "IPS", "G-Sync Ultimate"] },
  ];
  
  monitors.forEach((mon, i) => products.push({
    id: `mon-${i + 1}`,
    ...mon,
    image: monitorImages[i % monitorImages.length],
    images: [...monitorImages], // All images for gallery
    category: "Monitor",
    inStock: i !== 8 // Make OLED out of stock as example
  }));

  // Controllers (15 products)
  const controllers = [
    { name: "Pro Gaming Controller", price: 79.99, rating: 4, description: "Professional gaming controller with elite features", features: ["Xbox/PC compatible", "Customizable buttons", "Wireless", "40-hour battery"] },
    { name: "Elite Gaming Controller", price: 129.99, rating: 5, description: "Elite controller with premium build", features: ["Adjustable tension", "Paddles", "Swappable sticks", "Charging dock"] },
    { name: "Wireless Controller RGB", price: 69.99, rating: 4, description: "RGB wireless controller for PC", features: ["RGB lighting", "Wireless 2.4GHz", "Gyro sensor", "Vibration feedback"] },
    { name: "Budget Gaming Controller", price: 39.99, rating: 3, description: "Affordable wired controller", features: ["Wired USB", "Basic vibration", "Compatible with PC", "Plug-and-play"] },
    { name: "Pro Controller Elite", price: 159.99, rating: 5, description: "Top-tier professional controller", features: ["Tournament approved", "Hair trigger locks", "Remappable buttons", "Premium case"] },
    { name: "Wireless Controller Pro", price: 89.99, rating: 4, description: "Premium wireless controller", features: ["Low latency", "Bluetooth", "Rechargeable", "Textured grips"] },
    { name: "Fighting Game Controller", price: 199.99, rating: 5, description: "Arcade stick for fighting games", features: ["Sanwa buttons", "Joystick", "Tournament legal", "Customizable art"] },
    { name: "Racing Wheel Controller", price: 299.99, rating: 5, description: "Force feedback racing wheel", features: ["900° rotation", "Force feedback", "Pedal set", "PC/Console compatible"] },
    { name: "Mini Wireless Controller", price: 49.99, rating: 3, description: "Compact wireless controller", features: ["Compact design", "Wireless", "Long battery", "Multi-platform"] },
    { name: "Modular Gaming Controller", price: 179.99, rating: 5, description: "Fully modular controller system", features: ["Swappable modules", "Magnetic faceplates", "Pro components", "Custom colors"] },
    { name: "Mobile Gaming Controller", price: 79.99, rating: 4, description: "Controller for mobile gaming", features: ["Phone mount", "Bluetooth", "Cloud gaming ready", "Compact fold"] },
    { name: "Adaptive Controller", price: 99.99, rating: 5, description: "Accessible adaptive controller", features: ["Accessibility focused", "Customizable inputs", "Multiple ports", "Easy setup"] },
    { name: "Retro Gaming Controller", price: 29.99, rating: 3, description: "Retro-style USB controller", features: ["Classic design", "USB connection", "8-way D-pad", "Turbo buttons"] },
    { name: "Flight Sim Controller", price: 249.99, rating: 5, description: "HOTAS for flight simulators", features: ["Throttle + stick", "Multiple buttons", "Realistic feel", "PC compatible"] },
    { name: "Gaming Controller Wireless", price: 59.99, rating: 4, description: "Reliable wireless gaming controller", features: ["Wireless dongle", "Good battery life", "Comfortable grip", "LED indicator"] },
  ];
  
  controllers.forEach((c, i) => products.push({
    id: `ctrl-${i + 1}`,
    ...c,
    image: controllerImages[i % controllerImages.length],
    images: [...controllerImages], // All images for gallery
    category: "Controller",
    inStock: true
  }));

  // Chairs (15 products)
  const chairs = [
    { name: "Gaming Chair Pro", price: 399.99, rating: 5, description: "Premium gaming chair with lumbar support", features: ["Adjustable lumbar", "4D armrests", "Recline 180°", "Memory foam"] },
    { name: "Executive Gaming Chair", price: 599.99, rating: 5, description: "Executive leather gaming chair", features: ["Genuine leather", "High back", "Massage function", "Premium casters"] },
    { name: "Budget Gaming Chair", price: 199.99, rating: 3, description: "Affordable gaming chair", features: ["PU leather", "Adjustable height", "Tilt function", "Lumbar pillow"] },
    { name: "Ergonomic Gaming Chair", price: 479.99, rating: 5, description: "Ergonomic design for long sessions", features: ["Ergonomic design", "Breathable mesh", "Adjustable everything", "Aluminum base"] },
    { name: "Racing Style Gaming Chair", price: 349.99, rating: 4, description: "Racing-inspired gaming chair", features: ["Racing seat design", "Bucket seat", "Side bolsters", "Racing stripes"] },
    { name: "Fabric Gaming Chair", price: 299.99, rating: 4, description: "Breathable fabric gaming chair", features: ["Breathable fabric", "Adjustable armrests", "Recline mechanism", "Headrest pillow"] },
    { name: "Gaming Chair RGB", price: 449.99, rating: 4, description: "Gaming chair with RGB lighting", features: ["RGB lighting", "Premium padding", "Adjustable lumbar", "USB charging"] },
    { name: "Office Gaming Chair", price: 329.99, rating: 4, description: "Professional office gaming chair", features: ["Professional look", "Mesh back", "Adjustable lumbar", "Silent wheels"] },
    { name: "Pink Gaming Chair", price: 369.99, rating: 4, description: "Stylish pink gaming chair", features: ["Pink design", "Comfortable padding", "Cute aesthetics", "High quality"] },
    { name: "Massage Gaming Chair", price: 549.99, rating: 5, description: "Gaming chair with massage features", features: ["8-point massage", "Heating function", "USB powered", "Plush padding"] },
    { name: "Gaming Chair Elite", price: 699.99, rating: 5, description: "Elite gaming chair with all features", features: ["Premium materials", "Full adjustability", "Extended warranty", "Luxury comfort"] },
    { name: "Compact Gaming Chair", price: 249.99, rating: 3, description: "Space-saving gaming chair", features: ["Compact design", "Foldable", "Lightweight", "Easy storage"] },
    { name: "High Back Gaming Chair", price: 419.99, rating: 4, description: "Extra tall high-back gaming chair", features: ["Extra tall back", "Head support", "Wide seat", "Heavy duty"] },
    { name: "Mesh Gaming Chair", price: 379.99, rating: 4, description: "Breathable mesh gaming chair", features: ["Full mesh", "Cooling airflow", "Ergonomic", "Modern design"] },
    { name: "Footrest Gaming Chair", price: 429.99, rating: 5, description: "Gaming chair with retractable footrest", features: ["Retractable footrest", "Full recline", "Comfortable", "Quality build"] },
  ];
  
  chairs.forEach((ch, i) => products.push({
    id: `chr-${i + 1}`,
    ...ch,
    image: chairImages[i % chairImages.length],
    images: [...chairImages], // All images for gallery
    category: "Chair",
    inStock: true
  }));

  // Shuffle products to mix categories
  for (let i = products.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [products[i], products[j]] = [products[j], products[i]];
  }

  return products;
};

export const mockProducts = generateProducts();

export const featuredDeals = [
  { id: "1", discount: "25% OFF", title: "Gaming Keyboards", subtitle: "Limited Time Offer", category: "Keyboard" },
  { id: "2", discount: "30% OFF", title: "Gaming Mice", subtitle: "Best Sellers", category: "Mouse" },
  { id: "3", discount: "20% OFF", title: "Gaming Headsets", subtitle: "Premium Sound", category: "Headset" },
];

export const categories = [
  { id: "keyboard", name: "Keyboard", count: 15 },
  { id: "mouse", name: "Mouse", count: 20 },
  { id: "headset", name: "Headset", count: 18 },
  { id: "monitor", name: "Monitor", count: 17 },
  { id: "controller", name: "Controller", count: 15 },
  { id: "chair", name: "Chair", count: 15 },
];
