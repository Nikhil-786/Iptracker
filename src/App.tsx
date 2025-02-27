import "./App.css";
import { MapContainer, TileLayer } from "react-leaflet";
import "../node_modules/leaflet/dist/leaflet.css"
function App() {
  return (
    <div className="container">
      <div className="firstDiv">
        <h1 className="heading">IP Address Tracker</h1>

        <input
          type="text"
          placeholder="Search for any IP address or domain"
          id="ipInput"
        />
      </div>
      <div className="details">
        <label htmlFor="IP ADDERSS">IP ADDRESS</label>
        <div className="vertical-line"></div>
        <label htmlFor="">LOCATION</label>
        <div className="vertical-line"></div>
        <label htmlFor="">TIMEZONE</label>
        <div className="vertical-line"></div>
        <label htmlFor="">ISP</label>
      </div>
      <div className="map">
        <MapContainer
          center={[50.5, 30.5]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
      
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
