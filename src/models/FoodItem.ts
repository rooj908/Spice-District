/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * OBJECT-ORIENTED PROGRAMMING CONCEPTS DEMONSTRATED:
 * 1. Class & Object: FoodItem class definition and instance creation
 * 2. Constructor: Initialization of food properties
 * 3. Encapsulation: Protected/Private attributes with getters, setters, and formatted output
 * 4. Inheritance: DesiSpecialtyFoodItem and BeverageFoodItem inherit from FoodItem
 * 5. Multiple Inheritance concept: Implemented via multiple interfaces (IHalalStandard, IClaypotCooked)
 * 6. Method Overriding: Child classes override getServingDescription() and getMenuBadge()
 * 7. super() keyword: Calls parent constructor and parent methods
 */

import { CategoryId, MenuItem, SpicyLevel } from '../types/restaurant';

// --- Multiple Inheritance Interfaces ---
export interface IHalalStandard {
  readonly isHalal: boolean;
  getHalalAssurance(): string;
}

export interface IClaypotCooked {
  readonly claypotType: string;
  readonly cookingTechnique: string;
  getCookingHeritage(): string;
}

/**
 * Base Class: FoodItem
 * Represents a standard menu dish in Spice District.
 */
export class FoodItem implements MenuItem {
  // Public properties conforming to MenuItem interface
  public readonly id: string;
  public readonly name: string;
  public readonly urduName: string;
  public readonly category: CategoryId;
  public readonly originalPrice?: number;
  public readonly description: string;
  public readonly image: string;
  public readonly spicyLevel: SpicyLevel;
  public readonly servingSize: string;
  public readonly prepTime: string;
  public readonly ingredients: string[];
  public readonly tags: string[];
  public readonly isBestseller?: boolean;
  public readonly isChefSpecial?: boolean;
  public readonly isDesiGhee?: boolean;

  // Encapsulated (Protected) fields
  protected _price: number;
  protected _isAvailable: boolean;

  /**
   * Constructor demonstrating object initialization
   */
  constructor(
    id: string,
    name: string,
    urduName: string,
    category: CategoryId,
    price: number,
    description: string,
    image: string,
    spicyLevel: SpicyLevel,
    servingSize: string,
    prepTime: string,
    ingredients: string[],
    tags: string[],
    originalPrice?: number,
    isBestseller?: boolean,
    isChefSpecial?: boolean,
    isDesiGhee?: boolean
  ) {
    this.id = id;
    this.name = name;
    this.urduName = urduName;
    this.category = category;
    this._price = Math.max(0, price);
    this.description = description;
    this.image = image;
    this.spicyLevel = spicyLevel;
    this.servingSize = servingSize;
    this.prepTime = prepTime;
    this.ingredients = ingredients;
    this.tags = tags;
    this.originalPrice = originalPrice;
    this.isBestseller = isBestseller ?? false;
    this.isChefSpecial = isChefSpecial ?? false;
    this.isDesiGhee = isDesiGhee ?? false;
    this._isAvailable = true;
  }

  // --- Encapsulation: Getters and Setters ---
  public get price(): number {
    return this._price;
  }

  public set price(newPrice: number) {
    if (newPrice < 0) {
      throw new Error('Price cannot be negative in Spice District menu.');
    }
    this._price = newPrice;
  }

  public get isAvailable(): boolean {
    return this._isAvailable;
  }

  public set isAvailable(status: boolean) {
    this._isAvailable = status;
  }

  public get formattedPrice(): string {
    return `Rs. ${this._price.toLocaleString()}`;
  }

  /**
   * Business logic method to calculate item total with optional discount
   */
  public calculateItemTotal(quantity: number, discountPercentage: number = 0): number {
    const discountedRate = this._price * (1 - discountPercentage / 100);
    return Math.round(discountedRate * quantity);
  }

  /**
   * Base method that will be overridden by child classes
   */
  public getServingDescription(): string {
    return `${this.servingSize} • Ready in ${this.prepTime}`;
  }

