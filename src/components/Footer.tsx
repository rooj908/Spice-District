import React from 'react';
import { Phone, Clock, ShieldCheck, Utensils, Flame } from 'lucide-react';
import { CategoryId } from '../types/restaurant';

interface FooterProps {
  onSelectCategory: (cat: CategoryId) => void;
  onOpenOrder: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenOrder }) => {
  return (
    <footer className="bg-[#05130b] text-[#e7dfca] border-t border-[#d4af37]/25 pt-12 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#d4af37]/20 items-center justify-between">
          
          {/* Brand Column (Cols 1-5) */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4af37] to-[#997316] p-0.5 shadow-md">
                <div className="w-full h-full bg-[#081a10] rounded-[10px] flex items-center justify-center">
                  <Utensils className="w-5 h-5 text-[#d4af37]" />
                </div>
              </div>
              <div>
                <span className="font-display text-xl font-bold tracking-wider text-[#fcfaf4] block">
                  SPICE DISTRICT
                </span>
                <span className="text-xs text-[#d4af37] font-semibold tracking-widest">
                  اسپائس ڈسٹرکٹ • Authentic Pakistani Restaurant
                </span>
              </div>
            </div>

            <p className="text-xs text-[#e7dfca]/75 leading-relaxed max-w-sm">
              Authentic Pakistani food ordering system. Hot and fresh Biryanis, Karahis, Nihari, Haleem, and Charcoal BBQ delivered to your doorstep.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16402d] text-[#f7e29b] text-xs font-semibold border border-[#d4af37]/30">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Halal Certified</span>
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#0a2618] text-amber-300 text-xs font-semibold border border-amber-600/30">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>Pure Desi Ghee</span>
              </span>
            </div>
          </div>

          {/* Quick Menu Categories (Cols 6-8) */}
          <div className="md:col-span-4 space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-[#d4af37]/20 pb-1.5">
              Quick Menu Filters
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-[#e7dfca]/80">
              <button
                onClick={() => onSelectCategory('biryani')}
                className="hover:text-[#f3c64c] text-left transition-colors cursor-pointer"
              >
                • Biryani & Rice
              </button>
              <button
                onClick={() => onSelectCategory('karahi')}
                className="hover:text-[#f3c64c] text-left transition-colors cursor-pointer"
              >
                • Karahi & Handi
              </button>
              <button
                onClick={() => onSelectCategory('curries')}
                className="hover:text-[#f3c64c] text-left transition-colors cursor-pointer"
              >
                • Nihari & Haleem
              </button>
              <button
                onClick={() => onSelectCategory('bbq')}
                className="hover:text-[#f3c64c] text-left transition-colors cursor-pointer"
              >
                • Charcoal BBQ
              </button>
              <button
                onClick={() => onSelectCategory('breads')}
                className="hover:text-[#f3c64c] text-left transition-colors cursor-pointer"
              >
                • Tandoor & Breads
              </button>
              <button
                onClick={() => onSelectCategory('desserts')}
                className="hover:text-[#f3c64c] text-left transition-colors cursor-pointer"
              >
                • Desserts & Drinks
              </button>
            </div>
          </div>

          {/* Direct Delivery Support (Cols 9-12) */}
          <div className="md:col-span-3 space-y-2.5 bg-[#092115] p-4 rounded-2xl border border-[#d4af37]/20">
            <h4 className="text-xs font-bold text-[#f7e29b] uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Delivery Hours</span>
            </h4>
            <p className="text-xs text-white font-semibold">12:00 PM – 02:00 AM Daily</p>
            
            <a
              href="tel:+9242111774233"
              className="flex items-center gap-2 text-xs font-bold text-[#f3c64c] hover:underline pt-1"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>042-111-774-233 (Hotline)</span>
            </a>

            <button
              onClick={onOpenOrder}
              className="mt-2 w-full py-2 bg-gradient-to-r from-[#d4af37] to-[#b3861c] text-[#07190f] font-bold text-xs rounded-xl hover:brightness-110 transition-all cursor-pointer shadow-md"
            >
              Order Food Now
            </button>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#e7dfca]/60">
          <p>© {new Date().getFullYear()} Spice District — Pakistani Restaurant Ordering System.</p>
          
          <div className="flex items-center gap-2 text-[11px] font-semibold text-stone-300 flex-wrap justify-center">
            <span>Payment:</span>
            <span className="px-2 py-0.5 rounded bg-[#0e2a1b] border border-[#d4af37]/20">Cash on Delivery (COD)</span>
            <span className="px-2 py-0.5 rounded bg-[#0e2a1b] border border-[#d4af37]/20">JazzCash</span>
            <span className="px-2 py-0.5 rounded bg-[#0e2a1b] border border-[#d4af37]/20">EasyPaisa</span>
            <span className="px-2 py-0.5 rounded bg-[#0e2a1b] border border-[#d4af37]/20">Cards</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
