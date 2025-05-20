export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  specialInstructions?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  contactNumber: string;
  image: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface DeliveryPartner {
  id: string;
  name: string;
  contactNumber: string;
  rating: number;
  image: string;
  vehicleNumber?: string;
  vehicleType: 'bike' | 'scooter' | 'bicycle' | 'car';
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface OrderStatus {
  status: 'ordered' | 'confirmed' | 'preparing' | 'ready' | 'picked_up' | 'on_the_way' | 'arrived' | 'delivered';
  timestamp: Date;
  description: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  restaurant: Restaurant;
  deliveryPartner: DeliveryPartner | null;
  status: OrderStatus[];
  currentStatus: OrderStatus['status'];
  customerAddress: string;
  customerLocation: {
    latitude: number;
    longitude: number;
  };
  estimatedDeliveryTime: Date;
  totalAmount: number;
  paymentMethod: 'card' | 'cash' | 'wallet';
  createdAt: Date;
}