  public getMenuBadge(): string {
    if (this.isBestseller) return 'Bestseller';
    if (this.isChefSpecial) return "Chef's Royal Choice";
    return 'Authentic Pakistani';
  }
}

/**
 * Child Class 1: DesiSpecialtyFoodItem
 * Demonstrates:
 * - Inheritance (extends FoodItem)
 * - Multiple Inheritance concept (implements IHalalStandard, IClaypotCooked)
 * - super() constructor and method call
 * - Method Overriding
 */
export class DesiSpecialtyFoodItem extends FoodItem implements IHalalStandard, IClaypotCooked {
  public readonly isHalal: boolean;
  public readonly claypotType: string;
  public readonly cookingTechnique: string;
  private _secretSpicesCount: number;

  constructor(
    id: string,
    name: string,
    urduName: string,
    category: CategoryId,
    price: number,
    description: string,
    image: string,
    spicyLevel: SpicyLevel,
    servingSize: string,
    prepTime: string,
    ingredients: string[],
    tags: string[],
    claypotType: string = 'Unglazed Red Clay Matka / Cast Iron Karahi',
    cookingTechnique: string = 'Overnight Dum Simmer',
    secretSpicesCount: number = 32,
    originalPrice?: number,
    isBestseller?: boolean,
    isChefSpecial?: boolean,
    isDesiGhee: boolean = true
  ) {
    // Calling the parent class constructor via super()
    super(
      id,
      name,
      urduName,
      category,
      price,
      description,
      image,
      spicyLevel,
      servingSize,
      prepTime,
      ingredients,
      tags,
      originalPrice,
      isBestseller,
      isChefSpecial,
      isDesiGhee
    );

    this.isHalal = true;
    this.claypotType = claypotType;
    this.cookingTechnique = cookingTechnique;
    this._secretSpicesCount = secretSpicesCount;
  }

  // Implementation of IHalalStandard
  public getHalalAssurance(): string {
    return 'Prepared with 100% Halal hand-slaughtered meat and pure traditional ingredients.';
  }

  // Implementation of IClaypotCooked
  public getCookingHeritage(): string {
    return `Crafted using ${this._secretSpicesCount} heirloom spices in a ${this.claypotType} via traditional ${this.cookingTechnique}.`;
  }

  /**
   * Method Overriding:
   * Overrides parent FoodItem's getServingDescription() and enhances it using super.getServingDescription()
   */
  public override getServingDescription(): string {
    const parentText = super.getServingDescription();
    return `${parentText} • Heritage ${this.cookingTechnique}`;
  }

  /**
   * Method Overriding for badge
   */
  public override getMenuBadge(): string {
    if (this.isDesiGhee) return 'Pure Desi Ghee 🧈';
    return super.getMenuBadge();
  }
}

/**
 * Child Class 2: BeverageFoodItem
 * Demonstrates:
 * - Inheritance (extends FoodItem)
 * - super() constructor
 * - Method Overriding
 */
export class BeverageFoodItem extends FoodItem {
  public readonly servingTemperature: string;
  public readonly volumeMl: number;

  constructor(
    id: string,
    name: string,
    urduName: string,
    category: CategoryId,
    price: number,
    description: string,
    image: string,
    volumeMl: number = 400,
    prepTime: string = '5 mins',
    ingredients: string[] = ['Milk', 'Sugar', 'Cardamom'],
    tags: string[] = ['Chilled', 'Beverage']
  ) {
    super(
      id,
      name,
      urduName,
      category,
      price,
      description,
      image,
      'Mild',
      `${volumeMl}ml Chilled Serving`,
      prepTime,
      ingredients,
      tags,
      undefined,
      false,
      false,
      false
    );

    this.volumeMl = volumeMl;
    this.servingTemperature = 'Chilled at 4°C with crushed ice';
  }

  /**
   * Method Overriding
   */
  public override getServingDescription(): string {
    return `${this.volumeMl}ml • ${this.servingTemperature}`;
  }

  public override getMenuBadge(): string {
    return 'Refreshing Cooler 🥤';
  }
}
