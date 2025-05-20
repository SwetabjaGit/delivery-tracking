import React from 'react';
import { CheckCircle, Clock, ChefHat, Package, Bike, MapPin, Home } from 'lucide-react';

const StatusTimeline = ({ statuses, currentStatus }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'ordered':
        return <Clock className="w-6 h-6" />;
      case 'confirmed':
        return <CheckCircle className="w-6 h-6" />;
      case 'preparing':
        return <ChefHat className="w-6 h-6" />;
      case 'ready':
        return <Package className="w-6 h-6" />;
      case 'picked_up':
        return <Bike className="w-6 h-6" />;
      case 'on_the_way':
        return <MapPin className="w-6 h-6" />;
      case 'arrived':
        return <Home className="w-6 h-6" />;
      case 'delivered':
        return <CheckCircle className="w-6 h-6" />;
      default:
        return <Clock className="w-6 h-6" />;
    }
  };

  const statusOrder = [
    'ordered',
    'confirmed',
    'preparing',
    'ready',
    'picked_up',
    'on_the_way',
    'arrived',
    'delivered',
  ];

  const isCompleted = (status) => {
    const currentIndex = statusOrder.indexOf(currentStatus);
    const statusIndex = statusOrder.indexOf(status);
    return statusIndex <= currentIndex;
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="p-2 w-full max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-4">Order Status</h3>
      <div className="space-y-4">
        {statuses.map((status, index) => (
          <div key={status.status} className="flex items-start">
            <div className={`flex-shrink-0 p-2 rounded-full ${
              isCompleted(status.status) ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'
            }`}>
              {getStatusIcon(status.status)}
            </div>
            <div className="ml-4 flex-grow">
              <div className="flex justify-between">
                <p className={`font-medium ${isCompleted(status.status) ? 'text-black' : 'text-gray-400'}`}>
                  {status.description}
                </p>
                <p className={`text-sm ${isCompleted(status.status) ? 'text-gray-500' : 'text-gray-400'}`}>
                  {formatTime(status.timestamp)}
                </p>
              </div>
              {index < statuses.length - 1 && (
                <div className={`ml-3 h-8 w-0.5 ${
                  isCompleted(statuses[index + 1].status) ? 'bg-green-500' : 'bg-gray-200'
                }`}></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusTimeline;