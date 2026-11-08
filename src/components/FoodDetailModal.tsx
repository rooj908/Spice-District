import React, { useState } from 'react';
import { X, Plus, Minus, Flame, Sparkles, Clock, Users, Check, ShoppingBag } from 'lucide-react';
import { MenuItem, SpicyLevel } from '../types/restaurant';

interface FoodDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCartWithOptions: (item: MenuItem, quantity: number, spicyLevel: SpicyLevel, notes: string) => void;
}

export const FoodDetailModal: React.FC<FoodDetailModalProps> = ({
  item,
  onClose,
  onAddToCartWithOptions,
}) => {
  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedSpicy, setSelectedSpicy] = useState<SpicyLevel>(item.spicyLevel);
  const [specialNotes, setSpecialNotes] = useState('');

  const spicyOptions: { level: SpicyLevel; label: string; icon: string; desc: string }[] = [
    { level: 'Mild', label: 'Mild', icon: '🌶️', desc: 'Gentle aromatic spices, family-friendly' },
    { level: 'Medium', label: 'Medium', icon: '🌶️🌶️', desc: 'Balanced Pakistani warmth' },
    { level: 'Hot', label: 'Hot', icon: '🌶️🌶️🌶️', desc: 'Authentic bazaar spice punch' },
    { level: 'Extra Spicy', label: 'Desi Fiery', icon: '🌶️🌶️🌶️🌶️', desc: 'Extra green chilies & black pepper' },
  ];

  const handleConfirm = () => {
    onAddToCartWithOptions(item, quantity, selectedSpicy, specialNotes);
    onClose();
  };

  const totalPrice = item.price * quantity;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#081f14] border border-[#d4af37]/40 rounded-3xl overflow-hidden shadow-2xl text-[#fdfaf3] my-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-[#d4af37] text-white hover:text-[#07190f] flex items-center justify-center backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Image */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#07190f]">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#081f14] via-[#081f14]/30 to-transparent" />
          
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {item.isBestseller && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#d4af37] text-[#07190f] shadow-md flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Bestseller
              </span>
            )}
            {item.isChefSpecial && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#164e2e] text-[#f7e29b] border border-[#d4af37]/40 shadow-md">
                👑 Royal Recipe
              </span>
            )}
            {item.isDesiGhee && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-600 text-white shadow-md">
                🧈 Pure Desi Ghee
              </span>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Title and Urdu heading */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#fdfaf3] font-heading">
                {item.name}
              </h2>
              <span className="text-sm font-bold text-[#d4af37] font-sans">
                {item.urduName}
              </span>
            </div>
            <p className="mt-2 text-sm text-[#e7dfca]/80 leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-[#0d2a1c] p-3.5 rounded-2xl border border-[#d4af37]/20 text-xs text-[#e7dfca]">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#d4af37]" />
              <span><strong>Portion:</strong> {item.servingSize}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#d4af37]" />
              <span><strong>Prep Time:</strong> {item.prepTime}</span>
            </div>
            <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
              <Flame className="w-4 h-4 text-amber-400" />
              <span><strong>Cooking:</strong> Traditional Clay/Coal</span>
            </div>
          </div>

          {/* Ingredients Pill List */}
          <div>
            <h4 className="text-xs uppercase font-bold text-[#f7e29b] tracking-wider mb-2">
              Authentic Ingredients
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {item.ingredients.map((ing, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-xs bg-[#07190f] text-[#e7dfca]/90 border border-[#d4af37]/25"
                >
                  ✓ {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Spice Preference Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs uppercase font-bold text-[#f7e29b] tracking-wider">
                Select Your Desired Spiciness
              </h4>
              <span className="text-xs text-[#d4af37] font-medium">Customizable</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {spicyOptions.map(opt => {
                const isSelected = selectedSpicy === opt.level;
                return (
                  <button
                    key={opt.level}
                    type="button"
                    onClick={() => setSelectedSpicy(opt.level)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#16402d] border-[#d4af37] ring-1 ring-[#d4af37] text-white shadow-md'
                        : 'bg-[#092115] border-[#d4af37]/20 text-[#e7dfca]/75 hover:border-[#d4af37]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">{opt.icon}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#d4af37]" />}
                    </div>
                    <p className="text-xs font-bold text-white">{opt.label}</p>
                    <p className="text-[10px] text-[#e7dfca]/60 leading-tight mt-0.5">{opt.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Special Cooking Instructions */}
          <div>
            <label className="block text-xs uppercase font-bold text-[#f7e29b] tracking-wider mb-1.5">
              Special Cooking Instructions (Optional)
            </label>
            <input
              type="text"
              value={specialNotes}
              onChange={e => setSpecialNotes(e.target.value)}
              placeholder="e.g., Extra green chili tarka, crispy naan, less oil, raita on the side..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#07190f] border border-[#d4af37]/30 text-white placeholder-[#e7dfca]/40 text-xs sm:text-sm focus:outline-none focus:border-[#d4af37]"
            />
          </div>

          {/* Action Row: Quantity + Add to Cart */}
          <div className="pt-4 border-t border-[#d4af37]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Quantity Controller */}
            <div className="flex items-center justify-between w-full sm:w-auto gap-3">
              <span className="text-xs text-[#e7dfca]/70 font-semibold uppercase sm:hidden">Quantity:</span>
              <div className="flex items-center bg-[#07190f] border border-[#d4af37]/40 rounded-xl p-1 shadow-inner">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 rounded-lg bg-[#16402d] hover:bg-[#205b40] text-[#f7e29b] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-bold text-base text-white">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 rounded-lg bg-[#d4af37] hover:bg-[#e2b740] text-[#07190f] flex items-center justify-center font-bold transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Total & Submit Button */}
            <button
              type="button"
              onClick={handleConfirm}
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-3 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e2b740] to-[#b3861c] text-[#07190f] font-bold text-base shadow-xl shadow-[#d4af37]/25 hover:brightness-110 active:scale-98 transition-all cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Add to Cart • Rs. {totalPrice.toLocaleString()}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
