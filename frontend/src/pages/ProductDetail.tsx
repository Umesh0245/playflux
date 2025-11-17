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
import { formatPrice } from "@/lib/currency";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
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
          {/* Product Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-gray-200 relative group">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-[500px] object-cover"
              />
              
              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setSelectedImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-2 border-gray-200 rounded-full w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft className="h-6 w-6 text-black" />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setSelectedImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-2 border-gray-200 rounded-full w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight className="h-6 w-6 text-black" />
                  </Button>
                </>
              )}
              
              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {selectedImageIndex + 1} / {product.images.length}
              </div>
            </div>
            
            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-5 gap-3">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`bg-white rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index
                        ? 'border-black shadow-lg scale-105'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200">
            <div className="mb-4">
              <Badge className="bg-black text-white mb-3 uppercase font-semibold tracking-wide px-3 py-1.5">{product.category}</Badge>
              <h1 className="text-4xl font-bold mb-2 text-black">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < product.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-700 font-semibold text-base">({product.rating}.0)</span>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-6">
                {product.inStock ? (
                  <>
                    <Check className="h-5 w-5 text-green-600" />
                    <span className="text-green-600 font-bold text-base">In Stock</span>
                  </>
                ) : (
                  <span className="text-red-600 font-bold text-base">Out of Stock</span>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="mb-6 py-4 border-y-2 border-gray-200">
              <span className="text-5xl font-bold text-black">{formatPrice(product.price)}</span>
            </div>

            {/* Description */}
            <div className="mb-6 bg-white rounded-xl p-6 border-2 border-gray-300 shadow-sm">
              <h2 className="text-2xl font-bold mb-3 text-black">Description</h2>
              <p className="text-gray-900 leading-relaxed text-base font-normal">
                {product.description}
              </p>
            </div>

            {/* Features */}
            <div className="mb-8 bg-white rounded-xl p-6 border-2 border-gray-300 shadow-sm">
              <h2 className="text-2xl font-bold mb-4 text-black">Key Features</h2>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-900 text-base font-normal leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <Button
                className="flex-1 h-12 text-base bg-black hover:bg-gray-800 text-white font-semibold"
                onClick={handleBuyNow}
                disabled={!product.inStock}
              >
                Buy Now
              </Button>
              <Button
                variant="outline"
                className="flex-1 h-12 text-base border-2 border-gray-300 text-black hover:bg-gray-100 font-semibold"
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
              <h2 className="text-3xl font-bold text-white bg-black px-6 py-3 rounded-xl">Related Products</h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleAutoScroll}
                  className={`h-10 w-10 rounded-full border-2 ${isAutoScrolling ? 'bg-black text-white border-black' : 'bg-white border-gray-200 text-black hover:bg-gray-100 hover:border-black'}`}
                  title={isAutoScrolling ? "Pause auto-scroll" : "Start auto-scroll"}
                >
                  {isAutoScrolling ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => scroll('left')}
                  disabled={!canScrollLeft}
                  className="h-10 w-10 rounded-full bg-white border-2 border-gray-200 hover:bg-gray-100 hover:border-black text-black disabled:opacity-50"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => scroll('right')}
                  disabled={!canScrollRight}
                  className="h-10 w-10 rounded-full bg-white border-2 border-gray-200 hover:bg-gray-100 hover:border-black text-black disabled:opacity-50"
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
                  className="flex-shrink-0 w-72 bg-white border-2 border-gray-200 cursor-pointer hover:shadow-xl hover:border-black transition-all duration-300 group"
                  onClick={() => {
                    navigate(`/product/${relatedProduct.id}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <div className="relative overflow-hidden rounded-t-lg bg-gradient-to-br from-gray-50 to-gray-100">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {!relatedProduct.inStock && (
                      <Badge className="absolute top-3 right-3 bg-red-600 text-white text-sm px-3 py-1">Out of Stock</Badge>
                    )}
                  </div>
                  <CardContent className="p-5">
                    <Badge className="mb-3 text-xs bg-gray-100 text-black border border-gray-300 uppercase tracking-wide font-semibold">{relatedProduct.category}</Badge>
                    <h3 className="font-bold text-xl mb-3 line-clamp-2 text-black leading-tight min-h-[3.5rem]">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < relatedProduct.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-1 font-medium">({relatedProduct.rating}.0)</span>
                    </div>
                    <p className="text-3xl font-bold text-black">{formatPrice(relatedProduct.price)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Suggested Products Section */}
        {suggestedProducts.length > 0 && (
          <div className="mt-16 mb-12">
            <h2 className="text-3xl font-bold mb-6 text-white bg-black px-6 py-3 rounded-xl inline-block">You May Also Like</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {suggestedProducts.map((suggestedProduct) => (
                <Card
                  key={suggestedProduct.id}
                  className="bg-white border-2 border-gray-200 cursor-pointer hover:shadow-xl hover:border-black transition-all duration-300 group"
                  onClick={() => {
                    navigate(`/product/${suggestedProduct.id}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <div className="relative overflow-hidden rounded-t-lg bg-gradient-to-br from-gray-50 to-gray-100">
                    <img
                      src={suggestedProduct.image}
                      alt={suggestedProduct.name}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {!suggestedProduct.inStock && (
                      <Badge className="absolute top-3 right-3 bg-red-600 text-white text-sm px-3 py-1">Out of Stock</Badge>
                    )}
                  </div>
                  <CardContent className="p-5">
                    <Badge className="mb-3 text-xs bg-gray-100 text-black border border-gray-300 uppercase tracking-wide font-semibold">{suggestedProduct.category}</Badge>
                    <h3 className="font-bold text-xl mb-3 line-clamp-2 text-black leading-tight min-h-[3.5rem]">
                      {suggestedProduct.name}
                    </h3>
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < suggestedProduct.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-1 font-medium">({suggestedProduct.rating}.0)</span>
                    </div>
                    <p className="text-3xl font-bold text-black">{formatPrice(suggestedProduct.price)}</p>
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
