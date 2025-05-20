//import { Order, Restaurant, DeliveryPartner } from '../types';

// Mock restaurant data
export const restaurants = [
  {
    id: 'rest-1',
    name: 'Spice Garden',
    address: '123 Foodie Lane, Gourmet City',
    contactNumber: '+1 234-567-8901',
    image: 'https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: {
      latitude: 22.694164,
      longitude: 88.375051
    }
  },
  {
    id: 'rest-2',
    name: 'Burger Junction',
    address: '456 Tasty Avenue, Flavor Town',
    contactNumber: '+1 234-567-8902',
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: {
      latitude: 37.7833,
      longitude: -122.4167
    }
  }
];

// Mock delivery partner data
export const deliveryPartners = [
  {
    id: 'dp-1',
    name: 'John Smith',
    contactNumber: '+1 234-567-8903',
    rating: 4.8,
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    vehicleNumber: 'AB123CD',
    vehicleType: 'bike',
    location: {
      latitude: 22.694164,
      longitude: 88.375051,
    },
  },
  {
    id: 'dp-2',
    name: 'Emily Johnson',
    contactNumber: '+1 234-567-8904',
    rating: 4.9,
    image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    vehicleNumber: 'EF456GH',
    vehicleType: 'scooter',
    location: {
      latitude: 37.7749,
      longitude: -122.4194,
    },
  }
];

// Helper function to create a timestamp n minutes ago
const minutesAgo = (minutes) => {
  const date = new Date();
  date.setMinutes(date.getMinutes() - minutes);
  return date;
};

// Helper function to create a timestamp n minutes in the future
const minutesFromNow = (minutes) => {
  const date = new Date();
  date.setMinutes(date.getMinutes() + minutes);
  return date;
};

// Mock order data
export const orders = [
  {
    id: 'ord-1',
    items: [
      {
        id: 'item-1',
        name: 'Butter Chicken',
        quantity: 1,
        price: 15.99,
        specialInstructions: 'Extra spicy',
      },
      {
        id: 'item-2',
        name: 'Garlic Naan',
        quantity: 2,
        price: 3.99,
      },
      {
        id: 'item-3',
        name: 'Mango Lassi',
        quantity: 1,
        price: 4.99,
      },
    ],
    restaurant: restaurants[0],
    deliveryPartner: deliveryPartners[0],
    status: [
      {
        status: 'ordered',
        timestamp: minutesAgo(30),
        description: 'Your order has been placed',
      },
      {
        status: 'confirmed',
        timestamp: minutesAgo(28),
        description: 'Restaurant has confirmed your order',
      },
      {
        status: 'preparing',
        timestamp: minutesAgo(20),
        description: 'Your food is being prepared',
      },
      {
        status: 'ready',
        timestamp: minutesAgo(10),
        description: 'Your food is ready for pickup',
      },
      {
        status: 'picked_up',
        timestamp: minutesAgo(8),
        description: 'Your order has been picked up by delivery partner',
      },
      {
        status: 'on_the_way',
        timestamp: minutesAgo(5),
        description: 'Your order is on the way',
      },
    ],
    currentStatus: 'on_the_way',
    customerAddress: '789 Hungry Road, Appetite Heights',
    customerLocation: {
      latitude: 22.708061,
      longitude: 88.379077,
    },
    estimatedDeliveryTime: minutesFromNow(15),
    totalAmount: 28.96,
    paymentMethod: 'card',
    createdAt: minutesAgo(30),
  },
  {
    id: 'ord-2',
    items: [
      {
        id: 'item-4',
        name: 'Classic Cheeseburger',
        quantity: 2,
        price: 12.99,
      },
      {
        id: 'item-5',
        name: 'French Fries',
        quantity: 1,
        price: 4.99,
      },
      {
        id: 'item-6',
        name: 'Chocolate Milkshake',
        quantity: 2,
        price: 5.99,
      },
    ],
    restaurant: restaurants[1],
    deliveryPartner: deliveryPartners[1],
    status: [
      {
        status: 'ordered',
        timestamp: minutesAgo(45),
        description: 'Your order has been placed',
      },
      {
        status: 'confirmed',
        timestamp: minutesAgo(43),
        description: 'Restaurant has confirmed your order',
      },
      {
        status: 'preparing',
        timestamp: minutesAgo(35),
        description: 'Your food is being prepared',
      },
      {
        status: 'ready',
        timestamp: minutesAgo(25),
        description: 'Your food is ready for pickup',
      },
      {
        status: 'picked_up',
        timestamp: minutesAgo(20),
        description: 'Your order has been picked up by delivery partner',
      },
      {
        status: 'on_the_way',
        timestamp: minutesAgo(15),
        description: 'Your order is on the way',
      },
      {
        status: 'arrived',
        timestamp: minutesAgo(2),
        description: 'Your delivery partner has arrived',
      },
    ],
    currentStatus: 'arrived',
    customerAddress: '321 Foodie Avenue, Taste Town',
    customerLocation: {
      latitude: 37.7858,
      longitude: -122.4064,
    },
    estimatedDeliveryTime: minutesFromNow(3),
    totalAmount: 42.95,
    paymentMethod: 'cash',
    createdAt: minutesAgo(45),
  },
];

// Function to get current active order (for demo purposes)
export const getCurrentOrder = () => {
  return orders[0];
};