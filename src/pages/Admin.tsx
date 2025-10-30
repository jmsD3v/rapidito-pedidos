import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { LogOut, Store, MapPin, CreditCard } from 'lucide-react';
import LocationMap from '@/components/LocationMap';
import ProductManager from '@/components/ProductManager';

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({
    app_name: 'Rápido y Rico',
    address: '',
    cvu: '',
    alias: '',
    latitude: '-34.6037',
    longitude: '-58.3816',
  });

  useEffect(() => {
    checkAuth();
    loadSettings();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/login');
      return;
    }
    setUser(session.user);
    setLoading(false);
  };

  const loadSettings = async () => {
    const { data, error } = await supabase
      .from('settings')
      .select('key, value');
    
    if (data) {
      const settingsObj: any = {};
      data.forEach((item) => {
        settingsObj[item.key] = item.value;
      });
      setSettings((prev) => ({ ...prev, ...settingsObj }));
    }
  };

  const handleSaveSettings = async () => {
    const updates = Object.entries(settings).map(([key, value]) => ({
      key,
      value: value.toString(),
    }));

    for (const update of updates) {
      await supabase
        .from('settings')
        .upsert(update, { onConflict: 'key' });
    }

    toast({
      title: 'Configuración guardada',
      description: 'Los cambios se guardaron exitosamente',
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Panel de Administración</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar Sesión
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">
              <Store className="mr-2 h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="location">
              <MapPin className="mr-2 h-4 w-4" />
              Ubicación
            </TabsTrigger>
            <TabsTrigger value="payment">
              <CreditCard className="mr-2 h-4 w-4" />
              Pagos
            </TabsTrigger>
            <TabsTrigger value="products">
              Productos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>Información General</CardTitle>
                <CardDescription>
                  Configura el nombre y datos básicos de tu negocio
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="app_name">Nombre de la App</Label>
                  <Input
                    id="app_name"
                    value={settings.app_name}
                    onChange={(e) => setSettings({ ...settings, app_name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Domicilio del Negocio</Label>
                  <Input
                    id="address"
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    placeholder="Ej: Av. Corrientes 1234, CABA"
                  />
                </div>
                <Button onClick={handleSaveSettings}>Guardar Cambios</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="location">
            <Card>
              <CardHeader>
                <CardTitle>Ubicación del Negocio</CardTitle>
                <CardDescription>
                  Los clientes podrán ver dónde estás ubicado
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="latitude">Latitud</Label>
                    <Input
                      id="latitude"
                      value={settings.latitude}
                      onChange={(e) => setSettings({ ...settings, latitude: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="longitude">Longitud</Label>
                    <Input
                      id="longitude"
                      value={settings.longitude}
                      onChange={(e) => setSettings({ ...settings, longitude: e.target.value })}
                    />
                  </div>
                </div>
                <LocationMap
                  latitude={parseFloat(settings.latitude)}
                  longitude={parseFloat(settings.longitude)}
                  onLocationChange={(lat, lng) => {
                    setSettings({ ...settings, latitude: lat.toString(), longitude: lng.toString() });
                  }}
                />
                <Button onClick={handleSaveSettings}>Guardar Ubicación</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle>Datos de Pago</CardTitle>
                <CardDescription>
                  Configura tu CVU y alias para recibir pagos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cvu">CVU</Label>
                  <Input
                    id="cvu"
                    value={settings.cvu}
                    onChange={(e) => setSettings({ ...settings, cvu: e.target.value })}
                    placeholder="0000003100010000000001"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alias">Alias de Pago</Label>
                  <Input
                    id="alias"
                    value={settings.alias}
                    onChange={(e) => setSettings({ ...settings, alias: e.target.value })}
                    placeholder="rapido.rico.delivery"
                  />
                </div>
                <Button onClick={handleSaveSettings}>Guardar Datos de Pago</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products">
            <ProductManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
