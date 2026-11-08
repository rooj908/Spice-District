import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Flame, SlidersHorizontal, UtensilsCrossed, X } from 'lucide-react';
import { MenuItem, CategoryId, CartItem } from '../types/restaurant';
import { CATEGORIES } from '../data/menuData';
import { FoodCard } from './FoodCard';

interface MenuSectionProps {
  menuItems: MenuItem[];
  cart: CartItem[];
  selectedCategory: CategoryId;
  onSelectCategory: (category: CategoryId) => void;
  onAddToCart: (item: MenuItem) => void;
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onOpenDetails: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  menuItems,
  cart,
  selectedCategory,
  onSelectCategory,
  onAddToCart,
  onUpdateQuantity,
  onOpenDetails,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBestsellerOnly, setFilterBestsellerOnly] = useState(false);
  const [filterDesiGheeOnly, setFilterDesiGheeOnly] = useState(false);
  const [filterChefSpecialOnly, setFilterChefSpecialOnly] = useState(false);

  // Cart item map for quick lookup
  const cartItemMap = useMemo(() => {
    const map = new Map<string, CartItem>();
    cart.forEach(item => {
      map.set(item.menuItem.id, item);
    });
    return map;
  }, [cart]);

  // Filtered menu items
  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Search query (matches English name, Urdu name, description, ingredients, tags)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesUrdu = item.urduName.includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesIngredients = item.ingredients.some(ing => ing.toLowerCase().includes(query));
        const matchesTags = item.tags.some(tag => tag.toLowerCase().includes(query));

        if (!matchesName && !matchesUrdu && !matchesDesc && !matchesIngredients && !matchesTags) {
          return false;
        }
      }

      // Feature filters
      if (filterBestsellerOnly && !item.isBestseller) return false;
      if (filterDesiGheeOnly && !item.isDesiGhee) return false;
      if (filterChefSpecialOnly && !item.isChefSpecial) return false;

      return true;
    });
  }, [menuItems, selectedCategory, searchQuery, filterBestsellerOnly, filterDesiGheeOnly, filterChefSpecialOnly]);

  return (
    <section id="food-menu-section" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16402d] border border-[#d4af37]/30 text-[#f7e29b] text-xs font-semibold tracking-wider uppercase mb-3">
          <UtensilsCrossed className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>Freshly Prepared Upon Order</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#fdfaf3] font-heading tracking-tight">
          Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fce293] to-[#d4af37]">Royal Dastarkhwan</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#e7dfca]/80">
          Handcrafted dishes cooked slow in traditional clay matkas, iron karahis, and coal pits.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 gap-2.5 scrollbar-none no-scrollbar mb-8">
        {CATEGORIES.map(cat => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id as CategoryId)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#b3861c] text-[#07190f] shadow-lg shadow-[#d4af37]/20 scale-102'
                  : 'bg-[#0d2a1c] text-[#e7dfca] hover:bg-[#16402d] hover:text-white border border-[#d4af37]/20'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[11px] opacity-80 ${isActive ? 'text-[#07190f]' : 'text-[#d4af37]'}`}>
                {cat.urduLabel}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search and Secondary Quick Filter Controls */}
      <div className="bg-[#092115] border border-[#d4af37]/20 rounded-2xl p-4 sm:p-5 mb-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#d4af37]" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search Biryani, Karahi, Nihari, Kebab, Tikka, Haleem..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#07190f] border border-[#d4af37]/30 text-white placeholder-[#e7dfca]/50 text-sm focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Filter Badges */}
        <div className="flex items-center gap-2 flex-wrap w-full md:w-auto justify-start md:justify-end">
          <span className="text-xs text-[#e7dfca]/60 flex items-center gap-1 mr-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#d4af37]" /> Filter:
          </span>

          <button
            onClick={() => setFilterBestsellerOnly(!filterBestsellerOnly)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              filterBestsellerOnly
                ? 'bg-[#d4af37] text-[#07190f] border-[#d4af37]'
                : 'bg-[#07190f] text-[#e7dfca] border-[#d4af37]/30 hover:border-[#d4af37]'
            }`}
          >
            🔥 Bestsellers
          </button>

          <button
            onClick={() => setFilterChefSpecialOnly(!filterChefSpecialOnly)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              filterChefSpecialOnly
                ? 'bg-[#164e2e] text-[#f7e29b] border-[#d4af37]'
                : 'bg-[#07190f] text-[#e7dfca] border-[#d4af37]/30 hover:border-[#d4af37]'
            }`}
          >
            👑 Chef Special
          </button>

          <button
            onClick={() => setFilterDesiGheeOnly(!filterDesiGheeOnly)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              filterDesiGheeOnly
                ? 'bg-amber-600 text-white border-amber-500'
                : 'bg-[#07190f] text-[#e7dfca] border-[#d4af37]/30 hover:border-[#d4af37]'
            }`}
          >
            🧈 Desi Ghee
          </button>
        </div>
      </div>

      {/* Results Count & Current Scope */}
      <div className="flex items-center justify-between mb-6 px-1">
        <p className="text-xs sm:text-sm text-[#e7dfca]/75">
          Showing <span className="font-bold text-[#f3c64c]">{filteredItems.length}</span> authentic Pakistani culinary delights
        </p>
        {(searchQuery || filterBestsellerOnly || filterChefSpecialOnly || filterDesiGheeOnly) && (
          <button
            onClick={() => {
              setSearchQuery('');
              setFilterBestsellerOnly(false);
              setFilterChefSpecialOnly(false);
              setFilterDesiGheeOnly(false);
              onSelectCategory('all');
            }}
            className="text-xs text-[#d4af37] hover:underline cursor-pointer"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* Food Items Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map(item => (
            <FoodCard
              key={item.id}
              item={item}
              cartItem={cartItemMap.get(item.id)}
              onAddToCart={onAddToCart}
              onUpdateQuantity={onUpdateQuantity}
              onOpenDetails={onOpenDetails}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#092115] rounded-3xl border border-[#d4af37]/20 p-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#16402d] flex items-center justify-center text-[#d4af37]">
            <UtensilsCrossed className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No Matching Delicacies Found</h3>
          <p className="text-sm text-[#e7dfca]/70 max-w-md mx-auto mb-6">
            We couldn't find any dishes matching "{searchQuery}". Try searching for Biryani, Karahi, Nihari, or Tikka!
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setFilterBestsellerOnly(false);
              setFilterChefSpecialOnly(false);
              setFilterDesiGheeOnly(false);
              onSelectCategory('all');
            }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b3861c] text-[#07190f] font-bold text-sm cursor-pointer shadow-md"
          >
            View Full Menu
          </button>
        </div>
      )}
    </section>
  );
};
