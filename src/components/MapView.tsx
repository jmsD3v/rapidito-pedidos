import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { supabase } from "@/integrations/supabase/client";

const MapView = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [location, setLocation] = useState({ lat: -34.6037, lng: -58.3816 }); // Buenos Aires default

  useEffect(() => {
    const loadLocation = async () => {
      const { data: settings } = await supabase
        .from("settings")
        .select("key, value")
        .in("key", ["latitude", "longitude"]);

      if (settings && settings.length > 0) {
        const lat = settings.find(s => s.key === "latitude")?.value;
        const lng = settings.find(s => s.key === "longitude")?.value;
        
        if (lat && lng) {
          setLocation({ lat: parseFloat(lat), lng: parseFloat(lng) });
        }
      }
    };

    loadLocation();
  }, []);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN || "pk.eyJ1IjoibG92YWJsZS1kZW1vIiwiYSI6ImNtNWZ6cTY0NTA5cmoya3NleW16N2c4d3QifQ.example";
    
    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [location.lng, location.lat],
      zoom: 15,
    });

    new mapboxgl.Marker({ color: "#f97316" })
      .setLngLat([location.lng, location.lat])
      .addTo(map.current);

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    return () => {
      map.current?.remove();
    };
  }, [location]);

  return (
    <div className="w-full h-[300px] rounded-lg overflow-hidden shadow-lg">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};

export default MapView;
