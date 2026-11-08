import { MenuItem } from '../types/restaurant';
import { FoodItem, DesiSpecialtyFoodItem, BeverageFoodItem } from '../models/FoodItem';

const RAW_MENU_DATA: MenuItem[] = [
  // --- BIRYANI & RICE ---
  {
    id: 'sindhi-mutton-biryani',
    name: 'Sindhi Royal Mutton Biryani',
    urduName: 'سندھی شاہی مٹن بریانی',
    category: 'biryani',
    price: 1650,
    originalPrice: 1850,
    description: 'Fragrant sella basmati rice layered with tender mutton marinated in rich yogurt, dried plums (aaloo bukhara), green chilies, mint, and pure saffron milk.',
    image: '/images/food/sindhi-mutton-biryani.jpg',
    spicyLevel: 'Hot',
    servingSize: 'Serves 1-2 Persons',
    prepTime: '20-25 mins',
    isBestseller: true,
    isChefSpecial: true,
    isDesiGhee: true,
    ingredients: ['Prime Mutton', 'Aged Basmati Rice', 'Saffron', 'Aaloo Bukhara', 'Desi Ghee', 'Fried Onions'],
    tags: ['Bestseller', 'Signature', 'Desi Ghee']
  },
  {
    id: 'chicken-dum-biryani',
    name: 'Karachi Special Chicken Dum Biryani',
    urduName: 'کراچی چکن دم بریانی',
    category: 'biryani',
    price: 1150,
    originalPrice: 1290,
    description: 'Classic Karachi-style spicy dum biryani cooked with succulent chicken cuts, golden potatoes, kewra essence, and secret potli masalas.',
    image: '/images/food/chicken-dum-biryani.jpg',
    spicyLevel: 'Medium',
    servingSize: 'Serves 1-2 Persons',
    prepTime: '15-20 mins',
    isBestseller: true,
    ingredients: ['Fresh Chicken', 'Long Grain Rice', 'Spiced Potatoes', 'Yogurt Masala', 'Fresh Mint'],
    tags: ['Bestseller', 'Popular']
  },
  {
    id: 'nawabi-beef-pulao',
    name: 'Nawabi Beef Yakhni Pulao',
    urduName: 'نوابی بیف یخنی پلاؤ',
    category: 'biryani',
    price: 1390,
    description: 'Delicately spiced rice cooked in slow-simmered marrow bone broth (yakhni) with melt-in-mouth beef boti and caramelized onions.',
    image: '/images/food/nawabi-beef-pulao.jpg',
    spicyLevel: 'Mild',
    servingSize: 'Serves 2 Persons',
    prepTime: '20-25 mins',
    ingredients: ['Beef Shank', 'Bone Broth', 'Basmati Rice', 'Cardamom', 'Cinnamon', 'Golden Shallots'],
    tags: ['Royal Recipe', 'Mild']
  },
  {
    id: 'matka-mutton-biryani',
    name: 'Shahi Claypot Matka Biryani',
    urduName: 'شاہی مٹکا بریانی',
    category: 'biryani',
    price: 1850,
    description: 'Slow-dum sealed in an authentic red clay matka with wheat dough, locking in deep smoky aromas of whole spices, tender lamb, and rosewater.',
    image: '/images/food/matka-mutton-biryani.jpg',
    spicyLevel: 'Hot',
    servingSize: 'Serves 2-3 Persons',
    prepTime: '30-35 mins',
    isChefSpecial: true,
    ingredients: ['Tender Lamb', 'Claypot Steamed Rice', 'Desi Ghee', 'Crushed Spices', 'Mint Leaf'],
    tags: ['Chef Special', 'Claypot']
  },

  // --- KARAHI & HANDI ---
  {
    id: 'chicken-karahi-desi',
    name: 'Shinwari Desi Chicken Karahi',
    urduName: 'شنواری دیسی چکن کڑاہی',
    category: 'karahi',
    price: 2350,
    originalPrice: 2550,
    description: 'Authentic Peshawar Shinwari style: tender chicken seared in its natural juices with juicy tomatoes, slit green chilies, julienned ginger, and freshly ground black peppercorn.',
    image: '/images/food/chicken-karahi-desi.jpg',
    spicyLevel: 'Medium',
    servingSize: 'Full Karahi (1kg) - Serves 3-4',
    prepTime: '25-30 mins',
    isBestseller: true,
    isChefSpecial: true,
    ingredients: ['Desi Organic Chicken', 'Vine-Ripe Tomatoes', 'Ginger Slivers', 'Green Chilies', 'Black Pepper'],
    tags: ['Bestseller', 'Shinwari Style']
  },
  {
    id: 'lahori-butter-chicken-karahi',
    name: 'Lahori Butter Chicken Karahi',
    urduName: 'لاہوری مکھنی چکن کڑاہی',
    category: 'karahi',
    price: 1950,
    description: 'Iconic Gawalmandi Lahore recipe simmered in pure butter and desi ghee, roasted coriander seeds, crushed red pepper, and aromatic fenugreek leaves (kasuri methi).',
    image: '/images/food/lahori-butter-chicken-karahi.jpg',
    spicyLevel: 'Hot',
    servingSize: 'Full Karahi - Serves 3-4',
    prepTime: '25 mins',
    isDesiGhee: true,
    ingredients: ['Fresh Chicken', 'Pure Butter', 'Kasuri Methi', 'Roasted Coriander', 'Garlic Paste'],
    tags: ['Lahori Special', 'Rich Gravy']
  },
  {
    id: 'mutton-karahi-lahori',
    name: 'Gawalmandi Mutton Karahi',
    urduName: 'گوالمنڈی مٹن کڑاہی',
    category: 'karahi',
    price: 2850,
    description: 'Succulent cuts of fresh goat meat braised and wok-tossed in cast iron with crushed whole coriander, cumin, ginger, and green chilies.',
    image: '/images/food/mutton-karahi-lahori.jpg',
    spicyLevel: 'Hot',
    servingSize: 'Full Karahi (1kg) - Serves 3-4',
    prepTime: '35 mins',
    isChefSpecial: true,
    isDesiGhee: true,
    ingredients: ['Fresh Goat Mutton', 'Desi Ghee', 'Tomato Puree', 'Hand-pounded Masalas', 'Fresh Ginger'],
    tags: ['Chef Special', 'Mutton']
  },
  {
    id: 'chicken-white-handi',
    name: 'Shahi Chicken White Handi',
    urduName: 'شاہی چکن وائٹ ہانڈی',
    category: 'karahi',
    price: 1750,
    description: 'Velvety boneless chicken simmered in rich cream, cashew nut paste, white pepper, coconut milk, and crushed green cardamom.',
    image: '/images/food/chicken-white-handi.jpg',
    spicyLevel: 'Mild',
    servingSize: 'Clay Handi - Serves 2-3',
    prepTime: '20 mins',
    ingredients: ['Boneless Chicken', 'Fresh Cream', 'Cashew Paste', 'White Pepper', 'Green Cardamom'],
    tags: ['Mild & Creamy', 'Boneless']
  },

  // --- TRADITIONAL CURRIES (NIHARI & HALEEM) ---
  {
    id: 'nalli-nihari-shahi',
    name: 'Slow-Cooked Royal Nalli Nihari',
    urduName: 'شاہی نلی نہاری',
    category: 'curries',
    price: 1750,
    originalPrice: 1950,
    description: '12-hour overnight slow-simmered beef shank stew with rich marrow bones (nalli), infused with 32 hand-ground spices, served with fresh ginger, chilies, lemon, and tarka.',
    image: '/images/food/nalli-nihari-shahi.jpg',
    spicyLevel: 'Hot',
    servingSize: 'Serves 2-3 Persons',
    prepTime: '15 mins',
    isBestseller: true,
    isChefSpecial: true,
    isDesiGhee: true,
    ingredients: ['Beef Shank & Bone Marrow', '32 Spices Potli', 'Desi Ghee Tarka', 'Julienned Ginger', 'Fresh Lemon'],
    tags: ['Bestseller', 'Nalli Nihari', 'Overnight Cooked']
  },
  {
    id: 'zafrani-shahi-haleem',
    name: 'Shahi Zafrani Khas Haleem',
    urduName: 'شاہی زعفرانی خاص حلیم',
    category: 'curries',
    price: 950,
    originalPrice: 1100,
    description: 'Slow-stirred blend of shredded tender beef, seven heritage grains, and four lentils, simmered until silky and topped with golden fried onions, chaat masala, and mint.',
    image: '/images/food/zafrani-shahi-haleem.jpg',
    spicyLevel: 'Medium',
    servingSize: 'Serves 1-2 Persons',
    prepTime: '10-15 mins',
    isBestseller: true,
    ingredients: ['Shredded Beef', 'Barley & Wheat', 'Mixed Lentils', 'Fried Onion Tarka', 'Garam Masala'],
    tags: ['Bestseller', 'Traditional Haleem']
  },
  {
    id: 'murgh-chana-lahori',
    name: 'Lahori Murgh Chana Gravy',
    urduName: 'لاہوری مرغ چنے',
    category: 'curries',
    price: 890,
    description: 'Tender chicken braised with creamy chickpeas in rich black pepper gravy, bay leaves, and desi ghee. A quintessential Pakistani breakfast and dinner staple.',
    image: '/images/food/murgh-chana-lahori.jpg',
    spicyLevel: 'Medium',
    servingSize: 'Serves 2 Persons',
    prepTime: '15 mins',
    ingredients: ['Desi Chana (Chickpeas)', 'Tender Chicken', 'Black Pepper Gravy', 'Desi Ghee', 'Cumin'],
    tags: ['Classic', 'Comfort Food']
  },

  // --- BBQ & CHARCOAL KEBABS ---
  {
    id: 'seekh-kebab-beef',
    name: 'Melt-in-Mouth Seekh Kebab (4 pcs)',
    urduName: 'بیف سیخ کباب (۴ عدد)',
    category: 'bbq',
    price: 1250,
    originalPrice: 1400,
    description: 'Minced prime beef and lamb fat seasoned with roasted cumin, crushed coriander seeds, raw papaya, and green chilies, char-grilled over flaming coal skewers.',
    image: '/images/food/seekh-kebab-beef.jpg',
    spicyLevel: 'Hot',
    servingSize: '4 Large Skewers',
    prepTime: '20 mins',
    isBestseller: true,
    ingredients: ['Prime Minced Beef', 'Crushed Spices', 'Green Chillies', 'Fresh Mint Chutney', 'Charcoal Smoke'],
    tags: ['Bestseller', 'Charcoal BBQ']
  },
  {
    id: 'chicken-tikka-boti',
    name: 'Charcoal Smoked Chicken Tikka (Leg/Breast)',
    urduName: 'کوئلہ چکن تکہ',
    category: 'bbq',
    price: 650,
    originalPrice: 750,
    description: 'Juicy quarter chicken marinated overnight in strained yogurt, Kashmiri deghi mirch, ginger garlic paste, lemon juice, and grilled over open embers.',
    image: '/images/food/chicken-tikka-boti.jpg',
    spicyLevel: 'Hot',
    servingSize: '1 Quarter Chicken (Leg or Breast)',
    prepTime: '20 mins',
    isBestseller: true,
    ingredients: ['Quarter Chicken', 'Kashmiri Chili', 'Hung Curd', 'Mustard Oil', 'Lemon Juice'],
    tags: ['Bestseller', 'Smoky Tikka']
  },
  {
    id: 'chicken-malai-boti',
    name: 'Creamy Murgh Malai Boti',
    urduName: 'مرغ ملائی بوٹی',
    category: 'bbq',
    price: 1290,
    description: 'Boneless chicken cubes marinated in clotted dairy cream (balai), soft cream cheese, green coriander, mild spices, and gently charred to butter-soft tenderness.',
    image: '/images/food/chicken-malai-boti.jpg',
    spicyLevel: 'Mild',
    servingSize: '8 Boneless Cubes',
    prepTime: '18 mins',
    ingredients: ['Boneless Chicken', 'Dairy Cream', 'Cream Cheese', 'White Pepper', 'Green Coriander'],
    tags: ['Creamy & Tender', 'Mild']
  },
  {
    id: 'peshawari-chapli-kebab',
    name: 'Peshawari Crispy Chapli Kebab (2 pcs)',
    urduName: 'پشاوری چپلی کباب (۲ عدد)',
    category: 'bbq',
    price: 1090,
    description: 'Shallow-fried flat beef patties embedded with fresh tomato wheels, pomegranate seeds (anardana), cracked coriander seeds, and bone marrow fat.',
    image: '/images/food/peshawari-chapli-kebab.jpg',
    spicyLevel: 'Extra Spicy',
    servingSize: '2 Jumbo Patties',
    prepTime: '15 mins',
    isChefSpecial: true,
    ingredients: ['Coarse Minced Beef', 'Anardana (Pomegranate)', 'Fresh Tomatoes', 'Egg & Flour', 'Desi Tallow'],
    tags: ['Crispy Crust', 'Peshawar Special']
  },
  {
    id: 'spice-district-royal-platter',
    name: 'Spice District Royal BBQ Platter',
    urduName: 'شاہی بی بی کیو تھال',
    category: 'bbq',
    price: 3850,
    originalPrice: 4200,
    description: 'The ultimate royal feast: 2 Chicken Tikka pieces, 4 Beef Seekh Kebabs, 6 Malai Boti skewers, 2 Chapli Kebabs, served with mint raita, tamarind sauce, and salad.',
    image: '/images/food/spice-district-royal-platter.jpg',
    spicyLevel: 'Hot',
    servingSize: 'Serves 4-5 Persons',
    prepTime: '25-30 mins',
    isChefSpecial: true,
    ingredients: ['Assorted BBQ Meats', 'Tikka & Boti', 'Seekh & Chapli', 'Mint Chutney', 'Lachha Onions'],
    tags: ['Family Feast', 'Mega Platter']
  },

  // --- FRESH TANDOOR & BREADS ---
  {
    id: 'roghani-sesame-naan',
    name: 'Special Roghani Sesame Naan',
    urduName: 'خاص روغنی تل والا نان',
    category: 'breads',
    price: 140,
    description: 'Fluffy tandoor-baked flatbread brushed with milk wash, pure butter, and sprinkled generously with golden toasted sesame seeds.',
    image: '/images/food/roghani-sesame-naan.jpg',
    spicyLevel: 'Mild',
    servingSize: '1 Large Naan',
    prepTime: '5-8 mins',
    isBestseller: true,
    ingredients: ['Fine Flour', 'Milk', 'Toasted Sesame Seeds', 'Desi Butter'],
    tags: ['Tandoor Fresh']
  },
  {
    id: 'garlic-butter-naan',
    name: 'Tandoori Garlic Butter Naan',
    urduName: 'گارلک بٹر نان',
    category: 'breads',
    price: 160,
    description: 'Char-spotted tandoor naan brushed with melted butter, minced roasted garlic, and freshly chopped cilantro.',
    image: '/images/food/garlic-butter-naan.jpg',
    spicyLevel: 'Mild',
    servingSize: '1 Large Naan',
    prepTime: '5-8 mins',
    ingredients: ['Roasted Garlic', 'Fresh Butter', 'Coriander', 'Yeast Dough'],
    tags: ['Garlic & Butter']
  },
  {
    id: 'stuffed-keema-naan',
    name: 'Stuffed Spiced Keema Naan',
    urduName: 'قیمہ بھرا نان',
    category: 'breads',
    price: 390,
    description: 'Crispy outer crust filled with seasoned minced beef, green chilies, coriander seeds, and pomegranate glaze.',
    image: '/images/food/stuffed-keema-naan.jpg',
    spicyLevel: 'Medium',
    servingSize: '1 Stuffed Naan',
    prepTime: '10-12 mins',
    ingredients: ['Spiced Mince', 'Fine Flour', 'Green Chilies', 'Cumin Butter'],
    tags: ['Stuffed', 'Savory']
  },
  {
    id: 'desi-lacha-paratha',
    name: 'Crispy Desi Ghee Lacha Paratha',
    urduName: 'دیسی گھی لچھا پراٹھا',
    category: 'breads',
    price: 180,
    description: 'Multi-layered, flaky whole wheat flatbread rolled with pure desi ghee and roasted to golden crispiness on a heavy tawa.',
    image: '/images/food/desi-lacha-paratha.jpg',
    spicyLevel: 'Mild',
    servingSize: '1 Flaky Paratha',
    prepTime: '8-10 mins',
    isDesiGhee: true,
    ingredients: ['Whole Wheat Atta', 'Pure Desi Ghee', 'Crisp Flakes'],
    tags: ['Desi Ghee', 'Flaky']
  },

  // --- DESSERTS & DRINKS ---
  {
    id: 'shahi-gulab-jamun',
    name: 'Warm Shahi Gulab Jamun with Rabri (2 pcs)',
    urduName: 'شاہی گلاب جامن مع ربڑی',
    category: 'desserts',
    price: 550,
    description: 'Fresh milk khoya dumplings soaked in fragrant cardamom & saffron syrup, served warm with chilled thick clotted rabri and silver leaf.',
    image: '/images/food/shahi-gulab-jamun.jpg',
    spicyLevel: 'Mild',
    servingSize: '2 Warm Pieces with Rabri',
    prepTime: '5 mins',
    isBestseller: true,
    ingredients: ['Fresh Khoya', 'Cardamom Syrup', 'Saffron', 'Thick Rabri', 'Pistachios'],
    tags: ['Sweet Treat', 'Chef Favorite']
  },
  {
    id: 'matka-zafrani-kheer',
    name: 'Royal Zafrani Matka Kheer',
    urduName: 'مٹکا زعفرانی کھیر',
    category: 'desserts',
    price: 480,
    description: 'Slow-simmered basmati rice pudding infused with whole milk, crushed saffron, green cardamom, almond slivers, and set in unglazed clay bowls.',
    image: '/images/food/matka-zafrani-kheer.jpg',
    spicyLevel: 'Mild',
    servingSize: '1 Clay Matka Bowl',
    prepTime: 'Ready to serve',
    ingredients: ['Full Cream Milk', 'Aged Rice', 'Pure Saffron', 'Almonds & Pistachio'],
    tags: ['Claypot Dessert']
  },
  {
    id: 'chaunsa-mango-lassi',
    name: 'Special Chaunsa Mango Lassi',
    urduName: 'چونسہ مینگو لسی',
    category: 'desserts',
    price: 390,
    description: 'Thick, creamy churned sweet yogurt blended with authentic Pakistani Chaunsa mango pulp and crushed ice.',
    image: '/images/food/chaunsa-mango-lassi.jpg',
    spicyLevel: 'Mild',
    servingSize: 'Large 450ml Glass',
    prepTime: '5 mins',
    isBestseller: true,
    ingredients: ['Fresh Yogurt', 'Chaunsa Mango Pulp', 'Pistachio Flakes', 'Cardamom'],
    tags: ['Refreshing', 'Summer Special']
  },
  {
    id: 'lahori-mint-margarita',
    name: 'Lahori Royal Mint Margarita',
    urduName: 'لاہوری منٹ مارگریٹا',
    category: 'desserts',
    price: 320,
    description: 'Sparkling refreshment with hand-muddled fresh garden mint, lemon juice, Himalayan black salt (kala namak), and fizzy soda.',
    image: '/images/food/lahori-mint-margarita.jpg',
    spicyLevel: 'Mild',
    servingSize: 'Chilled Glass 400ml',
    prepTime: '5 mins',
    ingredients: ['Fresh Mint', 'Lime Juice', 'Black Salt', 'Sparkling Soda'],
    tags: ['Digestive', 'Chilled']
  }
];

