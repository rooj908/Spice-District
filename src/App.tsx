/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SPICE DISTRICT - AUTHENTIC PAKISTANI RESTAURANT ORDERING SYSTEM
 * INTEGRATING OBJECT-ORIENTED PROGRAMMING (OOP) ARCHITECTURE:
 * 1. Class & Object: FoodItem, Cart, Customer, RestaurantOrder
 * 2. Constructor: Initialization of domain models
 * 3. Encapsulation: Private state and business logic in Cart, Customer, Order
 * 4. Inheritance & super(): DesiSpecialtyFoodItem, BeverageFoodItem, RestaurantOrder
 * 5. Multiple Inheritance: Interfaces IHalalCertified, IClaypotCooked, IPrintable, ITrackable
 * 6. Method Overriding: Serving descriptions, receipt generation, delivery status
 * 7. Polymorphism: PaymentMethod hierarchy (CashOnDelivery, JazzCashPayment, CardPayment)
 * 8. Abstraction: BaseOrder, PaymentMethod abstract classes
 */

import React, { useState, useEffect, useMemo } from 'react';
import { MenuItem, CategoryId, CartItem, CustomerInfo, Order, ToastMessage, SpicyLevel } from './types/restaurant';
import { MENU_ITEMS } from './data/menuData';
import { Cart, Customer, RestaurantOrder, PaymentMethodFactory } from './models';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { FoodDetailModal } from './components/FoodDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';

const LOCAL_STORAGE_CART_KEY = 'spice_district_cart_v1';

export default function App() {
  // Cart items state initialized from localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading cart from localStorage', e);
    }
    return [];
  });

  // UI state
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeDetailItem, setActiveDetailItem] = useState<MenuItem | null>(null);
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);

  // Promo code discounts state
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // OOP Encapsulation: Active Cart model instance managing subtotal, fees, and discounts
  const cartModel = useMemo(() => new Cart(cart, appliedCoupon), [cart, appliedCoupon]);

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }, [cart]);

  // Toast notification helper
  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const handleDismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // --- Add Item to Cart (Delegating to OOP Cart model) ---
  const handleAddToCart = (item: MenuItem, quantity = 1, spicyLevel: SpicyLevel = item.spicyLevel, notes = '') => {
    const currentCart = new Cart(cart, appliedCoupon);
    currentCart.addItem(item, quantity, spicyLevel, notes);
    setCart(currentCart.toJSON());
    showToast(`Added ${item.name} to cart!`);
  };

  // --- Update Item Quantity (Delegating to OOP Cart model) ---
  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    const currentCart = new Cart(cart, appliedCoupon);
    currentCart.updateQuantity(cartItemId, newQty);
    setCart(currentCart.toJSON());
  };

  // --- Remove Item from Cart (Delegating to OOP Cart model) ---
  const handleRemoveCartItem = (cartItemId: string) => {
    const itemToRemove = cart.find(i => i.id === cartItemId);
    const currentCart = new Cart(cart, appliedCoupon);
    currentCart.removeItem(cartItemId);
    setCart(currentCart.toJSON());
    if (itemToRemove) {
      showToast(`Removed ${itemToRemove.menuItem.name} from cart`, 'info');
    }
  };

  // --- Clear Cart (Delegating to OOP Cart model) ---
  const handleClearCart = () => {
    const currentCart = new Cart(cart, appliedCoupon);
    currentCart.clear();
    setCart([]);
    setAppliedCoupon(null);
    showToast('Your cart has been cleared', 'info');
  };

  // --- Coupon apply (Delegating to OOP Cart model) ---
  const handleApplyCoupon = (code: string): boolean => {
    const currentCart = new Cart(cart, appliedCoupon);
    const result = currentCart.applyCoupon(code);
    if (result.success) {
      setAppliedCoupon(code.trim().toUpperCase());
      showToast(result.message, 'success');
      return true;
    } else {
      showToast(result.message, 'error');
      return false;
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  // --- Place Order (OOP Object Instantiation, Inheritance, and Polymorphism) ---
  const handlePlaceOrder = (customerInfo: CustomerInfo) => {
    // 1. Instantiate Customer OOP Object (Encapsulation & Validation)
    const customer = new Customer(
      customerInfo.fullName,
      customerInfo.phone,
      customerInfo.city,
      customerInfo.area,
      customerInfo.deliveryAddress,
      customerInfo.nearestLandmark,
      customerInfo.orderNotes,
      customerInfo.paymentMethod
    );

    // 2. Polymorphic Payment Processing via Factory
    const paymentMethodInstance = PaymentMethodFactory.create(customer.paymentMethod);
    const paymentResult = paymentMethodInstance.processPayment(cartModel.grandTotal);

    // 3. Instantiate RestaurantOrder OOP Object (Abstraction, Inheritance & Polymorphism)
    const orderInstance = new RestaurantOrder(
      customer,
      cartModel.items,
      cartModel.subtotal,
      cartModel.deliveryFee,
      cartModel.packagingFee,
      cartModel.discount,
      cartModel.grandTotal
    );

    // Pass data to React state
    setLatestOrder(orderInstance.toOrderData());
    setIsCheckoutOpen(false);
    setIsCartOpen(false);

    // Empty cart and clear promo
    setCart([]);
    setAppliedCoupon(null);

    showToast(`Order #${orderInstance.orderId} confirmed! ${paymentResult.message}`, 'success');
  };

  // Navigation scroll helper
  const scrollToMenu = () => {
    const el = document.getElementById('food-menu-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#081a10] text-[#f7f2e7] flex flex-col selection:bg-[#d4af37]/30 selection:text-[#f7e29b]">
      {/* 1. Header Navigation */}
      <Navbar
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigateMenu={scrollToMenu}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* 1. Home / Restaurant Banner */}
        <Hero
          onOrderNow={scrollToMenu}
          onSelectCategory={(catId: CategoryId) => {
            setSelectedCategory(catId);
            scrollToMenu();
          }}
        />

        {/* 2. Food Menu */}
        <MenuSection
          menuItems={MENU_ITEMS}
          cart={cart}
          selectedCategory={selectedCategory}
          onSelectCategory={cat => setSelectedCategory(cat)}
          onAddToCart={item => handleAddToCart(item)}
          onUpdateQuantity={handleUpdateQuantity}
          onOpenDetails={item => setActiveDetailItem(item)}
        />
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={cat => {
          setSelectedCategory(cat);
          scrollToMenu();
        }}
        onOpenOrder={scrollToMenu}
      />

      {/* 3. Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        appliedDiscount={cartModel.discount}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={handleRemoveCoupon}
      />

      {/* Food Item Customization & Details Modal */}
      <FoodDetailModal
        item={activeDetailItem}
        onClose={() => setActiveDetailItem(null)}
        onAddToCartWithOptions={(item, qty, spicy, notes) => {
          handleAddToCart(item, qty, spicy, notes);
        }}
      />

      {/* 4. Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        subtotal={cartModel.subtotal}
        deliveryFee={cartModel.deliveryFee}
        packagingFee={cartModel.packagingFee}
        discount={cartModel.discount}
        grandTotal={cartModel.grandTotal}
        onPlaceOrder={handlePlaceOrder}
      />

      {/* 5. Order Confirmation Screen */}
      <OrderConfirmationModal
        order={latestOrder}
        onClose={() => setLatestOrder(null)}
        onNewOrder={() => {
          setLatestOrder(null);
          scrollToMenu();
        }}
      />

      {/* Toast Feedback Notifications */}
      <Toast toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}
