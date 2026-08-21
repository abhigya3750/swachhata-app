import React from 'react';
import { AppStateProvider, useAppState } from './context/AppStateContext';
import PhoneFrame from './components/frame/PhoneFrame';

// Screens
import SplashLanguageScreen from './components/screens/onboarding/SplashLanguageScreen';
import MobileOtpScreen from './components/screens/onboarding/MobileOtpScreen';
import WardSetupScreen from './components/screens/onboarding/WardSetupScreen';
import PropertyLinkScreen from './components/screens/onboarding/PropertyLinkScreen';

import HomeScreen from './components/screens/home/HomeScreen';
import FullMapScreen from './components/screens/home/FullMapScreen';

import CategorySelectScreen from './components/screens/raise_query/CategorySelectScreen';
import EvidenceLocationScreen from './components/screens/raise_query/EvidenceLocationScreen';
import ComplaintConfirmScreen from './components/screens/raise_query/ComplaintConfirmScreen';

import ChatbotScreen from './components/screens/chatbot/ChatbotScreen';

import BillSummaryScreen from './components/screens/billing/BillSummaryScreen';
import PaymentMethodScreen from './components/screens/billing/PaymentMethodScreen';
import PaymentSuccessScreen from './components/screens/billing/PaymentSuccessScreen';
import PassbookScreen from './components/screens/billing/PassbookScreen';

import PickupWasteTypeScreen from './components/screens/pickup/PickupWasteTypeScreen';
import PickupFleetScreen from './components/screens/pickup/PickupFleetScreen';
import PickupLocationScreen from './components/screens/pickup/PickupLocationScreen';
import PickupPriceReviewScreen from './components/screens/pickup/PickupPriceReviewScreen';
import PickupTrackingScreen from './components/screens/pickup/PickupTrackingScreen';

import PavitraSchedulerScreen from './components/screens/ecostore/PavitraSchedulerScreen';
import EcoStoreGridScreen from './components/screens/ecostore/EcoStoreGridScreen';
import ProductDetailScreen from './components/screens/ecostore/ProductDetailScreen';

import ProfileHomeScreen from './components/screens/profile/ProfileHomeScreen';
import SavedAddressesScreen from './components/screens/profile/SavedAddressesScreen';
import HelpdeskScreen from './components/screens/profile/HelpdeskScreen';

import PublicToiletLocatorScreen from './components/screens/toilets/PublicToiletLocatorScreen';

const RouterContent: React.FC = () => {
  const { currentScreen } = useAppState();

  switch (currentScreen) {
    // Onboarding
    case 'splash':
      return <SplashLanguageScreen />;
    case 'mobile_otp':
      return <MobileOtpScreen />;
    case 'ward_setup':
      return <WardSetupScreen />;
    case 'property_link':
      return <PropertyLinkScreen />;

    // Home & Civic Facilities
    case 'home':
      return <HomeScreen />;
    case 'full_map':
      return <FullMapScreen />;
    case 'toilet_locator':
      return <PublicToiletLocatorScreen />;

    // Raise Query & Spot-a-Dump
    case 'category_select':
      return <CategorySelectScreen />;
    case 'evidence_location':
      return <EvidenceLocationScreen />;
    case 'complaint_confirm':
      return <ComplaintConfirmScreen />;

    // Chatbot
    case 'chat':
      return <ChatbotScreen />;

    // Billing
    case 'bill_summary':
      return <BillSummaryScreen />;
    case 'payment_method':
      return <PaymentMethodScreen />;
    case 'payment_success':
      return <PaymentSuccessScreen />;
    case 'passbook':
      return <PassbookScreen />;

    // Bulk Pickup
    case 'pickup_waste_type':
      return <PickupWasteTypeScreen />;
    case 'pickup_fleet':
      return <PickupFleetScreen />;
    case 'pickup_location':
      return <PickupLocationScreen />;
    case 'pickup_review':
      return <PickupPriceReviewScreen />;
    case 'pickup_tracking':
      return <PickupTrackingScreen />;

    // Eco-Store & Pavitra
    case 'pavitra_scheduler':
      return <PavitraSchedulerScreen />;
    case 'ecostore_grid':
      return <EcoStoreGridScreen />;
    case 'product_detail':
      return <ProductDetailScreen />;

    // Profile
    case 'profile_home':
      return <ProfileHomeScreen />;
    case 'saved_addresses':
      return <SavedAddressesScreen />;
    case 'helpdesk':
      return <HelpdeskScreen />;

    default:
      return <HomeScreen />;
  }
};

const App: React.FC = () => {
  return (
    <AppStateProvider>
      <PhoneFrame>
        <RouterContent />
      </PhoneFrame>
    </AppStateProvider>
  );
};

export default App;
