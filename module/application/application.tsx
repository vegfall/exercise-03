import React, { MutableRefObject, useEffect, useRef } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { useGeographic } from "ol/proj";
import "ol/ol.css";
import "./application.css";

useGeographic();

const map = new Map({
  view: new View({ center: [11, 60], zoom: 10 }),
  layers: [new TileLayer({ source: new OSM() })],
});

export function Application() {
  const mapRef = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    map.setTarget(mapRef.current);
  }, []);

  function handleFocusUser(e: React.MouseEvent) {
    e.preventDefault();

    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      map.getView().animate({
        center: [longitude, latitude],
        zoom: 12,
      });
    });
  }

  return (
    <>
      <header>
        <h1>My Awesome Map!</h1>
      </header>
      <nav>
        <a href="#" onClick={handleFocusUser}>
          My location
        </a>
      </nav>
      <main>
        <div ref={mapRef}></div>
      </main>
    </>
  );
}
