import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Sparkles, AlertCircle, UtensilsCrossed } from 'lucide-react';
import { CartItem } from '../types/restaurant';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
  appliedDiscount: number;
  appliedCoupon: string | null;
  onApplyCoupon: (code: string) => boolean;
  onRemoveCoupon: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  appliedDiscount,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  const FREE_DELIVERY_THRESHOLD = 2500;
  const STANDARD_DELIVERY_FEE = 200;
  const PACKAGING_FEE = 90;

  const subtotal = cart.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD || subtotal === 0 ? 0 : STANDARD_DELIVERY_FEE;
  const grandTotal = Math.max(0, subtotal + (subtotal > 0 ? deliveryFee + PACKAGING_FEE : 0) - appliedDiscount);

  const amountNeededForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const freeDeliveryProgress = Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;

    const success = onApplyCoupon(couponInput.trim().toUpperCase());
    if (success) {
      setCouponInput('');
    } else {
      setCouponError('Invalid promo code. Try "SPICE10" or "FEAST250"');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-[#07190f] text-[#fdfaf3] h-full shadow-2xl flex flex-col border-l border-[#d4af37]/30 transform transition-transform duration-300"
        onClick={e => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#d4af37]/20 flex items-center justify-between bg-[#0a2316]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#16402d] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Your Feast Order</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#d4af37] text-[#07190f]">
                  {cart.reduce((sum, i) => sum + i.quantity, 0)} items
                </span>
              </h2>
              <p className="text-xs text-[#e7dfca]/60">Spice District • Hot & Fresh</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={onClearCart}
                className="text-xs text-rose-400 hover:text-rose-300 px-2 py-1 rounded hover:bg-rose-950/40 transition-colors cursor-pointer"
                title="Empty Cart"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-[#16402d] hover:bg-[#205b40] text-stone-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Free Delivery Bar */}
        {subtotal > 0 && (
          <div className="bg-[#0e2d1d] px-5 py-3 border-b border-[#d4af37]/15">
            <div className="flex items-center justify-between text-xs mb-1.5">
              {amountNeededForFreeDelivery === 0 ? (
                <span className="text-emerald-300 font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" /> You unlocked FREE City Delivery!
                </span>
              ) : (
                <span className="text-[#e7dfca]/80">
                  Add <strong className="text-[#f3c64c]">Rs. {amountNeededForFreeDelivery.toLocaleString()}</strong> more for <strong>FREE Delivery</strong>
                </span>
              )}
              <span className="text-[10px] text-stone-400 font-mono">
                {Math.round(freeDeliveryProgress)}%
              </span>
            </div>
            <div className="w-full bg-[#07190f] rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#d4af37] to-emerald-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${freeDeliveryProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-[#d4af37]/10">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
              <div className="w-20 h-20 rounded-full bg-[#0d2a1c] border border-[#d4af37]/20 flex items-center justify-center text-[#d4af37] mb-4">
                <UtensilsCrossed className="w-10 h-10 opacity-70" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Your Cart is Hungry!</h3>
              <p className="text-xs sm:text-sm text-[#e7dfca]/70 max-w-xs mb-6">
                Explore our authentic Dum Biryanis, Shinwari Karahis, Royal Nihari, and BBQ Kebabs to begin your order.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b3861c] text-[#07190f] font-bold text-sm shadow-md hover:brightness-110 cursor-pointer"
              >
                Browse Delicious Menu
              </button>
            </div>
          ) : (
            cart.map(item => {
              const itemTotal = item.menuItem.price * item.quantity;
              return (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-3.5">
                  {/* Thumbnail */}
                  <img
                    src={item.menuItem.image}
                    alt={item.menuItem.name}
                    className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl object-cover border border-[#d4af37]/30 flex-shrink-0"
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-bold text-sm text-white truncate">
                        {item.menuItem.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-stone-400 hover:text-rose-400 p-1 transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mt-0.5 text-[11px] text-[#e7dfca]/70">
                      <span className="text-[#d4af37] font-semibold">{item.spicyLevel}</span>
                      <span>•</span>
                      <span>Rs. {item.menuItem.price.toLocaleString()} each</span>
                    </div>

                    {item.specialNotes && (
                      <p className="text-[10px] text-amber-200/80 italic mt-1 bg-[#16402d]/40 px-2 py-0.5 rounded border border-[#d4af37]/15 truncate">
                        Note: {item.specialNotes}
                      </p>
                    )}

                    {/* Quantity & Item Subtotal */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center bg-[#0d2a1c] border border-[#d4af37]/30 rounded-lg p-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded bg-[#16402d] hover:bg-[#205b40] text-white flex items-center justify-center transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center font-bold text-xs text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded bg-[#d4af37] hover:bg-[#e2b740] text-[#07190f] flex items-center justify-center font-bold transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-extrabold text-sm sm:text-base text-[#f3c64c]">
                        Rs. {itemTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer with Calculations */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#d4af37]/25 bg-[#0a2316] space-y-4">
            {/* Promo Code Form */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-[#16402d] border border-emerald-500/40 px-3 py-2 rounded-xl text-xs">
                  <div className="flex items-center gap-2 text-emerald-300">
                    <Tag className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Coupon <strong>{appliedCoupon}</strong> Applied (-Rs. {appliedDiscount.toLocaleString()})</span>
                  </div>
                  <button
                    onClick={onRemoveCoupon}
                    className="text-stone-300 hover:text-white text-xs underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={e => {
                        setCouponInput(e.target.value);
                        setCouponError('');
                      }}
                      placeholder="Promo Code (Try 'SPICE10')"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-[#07190f] border border-[#d4af37]/30 text-white placeholder-stone-400 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-xl bg-[#16402d] hover:bg-[#205b40] text-[#f7e29b] text-xs font-bold border border-[#d4af37]/30 transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && (
                <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {couponError}
                </p>
              )}
            </div>

            {/* Bill Breakdown */}
            <div className="space-y-1.5 text-xs text-[#e7dfca]/80 pt-1 border-t border-[#d4af37]/15">
              <div className="flex justify-between">
                <span>Food Subtotal</span>
                <span className="font-semibold text-white">Rs. {subtotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center">
                <span>Standard Delivery Fee</span>
                {deliveryFee === 0 ? (
                  <span className="text-emerald-400 font-bold uppercase tracking-wider">FREE</span>
                ) : (
                  <span className="font-semibold text-white">Rs. {deliveryFee}</span>
                )}
              </div>

              <div className="flex justify-between">
                <span>Thermal Packaging & Eco-Seal Box</span>
                <span className="font-semibold text-white">Rs. {PACKAGING_FEE}</span>
              </div>

              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Special Voucher Discount</span>
                  <span>- Rs. {appliedDiscount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between items-baseline pt-2 border-t border-[#d4af37]/30 text-sm sm:text-base">
                <span className="font-bold text-white">Grand Total (PKR)</span>
                <span className="text-xl sm:text-2xl font-black text-[#f3c64c] font-sans">
                  Rs. {grandTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={onProceedToCheckout}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e2b740] to-[#b3861c] text-[#07190f] font-extrabold text-base shadow-xl shadow-[#d4af37]/25 hover:brightness-110 active:scale-98 transition-all cursor-pointer group"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
