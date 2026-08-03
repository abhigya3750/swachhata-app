import React, { useState } from 'react';
import { useAppState } from '../../../context/AppStateContext';
import { Button } from '../../common/Button';
import { Modal } from '../../common/Modal';
import { Badge } from '../../common/Badge';
import { ECO_PRODUCTS } from '../../../data/mockData';
import { ArrowLeft, Star, ShoppingCart, CheckCircle2, HeartHandshake } from 'lucide-react';

const ProductDetailScreen: React.FC = () => {
  const { language, navigateTo, goBack, selectedProduct, setEcoPoints } = useAppState();
  const [showCheckoutModal, setShowCheckoutModal] = useState<boolean>(false);
  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);

  const product = selectedProduct || ECO_PRODUCTS[0];

  const handleBuyNow = () => {
    setShowCheckoutModal(true);
  };

  const handleConfirmPurchase = () => {
    setOrderConfirmed(true);
    setEcoPoints((prev) => prev + product.pointsReward);
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

        {/* Product Image Banner */}
        <div className="relative h-48 w-full rounded-2xl overflow-hidden shadow-sm bg-slate-200 border border-slate-200">
          <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
          {product.ecoTaxExempt && (
            <div className="absolute top-3 left-3">
              <Badge variant="success">80G Tax Exempt Certificate Included</Badge>
            </div>
          )}
        </div>

        {/* Details Card */}
        <div className="mt-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full">
              {product.shgGroup}
            </span>
            <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {product.rating}
            </span>
          </div>

          <h2 className="text-lg font-bold text-slate-900 leading-tight">
            {language === 'hi' ? product.titleHi : product.title}
          </h2>

          <p className="text-xs text-slate-600 leading-relaxed">
            {language === 'hi' ? product.descriptionHi : product.description}
          </p>

          <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between pt-2">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-semibold">Price</span>
              <span className="text-2xl font-black text-slate-900">₹{product.price}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block uppercase font-semibold">Rewards</span>
              <span className="text-xs font-bold text-eco-darkGreen bg-emerald-100 px-2.5 py-1 rounded-full">
                +{product.pointsReward} PTS
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="pt-3">
        <Button variant="eco" onClick={handleBuyNow}>
          <ShoppingCart className="w-4 h-4" />
          <span>{language === 'hi' ? `अभी खरीदें (Pay ₹${product.price})` : `Buy Now • ₹${product.price}`}</span>
        </Button>
      </div>

      {/* Mock Checkout Modal */}
      <Modal
        isOpen={showCheckoutModal}
        onClose={() => {
          setShowCheckoutModal(false);
          setOrderConfirmed(false);
        }}
        title={language === 'hi' ? 'इको-स्टोर चेकआउट' : 'Eco-Store Mock Checkout'}
      >
        {!orderConfirmed ? (
          <div className="space-y-4">
            <div className="p-3 bg-slate-100 rounded-xl flex items-center gap-3">
              <img src={product.imageUrl} className="w-12 h-12 rounded-lg object-cover" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">{product.title}</h4>
                <div className="text-xs font-black text-emerald-800">₹{product.price}</div>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl text-xs text-emerald-900 space-y-1">
              <div className="font-bold flex items-center gap-1">
                <HeartHandshake className="w-4 h-4 text-emerald-700" />
                <span>Supporting Indore Women Self Help Groups</span>
              </div>
              <p className="text-[11px] text-emerald-800">
                80G Income tax deduction certificate will be e-mailed to your linked account.
              </p>
            </div>

            <Button variant="eco" onClick={handleConfirmPurchase}>
              {language === 'hi' ? 'खरीद की पुष्टि करें' : `Confirm Purchase (₹${product.price})`}
            </Button>
          </div>
        ) : (
          <div className="text-center space-y-3 py-2 animate-in zoom-in-95">
            <CheckCircle2 className="w-12 h-12 text-eco-green mx-auto" />
            <h4 className="text-base font-bold text-slate-900">
              {language === 'hi' ? 'ऑर्डर सफलतापूर्वक दिया गया!' : 'Order Placed Successfully!'}
            </h4>
            <p className="text-xs text-slate-500">
              Delivery expected within 24 hours to your linked Ward 34 address.
            </p>
            <div className="p-2 bg-emerald-100 rounded-lg text-xs font-bold text-emerald-900">
              +{product.pointsReward} Eco-Points added to your balance!
            </div>
            <Button variant="primary" onClick={() => navigateTo('ecostore_grid')}>
              {language === 'hi' ? 'स्टोर पर लौटें' : 'Back to Eco-Store'}
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ProductDetailScreen;
