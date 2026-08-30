import { useEffect, useMemo, useRef, useState } from "react";
import { FLOAT_PANE, GoogleMap, MarkerF, OverlayViewF, useJsApiLoader } from "@react-google-maps/api";
import type { CityMapData, CityMapVenue } from "../types/city";
import VenueCard from "./VenueCard";
import styles from "./CityMap.module.css";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;

// Per-city chunk (src/data/venue-coords/<slug>.json) so a city page only ever
// ships its own venues, not all 110 cities' worth.
const VENUE_COORD_LOADERS = import.meta.glob("../data/venue-coords/*.json") as Record<
  string,
  () => Promise<{ default: CityMapData }>
>;

function useCityMapData(slug: string) {
  const [data, setData] = useState<CityMapData | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    setData(undefined);
    const load = VENUE_COORD_LOADERS[`../data/venue-coords/${slug}.json`];
    if (!load) {
      setData(null);
      return;
    }
    load()
      .then((mod) => {
        if (!cancelled) setData(mod.default);
      })
      .catch(() => {
        if (!cancelled) setData(null);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return data;
}

type CatKey = CityMapVenue["cat"];

const CATEGORIES: { key: CatKey; label: string; color: string }[] = [
  { key: "stay", label: "Stays", color: "#6E2A38" },
  { key: "eat", label: "Tables", color: "#4E5B57" },
  { key: "do", label: "Sights", color: "#6F5B3E" },
  { key: "party", label: "After dark", color: "#3F5560" },
];

const CAT_COLOR: Record<CatKey, string> = Object.fromEntries(CATEGORIES.map((c) => [c.key, c.color])) as Record<
  CatKey,
  string
>;

function markerIcon(color: string): google.maps.Symbol {
  return {
    path: "M0,0 C-6,-6 -6,-16 0,-24 C6,-16 6,-6 0,0 Z",
    fillColor: color,
    fillOpacity: 1,
    strokeColor: "#FFFFFF",
    strokeWeight: 1.5,
    scale: 1,
    anchor: new google.maps.Point(0, 0),
  };
}

const MAP_CONTAINER_STYLE = { width: "100%", height: "100%" };

// Restrained, near-monochrome maison style — mutes default Google POI/road
// clutter so the curated markers stay the focus.
const MAP_STYLES: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#f4f1ea" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#5f5f5f" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#faf9f6" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#e7e6e2" }] },
  { featureType: "road.arterial", elementType: "labels", stylers: [{ visibility: "simplified" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#dfe4e2" }] },
  { featureType: "administrative", elementType: "labels.text.fill", stylers: [{ color: "#8a8680" }] },
];

export default function CityMap({ slug }: { slug: string }) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "ta-google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY ?? "",
  });

  const data = useCityMapData(slug);
  const [active, setActive] = useState<Set<CatKey>>(new Set(CATEGORIES.map((c) => c.key)));
  const [selected, setSelected] = useState<CityMapVenue | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const canvasRef = useRef<HTMLDivElement | null>(null);
  const firstToggleRef = useRef<HTMLInputElement | null>(null);
  // The marker's own DOM node (best-effort focus target on close — see
  // restoreFocus, which falls back when this isn't reliably focusable).
  const triggerElRef = useRef<HTMLElement | null>(null);

  function toggle(key: CatKey) {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function selectVenue(v: CityMapVenue, domEvent: Event | undefined) {
    triggerElRef.current = (domEvent?.target as HTMLElement) ?? null;
    setSelected(v);
  }

  // Classic (non-Advanced) MarkerF markers are usually canvas-drawn, not
  // reliably focusable DOM nodes — try it anyway, but fall back to the map
  // container, then the category toggle row, so focus always lands somewhere
  // sensible after Esc/close.
  function restoreFocus() {
    const marker = triggerElRef.current;
    if (marker && document.contains(marker) && typeof marker.focus === "function") {
      marker.focus();
      if (document.activeElement === marker) return;
    }
    const mapEl = canvasRef.current;
    if (mapEl) {
      mapEl.focus();
      if (document.activeElement === mapEl) return;
    }
    firstToggleRef.current?.focus();
  }

  function closeWithFocusRestore() {
    setSelected(null);
    restoreFocus();
  }

  const visibleVenues = useMemo(
    () => (data ? data.venues.filter((v) => active.has(v.cat)) : []),
    [data, active]
  );

  const center = useMemo(
    () => (data ? { lat: data.center[0], lng: data.center[1] } : { lat: 20, lng: 0 }),
    [data]
  );

  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div className={styles.fallback}>
        Map unavailable — VITE_GOOGLE_MAPS_API_KEY is not configured.
      </div>
    );
  }

  if (data === null) {
    return <div className={styles.fallback}>Map not available for this destination yet.</div>;
  }

  if (loadError) {
    return <div className={styles.fallback}>The map could not be loaded right now.</div>;
  }

  if (!isLoaded || data === undefined) {
    return (
      <div className={styles.wrap}>
        <div className={styles.canvas}>
          <div className={styles.fallback}>Loading map…</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.toggles} role="group" aria-label="Filter map by category">
        {CATEGORIES.map((c, i) => (
          <label className={styles.toggle} key={c.key}>
            <input
              ref={i === 0 ? firstToggleRef : undefined}
              type="checkbox"
              checked={active.has(c.key)}
              onChange={() => toggle(c.key)}
            />
            <span className={styles.dot} style={{ background: c.color }} />
            {c.label}
          </label>
        ))}
      </div>
      <div className={styles.canvas} ref={canvasRef} tabIndex={-1}>
        <GoogleMap
          mapContainerStyle={MAP_CONTAINER_STYLE}
          center={center}
          zoom={11}
          onLoad={(m) => setMap(m)}
          onClick={() => setSelected(null)}
          options={{
            styles: MAP_STYLES,
            disableDefaultUI: true,
            zoomControl: true,
            fullscreenControl: true,
            clickableIcons: false,
          }}
        >
          {visibleVenues.map((v, i) => (
            <MarkerF
              key={`${v.n}-${i}`}
              position={{ lat: v.lat, lng: v.lon }}
              icon={markerIcon(CAT_COLOR[v.cat])}
              onClick={(e) => selectVenue(v, e.domEvent)}
            />
          ))}
          {selected && (
            <OverlayViewF
              key={`${selected.n}-${selected.lat}-${selected.lon}`}
              position={{ lat: selected.lat, lng: selected.lon }}
              mapPaneName={FLOAT_PANE}
              getPixelPositionOffset={() => ({ x: 0, y: 0 })}
            >
              <VenueCard venue={selected} map={map} mapContainerEl={canvasRef.current} onClose={closeWithFocusRestore} />
            </OverlayViewF>
          )}
        </GoogleMap>
      </div>
    </div>
  );
}
