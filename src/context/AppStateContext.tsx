import React, { createContext, useContext, useState } from 'react';
import type {
  ScreenId,
  BottomTab,
  Language,
  BillState,
  VanStatus,
  AddressState,
  Ward,
  PropertyTax,
  PaymentTransaction,
  SavedAddress,
  ComplaintTicket,
  ChatMessage,
  EcoProduct,
  WastePickupOption
} from '../types';
import {
  MOCK_WARDS,
  MOCK_PROPERTY_TAX,
  MOCK_PAST_TRANSACTIONS,
  INITIAL_SAVED_ADDRESSES,
  INITIAL_COMPLAINT
} from '../data/mockData';

interface AppStateContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currentScreen: ScreenId;
  screenParams: any;
  historyStack: ScreenId[];
  navigateTo: (screen: ScreenId, params?: any) => void;
  goBack: () => void;
  activeTab: BottomTab;
  setActiveTab: (tab: BottomTab) => void;
  
  // Ward & Account
  selectedWard: Ward;
  setSelectedWard: (ward: Ward) => void;
  userPhone: string;
  setUserPhone: (phone: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
  
  // State overrides (Demo Control Bar)
  billState: BillState;
  setBillState: (state: BillState) => void;
  vanStatus: VanStatus;
  setVanStatus: (status: VanStatus) => void;
  addressState: AddressState;
  setAddressState: (state: AddressState) => void;
  
  // Business Entities
  propertyTax: PropertyTax;
  setPropertyTax: React.Dispatch<React.SetStateAction<PropertyTax>>;
  transactions: PaymentTransaction[];
  addTransaction: (txn: PaymentTransaction) => void;
  savedAddresses: SavedAddress[];
  addSavedAddress: (addr: SavedAddress) => void;
  tickets: ComplaintTicket[];
  addTicket: (ticket: ComplaintTicket) => void;
  ecoPoints: number;
  setEcoPoints: React.Dispatch<React.SetStateAction<number>>;
  
  // Draft Booking State (Bulk Waste Pickup)
  pickupDraft: {
    wasteType?: string;
    quantityTier?: string;
    selectedFleet?: WastePickupOption;
    locationAddress?: string;
    lat?: number;
    lng?: number;
    finalPrice?: number;
  };
  setPickupDraft: React.Dispatch<React.SetStateAction<any>>;

  // Draft Eco Checkout State
  selectedProduct?: EcoProduct;
  setSelectedProduct: (prod?: EcoProduct) => void;
  
  // Chatbot State
  messages: ChatMessage[];
  sendMessage: (text: string) => void;
  handleChipClick: (chipId: string) => void;

  // Selected Category for Complaint Flow Handoff
  selectedComplaintCategory?: any;
  setSelectedComplaintCategory: (cat: any) => void;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg_1',
    sender: 'bot',
    text: 'Namaste! 🙏 I am your Swachhata Assistant. How can I help you keep Indore clean today?',
    timestamp: 'Just now',
  },
];

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('splash');
  const [screenParams, setScreenParams] = useState<any>(null);
  const [historyStack, setHistoryStack] = useState<ScreenId[]>(['splash']);
  const [activeTab, setActiveTabState] = useState<BottomTab>('home');
  
  const [selectedWard, setSelectedWard] = useState<Ward>(MOCK_WARDS[0]);
  const [userPhone, setUserPhone] = useState<string>('9826012345');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  
  // Demo toggles
  const [billState, setBillState] = useState<BillState>('unpaid');
  const [vanStatus, setVanStatus] = useState<VanStatus>('nearby');
  const [addressState, setAddressState] = useState<AddressState>('populated');

  // Business entities
  const [propertyTax, setPropertyTax] = useState<PropertyTax>(MOCK_PROPERTY_TAX);
  const [transactions, setTransactions] = useState<PaymentTransaction[]>(MOCK_PAST_TRANSACTIONS);
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>(INITIAL_SAVED_ADDRESSES);
  const [tickets, setTickets] = useState<ComplaintTicket[]>([INITIAL_COMPLAINT]);
  const [ecoPoints, setEcoPoints] = useState<number>(250);
  
  const [pickupDraft, setPickupDraft] = useState<any>({
    wasteType: 'Dry Waste',
    quantityTier: 'Medium (up to 25kg)',
  });
  const [selectedProduct, setSelectedProduct] = useState<EcoProduct | undefined>(undefined);
  const [selectedComplaintCategory, setSelectedComplaintCategory] = useState<any>(null);
  
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);

  const navigateTo = (screen: ScreenId, params?: any) => {
    setScreenParams(params || null);
    setCurrentScreen(screen);
    setHistoryStack((prev) => [...prev, screen]);

    // Sync tab highlight if navigating to main tab root
    if (screen === 'home' || screen === 'full_map') setActiveTabState('home');
    else if (screen === 'category_select' || screen === 'evidence_location' || screen === 'complaint_confirm') setActiveTabState('raise_query');
    else if (screen === 'chat') setActiveTabState('chatbot');
    else if (screen === 'ecostore_grid' || screen === 'pavitra_scheduler' || screen === 'product_detail') setActiveTabState('ecostore');
    else if (screen === 'profile_home' || screen === 'saved_addresses' || screen === 'helpdesk' || screen === 'passbook') setActiveTabState('profile');
  };

  const goBack = () => {
    if (historyStack.length > 1) {
      const newStack = [...historyStack];
      newStack.pop();
      const prevScreen = newStack[newStack.length - 1];
      setHistoryStack(newStack);
      setCurrentScreen(prevScreen);
    } else {
      setCurrentScreen('home');
    }
  };

  const setActiveTab = (tab: BottomTab) => {
    setActiveTabState(tab);
    switch (tab) {
      case 'home':
        navigateTo('home');
        break;
      case 'raise_query':
        navigateTo('category_select');
        break;
      case 'chatbot':
        navigateTo('chat');
        break;
      case 'ecostore':
        navigateTo('ecostore_grid');
        break;
      case 'profile':
        navigateTo('profile_home');
        break;
    }
  };

  const addTransaction = (txn: PaymentTransaction) => {
    setTransactions((prev) => [txn, ...prev]);
    setBillState('paid');
    setPropertyTax((prev) => ({ ...prev, isPaid: true }));
  };

  const addSavedAddress = (addr: SavedAddress) => {
    setSavedAddresses((prev) => [...prev, addr]);
    setAddressState('populated');
  };

  const addTicket = (ticket: ComplaintTicket) => {
    setTickets((prev) => [ticket, ...prev]);
  };

  const sendMessage = (text: string) => {
    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // PRD: Free-text typed → shows one static canned reply + a "Would you like to raise this as a ticket?" button
    const botMsg: ChatMessage = {
      id: `msg_${Date.now() + 1}`,
      sender: 'bot',
      text: `I've registered your note regarding "${text}". If you'd like our sanitation supervisor to investigate this location, I can directly log a complaint ticket for your ward.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      showTicketCTA: true,
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
  };

  const handleChipClick = (chipId: string) => {
    switch (chipId) {
      case 'chip_pay_bill':
        navigateTo('bill_summary');
        break;
      case 'chip_raise_complaint':
        navigateTo('category_select');
        break;
      case 'chip_track_van':
        navigateTo('full_map');
        break;
      case 'chip_bulk_pickup':
        navigateTo('pickup_waste_type');
        break;
      case 'chip_ecostore':
        navigateTo('ecostore_grid');
        break;
      case 'chip_pavitra':
        navigateTo('pavitra_scheduler');
        break;
      case 'chip_custom_issue':
        navigateTo('evidence_location', { custom: true });
        break;
      default:
        break;
    }
  };

  return (
    <AppStateContext.Provider
      value={{
        language,
        setLanguage,
        currentScreen,
        screenParams,
        historyStack,
        navigateTo,
        goBack,
        activeTab,
        setActiveTab,
        selectedWard,
        setSelectedWard,
        userPhone,
        setUserPhone,
        isLoggedIn,
        setIsLoggedIn,
        billState,
        setBillState,
        vanStatus,
        setVanStatus,
        addressState,
        setAddressState,
        propertyTax,
        setPropertyTax,
        transactions,
        addTransaction,
        savedAddresses,
        addSavedAddress,
        tickets,
        addTicket,
        ecoPoints,
        setEcoPoints,
        pickupDraft,
        setPickupDraft,
        selectedProduct,
        setSelectedProduct,
        messages,
        sendMessage,
        handleChipClick,
        selectedComplaintCategory,
        setSelectedComplaintCategory,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};
