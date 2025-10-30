import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Plus } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  onAddToCart: (product: { id: string; name: string; price: number; image: string }) => void;
}

export const ProductCard = ({ id, name, description, price, image, onAddToCart }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-square overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-1">{name}</h3>
        <p className="text-sm text-muted-foreground mb-2">{description}</p>
        <p className="text-2xl font-bold text-primary">${price.toLocaleString('es-AR')}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full" 
          onClick={() => onAddToCart({ id, name, price, image })}
        >
          <Plus className="mr-2 h-4 w-4" /> Agregar al Carrito
        </Button>
      </CardFooter>
    </Card>
  );
};
