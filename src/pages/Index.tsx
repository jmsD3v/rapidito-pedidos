import { useState, useEffect } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Cart, CartItem } from "@/components/Cart";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import heroImage from "@/assets/hero-food.jpg";
import burgerImage from "@/assets/burger.jpg";
import friesImage from "@/assets/fries.jpg";
import chickenImage from "@/assets/chicken.jpg";
import drinkImage from "@/assets/drink.jpg";
import hotdogImage from "@/assets/hotdog.jpg";

const PRODUCTS = [
  {
    id: "1",
    name: "Hamburguesa Clásica",
    description: "Jugosa carne con queso, lechuga, tomate y nuestra salsa especial",
    price: 3500,
    category: "Hamburguesas",
    image: burgerImage,
  },
  {
    id: "2",
    name: "Papas Fritas",
    description: "Crujientes papas doradas, perfectas para acompañar",
    price: 1800,
    category: "Acompañamientos",
    image: friesImage,
  },
  {
    id: "3",
    name: "Pollo Frito",
    description: "Trozos de pollo crujiente con receta secreta",
    price: 4200,
    category: "Pollo",
    image: chickenImage,
  },
  {
    id: "4",
    name: "Bebida Grande",
    description: "Refresco helado de 500ml",
    price: 1200,
    category: "Bebidas",
    image: drinkImage,
  },
  {
    id: "5",
    name: "Hot Dog Especial",
    description: "Salchicha premium con todos los aderezos",
    price: 2800,
    category: "Hot Dogs",
    image: hotdogImage,
  },
  {
    id: "6",
    name: "Hamburguesa Doble",
    description: "Doble carne, doble queso, doble sabor",
    price: 5500,
    category: "Hamburguesas",
    image: burgerImage,
  },
];

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");

  const categories = ["Todos", ...Array.from(new Set(PRODUCTS.map(p => p.category)))];

  // Cargar carrito desde localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Guardar carrito en localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product: { id: string; name: string; price: number; image: string }) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast.success(`${product.name} agregado al carrito`);
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast.info("Producto eliminado del carrito");
  };

  const handleCheckout = () => {
    toast.info("Función de pago próximamente disponible");
  };

  const filteredProducts = selectedCategory === "Todos" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === selectedCategory);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section 
        className="relative h-[60vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">Rápido y Rico</h1>
          <p className="text-xl md:text-2xl mb-8">Las mejores comidas rápidas a tu puerta</p>
          <Button size="lg" variant="secondary" className="text-lg px-8">
            Ver Menú
          </Button>
        </div>
      </section>

      {/* Navbar sticky con carrito */}
      <nav className="sticky top-0 z-40 bg-background border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-primary">Rápido y Rico</h2>
          <Button 
            variant="outline" 
            className="relative"
            onClick={() => setShowCart(!showCart)}
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Carrito
            {totalItems > 0 && (
              <Badge className="ml-2" variant="secondary">
                {totalItems}
              </Badge>
            )}
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Products Section */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-6">Nuestro Menú</h2>
            
            {/* Category Filter */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="whitespace-nowrap"
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </div>

          {/* Cart Section (Desktop) */}
          <div className="hidden lg:block sticky top-24 h-fit">
            <Cart
              items={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onCheckout={handleCheckout}
            />
          </div>
        </div>

        {/* Cart Section (Mobile) */}
        {showCart && (
          <div className="lg:hidden fixed inset-0 bg-black/50 z-50 flex items-end">
            <div className="bg-background w-full max-h-[80vh] overflow-y-auto rounded-t-xl">
              <div className="sticky top-0 bg-background p-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-bold">Carrito</h2>
                <Button variant="ghost" onClick={() => setShowCart(false)}>
                  Cerrar
                </Button>
              </div>
              <div className="p-4">
                <Cart
                  items={cartItems}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                  onCheckout={handleCheckout}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
