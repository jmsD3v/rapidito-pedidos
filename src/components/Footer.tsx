import { MapPin, Phone, Mail } from "lucide-react";
import MapView from "./MapView";

export const Footer = () => {
  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Rápido y Rico</h3>
            <p className="text-muted-foreground">
              Las mejores comidas rápidas de la ciudad, hechas con ingredientes frescos y mucho amor.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Contacto</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Av. Corrientes 1234, Buenos Aires</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+54 11 1234-5678</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>info@rapidoyrico.com</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Horarios</h3>
            <div className="space-y-1 text-muted-foreground">
              <p>Lunes a Viernes: 11:00 - 23:00</p>
              <p>Sábados y Domingos: 12:00 - 00:00</p>
            </div>
          </div>
        </div>
        
        {/* Mapa de ubicación */}
        <div className="mt-8">
          <h3 className="font-bold text-lg mb-4 text-center">Dónde Encontrarnos</h3>
          <MapView />
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
          <p>&copy; 2024 Rápido y Rico. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
