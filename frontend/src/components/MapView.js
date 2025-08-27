import React from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const GeoMap = ({ servers }) => {
  const safeServers = servers || [];  

  return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {safeServers.map((srv, i) => (
        <CircleMarker
          key={i}
          center={[srv.lat, srv.lng]}
          radius={10}
          fillColor={srv.status === "up" ? "green" : "red"}
          color="black"
          fillOpacity={0.7}
        >
          <Tooltip>
            <strong>{srv.name}</strong><br />
            Status: {srv.status}<br />
            Latency: {srv.latency}ms
          </Tooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};

export default GeoMap;
