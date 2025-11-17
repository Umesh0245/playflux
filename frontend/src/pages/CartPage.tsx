import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/MainLayout";
import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/lib/cart-store";
import { Minus, Plus, Trash2, ShoppingBag, Package } from "lucide-react";
import { formatPrice, getINRPrice } from "@/lib/currency";

const CartPage = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem } = useCartStore();

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = 100; // $100 = ₹8,300
  const shipping = subtotal > 0 ? (subtotal > freeShippingThreshold ? 0 : 9.99) : 0; // $9.99 = ₹830
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;
  const savings = shipping === 0 && subtotal > 0 ? 9.99 : 0;

  if (items.length === 0) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16">
          <Card className="bg-white border-2 border-gray-200 max-w-md mx-auto text-center p-12 shadow-lg">
            <div className="bg-gray-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <ShoppingBag className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold mb-3 text-black">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">
              Add some amazing gaming gear to get started!
            </p>
            <Button 
              onClick={() => navigate("/products")} 
              className="bg-black text-white hover:bg-gray-800"
              size="lg"
            >
              Start Shopping
            </Button>
          </Card>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <BackButton />

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h1 className="text-4xl font-bold text-black flex items-center gap-3">
            <ShoppingBag className="h-10 w-10" />
            Shopping Cart
            <span className="text-2xl text-gray-500 font-normal">({items.length} {items.length === 1 ? 'item' : 'items'})</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <Card key={item.id} className="bg-white border-2 border-gray-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full sm:w-36 h-36 object-cover rounded-xl border-2 border-gray-100"
                      />
                      <div className="absolute top-2 left-2 bg-black text-white text-xs font-bold px-2 py-1 rounded">
                        #{index + 1}
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-xl mb-2 text-black">{item.name}</h3>
                        <div className="flex items-baseline gap-3 mb-4">
                          <p className="text-3xl font-bold text-black">
                            {formatPrice(item.price)}
                          </p>
                          <p className="text-sm text-gray-500">per item</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() =>
                              updateQuantity(item.id, Math.max(1, item.quantity - 1))
                            }
                            className="hover:bg-white hover:text-black w-10 h-10 rounded-lg"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-16 text-center font-bold text-lg text-black">
                            {item.quantity}
                          </span>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="hover:bg-white hover:text-black w-10 h-10 rounded-lg"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Subtotal</p>
                            <p className="text-2xl font-bold text-black">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 w-10 h-10 rounded-lg"
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-white border-2 border-gray-200 sticky top-24 shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-black flex items-center gap-2">
                  <Package className="h-6 w-6" />
                  Order Summary
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal ({items.length} items)</span>
                    <span className="font-semibold text-black">{formatPrice(subtotal)}</span>
                  </div>
                  
                  {subtotal > freeShippingThreshold && (
                    <div className="flex justify-between text-green-600 bg-green-50 p-2 rounded-lg">
                      <span className="font-semibold">Free Shipping!</span>
                      <span className="font-semibold">-{formatPrice(9.99)}</span>
                    </div>
                  )}
                  
                  {subtotal > 0 && subtotal <= freeShippingThreshold && (
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-blue-700 font-semibold">
                        Add {formatPrice(freeShippingThreshold - subtotal)} more for FREE shipping!
                      </p>
                    </div>
                  )}

                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span className={`font-semibold ${shipping === 0 && subtotal > 0 ? 'text-green-600 line-through' : 'text-black'}`}>
                      {shipping === 0 && subtotal > 0 ? formatPrice(9.99) : formatPrice(shipping)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-gray-700">
                    <span>Estimated Tax</span>
                    <span className="font-semibold text-black">{formatPrice(tax)}</span>
                  </div>
                  
                  <Separator className="bg-gray-200" />
                  
                  {savings > 0 && (
                    <div className="flex justify-between text-green-600 font-semibold">
                      <span>You saved</span>
                      <span>{formatPrice(savings)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-lg pt-2">
                    <span className="font-bold text-black">Total</span>
                    <span className="font-bold text-black text-3xl">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
                
                <Button
                  className="w-full mt-6 bg-black text-white hover:bg-gray-800 text-lg py-7 font-bold shadow-lg"
                  onClick={() => navigate("/checkout")}
                  size="lg"
                >
                  Proceed to Checkout
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full mt-3 border-2 border-gray-300 text-black hover:bg-gray-50"
                  onClick={() => navigate("/products")}
                >
                  Continue Shopping
                </Button>

                <div className="mt-6 space-y-3 text-sm text-gray-600">
                  <p className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    Secure checkout
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    Free returns within 30 days
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    1-year warranty included
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CartPage;
