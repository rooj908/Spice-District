import React from 'react';
import { Sparkles, Utensils, ShieldCheck, Flame, ArrowRight, Clock, MapPin } from 'lucide-react';

interface HeroProps {
  onOrderNow: () => void;
  onSelectCategory: (catId: any) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderNow, onSelectCategory }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 border-b border-[#d4af37]/15">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#113824] via-[#091c12] to-[#05110a] -z-10" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 -left-40 w-96 h-96 bg-[#164e2e]/40 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Brand Copy & Call to Action */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Heritage Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16402d]/70 border border-[#d4af37]/30 text-[#f7e29b] text-xs font-semibold tracking-wide shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>AUTHENTIC LAHORI & KARACHI FLAVOURS</span>
              <span className="hidden sm:inline text-white/40">•</span>
              <span className="hidden sm:inline text-emerald-300">100% Halal Certified</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#fdfaf3] leading-[1.15]">
              Taste The Real Soul Of{' '}
              <span className="block font-heading italic text-transparent bg-clip-text bg-gradient-to-r from-[#fce293] via-[#d4af37] to-[#e5a93c]">
                Pakistani Cuisine
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#e7dfca]/80 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              From overnight slow-simmered <strong>Nalli Nihari</strong> and aromatic <strong>Sindhi Dum Biryani</strong> to fiery cast-iron <strong>Shinwari Karahi</strong> and smoking <strong>Charcoal BBQ</strong>. Prepared with pure desi ghee and heirloom masalas.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOrderNow}
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e2b740] to-[#b3861c] text-[#07190f] font-bold text-base shadow-xl shadow-[#d4af37]/25 hover:brightness-110 active:scale-98 transition-all cursor-pointer group"
              >
                <span>Order Now (Online Delivery)</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('food-menu-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#0d2a1c] hover:bg-[#16402d] border border-[#d4af37]/40 text-[#f7e29b] font-semibold text-base transition-all cursor-pointer"
              >
                <Utensils className="w-4 h-4 text-[#d4af37]" />
                <span>Explore Full Menu</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[#d4af37]/15">
              <div className="flex items-center gap-2.5 text-left">
                <div className="w-8 h-8 rounded-lg bg-[#16402d] flex items-center justify-center text-[#d4af37]">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#fdfaf3]">Charcoal Grilled</p>
                  <p className="text-[10px] text-[#e7dfca]/60">Live Coal Pit</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-left">
                <div className="w-8 h-8 rounded-lg bg-[#16402d] flex items-center justify-center text-[#d4af37]">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#fdfaf3]">35-45 Min</p>
                  <p className="text-[10px] text-[#e7dfca]/60">Piping Hot Delivery</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-left">
                <div className="w-8 h-8 rounded-lg bg-[#16402d] flex items-center justify-center text-[#d4af37]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#fdfaf3]">100% Halal</p>
                  <p className="text-[10px] text-[#e7dfca]/60">Hand-slaughtered</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-left">
                <div className="w-8 h-8 rounded-lg bg-[#16402d] flex items-center justify-center text-[#d4af37]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#fdfaf3]">Lahore & Karachi</p>
                  <p className="text-[10px] text-[#e7dfca]/60">Delivery Across City</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Food Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Banner Card */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-[#d4af37]/40 shadow-2xl bg-[#091f13] group">
                <img
                  src="/images/food/sindhi-mutton-biryani.jpg"
                  alt="Authentic Pakistani Sindhi Biryani and Feast"
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06170e] via-[#06170e]/40 to-transparent" />
                
                {/* Floating Special Badge */}
                <div className="absolute top-4 left-4 bg-[#0a2316]/90 backdrop-blur-md border border-[#d4af37]/50 rounded-xl px-3.5 py-2 shadow-xl flex items-center gap-2">
                  <span className="text-lg">👑</span>
                  <div>
                    <p className="text-[11px] font-bold text-[#fce293] uppercase tracking-wider">Chef's Signature</p>
                    <p className="text-xs font-bold text-white">Sindhi Royal Mutton Biryani</p>
                  </div>
                </div>

                {/* Rating & Price Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#0b2617]/95 backdrop-blur-md border border-[#d4af37]/30 rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-[#d4af37] font-semibold">Special Dum Handi</span>
                      <h3 className="text-base font-bold text-white">Made with Pure Desi Ghee</h3>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-stone-400 line-through">Rs. 1,850</span>
                      <div className="text-lg font-extrabold text-[#f3c64c]">Rs. 1,650</div>
                    </div>
                  </div>
                  <button
                    onClick={onOrderNow}
                    className="mt-3 w-full py-2 bg-gradient-to-r from-[#d4af37] to-[#b3861c] text-[#07190f] font-bold text-xs uppercase tracking-wider rounded-lg hover:brightness-110 transition-all cursor-pointer"
                  >
                    Quick Add to Order
                  </button>
                </div>
              </div>

              {/* Decorative mini badge 1: Nihari & Haleem */}
              <div
                onClick={() => onSelectCategory('curries')}
                className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 bg-[#0a2316]/95 border border-[#d4af37]/40 rounded-2xl p-3 shadow-2xl cursor-pointer hover:border-[#d4af37] transition-all transform hover:-translate-y-1"
              >
                <img
                  src="/images/food/nalli-nihari-shahi.jpg"
                  alt="Nalli Nihari"
                  className="w-12 h-12 rounded-xl object-cover border border-[#d4af37]/40"
                />
                <div>
                  <p className="text-[10px] text-[#f7e29b] font-bold uppercase tracking-wider">12-Hour Simmer</p>
                  <p className="text-xs font-bold text-white">Royal Nalli Nihari</p>
                  <p className="text-[11px] text-[#d4af37] font-extrabold">Rs. 1,750</p>
                </div>
              </div>

              {/* Decorative mini badge 2: BBQ Tikka */}
              <div
                onClick={() => onSelectCategory('bbq')}
                className="absolute -top-6 -right-4 hidden sm:flex items-center gap-3 bg-[#0a2316]/95 border border-[#d4af37]/40 rounded-2xl p-3 shadow-2xl cursor-pointer hover:border-[#d4af37] transition-all transform hover:-translate-y-1"
              >
                <img
                  src="/images/food/seekh-kebab-beef.jpg"
                  alt="Seekh Kebab"
                  className="w-12 h-12 rounded-xl object-cover border border-[#d4af37]/40"
                />
                <div>
                  <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Coal Grilled</p>
                  <p className="text-xs font-bold text-white">Beef Seekh Kebab</p>
                  <p className="text-[11px] text-[#d4af37] font-extrabold">Rs. 1,250</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
