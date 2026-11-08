import React, { useState } from 'react';
import { CheckCircle2, Clock, MapPin, Phone, Printer, Share2, Sparkles, Utensils, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { Order } from '../types/restaurant';
import { PaymentMethodFactory } from '../models';

interface OrderConfirmationModalProps {
  order: Order | null;
  onClose: () => void;
  onNewOrder: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onClose,
  onNewOrder,
}) => {
  if (!order) return null;

  const [copied, setCopied] = useState(false);

  // OOP Polymorphism: Create PaymentMethod subclass instance
  const paymentInstance = PaymentMethodFactory.create(order.customer.paymentMethod);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyOrderId = () => {
    navigator.clipboard?.writeText(order.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-300">
      <div 
        className="relative w-full max-w-3xl bg-[#081f14] border-2 border-[#d4af37]/60 rounded-3xl overflow-hidden shadow-2xl text-[#fdfaf3] my-6"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Celebration Banner */}
        <div className="bg-gradient-to-r from-[#0d2a1c] via-[#16402d] to-[#0d2a1c] p-6 sm:p-8 text-center border-b border-[#d4af37]/30 relative overflow-hidden">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-full bg-gradient-to-tr from-[#d4af37] to-[#fce293] p-1 shadow-xl flex items-center justify-center">
            <div className="w-full h-full bg-[#081a10] rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-[#d4af37]" />
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#07190f]/70 border border-[#d4af37]/40 text-[#f7e29b] text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Shukriya • Order Placed Successfully</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            Your Feast is Sizzling in Our Kitchen!
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#e7dfca]/80 max-w-lg mx-auto">
            Our chefs have fired up the tandoor and karahi woks. Your authentic Pakistani feast is being prepared with pure ingredients.
          </p>

          {/* Order ID & Estimated Time Pills */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <div className="bg-[#07190f]/90 border border-[#d4af37]/40 rounded-xl px-4 py-2 flex items-center gap-2">
              <span className="text-xs text-[#e7dfca]/70">Order Number:</span>
              <span className="font-mono font-bold text-sm text-[#f3c64c]">{order.orderId}</span>
              <button
                onClick={handleCopyOrderId}
                className="text-stone-400 hover:text-white ml-1 p-0.5"
                title="Copy Order ID"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div className="bg-[#07190f]/90 border border-emerald-500/40 rounded-xl px-4 py-2 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-[#e7dfca]/70">Est. Delivery:</span>
              <span className="font-bold text-sm text-emerald-300">{order.estimatedDeliveryTime}</span>
            </div>
          </div>
        </div>

        {/* Live Order Timeline Tracker */}
        <div className="p-6 bg-[#092115] border-b border-[#d4af37]/20">
          <h4 className="text-xs font-bold text-[#f7e29b] uppercase tracking-wider mb-4 text-center sm:text-left">
            Real-Time Preparation Status
          </h4>
          <div className="grid grid-cols-4 gap-2 relative">
            <div className="text-center space-y-1.5">
              <div className="w-8 h-8 mx-auto rounded-full bg-[#d4af37] text-[#07190f] font-bold flex items-center justify-center text-xs shadow-md">
                ✓
              </div>
              <p className="text-[11px] font-bold text-white">Confirmed</p>
              <p className="text-[9px] text-[#e7dfca]/60 hidden sm:block">Kitchen notified</p>
            </div>

            <div className="text-center space-y-1.5">
              <div className="w-8 h-8 mx-auto rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center text-xs shadow-md animate-pulse">
                🔥
              </div>
              <p className="text-[11px] font-bold text-emerald-300">In Tandoor</p>
              <p className="text-[9px] text-[#e7dfca]/60 hidden sm:block">Cooking fresh</p>
            </div>

            <div className="text-center space-y-1.5 opacity-60">
              <div className="w-8 h-8 mx-auto rounded-full bg-[#16402d] text-stone-300 font-bold flex items-center justify-center text-xs border border-[#d4af37]/20">
                📦
              </div>
              <p className="text-[11px] font-bold text-white">Packed</p>
              <p className="text-[9px] text-[#e7dfca]/60 hidden sm:block">Thermal seal</p>
            </div>

            <div className="text-center space-y-1.5 opacity-60">
              <div className="w-8 h-8 mx-auto rounded-full bg-[#16402d] text-stone-300 font-bold flex items-center justify-center text-xs border border-[#d4af37]/20">
                🛵
              </div>
              <p className="text-[11px] font-bold text-white">On The Way</p>
              <p className="text-[9px] text-[#e7dfca]/60 hidden sm:block">Express rider</p>
            </div>
          </div>
        </div>

        {/* Content Details: Customer Info & Order Receipt */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Customer Details Box */}
            <div className="bg-[#0a2316] p-4 rounded-2xl border border-[#d4af37]/20 space-y-3 text-xs">
              <h4 className="font-bold text-[#f7e29b] uppercase tracking-wider flex items-center gap-1.5 border-b border-[#d4af37]/15 pb-2">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Delivery Address</span>
              </h4>

              <div>
                <p className="font-bold text-white text-sm">{order.customer.fullName}</p>
                <p className="text-[#e7dfca]/80">{order.customer.deliveryAddress}</p>
                <p className="text-[#d4af37] font-medium">{order.customer.area}, {order.customer.city}</p>
                {order.customer.nearestLandmark && order.customer.nearestLandmark.trim() && (
                  <p className="text-[11px] text-stone-400 mt-1">
                    Landmark: {order.customer.nearestLandmark.trim().replace(/^[,\s]+|[,\s]+$/g, '')}
                  </p>
                )}
              </div>

              <div className="pt-2 border-t border-[#d4af37]/10 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[#e7dfca]">
                  <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>{order.customer.phone}</span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                  {paymentInstance.displayName}
                </span>
              </div>
            </div>

            {/* Restaurant Dispatch Support */}
            <div className="bg-[#0a2316] p-4 rounded-2xl border border-[#d4af37]/20 space-y-3 text-xs flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-[#f7e29b] uppercase tracking-wider flex items-center gap-1.5 border-b border-[#d4af37]/15 pb-2">
                  <Utensils className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Branch Dispatch & Payment Instructions</span>
                </h4>
                <p className="text-[#e7dfca]/80 mt-2">
                  Dispatched from <strong>Spice District Flagship Kitchen</strong> (Gulberg III, Lahore).
                </p>
                <p className="text-[11px] text-[#f7e29b] bg-[#07190f] p-2 rounded-lg border border-[#d4af37]/25 mt-2">
                  {paymentInstance.getInstructions(order.grandTotal)}
                </p>
              </div>

              <div className="pt-2 border-t border-[#d4af37]/10 flex items-center justify-between">
                <a
                  href="tel:+9242111774233"
                  className="inline-flex items-center gap-1.5 text-xs text-[#f3c64c] hover:underline font-bold"
                >
                  <Phone className="w-3.5 h-3.5" /> Call Hotline: 042-111-774-233
                </a>
              </div>
            </div>

          </div>

          {/* Ordered Food Items Table / Receipt */}
          <div className="bg-[#07190f] rounded-2xl border border-[#d4af37]/25 overflow-hidden">
            <div className="bg-[#0d2a1c] px-4 py-2.5 border-b border-[#d4af37]/20 flex items-center justify-between text-xs font-bold text-[#f7e29b]">
              <span>Ordered Food Items</span>
              <span>Amount (PKR)</span>
            </div>

            <div className="divide-y divide-[#d4af37]/10 p-4 space-y-2.5 max-h-56 overflow-y-auto">
              {order.items.map(item => (
                <div key={item.id} className="pt-2 first:pt-0 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-md bg-[#16402d] text-[#f7e29b] font-bold flex items-center justify-center text-xs">
                      {item.quantity}×
                    </span>
                    <div>
                      <p className="font-semibold text-white">{item.menuItem.name}</p>
                      <p className="text-[11px] text-[#d4af37] font-sans">{item.menuItem.urduName} • {item.spicyLevel}</p>
                      {item.specialNotes && (
                        <p className="text-[10px] text-stone-400 italic">"{item.specialNotes}"</p>
                      )}
                    </div>
                  </div>
                  <span className="font-bold text-white">
                    Rs. {(item.menuItem.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Financial Totals */}
            <div className="bg-[#0a2316] p-4 border-t border-[#d4af37]/20 space-y-1.5 text-xs text-[#e7dfca]/80">
              <div className="flex justify-between">
                <span>Food Subtotal</span>
                <span className="text-white font-medium">Rs. {order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="text-white font-medium">
                  {order.deliveryFee === 0 ? <strong className="text-emerald-400">FREE</strong> : `Rs. ${order.deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Eco-Seal Packaging</span>
                <span className="text-white font-medium">Rs. {order.packagingFee}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>Special Voucher Discount</span>
                  <span>- Rs. {order.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between items-baseline pt-2 border-t border-[#d4af37]/30 text-sm sm:text-base font-extrabold text-white">
                <span>Total Amount Paid (PKR)</span>
                <span className="text-xl sm:text-2xl text-[#f3c64c] font-black font-sans">
                  Rs. {order.grandTotal.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons: Print, Place Another Order, Close */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0d2a1c] hover:bg-[#16402d] border border-[#d4af37]/30 text-[#f7e29b] text-xs font-bold transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4 text-[#d4af37]" />
              <span>Print / Save Receipt</span>
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onNewOrder}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e2b740] to-[#b3861c] text-[#07190f] font-extrabold text-sm shadow-xl shadow-[#d4af37]/20 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              >
                <span>Order More Dishes</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
