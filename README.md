# Rápido y Rico

Delivery de comidas rápidas: catálogo con categorías, carrito y — pendiente — checkout.

## Qué hay hecho

- **Catálogo** (`products`) filtrable por categoría, en `Index.tsx`.
- **Carrito** — agregar/quitar productos, persistido en `localStorage`.
- **Auth + Admin** — login contra Supabase y panel de administración básico.
- **Configuración del local** (`settings`) — datos editables desde el admin.

## Lo que falta (honesto)

El carrito no tiene forma de confirmarse: no hay botón de "finalizar pedido", no hay tabla `orders`/`pedidos` en las migraciones, y no hay integración de WhatsApp para mandar el pedido. Agregar productos al carrito hoy no lleva a ningún lado. Para que sea un delivery real falta: tabla de pedidos, un flujo de checkout (dirección, método de pago o link a WhatsApp) y notificación al local.

También quedó instalado `mapbox-gl` + `@mapbox/mapbox-gl-geocoder` (probablemente para geolocalizar la dirección de entrega) sin uso confirmado en las páginas actuales — revisar si vale la pena mantenerlo o sacarlo si no se termina usando.

## Stack

React 18 + TypeScript + Vite, shadcn/ui sobre Radix, Tailwind, React Router, React Query, Supabase (Postgres + Auth) como backend, Mapbox GL para mapas.

## Desarrollo local

```sh
npm install
cp .env.example .env   # completar con las credenciales de un proyecto Supabase (la instancia original no está conectada)
npm run dev
```
