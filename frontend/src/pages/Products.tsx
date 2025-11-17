import { useMemo, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MainLayout } from "@/components/MainLayout";
import { ProductCard } from "@/components/ProductCard";
import { BackButton } from "@/components/BackButton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/cart-store";
import { mockProducts } from "@/lib/mock-data";
import { toast } from "sonner";

const categories = [
  { id: "all", name: "All Products" },
  { id: "Keyboard", name: "Keyboards" },
  { id: "Mouse", name: "Mice" },
  { id: "Headset", name: "Headsets" },
  { id: "Monitor", name: "Monitors" },
  { id: "Controller", name: "Controllers" },
  { id: "Chair", name: "Gaming Chairs" },
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState("featured");
  
  const { addItem } = useCartStore();
  const searchQuery = searchParams.get("search");

  const handleAddToCart = (id: string) => {
    addItem(id);
    toast.success("Added to cart!");
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    // Clear search when changing category
    if (searchQuery) {
      setSearchParams({});
    }
  };

  useEffect(() => {
    if (searchQuery) {
      setSelectedCategory("all");
    }
  }, [searchQuery]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = mockProducts;
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory && selectedCategory !== "all") {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    // Sort products
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price-low": return a.price - b.price;
        case "price-high": return b.price - a.price;
        case "rating": return b.rating - a.rating;
        case "name": return a.name.localeCompare(b.name);
        default: return 0;
      }
    });
    
    return sorted;
  }, [selectedCategory, sortBy, searchQuery]);

  return (
    <MainLayout>
      <div className="container mx-auto px-6 max-w-7xl py-12">
        <BackButton />
        
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-8 text-white tracking-tight">
            {searchQuery ? `Search results for "${searchQuery}"` : "Products"}
          </h1>
          
          {/* Category Filters */}
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => handleCategoryChange(category.id)}
                size="lg"
                className={`rounded-full font-semibold transition-all ${
                  selectedCategory === category.id 
                    ? "bg-white text-black hover:bg-gray-100 shadow-lg scale-105" 
                    : "bg-black text-white border-2 border-white hover:bg-white hover:text-black"
                }`}
              >
                {category.name}
              </Button>
            ))}
          </div>

          {/* Results count and sort */}
          <div className="flex items-center justify-between">
            <p className="text-base text-white font-semibold">
              {filteredAndSortedProducts.length} products
            </p>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[200px] rounded-lg bg-white border-2 border-gray-200 font-semibold">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="name">Name: A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-300">No products found</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Products;
