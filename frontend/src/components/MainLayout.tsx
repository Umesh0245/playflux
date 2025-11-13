import { ReactNode } from "react";
import { Header } from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/lib/cart-store";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const navigate = useNavigate();
  const { items } = useCartStore();
  
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col w-full relative bg-black">
      {/* Content with higher z-index */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header 
          cartItemCount={cartItemCount}
          onCartClick={() => navigate("/cart")}
        />
        <main className="flex-1 bg-black">
          {children}
        </main>
      </div>
    </div>
  );
};
