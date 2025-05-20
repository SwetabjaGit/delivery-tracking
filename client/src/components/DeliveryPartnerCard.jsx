import React from 'react';
import { Phone, Star, Map } from 'lucide-react';

const DeliveryPartnerCard = ({ partner, onCall, onViewOnMap }) => {
  const getVehicleTypeLabel = (type) => {
    switch (type) {
      case 'bike': return 'Motorcycle';
      case 'scooter': return 'Scooter';
      case 'bicycle': return 'Bicycle';
      case 'car': return 'Car';
      default: return type;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6 transition-all hover:shadow-lg">
      <div className="flex items-center">
        <div className="relative w-16 h-16 overflow-hidden rounded-full border-2 border-orange-500">
          <img 
            src={partner.image} 
            alt={partner.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-4 flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-lg">{partner.name}</h3>
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <span className="inline-flex items-center mr-3">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
                  {partner.rating}
                </span>
                <span>{getVehicleTypeLabel(partner.vehicleType)}</span>
                {partner.vehicleNumber && (
                  <span className="ml-3">{partner.vehicleNumber}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex mt-4 gap-2">
        <button 
          onClick={onCall}
          className="flex-1 py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-md flex items-center justify-center transition-colors"
        >
          <Phone className="w-4 h-4 mr-2" />
          Call
        </button>
        <button 
          onClick={onViewOnMap}
          className="flex-1 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md flex items-center justify-center transition-colors"
        >
          <Map className="w-4 h-4 mr-2" />
          Map
        </button>
      </div>
    </div>
  );
};

export default DeliveryPartnerCard;