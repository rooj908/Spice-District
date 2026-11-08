import React from 'react';
import { ShoppingBag, Phone, Clock, Flame, Utensils, BookOpen } from 'lucide-react';
import { CartItem } from '../types/restaurant';

interface NavbarProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onNavigateMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cart,
  onOpenCart,
  onNavigateMenu,
}) => {
  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-[#07190f]/95 backdrop-blur-md border-b border-[#d4af37]/20 shadow-xl">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-[#0d2a1c] via-[#16402d] to-[#0d2a1c] text-[#f7e29b] text-xs py-1.5 px-4 text-center border-b border-[#d4af37]/15 font-medium flex items-center justify-center gap-2 sm:gap-6 flex-wrap">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-emerald-300 font-semibold">Open for Delivery</span> • 12:00 PM – 02:00 AM
        </span>
        <span className="hidden sm:inline text-white/30">|</span>
        <span className="flex items-center gap-1 text-[#fcfaf4]">
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          <span>FREE Delivery on Orders Above <strong>Rs. 2,500</strong></span>
        </span>
        <span className="hidden sm:inline text-white/30">|</span>
        
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3.5 group text-left cursor-pointer focus:outline-none"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d4af37] via-[#f3c64c] to-[#997316] p-0.5 shadow-lg group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-[#081a10] rounded-[10px] flex items-center justify-center">
              <Utensils className="w-6 h-6 text-[#d4af37]" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl sm:text-2xl font-bold tracking-wider text-[#fcfaf4] group-hover:text-[#f3c64c] transition-colors">
                SPICE DISTRICT
              </span>
              <span className="text-xs text-[#d4af37] font-semibold tracking-widest hidden sm:inline">
                اسپائس ڈسٹرکٹ
              </span>
            </div>
            <p className="text-[11px] text-[#e7dfca]/70 tracking-wider uppercase font-medium">
              Authentic Pakistani Restaurant
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="flex items-center gap-4 sm:gap-7 text-sm font-medium text-[#e7dfca]">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-[#f3c64c] transition-colors cursor-pointer font-semibold"
          >
            Home
          </button>
          <button
            onClick={onNavigateMenu}
            className="hover:text-[#f3c64c] transition-colors cursor-pointer font-semibold"
          >
            Food Menu
          </button>
          
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Quick Call */}
          <a
            href="tel:+9242111774233"
            className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#d4af37]/30 text-xs font-medium text-[#f7e29b] hover:bg-[#d4af37]/10 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>042-111-774-233</span>
          </a>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            aria-label="View Shopping Cart"
            className="relative flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-[#d4af37] via-[#e2b740] to-[#b3861c] text-[#07190f] px-4 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-[#d4af37]/20 hover:brightness-110 active:scale-95 transition-all cursor-pointer group"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-[#07190f]" />
              {totalItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center animate-bounce shadow">
                  {totalItemCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline">Cart</span>
            {totalItemCount > 0 && (
              <span className="text-xs font-extrabold bg-[#07190f]/15 px-2 py-0.5 rounded-md border border-[#07190f]/20">
                Rs. {cartSubtotal.toLocaleString()}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

