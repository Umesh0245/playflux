import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, ShoppingCart, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/lib/user-store";
import { mockProducts } from "@/lib/mock-data";
import PlayFluxLogo from "@/assets/playflux-logo.svg";
import PillNav from "@/components/PillNav";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export const Header = ({ cartItemCount, onCartClick }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useUserStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = mockProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results.slice(0, 5));
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setShowResults(false);
      setSearchQuery("");
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(e as any);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Determine active href for PillNav - match products for any product-related URL
  const getActiveHref = () => {
    const path = location.pathname;
    if (path.includes('product')) return '/products';
    return path;
  };

  return (
    <header className="sticky top-0 z-50 bg-white backdrop-blur-xl border-b border-gray-200 shadow-lg">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between h-20">
          {/* Left: Logo + Search */}
          <div className="flex items-center gap-6">
            <div
              className="flex items-center cursor-pointer hover:scale-105 transition-transform"
              onClick={() => navigate("/")}
            >
              <img
                src={PlayFluxLogo}
                alt="PlayFlux"
                className="h-10 w-auto"
              />
            </div>

            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4 z-10" />
              <input
                type="search"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-gray-100 border border-gray-300 text-black placeholder:text-gray-500 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
              />
              {showResults && searchResults.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-2xl max-h-96 overflow-y-auto z-50">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer transition-colors border-b border-gray-100 last:border-0"
                      onClick={() => {
                        navigate(`/products?search=${product.name}`);
                        setShowResults(false);
                        setSearchQuery("");
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm text-black">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.category}</p>
                      </div>
                      <p className="font-semibold text-black">${product.price}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: PillNav + Actions */}
          <div className="flex items-center gap-5">
            {/* PillNav with About and Profile */}
            <PillNav
              logo=""
              logoAlt=""
              items={
                user
                  ? [
                      { label: "Home", href: "/" },
                      { label: "Products", href: "/products" },
                      { label: "About", href: "/about" },
                      { label: "Profile", href: "/profile" },
                    ]
                  : [
                      { label: "Home", href: "/" },
                      { label: "Products", href: "/products" },
                      { label: "About", href: "/about" },
                      { label: "Login", href: "/login" },
                    ]
              }
              activeHref={getActiveHref()}
              className="custom-nav"
              ease="power3.easeOut"
              baseColor="#000000"
              pillColor="#ffffff"
              hoveredPillTextColor="#000000"
              pillTextColor="#000000"
            />

            {/* Cart Icon */}
            <Button
              variant="ghost"
              size="sm"
              className="relative h-11 w-11 p-0 rounded-full bg-gray-100 hover:bg-gray-200 text-black border border-gray-300 hover:border-gray-400 transition-all shadow-md"
              onClick={onCartClick}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg">
                  {cartItemCount}
                </span>
              )}
            </Button>

            {/* Logout Button (only when logged in) */}
            {user && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="h-11 w-11 p-0 rounded-full bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 hover:border-red-300 transition-all shadow-md"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
