/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * OBJECT-ORIENTED PROGRAMMING CONCEPTS DEMONSTRATED:
 * 1. Class & Object: Customer class with data and behavioral methods
 * 2. Constructor: Initializes customer profile and delivery address
 * 3. Encapsulation: Private member variables with getters, setters, sanitization, and strict Pakistani phone validation
 */

import { CustomerInfo } from '../types/restaurant';

export class Customer {
  private _fullName: string;
  private _phone: string;
  private _city: string;
  private _area: string;
  private _deliveryAddress: string;
  private _nearestLandmark: string;
  private _orderNotes: string;
  private _paymentMethod: 'cash_on_delivery' | 'jazzcash_easypaisa' | 'card_on_delivery';

  constructor(
    fullName: string,
    phone: string,
    city: string,
    area: string,
    deliveryAddress: string,
    nearestLandmark: string = '',
    orderNotes: string = '',
    paymentMethod: 'cash_on_delivery' | 'jazzcash_easypaisa' | 'card_on_delivery' = 'cash_on_delivery'
  ) {
    this._fullName = fullName.trim();
    this._phone = this.sanitizePhone(phone);
    this._city = city.trim();
    this._area = area.trim();
    this._deliveryAddress = deliveryAddress.trim();
    this._nearestLandmark = this.sanitizeLandmark(nearestLandmark);
    this._orderNotes = orderNotes.trim();
    this._paymentMethod = paymentMethod;
  }

  // --- Encapsulation: Sanitization Helper Methods ---
  private sanitizePhone(rawPhone: string): string {
    return rawPhone.trim();
  }

  private sanitizeLandmark(rawLandmark: string): string {
    // Strip accidental leading/trailing commas or excess whitespace
    return rawLandmark.trim().replace(/^[,\s]+|[,\s]+$/g, '');
  }

  // --- Encapsulation: Getters and Setters ---
  public get fullName(): string {
    return this._fullName;
  }

  public set fullName(value: string) {
    if (!value.trim()) {
      throw new Error('Customer full name cannot be blank.');
    }
    this._fullName = value.trim();
  }

  public get phone(): string {
    return this._phone;
  }

  public set phone(value: string) {
    this._phone = this.sanitizePhone(value);
  }

  public get city(): string {
    return this._city;
  }

  public set city(value: string) {
    this._city = value.trim();
  }

  public get area(): string {
    return this._area;
  }

  public set area(value: string) {
    this._area = value.trim();
  }

  public get deliveryAddress(): string {
    return this._deliveryAddress;
  }

  public set deliveryAddress(value: string) {
    this._deliveryAddress = value.trim();
  }

  public get nearestLandmark(): string {
    return this._nearestLandmark;
  }

  public set nearestLandmark(value: string) {
    this._nearestLandmark = this.sanitizeLandmark(value);
  }

  public get orderNotes(): string {
    return this._orderNotes;
  }

  public set orderNotes(value: string) {
    this._orderNotes = value.trim();
  }

  public get paymentMethod(): 'cash_on_delivery' | 'jazzcash_easypaisa' | 'card_on_delivery' {
    return this._paymentMethod;
  }

  public set paymentMethod(value: 'cash_on_delivery' | 'jazzcash_easypaisa' | 'card_on_delivery') {
    this._paymentMethod = value;
  }

  // Derived property demonstrating business logic encapsulation
  public get fullDestination(): string {
    return `${this._deliveryAddress}, ${this._area}, ${this._city}`;
  }

  /**
   * Encapsulated validation logic for checkout verification
   */
  public validate(): { isValid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {};

    if (!this._fullName) {
      errors.fullName = 'Please enter your full name';
    }

    const numericPhone = this._phone.replace(/[^0-9]/g, '');
    if (!numericPhone) {
      errors.phone = 'Please enter your contact phone number';
    } else if (numericPhone.length < 10) {
      errors.phone = 'Please enter a valid 11-digit Pakistani phone number (e.g. 0300-1234567)';
    }

    if (!this._deliveryAddress || this._deliveryAddress.length < 8) {
      errors.deliveryAddress = 'Please enter your full street & house/apartment address';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }

  /**
   * Convert to plain CustomerInfo object for React state compatibility
   */
  public toCustomerInfo(): CustomerInfo {
    return {
      fullName: this._fullName,
      phone: this._phone,
      city: this._city,
      area: this._area,
      deliveryAddress: this._deliveryAddress,
      nearestLandmark: this._nearestLandmark || undefined,
      orderNotes: this._orderNotes || undefined,
      paymentMethod: this._paymentMethod,
    };
  }
}
