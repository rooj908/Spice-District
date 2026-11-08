import React, { useState } from 'react';
import { X, ShieldCheck, MapPin, Phone, User, Home, CreditCard, Banknote, Smartphone, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { CartItem, CustomerInfo } from '../types/restaurant';
import { CITY_AREAS } from '../data/menuData';
import { Customer, PaymentMethodFactory } from '../models';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  subtotal: number;
  deliveryFee: number;
  packagingFee: number;
  discount: number;
  grandTotal: number;
  onPlaceOrder: (customer: CustomerInfo) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  subtotal,
  deliveryFee,
  packagingFee,
  discount,
  grandTotal,
  onPlaceOrder,
}) => {
  if (!isOpen) return null;

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Lahore');
  const [area, setArea] = useState(CITY_AREAS['Lahore'][0]);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [nearestLandmark, setNearestLandmark] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash_on_delivery' | 'jazzcash_easypaisa' | 'card_on_delivery'>('cash_on_delivery');
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamically update area options when city changes
  const handleCityChange = (newCity: string) => {
    setCity(newCity);
    const available = CITY_AREAS[newCity] || [];
    if (available.length > 0) {
      setArea(available[0]);
    } else {
      setArea('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // OOP Encapsulation: Instantiate Customer object and execute encapsulated validation
    const customer = new Customer(
      fullName,
      phone,
      city,
      area || (CITY_AREAS[city] ? CITY_AREAS[city][0] : ''),
      deliveryAddress,
      nearestLandmark,
      orderNotes,
      paymentMethod
    );

    const validation = customer.validate();
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setTimeout(() => {
      onPlaceOrder(customer.toCustomerInfo());
      setIsSubmitting(false);
    }, 600);
  };


  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-[#081f14] border border-[#d4af37]/40 rounded-3xl overflow-hidden shadow-2xl text-[#fdfaf3] my-6"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0a2618] p-5 sm:p-6 border-b border-[#d4af37]/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-[#16402d] text-stone-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer mr-1"
              aria-label="Back to cart"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
                Checkout & Delivery Details
              </h2>
              <p className="text-xs text-[#e7dfca]/70">
                Spice District • Express Hot Delivery to your doorstep
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-[#16402d] hover:bg-[#205b40] text-stone-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Checkout Form & Order Summary Grid */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left 7 Cols: Customer & Address Information */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* Section 1: Contact Details */}
              <div className="bg-[#092115] border border-[#d4af37]/20 rounded-2xl p-4 sm:p-5">
                <h3 className="text-sm font-bold text-[#f7e29b] uppercase tracking-wider mb-4 flex items-center gap-2">
                  <User className="w-4 h-4 text-[#d4af37]" />
                  <span>1. Contact Information</span>
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#e7dfca] mb-1.5">
                      Full Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      placeholder="e.g., Hamza Tariq / Fatima Khan"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-[#07190f] border text-sm text-white placeholder-stone-500 focus:outline-none focus:border-[#d4af37] ${
                        errors.fullName ? 'border-rose-500' : 'border-[#d4af37]/30'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-xs text-rose-400 mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#e7dfca] mb-1.5">
                      Phone Number (For Rider Contact) <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-xs text-[#d4af37] font-semibold border-r border-[#d4af37]/30 pr-2.5">
                        <Phone className="w-3.5 h-3.5" />
                        <span>🇵🇰</span>
                      </div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="0300-1234567 or 0321-9876543"
                        className={`w-full pl-20 pr-3.5 py-2.5 rounded-xl bg-[#07190f] border text-sm text-white placeholder-stone-500 focus:outline-none focus:border-[#d4af37] ${
                          errors.phone ? 'border-rose-500' : 'border-[#d4af37]/30'
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-xs text-rose-400 mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 2: Delivery Address */}
              <div className="bg-[#092115] border border-[#d4af37]/20 rounded-2xl p-4 sm:p-5">
                <h3 className="text-sm font-bold text-[#f7e29b] uppercase tracking-wider mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#d4af37]" />
                  <span>2. Delivery Destination</span>
                </h3>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#e7dfca] mb-1.5">City</label>
                      <select
                        value={city}
                        onChange={e => handleCityChange(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#07190f] border border-[#d4af37]/30 text-sm text-white focus:outline-none focus:border-[#d4af37] cursor-pointer"
                      >
                        <option value="Lahore">Lahore (لاہور)</option>
                        <option value="Karachi">Karachi (کراچی)</option>
                        <option value="Islamabad">Islamabad (اسلام آباد)</option>
                        <option value="Rawalpindi">Rawalpindi (راولپنڈی)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#e7dfca] mb-1.5">
                        Popular Area / Town ({city})
                      </label>
                      <select
                        value={area}
                        onChange={e => setArea(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#07190f] border border-[#d4af37]/30 text-sm text-white focus:outline-none focus:border-[#d4af37] cursor-pointer"
                      >
                        {(CITY_AREAS[city] || []).map((a, i) => (
                          <option key={i} value={a}>{a}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#e7dfca] mb-1.5">
                      Complete Street Address & House / Flat No. <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      rows={2}
                      value={deliveryAddress}
                      onChange={e => setDeliveryAddress(e.target.value)}
                      placeholder="e.g. House #42, Street 8, Sector Y, Phase 3 / Apartment 4B, Emerald Heights..."
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-[#07190f] border text-sm text-white placeholder-stone-500 focus:outline-none focus:border-[#d4af37] ${
                        errors.deliveryAddress ? 'border-rose-500' : 'border-[#d4af37]/30'
                      }`}
                    />
                    {errors.deliveryAddress && (
                      <p className="text-xs text-rose-400 mt-1">{errors.deliveryAddress}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#e7dfca] mb-1.5">
                      Nearest Famous Landmark / Building (Optional)
                    </label>
                    <input
                      type="text"
                      value={nearestLandmark}
                      onChange={e => setNearestLandmark(e.target.value)}
                      placeholder="e.g. Near Packages Mall or Behind City Hospital"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#07190f] border border-[#d4af37]/30 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Payment Method */}
              <div className="bg-[#092115] border border-[#d4af37]/20 rounded-2xl p-4 sm:p-5">
                <h3 className="text-sm font-bold text-[#f7e29b] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#d4af37]" />
                  <span>3. Payment Method</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cash_on_delivery')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      paymentMethod === 'cash_on_delivery'
                        ? 'bg-[#16402d] border-[#d4af37] ring-1 ring-[#d4af37] text-white shadow-md'
                        : 'bg-[#07190f] border-[#d4af37]/20 text-[#e7dfca]/80 hover:border-[#d4af37]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Banknote className="w-5 h-5 text-emerald-400" />
                      {paymentMethod === 'cash_on_delivery' && <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Cash on Delivery</p>
                      <p className="text-[10px] text-stone-300">Pay cash upon arrival</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('jazzcash_easypaisa')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      paymentMethod === 'jazzcash_easypaisa'
                        ? 'bg-[#16402d] border-[#d4af37] ring-1 ring-[#d4af37] text-white shadow-md'
                        : 'bg-[#07190f] border-[#d4af37]/20 text-[#e7dfca]/80 hover:border-[#d4af37]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Smartphone className="w-5 h-5 text-amber-400" />
                      {paymentMethod === 'jazzcash_easypaisa' && <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">JazzCash / EasyPaisa</p>
                      <p className="text-[10px] text-stone-300">Rider QR Scan or Wallet</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card_on_delivery')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      paymentMethod === 'card_on_delivery'
                        ? 'bg-[#16402d] border-[#d4af37] ring-1 ring-[#d4af37] text-white shadow-md'
                        : 'bg-[#07190f] border-[#d4af37]/20 text-[#e7dfca]/80 hover:border-[#d4af37]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <CreditCard className="w-5 h-5 text-sky-400" />
                      {paymentMethod === 'card_on_delivery' && <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Card on Delivery</p>
                      <p className="text-[10px] text-stone-300">POS Machine at door</p>
                    </div>
                  </button>
                </div>

                {/* Polymorphism in Action: Dynamic instructions based on active PaymentMethod child class */}
                <p className="mt-3 text-xs text-[#f7e29b] bg-[#07190f] p-3 rounded-xl border border-[#d4af37]/30 flex items-start gap-2">
                  <span className="text-amber-400">💡</span>
                  <span>{PaymentMethodFactory.create(paymentMethod).getInstructions(grandTotal)}</span>
                </p>
              </div>

            </div>

            {/* Right 5 Cols: Live Order Summary & Confirmation CTA */}
            <div className="lg:col-span-5 space-y-5">
              <div className="bg-[#0a2316] border-2 border-[#d4af37]/35 rounded-2xl p-5 shadow-xl">
                <h3 className="text-base font-bold text-white mb-3 pb-2 border-b border-[#d4af37]/20 flex items-center justify-between">
                  <span>Order Summary</span>
                  <span className="text-xs text-[#d4af37] font-semibold">{cart.length} Dishes</span>
                </h3>

                {/* Items Mini List */}
                <div className="max-h-56 overflow-y-auto space-y-2.5 pr-1 divide-y divide-[#d4af37]/10">
                  {cart.map(item => (
                    <div key={item.id} className="pt-2 first:pt-0 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded bg-[#16402d] text-[#f7e29b] font-bold flex items-center justify-center text-[10px]">
                          {item.quantity}×
                        </span>
                        <div>
                          <p className="font-semibold text-white truncate max-w-[170px] sm:max-w-[200px]">
                            {item.menuItem.name}
                          </p>
                          <p className="text-[10px] text-[#d4af37]">{item.spicyLevel}</p>
                        </div>
                      </div>
                      <span className="font-bold text-[#f7e29b]">
                        Rs. {(item.menuItem.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bill Breakdown */}
                <div className="pt-4 mt-3 border-t border-[#d4af37]/20 space-y-2 text-xs text-[#e7dfca]/80">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-white">Rs. {subtotal.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Delivery Charges</span>
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-400 font-bold">FREE (Special Offer)</span>
                    ) : (
                      <span className="font-semibold text-white">Rs. {deliveryFee}</span>
                    )}
                  </div>

                  <div className="flex justify-between">
                    <span>Eco-Seal Food Packaging</span>
                    <span className="font-semibold text-white">Rs. {packagingFee}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-400 font-bold">
                      <span>Voucher Discount</span>
                      <span>- Rs. {discount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-[#d4af37]/30 flex justify-between items-baseline">
                    <div>
                      <span className="font-black text-white text-base">Grand Total</span>
                      <p className="text-[10px] text-stone-400">All taxes included (PKR)</p>
                    </div>
                    <span className="text-2xl font-black text-[#f3c64c] font-sans">
                      Rs. {grandTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Safe Delivery Guarantee Badge */}
                <div className="mt-4 p-3 rounded-xl bg-[#07190f] border border-[#d4af37]/20 text-[11px] text-[#e7dfca]/80 flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span>
                    <strong>Spice District Guarantee:</strong> Delivered piping hot in thermal insulation within 35-45 minutes.
                  </span>
                </div>

                {/* Submit Order Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-5 w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e2b740] to-[#b3861c] text-[#07190f] font-extrabold text-base shadow-xl shadow-[#d4af37]/30 hover:brightness-110 active:scale-98 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-[#07190f] border-t-transparent rounded-full animate-spin"></span>
                      <span>Placing Your Feast...</span>
                    </div>
                  ) : (
                    <span>Confirm & Place Order (Rs. {grandTotal.toLocaleString()})</span>
                  )}
                </button>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};
