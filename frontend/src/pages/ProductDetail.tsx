import { useParams, useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { MainLayout } from "@/components/MainLayout";
import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Star, Check, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { mockProducts } from "@/lib/mock-data";
import { useCartStore } from "@/lib/cart-store";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const product = mockProducts.find(p => p.id === id);

  // Get related products (same category, excluding current product)
  const relatedProducts = mockProducts
    .filter(p => p.category === product?.category && p.id !== id)
    .slice(0, 8);

  // Get suggested products (different categories, best sellers)
  const suggestedProducts = mockProducts
    .filter(p => p.category !== product?.category && p.rating >= 4)
    .slice(0, 8);

  // Check scroll position
  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      return () => container.removeEventListener('scroll', checkScroll);
    }
  }, [id]);

  // Auto-scroll functionality
  useEffect(() => {
    if (isAutoScrolling && scrollContainerRef.current) {
      autoScrollIntervalRef.current = setInterval(() => {
        if (scrollContainerRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
          
          if (scrollLeft >= scrollWidth - clientWidth - 10) {
            // Reached end, scroll back to start
            scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            // Continue scrolling right
            scrollContainerRef.current.scrollBy({ left: 2, behavior: 'auto' });
          }
        }
      }, 30);
    } else if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
      autoScrollIntervalRef.current = null;
    }

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [isAutoScrolling]);

  const toggleAutoScroll = () => {
    setIsAutoScrolling(!isAutoScrolling);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft = direction === 'left'
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  if (!product) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <Button onClick={() => navigate("/products")}>Back to Products</Button>
        </div>
      </MainLayout>
    );
  }

  const handleAddToCart = () => {
    addItem(product.id);
    toast.success("Added to cart!");
  };

  const handleBuyNow = () => {
    addItem(product.id);
    navigate("/checkout");
  };

  return (
    <MainLayout>
      <main className="container mx-auto px-4 py-8">
        <BackButton />

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="glass rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-4">
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30 mb-3">{product.category}</Badge>
              <h1 className="text-4xl font-bold mb-2 text-white">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < product.rating ? "fill-primary text-primary" : "fill-gray-600 text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-300">({product.rating}.0)</span>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-6">
                {product.inStock ? (
                  <>
                    <Check className="h-5 w-5 text-green-400" />
                    <span className="text-green-400 font-medium">In Stock</span>
                  </>
                ) : (
                  <span className="text-red-400 font-medium">Out of Stock</span>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <span className="text-5xl font-bold text-primary">${product.price}</span>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-white">Description</h2>
              <p className="text-gray-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3 text-white">Key Features</h2>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <Button
                className="flex-1 h-12 text-base bg-gradient-cyber hover:opacity-90"
                onClick={handleBuyNow}
                disabled={!product.inStock}
              >
                Buy Now
              </Button>
              <Button
                variant="outline"
                className="flex-1 h-12 text-base"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-white">Related Products</h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleAutoScroll}
                  className={`h-10 w-10 rounded-full ${isAutoScrolling ? 'bg-primary text-primary-foreground' : ''}`}
                  title={isAutoScrolling ? "Pause auto-scroll" : "Start auto-scroll"}
                >
                  {isAutoScrolling ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => scroll('left')}
                  disabled={!canScrollLeft}
                  className="h-10 w-10 rounded-full"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => scroll('right')}
                  disabled={!canScrollRight}
                  className="h-10 w-10 rounded-full"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              onMouseEnter={() => setIsAutoScrolling(false)}
            >
              {relatedProducts.map((relatedProduct) => (
                <Card
                  key={relatedProduct.id}
                  className="flex-shrink-0 w-72 glass cursor-pointer hover:scale-105 transition-transform duration-300 group"
                  onClick={() => {
                    navigate(`/product/${relatedProduct.id}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {!relatedProduct.inStock && (
                      <Badge className="absolute top-2 right-2 bg-red-500">Out of Stock</Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <Badge className="mb-2 text-xs bg-blue-500/20 text-blue-300 border-blue-400/30">{relatedProduct.category}</Badge>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-white">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < relatedProduct.rating ? "fill-primary text-primary" : "fill-gray-600 text-gray-600"
                          }`}
                        />
                      ))}
                      <span className="text-xs text-gray-300 ml-1">({relatedProduct.rating}.0)</span>
                    </div>
                    <p className="text-2xl font-bold text-primary">${relatedProduct.price}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Suggested Products Section */}
        {suggestedProducts.length > 0 && (
          <div className="mt-16 mb-12">
            <h2 className="text-3xl font-bold mb-6 text-white">You May Also Like</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {suggestedProducts.map((suggestedProduct) => (
                <Card
                  key={suggestedProduct.id}
                  className="glass cursor-pointer hover:scale-105 transition-transform duration-300 group"
                  onClick={() => {
                    navigate(`/product/${suggestedProduct.id}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={suggestedProduct.image}
                      alt={suggestedProduct.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {!suggestedProduct.inStock && (
                      <Badge className="absolute top-2 right-2 bg-red-500">Out of Stock</Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <Badge className="mb-2 text-xs bg-blue-500/20 text-blue-300 border-blue-400/30">{suggestedProduct.category}</Badge>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-white">
                      {suggestedProduct.name}
                    </h3>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < suggestedProduct.rating ? "fill-primary text-primary" : "fill-gray-600 text-gray-600"
                          }`}
                        />
                      ))}
                      <span className="text-xs text-gray-300 ml-1">({suggestedProduct.rating}.0)</span>
                    </div>
                    <p className="text-2xl font-bold text-primary">${suggestedProduct.price}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </MainLayout>
  );
};

export default ProductDetail;
