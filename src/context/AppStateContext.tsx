import React, { createContext, useContext, useState } from 'react';
import type {
  Language,
  ScreenId,
  BottomTab,
  BillState,
  VanStatus,
  AddressState,
  Ward,
  PropertyTax,
  PaymentTransaction,
  EcoProduct,
  SavedAddress,
  ComplaintTicket,
  ChatMessage,
  PublicToilet
} from '../types';

import {
  MOCK_WARDS,
  MOCK_PROPERTY_TAX,
  MOCK_PAST_TRANSACTIONS,
  INITIAL_SAVED_ADDRESSES,
  INITIAL_COMPLAINT,
  MOCK_PUBLIC_TOILETS
} from '../data/mockData';

interface AppStateContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currentScreen: ScreenId;
  navigateTo: (screen: ScreenId, params?: any) => void;
  goBack: () => void;
  screenParams: any;

  activeTab: BottomTab;
  setActiveTab: (tab: BottomTab) => void;

  selectedWard: Ward;
  setSelectedWard: (ward: Ward) => void;

  billState: BillState;
  setBillState: (state: BillState) => void;

  vanStatus: VanStatus;
  setVanStatus: (status: VanStatus) => void;

  addressState: AddressState;
  setAddressState: (state: AddressState) => void;

  propertyTax: PropertyTax;
  setPropertyTax: React.Dispatch<React.SetStateAction<PropertyTax>>;
  transactions: PaymentTransaction[];
  addTransaction: (txn: PaymentTransaction) => void;

  ecoPoints: number;
  setEcoPoints: React.Dispatch<React.SetStateAction<number>>;
  awardCommunityPoints: (points: number) => void;

  savedAddresses: SavedAddress[];
  addSavedAddress: (addr: SavedAddress) => void;

  tickets: ComplaintTicket[];
  addTicket: (ticket: ComplaintTicket) => void;

  pickupForm: {
    wasteType: string;
    fleetId: string;
    address: string;
    quantityTier: string;
  };
  setPickupForm: React.Dispatch<React.SetStateAction<{
    wasteType: string;
    fleetId: string;
    address: string;
    quantityTier: string;
  }>>;

  selectedProduct: EcoProduct | undefined;
  setSelectedProduct: (prod: EcoProduct | undefined) => void;

  selectedComplaintCategory: any;
  setSelectedComplaintCategory: (cat: any) => void;

  publicToilets: PublicToilet[];

  messages: ChatMessage[];
  sendMessage: (text: string) => void;
  handleChipClick: (chipId: string) => void;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg_1',
    sender: 'bot',
    text: 'Namaste! I am Swachhata AI Co-Pilot for Indore Municipal Corporation. How can I assist you today?',
    timestamp: '09:00 AM',
  },
];

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('splash');
  const [historyStack, setHistoryStack] = useState<ScreenId[]>(['splash']);
  const [screenParams, setScreenParams] = useState<any>(null);
  const [activeTab, setActiveTabState] = useState<BottomTab>('home');

  const [selectedWard, setSelectedWard] = useState<Ward>(MOCK_WARDS[0]);
  const [billState, setBillState] = useState<BillState>('unpaid');
  const [vanStatus, setVanStatus] = useState<VanStatus>('nearby');
  const [addressState, setAddressState] = useState<AddressState>('populated');

  const [propertyTax, setPropertyTax] = useState<PropertyTax>(MOCK_PROPERTY_TAX);
  const [transactions, setTransactions] = useState<PaymentTransaction[]>(MOCK_PAST_TRANSACTIONS);
  const [ecoPoints, setEcoPoints] = useState<number>(340);

  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>(INITIAL_SAVED_ADDRESSES);
  const [tickets, setTickets] = useState<ComplaintTicket[]>([INITIAL_COMPLAINT]);

  const [pickupForm, setPickupForm] = useState({
    wasteType: 'garden',
    fleetId: 'fleet_medium',
    address: 'Scheme 54, Vijay Nagar, Indore',
    quantityTier: 'Medium (30kg - 100kg)',
  });
  const [selectedProduct, setSelectedProduct] = useState<EcoProduct | undefined>(undefined);
  const [selectedComplaintCategory, setSelectedComplaintCategory] = useState<any>(null);
  
  const [publicToilets] = useState<PublicToilet[]>(MOCK_PUBLIC_TOILETS);

  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);

  const awardCommunityPoints = (points: number) => {
    setEcoPoints((prev) => prev + points);
  };

  const navigateTo = (screen: ScreenId, params?: any) => {
    setScreenParams(params || null);
    setCurrentScreen(screen);
    setHistoryStack((prev) => [...prev, screen]);

    if (screen === 'home' || screen === 'full_map' || screen === 'toilet_locator') setActiveTabState('home');
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
    if (ticket.rewardPointsEarned) {
      awardCommunityPoints(ticket.rewardPointsEarned);
    }
  };

  const sendMessage = (text: string) => {
    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    let replyText = `I've registered your note regarding "${text}". If you'd like our sanitation supervisor to investigate this location, I can directly log a complaint ticket for your ward.`;
    let showCTA = true;

    if (text.toLowerCase().includes('toilet') || text.toLowerCase().includes('शौचालय')) {
      replyText = `Found 4 clean Public Restrooms & She-Lounges near your location. Would you like to view the live toilet locator map?`;
    } else if (text.toLowerCase().includes('dump') || text.toLowerCase().includes('spot') || text.toLowerCase().includes('कचरे का ढेर')) {
      replyText = `You can report this open dump in Community Spot-a-Dump and earn +50 Eco-Points immediately upon submitting photo proof!`;
    }

    const botMsg: ChatMessage = {
      id: `msg_${Date.now() + 1}`,
      sender: 'bot',
      text: replyText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      showTicketCTA: showCTA,
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
      case 'chip_spot_dump':
        setSelectedComplaintCategory({
          id: 'spot_a_dump',
          title: 'Community Spot-a-Dump (+50 PTS)',
          titleHi: 'स्पॉट-ए-डंप (इनाम +50 PTS)',
          rewardPoints: 50,
        });
        navigateTo('evidence_location');
        break;
      case 'chip_toilets':
        navigateTo('toilet_locator');
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
        navigateTo,
        goBack,
        screenParams,
        activeTab,
        setActiveTab,
        selectedWard,
        setSelectedWard,
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
        ecoPoints,
        setEcoPoints,
        awardCommunityPoints,
        savedAddresses,
        addSavedAddress,
        tickets,
        addTicket,
        pickupForm,
        setPickupForm,
        selectedProduct,
        setSelectedProduct,
        selectedComplaintCategory,
        setSelectedComplaintCategory,
        publicToilets,
        messages,
        sendMessage,
        handleChipClick,
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
