import React, { useState } from 'react';
import { useAppState } from '../../../context/AppStateContext';
import { Button } from '../../common/Button';
import { Modal } from '../../common/Modal';
import { ArrowLeft, Home, Building2, Store, Plus, MapPin } from 'lucide-react';
import type { SavedAddress } from '../../../types';

const SavedAddressesScreen: React.FC = () => {
  const { language, goBack, savedAddresses, addSavedAddress, addressState, setAddressState, selectedWard } =
    useAppState();

  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [label, setLabel] = useState<'Home' | 'Office' | 'Shop' | 'Other'>('Home');
  const [addressLine, setAddressLine] = useState<string>('');

  const displayAddresses = addressState === 'empty' ? [] : savedAddresses;

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressLine.trim()) return;

    const newAddr: SavedAddress = {
      id: `addr_${Date.now()}`,
      label,
      labelHi: label === 'Home' ? 'घर' : label === 'Office' ? 'कार्यालय' : 'दुकान',
      addressLine,
      ward: selectedWard.name,
    };

    addSavedAddress(newAddr);
    setAddressLine('');
    setShowAddModal(false);
  };

  return (
    <div className="flex-1 bg-slate-50 p-4 space-y-4 pb-6 flex flex-col justify-between">
      <div>
        <button
          onClick={goBack}
          className="flex items-center gap-1 text-slate-600 hover:text-slate-900 text-xs font-semibold py-1 mb-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'hi' ? 'पीछे' : 'Back'}</span>
        </button>

        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            {language === 'hi' ? 'सहेजे गए पते' : 'Saved Address Book'}
          </h2>
          <button
            onClick={() => setAddressState(addressState === 'populated' ? 'empty' : 'populated')}
            className="text-[10px] text-amber-700 underline font-semibold"
          >
            {addressState === 'empty' ? 'Show Populated' : 'Simulate Empty State'}
          </button>
        </div>

        <p className="text-xs text-slate-500 mt-1">
          {language === 'hi'
            ? 'बल्क पिकअप और पवित्र कचरा संग्रहण के लिए सहेजे गए पते'
            : 'Frequently used pickup locations for bulk waste & floral scheduling'}
        </p>

        <div className="mt-4 space-y-2.5">
          {displayAddresses.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center space-y-3 my-6">
              <MapPin className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-sm font-bold text-slate-800">
                {language === 'hi' ? 'कोई सहेजा गया पता नहीं है' : 'No Saved Addresses Yet'}
              </h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                {language === 'hi'
                  ? 'अपनी कचरा पिकअप बुकिंग को तेज़ करने के लिए एक नया पता जोड़ें।'
                  : 'Add your home or shop location to quickly select it during bulk pickup booking.'}
              </p>
              <Button variant="eco" onClick={() => setShowAddModal(true)}>
                <Plus className="w-4 h-4" />
                <span>{language === 'hi' ? 'नया पता जोड़ें' : 'Add First Address'}</span>
              </Button>
            </div>
          ) : (
            displayAddresses.map((addr) => {
              const IconComp = addr.label === 'Home' ? Home : addr.label === 'Office' ? Building2 : Store;
              return (
                <div
                  key={addr.id}
                  className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-sm flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-municipal-lightBlue text-municipal-blue flex items-center justify-center shrink-0">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        {language === 'hi' ? addr.labelHi : addr.label}
                      </div>
                      <div className="text-[11px] text-slate-600">{addr.addressLine}</div>
                      <div className="text-[9px] text-slate-400 font-mono mt-0.5">{addr.ward}</div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {displayAddresses.length > 0 && (
        <div className="pt-3">
          <Button variant="eco" onClick={() => setShowAddModal(true)}>
            <Plus className="w-4 h-4" />
            <span>{language === 'hi' ? 'नया पता जोड़ें' : 'Add New Address'}</span>
          </Button>
        </div>
      )}

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title={language === 'hi' ? 'नया पता जोड़ें' : 'Add New Pickup Location'}
      >
        <form onSubmit={handleCreateAddress} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">Label Type</label>
            <div className="grid grid-cols-3 gap-2">
              {(['Home', 'Office', 'Shop'] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLabel(l)}
                  className={`py-2 rounded-xl text-xs font-semibold border transition ${
                    label === l
                      ? 'bg-municipal-blue text-white border-municipal-blue'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">Full Street Address</label>
            <textarea
              rows={3}
              value={addressLine}
              onChange={(e) => setAddressLine(e.target.value)}
              placeholder="House/Plot No, Colony name, Landmark..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-municipal-blue outline-none"
              required
            />
          </div>

          <Button variant="eco" type="submit">
            Save Address
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default SavedAddressesScreen;
