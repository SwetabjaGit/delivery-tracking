import React from 'react';
import { Receipt, CreditCard, Clock } from 'lucide-react';

const OrderSummary = ({ order }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  const calculateSubtotal = () => {
    return order.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const subtotal = calculateSubtotal();
  const deliveryFee = 2.99;
  const tax = subtotal * 0.08; // Assuming 8% tax

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Receipt className="w-5 h-5 mr-2" />
          Order Summary
        </h3>
        <span className="text-sm bg-orange-100 text-orange-800 py-1 px-3 rounded-full">
          #{order.id}
        </span>
      </div>

      <div className="mb-4">
        <h4 className="font-medium mb-2 text-gray-700">Items</h4>
        <div className="space-y-2">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <div>
                <span className="font-medium">{item.quantity}x</span> {item.name}
                {item.specialInstructions && (
                  <p className="text-xs text-gray-500 ml-5">{item.specialInstructions}</p>
                )}
              </div>
              <span>{formatCurrency(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200 pt-3 mb-3">
        <div className="flex justify-between text-sm mb-1">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm mb-1">
          <span>Delivery Fee</span>
          <span>{formatCurrency(deliveryFee)}</span>
        </div>
        <div className="flex justify-between text-sm mb-3">
          <span>Tax</span>
          <span>{formatCurrency(tax)}</span>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-3 mb-3">
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>{formatCurrency(order.totalAmount)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600 mt-3">
        <div className="flex items-center">
          <CreditCard className="w-4 h-4 mr-1" />
          <span>
            {order.paymentMethod === 'card' 
              ? 'Paid by Card' 
              : order.paymentMethod === 'cash' 
                ? 'Cash on Delivery'
                : 'Paid by Wallet'}
          </span>
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          <span>ETA: {formatTime(order.estimatedDeliveryTime)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;