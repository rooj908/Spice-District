/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * OBJECT-ORIENTED PROGRAMMING CONCEPTS DEMONSTRATED:
 * 1. Class & Object: Cart class managing complex restaurant shopping cart operations
 * 2. Constructor: Initializes cart with optional pre-existing items and promo codes
 * 3. Encapsulation: Private items list, coupon rules, and fee constants managed through public business methods
 */

import { CartItem, MenuItem, SpicyLevel } from '../types/restaurant';

export class Cart {
  private _items: CartItem[];
  private _appliedCoupon: string | null;

  // Restaurant Business Policy Constants (Encapsulated)
  private readonly FREE_DELIVERY_THRESHOLD: number = 2500;
  private readonly STANDARD_DELIVERY_FEE: number = 200;
  private readonly PACKAGING_FEE: number = 90;

  /**
   * Constructor initializing cart state
   */
  constructor(initialItems: CartItem[] = [], initialCoupon: string | null = null) {
    this._items = [...initialItems];
    this._appliedCoupon = initialCoupon;
  }

  // --- Encapsulation: Read-only Accessors ---
  public get items(): CartItem[] {
    return [...this._items];
  }

  public get appliedCoupon(): string | null {
    return this._appliedCoupon;
  }

  public get totalItemsCount(): number {
    return this._items.reduce((sum, item) => sum + item.quantity, 0);
  }

  public get subtotal(): number {
    return this._items.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
  }

  public get deliveryFee(): number {
    if (this.subtotal === 0 || this.subtotal >= this.FREE_DELIVERY_THRESHOLD) {
      return 0; // Free delivery for orders >= Rs. 2,500
    }
    return this.STANDARD_DELIVERY_FEE;
  }

  public get packagingFee(): number {
    return this.subtotal > 0 ? this.PACKAGING_FEE : 0;
  }

  public get discount(): number {
    if (!this._appliedCoupon || this.subtotal === 0) return 0;

    switch (this._appliedCoupon) {
      case 'SPICE10':
        // 10% discount on food subtotal
        return Math.round(this.subtotal * 0.1);
      case 'FEAST250':
        // Flat Rs. 250 off
        return Math.min(this.subtotal, 250);
      case 'WELCOME':
        // Flat Rs. 150 off
        return Math.min(this.subtotal, 150);
      default:
        return 0;
    }
  }

  public get grandTotal(): number {
    return Math.max(0, this.subtotal + this.deliveryFee + this.packagingFee - this.discount);
  }

  public get amountNeededForFreeDelivery(): number {
    return Math.max(0, this.FREE_DELIVERY_THRESHOLD - this.subtotal);
  }

  public get freeDeliveryProgress(): number {
    if (this.subtotal === 0) return 0;
    return Math.min(100, (this.subtotal / this.FREE_DELIVERY_THRESHOLD) * 100);
  }

  // --- Cart Mutation Methods ---
  public addItem(
    menuItem: MenuItem,
    quantity: number = 1,
    spicyLevel: SpicyLevel = menuItem.spicyLevel,
    notes: string = ''
  ): CartItem {
    const existingIndex = this._items.findIndex(
      item =>
        item.menuItem.id === menuItem.id &&
        item.spicyLevel === spicyLevel &&
        (!notes || item.specialNotes === notes)
    );

    if (existingIndex > -1) {
      this._items[existingIndex] = {
        ...this._items[existingIndex],
        quantity: this._items[existingIndex].quantity + quantity,
      };
      return this._items[existingIndex];
    } else {
      const newItem: CartItem = {
        id: `${menuItem.id}-${spicyLevel}-${Date.now()}`,
        menuItem,
        quantity,
        spicyLevel,
        specialNotes: notes ? notes.trim() : undefined,
      };
      this._items.push(newItem);
      return newItem;
    }
  }

  public updateQuantity(cartItemId: string, newQuantity: number): boolean {
    if (newQuantity <= 0) {
      return this.removeItem(cartItemId);
    }

    const index = this._items.findIndex(item => item.id === cartItemId);
    if (index > -1) {
      this._items[index] = {
        ...this._items[index],
        quantity: newQuantity,
      };
      return true;
    }
    return false;
  }

  public removeItem(cartItemId: string): boolean {
    const initialLength = this._items.length;
    this._items = this._items.filter(item => item.id !== cartItemId);
    return this._items.length < initialLength;
  }

  public clear(): void {
    this._items = [];
    this._appliedCoupon = null;
  }

  public applyCoupon(code: string): { success: boolean; discountAmount: number; message: string } {
    const normalizedCode = code.trim().toUpperCase();
    if (this.subtotal === 0) {
      return { success: false, discountAmount: 0, message: 'Cart is empty. Add food items first.' };
    }

    if (['SPICE10', 'FEAST250', 'WELCOME'].includes(normalizedCode)) {
      this._appliedCoupon = normalizedCode;
      const discount = this.discount;
      return {
        success: true,
        discountAmount: discount,
        message: `Promo code ${normalizedCode} applied! Saved Rs. ${discount.toLocaleString()}`,
      };
    }

    return {
      success: false,
      discountAmount: 0,
      message: 'Invalid promo code. Try "SPICE10" (10% off) or "FEAST250" (Rs. 250 off).',
    };
  }

  public removeCoupon(): void {
    this._appliedCoupon = null;
  }

  public toJSON(): CartItem[] {
    return [...this._items];
  }
}
