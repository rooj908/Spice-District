export type CategoryId = 'all' | 'biryani' | 'karahi' | 'curries' | 'bbq' | 'breads' | 'desserts';

export type SpicyLevel = 'Mild' | 'Medium' | 'Hot' | 'Extra Spicy';

export interface MenuItem {
  id: string;
  name: string;
  urduName: string;
  category: CategoryId;
  price: number; // in PKR
  originalPrice?: number; // for promotional strikethrough
  description: string;
  image: string;
  spicyLevel: SpicyLevel;
  servingSize: string; // e.g., "Serves 1-2" or "Full (1kg)"
  prepTime: string; // e.g., "25-30 mins"
  isBestseller?: boolean;
  isChefSpecial?: boolean;
  isDesiGhee?: boolean;
  ingredients: string[];
  tags: string[];
}

export interface CartItem {
  id: string; // unique item instance id
  menuItem: MenuItem;
  quantity: number;
  spicyLevel: SpicyLevel;
  specialNotes?: string;
}

export interface CustomerInfo {
  fullName: string;
  phone: string;
  city: string;
  area: string;
  deliveryAddress: string;
  nearestLandmark?: string;
  orderNotes?: string;
  paymentMethod: 'cash_on_delivery' | 'jazzcash_easypaisa' | 'card_on_delivery';
}

export interface Order {
  orderId: string;
  items: CartItem[];
  customer: CustomerInfo;
  subtotal: number;
  deliveryFee: number;
  packagingFee: number;
  discount: number;
  grandTotal: number;
  status: 'confirmed' | 'preparing' | 'on_the_way' | 'delivered';
  createdAt: string;
  estimatedDeliveryTime: string;
}

export interface ToastMessage {
  id: string;
  text: string;
  type?: 'success' | 'info' | 'error';
}
