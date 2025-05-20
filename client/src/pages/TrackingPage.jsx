import React, { useState } from 'react';
import { ShoppingBag, Share2, ArrowLeft } from 'lucide-react';
import { getCurrentOrder } from '../data/mockData';
import DeliveryMap from '../components/DeliveryMap';
import PartnerMap from '../components/PartnerMap';
// import ETADisplay from '../components/ETADisplay';
// import StatusTimeline from '../components/StatusTimeline';
// import DeliveryPartnerCard from '../components/DeliveryPartnerCard';
// import RestaurantInfo from '../components/RestaurantInfo';
// import OrderSummary from '../components/OrderSummary';
// import LiveUpdates from '../components/LiveUpdates';


const TrackingPage = ({ socket }) => {
  const order = getCurrentOrder();
  const [activeTab, setActiveTab] = useState('track');
  const [showNotification, setShowNotification] = useState(false);
  

  return (
    <div className="mx-auto bg-gray-50 min-h-screen">
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-16 left-0 right-0 bg-green-500 text-white p-3 text-center animate-slide-down shadow-md z-20">
          Tracking link copied to clipboard!
        </div>
      )}

      <div className="p-4">
        {/* Order ID and Tab Switcher */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center text-gray-700">
            <ShoppingBag className="w-5 h-5 mr-2" />
            <span className="font-medium">Order #{order.id}</span>
          </div>
          
          <div className="flex rounded-lg overflow-hidden border border-gray-200 bg-white">
            <button 
              className={`px-4 py-2 text-sm ${
                activeTab === 'track' ? 'bg-orange-500 text-white' : 'bg-white text-gray-700'
              }`}
              onClick={() => setActiveTab('track')}
            >
              Customer Map
            </button>
            <button 
              className={`px-4 py-2 text-sm ${
                activeTab === 'details' ? 'bg-orange-500 text-white' : 'bg-white text-gray-700'
              }`}
              onClick={() => setActiveTab('details')}
            >
              PartnerMap
            </button>
          </div>
        </div>

        {activeTab === 'track' ? (
          <>
            <DeliveryMap order={order} socket={socket} />
          </>
        ) : (
          <>
            <PartnerMap socket={socket} />
          </>
        )}
      </div>
    </div>
  );
};

export default TrackingPage;