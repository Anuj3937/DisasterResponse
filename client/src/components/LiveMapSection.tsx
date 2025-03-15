import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { ApiDisaster } from "@/lib/types";
import { motion } from "framer-motion";

declare global {
  interface Window {
    L: any;
  }
}

const severityColors = {
  low: "#10b981", // green
  medium: "#f59e0b", // yellow
  high: "#f97316", // orange
  critical: "#dc2626", // red
};

const severityLevels = [
  { level: "Low Severity", color: severityColors.low },
  { level: "Medium Severity", color: severityColors.medium },
  { level: "High Severity", color: severityColors.high },
  { level: "Critical Severity", color: severityColors.critical },
];

const LiveMapSection = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);

  const { data: disasters, isLoading } = useQuery<ApiDisaster[]>({
    queryKey: ["/api/disasters"],
  });

  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current || leafletMapRef.current) return;

    // Load Leaflet script dynamically
    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
    script.crossOrigin = "";
    
    script.onload = () => {
      initializeMap();
    };
    
    document.body.appendChild(script);

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (leafletMapRef.current && disasters && disasters.length > 0) {
      addMarkersToMap();
    }
  }, [disasters, leafletMapRef.current]);

  const initializeMap = () => {
    if (!window.L || !mapRef.current) return;

    // Create map instance
    leafletMapRef.current = window.L.map(mapRef.current).setView([39.50, -98.35], 4); // US centered
    
    // Add tile layer (OpenStreetMap)
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo(leafletMapRef.current);

    if (disasters && disasters.length > 0) {
      addMarkersToMap();
    }
  };

  const addMarkersToMap = () => {
    if (!window.L || !leafletMapRef.current || !disasters) return;

    // Clear existing markers
    leafletMapRef.current.eachLayer((layer: any) => {
      if (layer instanceof window.L.Marker) {
        leafletMapRef.current.removeLayer(layer);
      }
    });

    // Add markers to the map
    disasters.forEach(disaster => {
      // Set marker color based on severity
      let markerColor = severityColors[disaster.severity] || "#6b7280";
      
      // Create custom icon
      const disasterIcon = window.L.divIcon({
        className: 'custom-div-icon',
        html: `<div style="background-color: ${markerColor}; width: 15px; height: 15px; border-radius: 50%; border: 2px solid white;"></div>`,
        iconSize: [15, 15],
        iconAnchor: [7, 7]
      });
      
      // Add marker with popup
      window.L.marker([disaster.lat, disaster.lng], { icon: disasterIcon })
        .addTo(leafletMapRef.current)
        .bindPopup(`
          <strong>${disaster.type}</strong><br>
          <span>Severity: ${disaster.severity.charAt(0).toUpperCase() + disaster.severity.slice(1)}</span><br>
          <span>${disaster.details}</span>
        `);
    });
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold mb-2 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Live Disaster Map
        </motion.h2>
        <motion.p 
          className="text-gray-600 text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Real-time visualization of active emergencies and their severity
        </motion.p>
        
        <Card className="overflow-hidden shadow-lg mb-6">
          {isLoading ? (
            <div className="h-[500px] flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div ref={mapRef} className="w-full h-[500px] md:h-[500px]" id="disaster-map"></div>
          )}
        </Card>
        
        <div className="flex flex-wrap justify-center gap-4">
          {severityLevels.map((level, index) => (
            <div key={index} className="flex items-center">
              <span 
                className="w-4 h-4 rounded-full mr-2"
                style={{ backgroundColor: level.color }}
              ></span>
              <span className="text-sm">{level.level}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveMapSection;
