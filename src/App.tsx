import "./App.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useState } from "react";
import "../node_modules/leaflet/dist/leaflet.css";
import pointer from "./images/icon-location.svg";
import l from "leaflet";

function App() {
  // Define the interface for the location object
  interface Location {
    country: string;
    region: string;
    timezone: string;
    lat: number;
    lng: number;
  }

  // Define the interface for the AS object
  interface ASInfo {
    asn: number;
    name: string;
    route: string;
    domain: string;
    type: string;
  }

  // Define the interface for the main API response
  interface IPData {
    ip: string;
    location: Location;
    domains: string[]; // Array of strings
    as: ASInfo;
    isp: string;
  }

  const [data, setAPIDATA] = useState<IPData | null>(null);
  const [input, setInput] = useState("");

  interface Coordinates {
    latitude: number;
    longitude: number;
  }

  interface SearchLocationProps {
    location: Coordinates;
    search: string;
  }
  const icon = new l.Icon({
    iconUrl: pointer,
    iconSize: [35, 45],
    iconAnchor: [17, 45],
    popupAnchor: [6, -45],
  });

  const apiKey = import.meta.env.VITE_API_KEY;

  const handleGetIPDetails = async () => {
    try {
      const data = await fetch(
        `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${apiKey}&ipAddress=${input}`
      );
      const jsondata = await data.json();
      setAPIDATA(jsondata);
    } catch (error) {
      console.log("Error fetching data" + error);
    }
  };

  function SearchLocation({ location, search }: SearchLocationProps) {
    const map = useMap();
    if (location) map.flyTo([location.latitude, location.longitude], 12);
    return location ? (
      <Marker
        draggable
        position={
          location
            ? [location.latitude, location.longitude] // Convert {latitude, longitude} to [lat, lng]
            : [0, 0]
        }
        icon={icon}
      >
        <Popup>You are here:{search}</Popup>
      </Marker>
    ) : null;
  }

  return (
    <div className="container">
      <div className="firstDiv">
        <h1 className="heading">IP Address Tracker</h1>
        <div className="inputDiv">
          <input
            type="text"
            placeholder="Search for any IP address or domain"
            id="ipInput"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleGetIPDetails}>FIND</button>
        </div>
      </div>
      <div className="details">
        <div className="childDetails">
          <label htmlFor="IP ADDERSS">IP ADDRESS</label>
          <br />
          <b>{data?.ip}</b>
        </div>
        <div className="vertical-line"></div>
        <div className="childDetails">
          <label htmlFor="">LOCATION</label>
          <br />
          <b>{data?.location?.country}</b>
        </div>

        <div className="vertical-line"></div>
        <div className="childDetails">
          <label htmlFor="">TIMEZONE</label>
          <br />
          <b>{data?.location?.timezone}</b>
        </div>
        <div className="vertical-line"></div>
        <div className="childDetails">
          <label htmlFor="">ISP</label>
          <br />
          <b>{data?.as?.name}</b>
        </div>
      </div>
      <div className="map">
        <MapContainer
          center={[19.46082, 72.7763]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <SearchLocation
            location={
              data?.location?.lat && data?.location?.lng
                ? {
                    latitude: data?.location.lat,
                    longitude: data?.location.lng,
                  }
                : { latitude: 0, longitude: 0 } // Fallback coordinates (lat, lng)
            }
            search={input}
          />
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
