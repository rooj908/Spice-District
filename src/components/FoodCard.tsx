import React from 'react';
import { Plus, Minus, Flame, Sparkles, Clock, Users, Eye } from 'lucide-react';
import { MenuItem, CartItem } from '../types/restaurant';
import { FoodItem } from '../models';

interface FoodCardProps {
  item: MenuItem;
  cartItem?: CartItem;
  onAddToCart: (item: MenuItem) => void;
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onOpenDetails: (item: MenuItem) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({
  item,
  cartItem,
  onAddToCart,
  onUpdateQuantity,
  onOpenDetails,
}) => {
  const getSpicyBadge = (level: MenuItem['spicyLevel']) => {
    switch (level) {
      case 'Mild':
        return { text: 'Mild', color: 'bg-emerald-950/80 text-emerald-300 border-emerald-700/50', chilies: '🌶️' };
      case 'Medium':
        return { text: 'Medium', color: 'bg-amber-950/80 text-amber-300 border-amber-700/50', chilies: '🌶️🌶️' };
      case 'Hot':
        return { text: 'Hot & Spicy', color: 'bg-orange-950/80 text-orange-300 border-orange-700/50', chilies: '🌶️🌶️🌶️' };
      case 'Extra Spicy':
        return { text: 'Desi Fiery', color: 'bg-red-950/80 text-red-300 border-red-700/50', chilies: '🌶️🌶️🌶️🌶️' };
      default:
        return { text: 'Mild', color: 'bg-emerald-950/80 text-emerald-300 border-emerald-700/50', chilies: '🌶️' };
    }
  };

  const spicyInfo = getSpicyBadge(item.spicyLevel);

  return (
    <div className="group relative bg-[#092115] rounded-2xl overflow-hidden border border-[#d4af37]/25 hover:border-[#d4af37]/70 shadow-lg hover:shadow-2xl hover:shadow-[#0c2f1f]/80 transition-all duration-300 flex flex-col justify-between">
      {/* Image Container with Badges */}
      <div className="relative h-52 sm:h-56 overflow-hidden bg-[#07190f]">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        
        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#092115] via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {item.isBestseller && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#d4af37] text-[#07190f] shadow-md">
              <Sparkles className="w-3 h-3 fill-current" />
              Bestseller
            </span>
          )}
          {item.isChefSpecial && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#164e2e] text-[#f7e29b] border border-[#d4af37]/40 shadow-md">
              👑 Chef's Special
            </span>
          )}
          {item.isDesiGhee && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#332205]/90 text-amber-300 border border-amber-600/50 shadow-md">
              🧈 Desi Ghee
            </span>
          )}
        </div>

        {/* Quick View Button */}
        <button
          onClick={() => onOpenDetails(item)}
          aria-label={`View details of ${item.name}`}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#07190f]/80 hover:bg-[#d4af37] text-white hover:text-[#07190f] flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all opacity-0 group-hover:opacity-100 cursor-pointer shadow-lg"
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Spicy Indicator Tag */}
        <div className="absolute bottom-2.5 right-3">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold border backdrop-blur-md ${spicyInfo.color}`}>
            <span>{spicyInfo.chilies}</span>
            <span>{spicyInfo.text}</span>
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Header & Urdu Script */}
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-bold text-base sm:text-lg text-[#fdfaf3] group-hover:text-[#f3c64c] transition-colors leading-snug">
              {item.name}
            </h3>
            <span className="text-xs text-[#d4af37] font-semibold tracking-wider font-sans whitespace-nowrap pt-0.5">
              {item.urduName}
            </span>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-[13px] text-[#e7dfca]/75 line-clamp-2 leading-relaxed mb-3">
            {item.description}
          </p>

          {/* Portion and Prep Time Meta */}
          <div className="flex items-center gap-3 text-[11px] text-[#e7dfca]/60 mb-4 pb-3 border-b border-[#d4af37]/15">
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-[#d4af37]" />
              {item.servingSize}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
              {item.prepTime}
            </span>
          </div>
        </div>

        {/* Pricing & Cart Action Button */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[#e7dfca]/60 font-semibold">
              Price
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg sm:text-xl font-extrabold text-[#f3c64c] font-sans">
                {item instanceof FoodItem ? item.formattedPrice : `Rs. ${item.price.toLocaleString()}`}
              </span>
              {item.originalPrice && (
                <span className="text-xs text-[#e7dfca]/40 line-through">
                  Rs. {item.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          {/* Interactive Button */}
          {cartItem ? (
            <div className="flex items-center bg-[#07190f] border border-[#d4af37]/50 rounded-xl p-1 shadow-inner">
              <button
                onClick={() => onUpdateQuantity(cartItem.id, cartItem.quantity - 1)}
                className="w-7 h-7 rounded-lg bg-[#16402d] hover:bg-[#205b40] text-[#f7e29b] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-7 text-center font-bold text-xs text-[#fdfaf3]">
                {cartItem.quantity}
              </span>
              <button
                onClick={() => onUpdateQuantity(cartItem.id, cartItem.quantity + 1)}
                className="w-7 h-7 rounded-lg bg-[#d4af37] hover:bg-[#e2b740] text-[#07190f] flex items-center justify-center font-bold transition-colors cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => onAddToCart(item)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b3861c] hover:brightness-110 active:scale-95 text-[#07190f] font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer group/btn"
            >
              <Plus className="w-4 h-4 group-hover/btn:rotate-90 transition-transform duration-200" />
              <span>Add to Cart</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
