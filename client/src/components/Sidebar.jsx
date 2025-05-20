import { useState } from 'react'
import { 
  IoHomeOutline, 
  IoGridOutline, 
  IoStatsChartOutline,
  IoChevronForwardOutline,
  IoVideocamOutline
} from 'react-icons/io5';
import { getCurrentOrder } from '../data/mockData';
//import ETADisplay from '../components/ETADisplay';
import StatusTimeline from '../components/StatusTimeline';
import DeliveryPartnerCard from '../components/DeliveryPartnerCard';
import RestaurantInfo from '../components/RestaurantInfo';
import OrderSummary from '../components/OrderSummary';
import LiveUpdates from '../components/LiveUpdates';


const Sidebar = ({ collapsed }) => {
  const order = getCurrentOrder();

  const handleViewOnMap = () => {
    setActiveTab('track');
  };

  const handleCall = (type) => {
    const number = type === 'partner' 
      ? order.deliveryPartner?.contactNumber 
      : order.restaurant.contactNumber;
      
    alert(`Calling ${number}`);
  };

  return (
    <aside className={`w-[380px] p-2 bg-slate-100 h-screen overflow-y-auto border-r border-slate-200 transition-all duration-300 flex-shrink-0 ${collapsed ? 'w-16' : ''}`}>
      
      {/* <div className="p-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary text-white rounded flex items-center justify-center font-medium">DP</div>
          <div className={`whitespace-nowrap overflow-hidden transition-opacity duration-200 ${collapsed ? 'opacity-0' : 'opacity-100'}`}>
            <span className="font-medium text-sm">dpkktgrqj</span>
          </div>
        </div>
      </div> */}

      <nav className="flex flex-col h-[calc(100%-4rem)] justify-between">
        <> 
          {/* <ETADisplay estimatedTime={order.estimatedDeliveryTime} /> */}
            
          {order.deliveryPartner && (
            <DeliveryPartnerCard 
              partner={order.deliveryPartner} 
              onCall={() => handleCall('partner')}
              onViewOnMap={handleViewOnMap}
            />
          )}
            
          {/* <LiveUpdates 
            currentStatus={order.currentStatus} 
            partnerName={order.deliveryPartner?.name}
          /> */}
          
          <OrderSummary order={order} />
            
          <StatusTimeline 
            statuses={order.status} 
            currentStatus={order.currentStatus}
          />

          <RestaurantInfo 
            restaurant={order.restaurant}
            onCall={() => handleCall('restaurant')}
          />
        </>

        {/* <div className="p-2 border-t border-slate-200">
          <a href="#" className="flex items-center px-4 py-3 text-slate-600 hover:bg-slate-200 rounded gap-3 relative">
            <IoVideocamOutline className="text-xl flex-shrink-0" />
            <span className={`transition-opacity duration-200 ${collapsed ? 'hidden' : ''}`}>Go to Video Home</span>
            <span className="absolute right-2 top-2 bg-primary text-white text-xs px-1.5 py-0.5 rounded-full">NEW</span>
          </a>
        </div> */}
      </nav>
    </aside>
  )
}

export default Sidebar