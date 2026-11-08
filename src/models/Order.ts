/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * OBJECT-ORIENTED PROGRAMMING CONCEPTS DEMONSTRATED:
 * 1. Abstraction: BaseOrder abstract class defining common order contract
 * 2. Inheritance: RestaurantOrder extends BaseOrder
 * 3. Polymorphism: Leverages PaymentMethod polymorphism to generate payment details and receipts
 * 4. Multiple Inheritance concept: Implements IPrintable and ITrackable interfaces
 * 5. Method Overriding: Overrides abstract and concrete methods from BaseOrder
 * 6. super(): Calls parent constructor and base methods
 */

import { CartItem, CustomerInfo, Order as OrderType } from '../types/restaurant';
import { Customer } from './Customer';
import { PaymentMethod, PaymentMethodFactory } from './PaymentMethod';

export interface IPrintable {
  printReceipt(): void;
  formatReceiptText(): string;
}

export interface ITrackable {
  readonly estimatedMinutes: number;
  getCurrentTimelineStage(): number;
}

/**
 * Abstraction: Abstract Base Class
 */
export abstract class BaseOrder {
  protected readonly _orderId: string;
  protected readonly _createdAt: string;
  protected _status: 'confirmed' | 'preparing' | 'on_the_way' | 'delivered';

  constructor(
    orderId: string = `SD-PK-${Math.floor(10000 + Math.random() * 90000)}`,
    createdAt: string = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  ) {
    this._orderId = orderId;
    this._createdAt = createdAt;
    this._status = 'confirmed';
  }

  public get orderId(): string {
    return this._orderId;
  }

  public get createdAt(): string {
    return this._createdAt;
  }

  public get status(): 'confirmed' | 'preparing' | 'on_the_way' | 'delivered' {
    return this._status;
  }

  public set status(newStatus: 'confirmed' | 'preparing' | 'on_the_way' | 'delivered') {
    this._status = newStatus;
  }

  // Base methods
  public getOrderSummaryHeader(): string {
    return `Spice District Feast #${this._orderId}`;
  }

  // Abstract methods enforcing implementation in derived classes
  public abstract calculateTotal(): number;
  public abstract getDeliveryStatusMessage(): string;
}

/**
 * Concrete Class: RestaurantOrder
 * Inherits from BaseOrder and implements multiple interfaces (Multiple Inheritance concept)
 */
export class RestaurantOrder extends BaseOrder implements IPrintable, ITrackable {
  private readonly _items: CartItem[];
  private readonly _customer: Customer;
  private readonly _subtotal: number;
  private readonly _deliveryFee: number;
  private readonly _packagingFee: number;
  private readonly _discount: number;
  private readonly _grandTotal: number;
  private readonly _paymentMethod: PaymentMethod;
  public readonly estimatedMinutes: number;

  constructor(
    customer: Customer | CustomerInfo,
    items: CartItem[],
    subtotal: number,
    deliveryFee: number,
    packagingFee: number,
    discount: number,
    grandTotal: number,
    orderId?: string,
    createdAt?: string,
    estimatedMinutes: number = 40
  ) {
    // Calling parent abstract class constructor via super()
    super(orderId, createdAt);

    this._items = [...items];
    this._customer = customer instanceof Customer
      ? customer
      : new Customer(
          customer.fullName,
          customer.phone,
          customer.city,
          customer.area,
          customer.deliveryAddress,
          customer.nearestLandmark,
          customer.orderNotes,
          customer.paymentMethod
        );

    this._subtotal = subtotal;
    this._deliveryFee = deliveryFee;
    this._packagingFee = packagingFee;
    this._discount = discount;
    this._grandTotal = grandTotal;
    this.estimatedMinutes = estimatedMinutes;

    // Polymorphic instantiation of payment method using factory
    this._paymentMethod = PaymentMethodFactory.create(this._customer.paymentMethod);
  }

  // Encapsulated getters
  public get items(): CartItem[] {
    return [...this._items];
  }

  public get customer(): Customer {
    return this._customer;
  }

  public get subtotal(): number {
    return this._subtotal;
  }

  public get deliveryFee(): number {
    return this._deliveryFee;
  }

  public get packagingFee(): number {
    return this._packagingFee;
  }

  public get discount(): number {
    return this._discount;
  }

  public get grandTotal(): number {
    return this._grandTotal;
  }

  public get paymentMethod(): PaymentMethod {
    return this._paymentMethod;
  }

  public get estimatedDeliveryTime(): string {
    return `${this.estimatedMinutes - 5} - ${this.estimatedMinutes + 5} Minutes`;
  }

  /**
   * Method Overriding for calculateTotal from BaseOrder
   */
  public override calculateTotal(): number {
    return this._grandTotal;
  }

  /**
   * Method Overriding for getDeliveryStatusMessage from BaseOrder
   */
  public override getDeliveryStatusMessage(): string {
    switch (this._status) {
      case 'confirmed':
        return 'Order received by Spice District kitchen.';
      case 'preparing':
        return 'Sizzling in the tandoor and karahi woks.';
      case 'on_the_way':
        return 'Dispatched in insulated thermal bag with express rider.';
      case 'delivered':
        return 'Feast delivered hot to your doorstep. Shukriya!';
      default:
        return 'Processing your order.';
    }
  }

  /**
   * Method Overriding: Uses super.getOrderSummaryHeader() and enhances it
   */
  public override getOrderSummaryHeader(): string {
    return `${super.getOrderSummaryHeader()} • Paid via ${this._paymentMethod.displayName}`;
  }

  // Implementation of ITrackable
  public getCurrentTimelineStage(): number {
    switch (this._status) {
      case 'confirmed': return 1;
      case 'preparing': return 2;
      case 'on_the_way': return 3;
      case 'delivered': return 4;
      default: return 1;
    }
  }

  // Implementation of IPrintable
  public printReceipt(): void {
    if (typeof window !== 'undefined') {
      window.print();
    }
  }

  public formatReceiptText(): string {
    const itemsText = this._items
      .map(i => `${i.quantity}x ${i.menuItem.name} (Rs. ${i.menuItem.price * i.quantity})`)
      .join('\n');

    return `
========================================
           SPICE DISTRICT
    Authentic Pakistani Cuisine
========================================
Order ID: ${this._orderId}
Time: ${this._createdAt}
Customer: ${this._customer.fullName}
Destination: ${this._customer.fullDestination}
Phone: ${this._customer.phone}
Payment: ${this._paymentMethod.displayName}

ITEMS:
${itemsText}
----------------------------------------
Subtotal: Rs. ${this._subtotal.toLocaleString()}
Delivery: Rs. ${this._deliveryFee}
Packaging: Rs. ${this._packagingFee}
Discount: Rs. ${this._discount}
----------------------------------------
GRAND TOTAL: Rs. ${this._grandTotal.toLocaleString()}
========================================
${this._paymentMethod.getInstructions(this._grandTotal)}
========================================
`;
  }

  /**
   * Export to plain OrderType for React UI consumption
   */
  public toOrderData(): OrderType {
    return {
      orderId: this._orderId,
      items: this._items,
      customer: this._customer.toCustomerInfo(),
      subtotal: this._subtotal,
      deliveryFee: this._deliveryFee,
      packagingFee: this._packagingFee,
      discount: this._discount,
      grandTotal: this._grandTotal,
      status: this._status,
      createdAt: this._createdAt,
      estimatedDeliveryTime: this.estimatedDeliveryTime,
    };
  }
}
