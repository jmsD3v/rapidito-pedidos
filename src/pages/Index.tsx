import { useState, useEffect } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Cart, CartItem } from "@/components/Cart";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Settings } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-food.jpg";
import pizzaMargheritaImage from "@/assets/pizza-margherita.jpg";
import pizzaPepperoniImage from "@/assets/pizza-pepperoni.jpg";
import pizzaCuatroQuesosImage from "@/assets/pizza-cuatro-quesos.jpg";
import pizzaNapolitanaImage from "@/assets/pizza-napolitana.jpg";
import lomitoImage from "@/assets/lomito.jpg";
import lomitoCompletoImage from "@/assets/lomito-completo.jpg";
import sandwichMigaImage from "@/assets/sandwich-miga.jpg";
import carlitoImage from "@/assets/carlito.jpg";
import empanadaCarneImage from "@/assets/empanada-carne.jpg";
import empanadaPolloImage from "@/assets/empanada-pollo.jpg";
import empanadaJamonQuesoImage from "@/assets/empanada-jamon-queso.jpg";
import drinkImage from "@/assets/drink.jpg";

const PRODUCTS = [
  {
    id: "1",
    name: "Pizza Margherita",
    description: "Tomates frescos, mozzarella y albahaca sobre masa artesanal",
    price: 4500,
    category: "Pizzas",
    image: pizzaMargheritaImage,
  },
  {
    id: "2",
    name: "Pizza Pepperoni",
    description: "Generosas rodajas de pepperoni con queso mozzarella fundido",
    price: 5200,
    category: "Pizzas",
    image: pizzaPepperoniImage,
  },
  {
    id: "3",
    name: "Pizza Cuatro Quesos",
    description: "Mozzarella, gorgonzola, parmesano y fontina",
    price: 5800,
    category: "Pizzas",
    image: pizzaCuatroQuesosImage,
  },
  {
    id: "4",
    name: "Pizza Napolitana",
    description: "Tradicional con salsa de tomate, mozzarella, anchoas y orégano",
    price: 5000,
    category: "Pizzas",
    image: pizzaNapolitanaImage,
  },
  {
    id: "5",
    name: "Lomito",
    description: "Tierna carne de lomo con lechuga, tomate, huevo, jamón y queso",
    price: 4800,
    category: "Lomitos",
    image: lomitoImage,
  },
  {
    id: "6",
    name: "Lomito Completo",
    description: "Lomito con todos los ingredientes, una explosión de sabor",
    price: 6200,
    category: "Lomitos",
    image: lomitoCompletoImage,
  },
  {
    id: "7",
    name: "Sándwiches de Miga Surtidos",
    description: "Variedad de sándwiches de miga con distintos rellenos (x12 unidades)",
    price: 3800,
    category: "Sandwiches",
    image: sandwichMigaImage,
  },
  {
    id: "8",
    name: "Carlito",
    description: "Sándwich enrollado con jamón, queso y vegetales",
    price: 3200,
    category: "Sandwiches",
    image: carlitoImage,
  },
  {
    id: "9",
    name: "Empanadas de Carne",
    description: "Empanadas argentinas rellenas de carne jugosa (x6 unidades)",
    price: 2400,
    category: "Empanadas",
    image: empanadaCarneImage,
  },
  {
    id: "10",
    name: "Empanadas de Pollo",
    description: "Empanadas con relleno de pollo condimentado (x6 unidades)",
    price: 2400,
    category: "Empanadas",
    image: empanadaPolloImage,
  },
  {
    id: "11",
    name: "Empanadas de Jamón y Queso",
    description: "Empanadas con jamón y queso fundido (x6 unidades)",
    price: 2200,
    category: "Empanadas",
    image: empanadaJamonQuesoImage,
  },
  {
    id: "12",
    name: "Bebida Grande",
    description: "Refresco helado de 500ml",
    price: 1200,
    category: "Bebidas",
    image: drinkImage,
  },
];

const Index = () => {
  const navigate = useNavigate();
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
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/login')}
              title="Panel de Administración"
            >
              <Settings className="h-5 w-5" />
            </Button>
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
        </div>
      </nav>

      {/* Cart Sidebar */}
      {showCart && (
        <Cart
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onCheckout={handleCheckout}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="w-full">
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                {...product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default Index;
