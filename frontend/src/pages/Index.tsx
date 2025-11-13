import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/MainLayout";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/lib/cart-store";
import { mockProducts, featuredDeals, categories } from "@/lib/mock-data";
import Hyperspeed from "@/components/Hyperspeed";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();
  const { addItem } = useCartStore();

  const handleAddToCart = (id: string) => {
    addItem(id);
    toast.success("Added to cart!");
  };

  return (
    <MainLayout>
        {/* Hero Section with Hyperspeed */}
        <section className="relative h-[650px] overflow-hidden bg-black">
          {/* Hyperspeed Background */}
          <div className="absolute inset-0 z-0">
            <Hyperspeed
              effectOptions={{
                distortion: 'turbulentDistortion',
                length: 400,
                roadWidth: 9,
                islandWidth: 2,
                lanesPerRoad: 3,
                fov: 90,
                fovSpeedUp: 150,
                speedUp: 2,
                carLightsFade: 0.4,
                totalSideLightSticks: 50,
                lightPairsPerRoadWay: 50,
                colors: {
                  roadColor: 0x080808,
                  islandColor: 0x0a0a0a,
                  background: 0x000000,
                  shoulderLines: 0x262626,
                  brokenLines: 0x262626,
                  leftCars: [0xFF5FBF, 0x9F50FF, 0xFF47DC],
                  rightCars: [0x00E5FF, 0x0EA5FF, 0x5599FF],
                  sticks: 0x00E5FF
                }
              }}
            />
          </div>
          {/* Dark Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10" />
          
          {/* Hero Content */}
          <div className="relative z-20 container mx-auto px-6 max-w-7xl h-full flex items-center">
            <div className="max-w-xl space-y-6">
              <h1 className="text-6xl md:text-7xl font-semibold leading-tight tracking-tight text-white drop-shadow-lg">
                Pro-grade gear.
                <span className="block">
                  Unmatched performance.
                </span>
              </h1>
              <p className="text-lg text-gray-200 font-light drop-shadow-md">
                Premium gaming peripherals crafted for precision and style.
              </p>
              <div className="flex gap-3 pt-2">
                <Button size="lg" onClick={() => navigate("/products")} className="gap-2 rounded-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/50">
                  Shop Now
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="rounded-full border-2 border-white/70 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white shadow-lg"
                >
                  Explore More
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Today's Deals */}
        <section className="container mx-auto px-6 max-w-7xl py-20 bg-black">
          <h2 className="text-3xl font-semibold mb-12 text-white tracking-tight">Limited time offers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredDeals.map((deal) => (
              <div 
                key={deal.id} 
                className="rounded-2xl bg-white border-white/10 p-8 hover:shadow-2xl transition-all cursor-pointer group"
                onClick={() => navigate(`/products?search=${encodeURIComponent(deal.category)}`)}
              >
                <Badge className="mb-4 bg-black text-white text-sm px-3 py-1 rounded-full font-medium">
                  {deal.discount}
                </Badge>
                <h3 className="text-2xl font-semibold mb-2 text-black group-hover:text-gray-700 transition-colors">{deal.title}</h3>
                <p className="text-gray-600">{deal.subtitle}</p>
                <Button variant="link" className="mt-4 p-0 h-auto text-black font-semibold">
                  View Deals <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">Featured products</h2>
              <Button
                variant="ghost"
                onClick={() => navigate("/products")}
                className="group font-semibold text-white hover:bg-white/10"
              >
                View All
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockProducts.slice(0, 4).map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="container mx-auto px-6 max-w-7xl py-20 bg-black">
          <h2 className="text-3xl font-semibold mb-12 text-white tracking-tight">Browse by category</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <div 
                key={cat.id} 
                className="rounded-2xl bg-white border-white/10 p-6 text-center cursor-pointer hover:shadow-2xl transition-all group"
                onClick={() => navigate(`/products?search=${encodeURIComponent(cat.name)}`)}
              >
                <h3 className="font-semibold mb-2 text-black text-sm group-hover:text-gray-700 transition-colors">{cat.name}</h3>
                <p className="text-xs text-gray-600">{cat.count} products</p>
                <Button variant="ghost" size="sm" className="mt-2 text-xs opacity-100 text-black hover:bg-black/5">
                  Browse <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Latest Arrivals */}
        <section className="container mx-auto px-6 max-w-7xl py-20 mb-20 bg-black">
          <h2 className="text-3xl font-semibold mb-12 text-white tracking-tight">Latest arrivals</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Show diverse products: keyboard, mouse, headset, monitor */}
            {[mockProducts[0], mockProducts[15], mockProducts[35], mockProducts[53]].map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </section>
      </MainLayout>
  );
};

export default Index;