/**
 * OBJECT-ORIENTED PROGRAMMING: Class Instantiation & Polymorphic Objects
 * Every menu dish is instantiated as an instance of FoodItem or specialized child classes.
 */
export const MENU_ITEMS: FoodItem[] = RAW_MENU_DATA.map(item => {
  if (item.category === 'desserts' && (item.tags.includes('Summer Special') || item.tags.includes('Digestive'))) {
    return new BeverageFoodItem(
      item.id,
      item.name,
      item.urduName,
      item.category,
      item.price,
      item.description,
      item.image,
      item.id.includes('lassi') ? 450 : 400,
      item.prepTime,
      item.ingredients,
      item.tags
    );
  }

  if (item.isChefSpecial || item.isDesiGhee || item.category === 'biryani' || item.category === 'karahi' || item.category === 'curries') {
    return new DesiSpecialtyFoodItem(
      item.id,
      item.name,
      item.urduName,
      item.category,
      item.price,
      item.description,
      item.image,
      item.spicyLevel,
      item.servingSize,
      item.prepTime,
      item.ingredients,
      item.tags,
      item.category === 'biryani' ? 'Unglazed Red Clay Matka' : 'Cast Iron Shinwari Karahi',
      item.category === 'curries' ? '12-Hour Overnight Simmer' : 'Dum Pukht Fire Cooking',
      32,
      item.originalPrice,
      item.isBestseller,
      item.isChefSpecial,
      item.isDesiGhee ?? false
    );
  }

  return new FoodItem(
    item.id,
    item.name,
    item.urduName,
    item.category,
    item.price,
    item.description,
    item.image,
    item.spicyLevel,
    item.servingSize,
    item.prepTime,
    item.ingredients,
    item.tags,
    item.originalPrice,
    item.isBestseller,
    item.isChefSpecial,
    item.isDesiGhee
  );
});

