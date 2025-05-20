import React from 'react';
import { MapPin, Phone } from 'lucide-react';

const RestaurantInfo = ({ restaurant, onCall }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6 transition-all hover:shadow-lg">
      <div className="flex items-center">
        <div className="w-16 h-16 overflow-hidden rounded-lg">
          <img 
            src={restaurant.image} 
            alt={restaurant.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-4 flex-grow">
          <h3 className="font-semibold text-lg">{restaurant.name}</h3>
          <p className="text-sm text-gray-600 flex items-center mt-1">
            <MapPin className="w-4 h-4 mr-1" />
            {restaurant.address}
          </p>
        </div>
      </div>
      
      <div className="mt-4">
        <button 
          onClick={onCall}
          className="w-full py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white rounded-md flex items-center justify-center transition-colors"
        >
          <Phone className="w-4 h-4 mr-2" />
          Call Restaurant
        </button>
      </div>
    </div>
  );
};

export default RestaurantInfo;