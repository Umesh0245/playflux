import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  onAddToCart: (id: string) => void;
}

export const ProductCard = ({ id, name, price, image, rating, category, onAddToCart }: ProductCardProps) => {
  const navigate = useNavigate();

  return (
    <div 
      className="group overflow-hidden rounded-2xl bg-white border border-white/20 hover:shadow-2xl transition-all duration-300 cursor-pointer"
      onClick={() => navigate(`/product/${id}`)}
    >
      <div className="aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5 space-y-3">
        <div>
          <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
            {category}
          </p>
          <h3 className="font-bold text-lg line-clamp-2 text-black mb-1">
            {name}
          </h3>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 font-medium">
            {rating}
          </span>
        </div>
        <div className="flex items-center justify-between pt-2">
          <span className="text-2xl font-bold text-black">
            ${price}
          </span>
          <Button 
            size="sm" 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(id);
            }}
            className="gap-1.5 h-9 rounded-full bg-black hover:bg-gray-800 text-white"
          >
            <ShoppingCart className="h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};