import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import { MapPin } from 'lucide-react';
import 'leaflet/dist/leaflet.css';



const DeliveryMap = ({ order, socket }) => {
  const [deliveryProgress, setDeliveryProgress] = useState(0);
  const [deliveryPartnerPosition, setDeliveryPartnerPosition] = useState({
    latitude: 22.705294, longitude: 88.374588
  });
  const [flyTo, setFlyTo] = useState(null);

  function FlyToMapLocation() {
    const map = useMap();
    if(flyTo) {
      console.log('FlyTo: ', flyTo);
      map.flyTo(flyTo, 15);
      setFlyTo(null);
    }
    return null;
  }

  useEffect(() => {
    const handlePartnerLocationUpdate = (coords) => {
      //console.log('Partner: ', coords);
      console.log('onPartnerLocationUpdate');
      setDeliveryPartnerPosition(coords);
    };

    const handleFlyToLocationUpdate = (coords) => {
      //console.log('FlyTo: ', coords);
      console.log('onFlyToLocationUpdate');
      setFlyTo(coords);
    }

    socket.on('onPartnerLocationUpdate', handlePartnerLocationUpdate);
    socket.on('onFlyToLocationUpdate', handleFlyToLocationUpdate);
    
    return () => {
      socket.off('onPartnerLocationUpdate', handlePartnerLocationUpdate);
      socket.off('onFlyToLocationUpdate', handleFlyToLocationUpdate);
    }
  }, []);

  

  function ClickHandler({ onClick }) {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        onClick(e.latlng);
        //console.log(lat, lng);
      }
    });
    return null;
  }

  const center = [
    (order.restaurant.location.latitude + order.customerLocation.latitude) / 2,
    (order.restaurant.location.longitude + order.customerLocation.longitude) / 2
  ];

  const createIcon = (color) => new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="24" height="24">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
      </svg>
    `)}`,
    iconSize: [30, 30],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
  });

  const restaurantIcon = createIcon('#FF5722');
  const customerIcon = createIcon('#2196F3');
  const deliveryIcon = createIcon('#4CAF50');
  const cursorIcon = createIcon('#f7fa48');

  const [clickedLocation, setClickedLocation] = useState(null);

  return (
    <div>
      <div className="w-full h-[580px] rounded-lg overflow-hidden shadow-md mb-6 relative">
        <MapContainer
          center={center}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          <Marker
            position={[order.restaurant.location.latitude, order.restaurant.location.longitude]}
            icon={restaurantIcon}
          >
            <Popup>Restaurant: {order.restaurant.name}</Popup>
          </Marker>

          <Marker
            position={[order.customerLocation.latitude, order.customerLocation.longitude]}
            icon={customerIcon}
          >
            <Popup>Delivery Location</Popup>
          </Marker>

          <Marker
            position={[deliveryPartnerPosition.latitude, deliveryPartnerPosition.longitude]}
            icon={deliveryIcon}
          >
            <Popup>
              {order.deliveryPartner?.name || 'Delivery Partner'}
            </Popup>
          </Marker>
          
          <ClickHandler onClick={setClickedLocation} />
          <FlyToMapLocation />
        </MapContainer>
      </div>

      {clickedLocation && (
        <div style={{ marginTop: '10px' }}>
          Latitude: {clickedLocation.lat}<br />
          Longitude: {clickedLocation.lng}
        </div>
      )}
    </div>
  );
};

export default DeliveryMap;