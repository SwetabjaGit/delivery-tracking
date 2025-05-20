import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';



const PartnerMap = ({ socket }) => {
  const orderId = 'ORDER123';
  const [flyToLocation, setFlyToLocation] = useState({
    lat: '', lng: ''
  });
  const [clickedLocation, setClickedLocation] = useState({
    lat: 22.705294, lng: 88.374588
  });

  const handleFlyToLocationChange = (e) => {
    e.preventDefault();
    setFlyToLocation({
      ...flyToLocation,
      [e.target.name]: e.target.value
    });
  }

  const handleFlyToSubmit = () => {
    console.log('FlyTo: ', flyToLocation);
    socket.emit('flyToLocation', { orderId, flyToLocation });
  }

  function ClickHandler({ onClick }) {
    useMapEvents({
      click(e) {
        onClick(e.latlng);
        const coords = {
          latitude: e.latlng.lat,
          longitude: e.latlng.lng
        };
        socket.emit('updateLocation', { orderId, coords });
        console.log(e.latlng);
      }
    })
  }

  return (
    <div>
      <div className="grid gap-6 mb-6 md:grid-cols-3">
        <div>
          <label htmlFor="latitude" className="block mb-2 text-md font-medium text-gray-900">Latitude</label>
          <input 
            type="text"
            name="lat"
            id="latitude"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" 
            placeholder="Enter Latitude" 
            required
            onChange={handleFlyToLocationChange}
          />
        </div>
        <div>
          <label htmlFor="longitude" className="block mb-2 text-md font-medium text-gray-900">Longitude</label>
          <input 
            type="text"
            name="lng"
            id="longitude" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" 
            placeholder="Enter Longitude" 
            required
            onChange={handleFlyToLocationChange}
          />
        </div>
        <button onClick={handleFlyToSubmit} className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm h-[40px] mt-[32px] w-[100px]">
          Submit
        </button>
      </div>

      <div className="w-full h-[600px] rounded-lg mb-6 overflow-hidden relative">
        <MapContainer
          center={[22.705294, 88.374588]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          <ClickHandler onClick={setClickedLocation} />

          <Marker position={clickedLocation}>
            <Popup>You are here</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  )
}

export default PartnerMap;