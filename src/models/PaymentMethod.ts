/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * OBJECT-ORIENTED PROGRAMMING CONCEPTS DEMONSTRATED:
 * 1. Abstraction: abstract class PaymentMethod and abstract methods
 * 2. Polymorphism: Different child classes provide diverse implementations for the same interface
 * 3. Inheritance: CashOnDelivery, JazzCashPayment, and CardPayment inherit from PaymentMethod
 * 4. Method Overriding: Each subclass overrides abstract methods and concrete base methods
 * 5. super(): Subclasses pass identifiers and metadata to the parent constructor
 */

export interface PaymentResult {
  success: boolean;
  status: 'pending_on_delivery' | 'confirmed';
  message: string;
  timestamp: string;
}

/**
 * Abstraction: Abstract Class PaymentMethod
 * Cannot be instantiated directly. Enforces a consistent contract across all payment types.
 */
export abstract class PaymentMethod {
  protected readonly _id: string;
  protected readonly _displayName: string;
  protected readonly _isInstant: boolean;

  /**
   * Base constructor
   */
  constructor(id: string, displayName: string, isInstant: boolean) {
    this._id = id;
    this._displayName = displayName;
    this._isInstant = isInstant;
  }

  // Encapsulated getters
  public get id(): string {
    return this._id;
  }

  public get displayName(): string {
    return this._displayName;
  }

  public get isInstant(): boolean {
    return this._isInstant;
  }

  /**
   * Base method: Can be used as-is or overridden
   */
  public getReceiptHeader(): string {
    return `Payment Channel: ${this._displayName}`;
  }

  // --- Abstract Methods (Must be implemented by child classes) ---
  public abstract processPayment(amount: number): PaymentResult;
  public abstract getInstructions(amount: number): string;
  public abstract getProcessingFee(): number;
}

/**
 * Child Class 1: CashOnDelivery
 * Demonstrates Inheritance, super(), and Polymorphic Implementation
 */
export class CashOnDelivery extends PaymentMethod {
  constructor() {
    super('cash_on_delivery', 'Cash on Delivery (COD)', false);
  }

  public override processPayment(amount: number): PaymentResult {
    return {
      success: true,
      status: 'pending_on_delivery',
      message: `Cash on Delivery registered for Rs. ${amount.toLocaleString()}. Payment will be collected by the delivery rider upon food arrival.`,
      timestamp: new Date().toLocaleTimeString(),
    };
  }

  public override getInstructions(amount: number): string {
    return `Please keep cash of Rs. ${amount.toLocaleString()} ready for the rider when your food arrives.`;
  }

  public override getProcessingFee(): number {
    return 0; // No surcharge for COD
  }

  public override getReceiptHeader(): string {
    return `${super.getReceiptHeader()} (Pay cash at your doorstep)`;
  }
}

/**
 * Child Class 2: JazzCashPayment
 * Demonstrates Inheritance, super(), and Polymorphic Implementation
 */
export class JazzCashPayment extends PaymentMethod {
  constructor() {
    super('jazzcash_easypaisa', 'JazzCash / EasyPaisa QR', true);
  }

  public override processPayment(amount: number): PaymentResult {
    return {
      success: true,
      status: 'pending_on_delivery',
      message: `Mobile wallet QR option registered for Rs. ${amount.toLocaleString()}. Rider will present the verified payment QR code upon delivery.`,
      timestamp: new Date().toLocaleTimeString(),
    };
  }

  public override getInstructions(amount: number): string {
    return `The delivery rider will present an official JazzCash / EasyPaisa QR code for Rs. ${amount.toLocaleString()} for you to scan and pay upon delivery.`;
  }

  public override getProcessingFee(): number {
    return 0;
  }

  public override getReceiptHeader(): string {
    return `${super.getReceiptHeader()} (Mobile Wallet QR on Delivery)`;
  }
}

/**
 * Child Class 3: CardPayment
 * Demonstrates Inheritance, super(), and Polymorphic Implementation
 */
export class CardPayment extends PaymentMethod {
  private readonly _acceptedCards: string[];

  constructor(acceptedCards: string[] = ['Visa', 'Mastercard', 'PayPak']) {
    super('card_on_delivery', 'Debit / Credit Card on Delivery', true);
    this._acceptedCards = acceptedCards;
  }

  public override processPayment(amount: number): PaymentResult {
    return {
      success: true,
      status: 'pending_on_delivery',
      message: `Card terminal option registered for Rs. ${amount.toLocaleString()}. Rider will bring a wireless card machine for card swipe/tap.`,
      timestamp: new Date().toLocaleTimeString(),
    };
  }

  public override getInstructions(amount: number): string {
    return `Rider will bring a wireless POS terminal. Accepted cards: ${this._acceptedCards.join(', ')}. Amount due: Rs. ${amount.toLocaleString()}.`;
  }

  public override getProcessingFee(): number {
    return 0;
  }

  public override getReceiptHeader(): string {
    return `${super.getReceiptHeader()} (Wireless POS Machine on Delivery)`;
  }
}

/**
 * Polymorphic Factory:
 * Instantiates the appropriate PaymentMethod subclass dynamically at runtime.
 */
export class PaymentMethodFactory {
  public static create(methodType: string): PaymentMethod {
    switch (methodType) {
      case 'jazzcash_easypaisa':
        return new JazzCashPayment();
      case 'card_on_delivery':
        return new CardPayment();
      case 'cash_on_delivery':
      default:
        return new CashOnDelivery();
    }
  }
}
