export type Language = 'en' | 'hi';

export type ScreenId =
  | 'splash'
  | 'mobile_otp'
  | 'ward_setup'
  | 'property_link'
  | 'home'
  | 'full_map'
  | 'category_select'
  | 'evidence_location'
  | 'complaint_confirm'
  | 'chat'
  | 'bill_summary'
  | 'payment_method'
  | 'payment_success'
  | 'passbook'
  | 'pickup_waste_type'
  | 'pickup_fleet'
  | 'pickup_location'
  | 'pickup_review'
  | 'pickup_tracking'
  | 'pavitra_scheduler'
  | 'ecostore_grid'
  | 'product_detail'
  | 'profile_home'
  | 'saved_addresses'
  | 'helpdesk'
  | 'toilet_locator';

export type BottomTab = 'home' | 'raise_query' | 'chatbot' | 'ecostore' | 'profile';

export type BillState = 'unpaid' | 'paid' | 'unlinked';
export type VanStatus = 'nearby' | 'away' | 'no_data';
export type AddressState = 'populated' | 'empty';

export interface Ward {
  id: string;
  name: string;
  nameHi: string;
  zone: string;
  vanETA: string;
  landmark?: string;
  lat?: number;
  lng?: number;
}

export interface Category {
  id: string;
  title: string;
  titleHi: string;
  iconName: string;
  description: string;
  descriptionHi: string;
  isPrimary: boolean;
  rewardPoints?: number;
}

export interface ComplaintTicket {
  ticketId: string;
  categoryId: string;
  categoryTitle: string;
  categoryTitleHi: string;
  wardName: string;
  address: string;
  createdAt: string;
  slaHours: number;
  status: 'In Progress' | 'Resolved' | 'Assigned';
  statusHi: 'प्रगति पर' | 'हल किया गया' | 'आबंटित';
  photoUrl?: string;
  note?: string;
  rewardPointsEarned?: number;
}

export interface PropertyTax {
  taxId: string;
  ownerName: string;
  address: string;
  ward: string;
  amountDue: number;
  dueDate: string;
  isPaid: boolean;
}

export interface PaymentTransaction {
  id: string;
  taxId: string;
  amount: number;
  date: string;
  paymentMethod: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  receiptUrl: string;
}

export interface WastePickupOption {
  id: string;
  name: string;
  nameHi: string;
  weightCapacity: string;
  priceRange: string;
  priceMin: number;
  priceMax: number;
  eta: string;
  iconType: 'bike' | 'auto' | 'truck';
  recommendedFor: string;
}

export interface EcoProduct {
  id: string;
  title: string;
  titleHi: string;
  shgGroup: string;
  price: number;
  rating: number;
  imageUrl: string;
  ecoTaxExempt: boolean;
  pointsReward: number;
  description: string;
  descriptionHi: string;
}

export interface SavedAddress {
  id: string;
  label: 'Home' | 'Office' | 'Shop' | 'Other';
  labelHi: string;
  addressLine: string;
  ward: string;
  isDefault?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  actionChipId?: string;
  showTicketCTA?: boolean;
  rewardPoints?: number;
}

export interface PublicToilet {
  id: string;
  name: string;
  nameHi: string;
  address: string;
  distance: string;
  rating: number;
  reviewCount: number;
  isPinkToilet: boolean;
  isFree: boolean;
  isOpen24x7: boolean;
  isWheelchairAccessible: boolean;
  facilities: string[];
  lat: number;
  lng: number;
}