export const CATEGORIES = [
  { id: 'all', label: 'Full Menu', urduLabel: 'مکمل مینو', icon: 'Sparkles' },
  { id: 'biryani', label: 'Biryani & Rice', urduLabel: 'بریانی و پلاؤ', icon: 'UtensilsCrossed' },
  { id: 'karahi', label: 'Karahi & Handi', urduLabel: 'کڑاہی و ہانڈی', icon: 'Flame' },
  { id: 'curries', label: 'Nihari & Haleem', urduLabel: 'نہاری و حلیم', icon: 'Soup' },
  { id: 'bbq', label: 'Charcoal BBQ', urduLabel: 'کوئلہ بی بی کیو', icon: 'Beef' },
  { id: 'breads', label: 'Tandoor & Breads', urduLabel: 'نان و پراٹھا', icon: 'CircleDot' },
  { id: 'desserts', label: 'Desserts & Drinks', urduLabel: 'مٹھائیاں و مشروبات', icon: 'Coffee' },
] as const;

export const CITY_AREAS: Record<string, string[]> = {
  'Lahore': [
    'Gulberg (Main / Block H & III)',
    'DHA Phase 1 - 6',
    'DHA Phase 7 - 9 (Prism)',
    'Johar Town (Phase 1 & 2)',
    'Model Town',
    'Faisal Town / Garden Town',
    'Lahore Cantt / Mall Road',
    'Bahria Town (Sector A - F)',
    'Wapda Town / PCSIR',
    'Allama Iqbal Town',
    'Shadman / Jail Road',
  ],
  'Karachi': [
    'Gulshan-e-Iqbal (Blocks 1-19)',
    'Clifton (Blocks 1-9 & Sea View)',
    'DHA Phase 1 - 8',
    'PECHS / Bahadurabad / Tariq Road',
    'North Nazimabad',
    'Gulistan-e-Johar (Blocks 1-20)',
    'KDA Scheme 1 / Tipu Sultan',
    'Malir Cantt / Model Colony',
    'Saddar / Civil Lines',
    'Federal B Area (F.B Area)',
  ],
  'Islamabad': [
    'F-6 / F-7 / F-8',
    'F-10 / F-11',
    'G-9 / G-10 / G-11',
    'Blue Area',
    'E-7 / E-11',
    'DHA Phase 1 & 2 Islamabad',
    'Bahria Town Islamabad',
    'PWD / Pakistan Town',
    'I-8 / I-9',
  ],
  'Rawalpindi': [
    'Bahria Town (Phase 1 - 8)',
    'Saddar Rawalpindi',
    'Chaklala Scheme III',
    'Askari 1 - 14',
    'Satellite Town',
    'Westridge',
    'Peshawar Road',
  ]
};

export const CITIES = ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi'] as const;

// Backward-compatibility fallback
export const POPULAR_AREAS = CITY_AREAS['Lahore'];

