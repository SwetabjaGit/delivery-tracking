import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

const ETADisplay = ({ estimatedTime }) => {
  const [timeRemaining, setTimeRemaining] = useState('');
  
  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const diffMs = estimatedTime.getTime() - now.getTime();
      
      if (diffMs <= 0) {
        setTimeRemaining('Arriving now');
        return;
      }
      
      const diffMins = Math.floor(diffMs / 60000);
      
      if (diffMins < 1) {
        setTimeRemaining('Less than a minute');
      } else if (diffMins === 1) {
        setTimeRemaining('1 minute');
      } else {
        setTimeRemaining(`${diffMins} minutes`);
      }
    };
    
    // Calculate immediately and then every 30 seconds
    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 30000);
    
    return () => clearInterval(interval);
  }, [estimatedTime]);
  
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6 animate-pulse-slow">
      <div className="flex items-center">
        <div className="bg-orange-500 text-white p-3 rounded-full mr-4">
          <Clock className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-orange-900">Estimated Arrival</h3>
          <p className="text-orange-700">{formatTime(estimatedTime)}</p>
          <p className="text-sm text-orange-600 mt-1">Arriving in {timeRemaining}</p>
        </div>
      </div>
    </div>
  );
};

export default ETADisplay;