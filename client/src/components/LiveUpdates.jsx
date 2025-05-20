import React, { useEffect, useState } from 'react';
import { Bell, CheckCircle } from 'lucide-react';

const LiveUpdates = ({ currentStatus, partnerName }) => {
  const [notifications, setNotifications] = useState([]);
  
  useEffect(() => {
    // Adding initial notification for demo purposes
    const initialNotifications = [
      {
        id: '1',
        message: `Your order is ${currentStatus.replace('_', ' ')}`,
        timestamp: new Date(),
        read: false,
      }
    ];
    
    if (partnerName && (currentStatus === 'picked_up' || currentStatus === 'on_the_way' || currentStatus === 'arrived')) {
      initialNotifications.push({
        id: '2',
        message: `${partnerName} is on the way with your order`,
        timestamp: new Date(Date.now() - 5 * 60000), // 5 minutes ago
        read: true,
      });
    }
    
    setNotifications(initialNotifications);
    
    // Simulate getting a new notification after a few seconds
    if (currentStatus === 'on_the_way') {
      const timeout = setTimeout(() => {
        setNotifications(prev => [
          {
            id: String(prev.length + 1),
            message: `${partnerName} is just 5 minutes away`,
            timestamp: new Date(),
            read: false,
          },
          ...prev
        ]);
      }, 10000);
      
      return () => clearTimeout(timeout);
    }
  }, [currentStatus, partnerName]);
  
  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };
  
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-lg font-semibold mb-3 flex items-center">
        <Bell className="w-5 h-5 mr-2" />
        Live Updates
      </h3>
      
      {notifications.length === 0 ? (
        <p className="text-gray-500 text-center py-2">No updates yet</p>
      ) : (
        <div className="space-y-3">
          {notifications.map(notification => (
            <div 
              key={notification.id}
              className={`p-3 rounded-lg border flex items-start transition-all ${
                notification.read 
                  ? 'border-gray-200 bg-white' 
                  : 'border-green-200 bg-green-50'
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className={`p-2 rounded-full mr-3 ${
                notification.read 
                  ? 'bg-gray-100 text-gray-400' 
                  : 'bg-green-500 text-white'
              }`}>
                <CheckCircle className="w-4 h-4" />
              </div>
              <div className="flex-grow">
                <p className={`${notification.read ? 'text-gray-700' : 'text-black font-medium'}`}>
                  {notification.message}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatTime(notification.timestamp)}
                </p>
              </div>
              {!notification.read && (
                <span className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full"></span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LiveUpdates;