import appetizersImg from "@/assets/bbq.jpg";
import burgerImg from "@/assets/burger.jpg";
import chineseImg from "@/assets/chinese.jpg";
import karahiImg from "@/assets/karahi.jpg";
import naanImg from "@/assets/naan.jpg";
import pastaImg from "@/assets/pasta.jpg";
import pizzaImg from "@/assets/pizza.jpg";
import bbqImg from "@/assets/bbq.jpg";
import heroFood from "@/assets/hero-food.jpg";

export type SizeOption = { label: string; price: number };
export type AddonOption = { id: string; label: string; price: number };

export type Product = {
  id: string;
  name: string;
  category: CategoryId;
  description: string;
  image: string;
  /** Single price in PKR. `null` means the price is not published yet (configurable). */
  price: number | null;
  sizes?: SizeOption[];
  addons?: AddonOption[];
  tags?: string[];
  isPopular?: boolean;
  isFeatured?: boolean;
  isAvailable: boolean;
};

export type CategoryId =
  | "appetizers"
  | "burgers"
  | "thai-chinese"
  | "soups"
  | "chowmein"
  | "rice"
  | "desi"
  | "bbq"
  | "naan"
  | "pizza"
  | "pasta"
  | "salads"
  | "cold-drinks"
  | "afghani";

export type Category = { id: CategoryId; name: string; slug: string; image: string };

export const CATEGORIES: Category[] = [
  { id: "appetizers", name: "Appetizers", slug: "appetizers", image: appetizersImg },
  { id: "burgers", name: "Burgers", slug: "burgers", image: burgerImg },
  { id: "thai-chinese", name: "Thai / Chinese", slug: "thai-chinese", image: chineseImg },
  { id: "soups", name: "Soups", slug: "soups", image: chineseImg },
  { id: "chowmein", name: "Chowmein", slug: "chowmein", image: chineseImg },
  { id: "rice", name: "Rice", slug: "rice", image: chineseImg },
  { id: "desi", name: "Desi Foods", slug: "desi-foods", image: karahiImg },
  { id: "bbq", name: "BBQ", slug: "bbq", image: bbqImg },
  { id: "naan", name: "Naan", slug: "naan", image: naanImg },
  { id: "pizza", name: "Pizza", slug: "pizza", image: pizzaImg },
  { id: "pasta", name: "Pasta", slug: "pasta", image: pastaImg },
  { id: "salads", name: "Salads", slug: "salads", image: heroFood },
  { id: "cold-drinks", name: "Cold Drinks", slug: "cold-drinks", image: heroFood },
  { id: "afghani", name: "Afghani Special", slug: "afghani", image: bbqImg },
];

const pizzaSizes = (s: number, m: number, l: number): SizeOption[] => [
  { label: "Small", price: s },
  { label: "Medium", price: m },
  { label: "Large", price: l },
];

const soupSizes: SizeOption[] = [
  { label: "Regular", price: 180 },
  { label: "Half", price: 380 },
  { label: "Family", price: 700 },
];

const p = (
  id: string,
  name: string,
  category: CategoryId,
  price: number | null,
  description: string,
  image: string,
  extra: Partial<Product> = {},
): Product => ({
  id,
  name,
  category,
  description,
  image,
  price,
  isAvailable: true,
  ...extra,
});

export const PRODUCTS: Product[] = [
  // APPETIZERS
  p("finger-fish", "Finger Fish (6 Pieces)", "appetizers", 900, "Golden fried fish fingers, crisp outside and tender inside.", appetizersImg),
  p("crispy-fried-fish", "Crispy Fried Fish (4 Pieces)", "appetizers", 900, "Batter-fried fish pieces served hot with dips.", appetizersImg),
  p("hot-wings", "Hot Wings (5 Pieces)", "appetizers", 320, "Spicy fried wings tossed in our house heat.", appetizersImg, { isPopular: true }),
  p("chicken-shawarma", "Chicken Shawarma", "appetizers", 220, "Shredded chicken, garlic sauce and fresh salad in a soft wrap.", appetizersImg),
  p("french-fries", "French Fries", "appetizers", 300, "Hot, salted and impossible to share.", appetizersImg),
  p("dhaka-chicken", "Dhaka Chicken", "appetizers", 1000, "Crisp fried chicken with our signature Dhaka coating.", appetizersImg),
  p("supreme-nachos", "Supreme Nachos", "appetizers", 450, "Loaded nachos with cheese, chicken and jalapeños.", appetizersImg),
  p("dynamite-chicken", "Dynamite Chicken (4 Pieces)", "appetizers", 600, "Crunchy chicken bites in a creamy chilli glaze.", appetizersImg),

  // BURGERS
  p("almaidah-special-burger", "Al-Maidah Special Burger", "burgers", 750, "Our signature stacked burger — the one people come back for.", burgerImg, { isPopular: true, isFeatured: true, tags: ["Best Seller"] }),
  p("crispy-jalapeno-burger", "Crispy Jalapeno Burger", "burgers", 650, "Crispy fillet with jalapeños and a creamy kick.", burgerImg),
  p("beef-patty-burger", "Beef Patty Burger", "burgers", 750, "Char-grilled beef patty with fresh salad and sauces.", burgerImg),
  p("zinger-burger", "Zinger Burger", "burgers", 500, "The classic crunchy chicken fillet burger.", burgerImg, { isPopular: true }),
  p("crispy-fish-burger", "Crispy Fish Burger", "burgers", 750, "Crumbed fish fillet with tartar-style sauce.", burgerImg),
  p("tower-burger", "Tower Burger", "burgers", 900, "Double the layers, double the appetite.", burgerImg, { tags: ["Chef's Pick"] }),
  p("stuff-chinese-burger", "Stuff Ch Chinese Burger", "burgers", 700, "Chinese-style stuffed chicken burger.", burgerImg),

  // THAI / CHINESE
  p("sp-fish-chilli-dry", "Sp. Fish Chilli Dry (with Rice)", "thai-chinese", 1200, "Wok-tossed fish in a dry chilli glaze, served with rice.", chineseImg, { isFeatured: true, tags: ["Chef's Pick"] }),
  p("beef-chilli", "Beef Chilli (with Rice)", "thai-chinese", 1200, "Tender beef strips in a bold chilli sauce with rice.", chineseImg),
  p("chicken-chilli-dry", "Chicken Chilli Dry (with Rice)", "thai-chinese", 1150, "Dry chilli chicken with peppers and onions.", chineseImg, { isPopular: true }),
  p("chicken-shashlik", "Chicken Shashlik (with Rice)", "thai-chinese", 1150, "Skewered chicken and vegetables in shashlik sauce.", chineseImg),
  p("beef-shashlik", "Beef Shashlik (with Rice)", "thai-chinese", 1150, "Beef shashlik with peppers, served with rice.", chineseImg),
  p("dhaka-fish", "Dhaka Fish", "thai-chinese", 1100, "Crisp fish in our Dhaka-style sauce.", chineseImg),
  p("beef-chilli-gravy", "Beef Chilli Gravy", "thai-chinese", 1100, "Saucy beef chilli, rich and warming.", chineseImg),
  p("mongolian-beef", "Mongolian Beef", "thai-chinese", 1100, "Sweet and savoury Mongolian-style beef.", chineseImg),
  p("mongolian-chicken", "Mongolian Chicken", "thai-chinese", 1100, "Glazed Mongolian chicken with spring onion.", chineseImg),
  p("chicken-kung-pao", "Chicken Kung Pao", "thai-chinese", 1100, "Classic Kung Pao with peanuts and dried chillies.", chineseImg),

  // SOUPS
  p("special-soup", "Special Soup", "soups", 180, "House special soup, thick and comforting.", chineseImg, { sizes: soupSizes }),
  p("hot-sour-soup", "Hot & Sour Soup", "soups", 180, "Peppery, tangy and warming.", chineseImg, { sizes: soupSizes }),
  p("chicken-corn-soup", "Chicken Corn Soup", "soups", 180, "The evergreen chicken and sweetcorn favourite.", chineseImg, { sizes: soupSizes, isPopular: true }),
  p("street-style-soup", "Street Style Soup", "soups", 180, "Peshawar street-style soup, extra peppery.", chineseImg, { sizes: soupSizes }),

  // CHOWMEIN
  p("almaidah-special-chowmein", "Al-Maidah Special Chowmein", "chowmein", 750, "Loaded noodles with chicken, egg and vegetables.", chineseImg, { isPopular: true }),
  p("chicken-chowmein", "Chicken Chowmein", "chowmein", 650, "Stir-fried noodles with chicken and crunchy veg.", chineseImg),
  p("thai-spicy-chowmein", "Thai Spicy Chowmein", "chowmein", 650, "Thai-spiced noodles with a proper chilli hit.", chineseImg),
  p("vegetable-chowmein", "Vegetable Chowmein", "chowmein", 550, "Garden vegetables tossed through soft noodles.", chineseImg),

  // RICE
  p("sp-fried-rice", "Sp. Fried Rice", "rice", 550, "Special fried rice with chicken, egg and veg.", chineseImg),
  p("chicken-masala-rice", "Chicken Masala Rice", "rice", 500, "Spiced masala rice with chicken.", chineseImg),
  p("chicken-fried-rice", "Chicken Fried Rice", "rice", 500, "Wok-fried rice with chicken and spring onion.", chineseImg),
  p("egg-fried-rice", "Egg Fried Rice", "rice", 400, "Simple, silky egg fried rice.", chineseImg),
  p("vegetable-fried-rice", "Vegetable Fried Rice", "rice", 350, "Light vegetable fried rice.", chineseImg),
  p("almaidah-special-biryani", "Al-Maidah Special Biryani", "rice", 300, "Layered masala biryani with tender chicken.", karahiImg, { isPopular: true }),
  p("garlic-rice", "Garlic Rice", "rice", 500, "Fragrant garlic-tossed rice.", chineseImg),

  // DESI FOODS
  p("special-fish-karahi", "Special Fish Karahi", "desi", 1400, "Fish cooked karahi-style with tomato and green chilli.", karahiImg),
  p("special-chicken-boneless-handi", "Special Chicken Boneless Handi", "desi", 1300, "Boneless chicken in a rich handi gravy.", karahiImg),
  p("chicken-achari-handi", "Chicken Achari Handi", "desi", 1350, "Tangy achari masala handi.", karahiImg),
  p("chicken-white-handi", "Chicken White Handi", "desi", 1300, "Creamy white handi, mild and rich.", karahiImg),
  p("chicken-jalfrezi", "Chicken Jalfrezi", "desi", 800, "Chicken with peppers in a bright jalfrezi masala.", karahiImg),
  p("chicken-ginger", "Chicken Ginger", "desi", 650, "Ginger-forward chicken, dry and punchy.", karahiImg),
  p("mix-vegetables", "Mix Vegetables", "desi", 250, "Seasonal vegetables in a homely masala.", karahiImg),
  p("chicken-karahi-full", "Chicken Karahi Full", "desi", 1300, "The full karahi — tomatoes, ginger, green chilli.", karahiImg, { isPopular: true, isFeatured: true, tags: ["Best Seller"] }),
  p("chicken-karahi-half", "Chicken Karahi Half", "desi", 650, "Half karahi, full flavour.", karahiImg),
  p("chicken-white-korma", "Chicken White Korma", "desi", 500, "Delicate white korma.", karahiImg),
  p("palak-paneer", "Palak Paneer", "desi", 300, "Spinach and paneer, slow-cooked.", karahiImg),
  p("special-chicken-haleem", "Special Chicken Haleem", "desi", 400, "Slow-cooked haleem with chicken.", karahiImg),
  p("chicken-zaitouni", "Chicken Zaitouni", "desi", 1400, "Olive-infused chicken speciality.", karahiImg),
  p("daal-mash", "Daal Mash", "desi", 300, "Classic mash daal with tarka.", karahiImg),
  p("seekh-kabab-karahi-half", "Seekh Kabab Karahi Half", "desi", 700, "Seekh kababs finished karahi-style.", bbqImg),
  p("seekh-kabab-karahi-full", "Seekh Kabab Karahi Full", "desi", 1300, "Full seekh kabab karahi for the table.", bbqImg),
  p("brain-masala", "Brain Masala", "desi", 700, "Traditional maghaz masala.", karahiImg),

  // PIZZA
  p("almaidah-special-pizza", "Al-Maidah Special Pizza", "pizza", 800, "Our loaded house special pizza.", pizzaImg, { sizes: pizzaSizes(800, 1100, 1600), isPopular: true }),
  p("special-fish-pizza", "Special Fish Pizza", "pizza", 1000, "Seasoned fish, cheese and herbs.", pizzaImg, { sizes: pizzaSizes(1000, 1400, 2000) }),
  p("chicken-chilli-pizza", "Chicken Chilli Pizza", "pizza", 800, "Chilli chicken with mozzarella.", pizzaImg, { sizes: pizzaSizes(800, 1100, 1600) }),
  p("chicken-tikka-pizza", "Chicken Tikka Pizza", "pizza", 800, "Desi tikka chicken on a cheesy base.", pizzaImg, { sizes: pizzaSizes(800, 1100, 1600), isFeatured: true, isPopular: true, tags: ["Best Seller"] }),
  p("bbq-pizza", "BBQ Pizza", "pizza", 800, "Smoky BBQ chicken and onions.", pizzaImg, { sizes: pizzaSizes(800, 1100, 1600) }),
  p("cheese-lover-pizza", "Cheese Lover Pizza", "pizza", 600, "For the cheese-first crowd.", pizzaImg, { sizes: pizzaSizes(600, 900, 1300) }),
  p("smoked-chicken-pizza", "Smoked Chicken Pizza", "pizza", 800, "Smoked chicken, peppers and cheese.", pizzaImg, { sizes: pizzaSizes(800, 1100, 1600) }),
  p("fajita-pizza", "Fajita Pizza", "pizza", 800, "Fajita-spiced chicken with peppers.", pizzaImg, { sizes: pizzaSizes(800, 1100, 1600) }),
  p("vegetable-pizza", "Vegetable Pizza", "pizza", 600, "Fresh vegetables on a crisp base.", pizzaImg, { sizes: pizzaSizes(600, 900, 1300) }),
  p("calzone-pizza", "Calzone Pizza", "pizza", 800, "Folded, stuffed and baked golden.", pizzaImg, { sizes: pizzaSizes(800, 1100, 1600) }),

  // PASTA
  p("almaidah-special-chicken-pasta", "Al-Maidah Special Chicken Pasta", "pasta", 1100, "Creamy signature chicken pasta.", pastaImg, { isFeatured: true, isPopular: true, tags: ["Popular"] }),
  p("chicken-mushroom-lasagne", "Chicken Mushroom Lasagne", "pasta", 1100, "Layered lasagne with chicken and mushroom.", pastaImg),
  p("penne-arrabbiata", "Penne Arrabbiata", "pasta", 1100, "Penne in a spicy tomato sauce.", pastaImg),
  p("penne-smoked-chicken", "Penne with Smoked Chicken", "pasta", 1100, "Smoked chicken penne in a creamy sauce.", pastaImg),

  // BBQ
  p("special-bbq-platter-full", "Special BBQ Platter Full", "bbq", 4500, "A full grill spread for the whole table.", bbqImg, { isFeatured: true, isPopular: true, tags: ["Chef's Pick"] }),
  p("special-bbq-platter-half", "Special BBQ Platter Half", "bbq", 3000, "Half platter of our best from the grill.", bbqImg),
  p("namakdan-chicken", "Namakdan Chicken", "bbq", 1100, "Salt-cured grilled chicken speciality.", bbqImg),
  p("chicken-pieces-breast", "Chicken Pieces Breast (1 Piece)", "bbq", 1100, "Grilled chicken breast piece.", bbqImg),
  p("chicken-boti", "Chicken Boti (1 Seekh)", "bbq", 1100, "Charred chicken boti on a skewer.", bbqImg),
  p("chicken-malai-boti", "Chicken Malai Boti (1 Seekh)", "bbq", 1200, "Creamy malai boti, soft and mild.", bbqImg),
  p("beef-seekh-kabab", "Beef Seekh Kabab (1 Seekh)", "bbq", 1000, "Spiced minced beef seekh kabab.", bbqImg),
  p("chicken-pieces-leg", "Chicken Pieces Leg (1 Piece)", "bbq", 1000, "Grilled chicken leg piece.", bbqImg),
  p("reshmi-kabab", "Reshmi Kabab (1 Seekh)", "bbq", 1000, "Silky reshmi kabab.", bbqImg),
  p("afghani-tikka-half", "Afghani Tikka (2 Seekh Half)", "bbq", 900, "Afghani-style tikka, half serving.", bbqImg),
  p("afghani-tikka-full", "Afghani Tikka (2 Seekh Full)", "bbq", 1200, "Afghani-style tikka, full serving.", bbqImg),
  p("gola-kabab", "Gola Kabab (1 Seekh)", "bbq", 1000, "Smoky, melt-in-mouth gola kabab.", bbqImg),

  // NAAN + NAAN STOP
  p("naan", "Naan", "naan", 30, "Fresh tandoori naan.", naanImg),
  p("chicken-cheese-naan", "Chicken Cheese Naan", "naan", 360, "Stuffed with chicken and a generous cheese pull.", naanImg, { isFeatured: true, isPopular: true, tags: ["Best Seller", "Naan Stop"] }),
  p("pizza-naan", "Pizza Naan", "naan", 390, "Pizza toppings baked into fresh naan.", naanImg, { tags: ["Naan Stop"] }),
  p("pepperoni-naan", "Pepperoni Naan", "naan", 340, "Pepperoni and cheese stuffed naan.", naanImg, { tags: ["Naan Stop"] }),
  p("chicken-naan", "Chicken Naan", "naan", 290, "Simple, spiced chicken stuffed naan.", naanImg, { tags: ["Naan Stop"] }),
  p("chicken-olives-naan", "Chicken Olives", "naan", 320, "Chicken and olives baked into naan.", naanImg, { tags: ["Naan Stop"] }),
  p("nutella-naan", "Nutella Naan", "naan", 450, "Warm naan with a chocolate hazelnut centre.", naanImg, { tags: ["Naan Stop"] }),
  p("chicken-achari-naan", "Chicken Achari Naan", "naan", 280, "Tangy achari chicken stuffed naan.", naanImg, { tags: ["Naan Stop"] }),
  p("roghni-naan", "Roghni Naan", "naan", 100, "Buttery sesame-topped roghni naan.", naanImg, { tags: ["Naan Stop"] }),

  // SALADS
  p("fresh-green-salad", "Fresh Green Salad", "salads", 150, "Crisp seasonal salad.", heroFood),
  p("raita", "Raita", "salads", 70, "Cool yoghurt raita.", heroFood),

  // COLD DRINKS — prices not published in the supplied menu
  p("pepsi-1-5l", "1.5L Pepsi", "cold-drinks", null, "Chilled 1.5 litre bottle.", heroFood),
  p("7up-1-5l", "1.5L 7Up", "cold-drinks", null, "Chilled 1.5 litre bottle.", heroFood),
  p("drink-1l", "1L Drink", "cold-drinks", null, "One litre soft drink.", heroFood),
  p("juice", "Juice", "cold-drinks", null, "Chilled juice.", heroFood),
  p("sting-500ml", "500ml Sting", "cold-drinks", null, "500ml energy drink.", heroFood),
  p("mineral-water-small", "Small Mineral Water", "cold-drinks", null, "Small bottled water.", heroFood),
  p("mineral-water-large", "Large Mineral Water", "cold-drinks", null, "Large bottled water.", heroFood),
  p("fresh-lime", "Fresh Lime", "cold-drinks", null, "Freshly squeezed lime drink.", heroFood),

  // SPECIAL AFGHANI MENU — prices to be confirmed by the café
  p("seekh-kabab-platter", "Seekh Kabab Platter", "afghani", null, "Afghani-style seekh kabab platter.", bbqImg, { tags: ["New"] }),
  p("beef-makhani-gosht", "Beef Makhani Gosht", "afghani", null, "Slow-cooked beef in rich makhani gravy.", karahiImg, { tags: ["New"] }),
  p("chicken-roast", "Chicken Roast", "afghani", null, "Whole roasted chicken, Afghani style.", bbqImg, { tags: ["New"] }),
];

export const getProduct = (id: string) => PRODUCTS.find((x) => x.id === id) ?? null;

export const productsByCategory = (categoryId: CategoryId | "all") =>
  categoryId === "all" ? PRODUCTS : PRODUCTS.filter((x) => x.category === categoryId);

export const searchProducts = (query: string) => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return PRODUCTS.filter(
    (x) =>
      x.name.toLowerCase().includes(q) ||
      x.description.toLowerCase().includes(q) ||
      x.category.includes(q) ||
      (x.tags ?? []).some((t) => t.toLowerCase().includes(q)),
  );
};

export const FEATURED_PRODUCTS = PRODUCTS.filter((x) => x.isFeatured);
export const NAAN_STOP_PRODUCTS = PRODUCTS.filter((x) => (x.tags ?? []).includes("Naan Stop"));
export const AFGHANI_PRODUCTS = PRODUCTS.filter((x) => x.category === "afghani");

/** Bundle deals — priced only from the published item prices, no invented discounts. */
export type Deal = {
  id: string;
  title: string;
  includes: string[];
  image: string;
  productIds: string[];
};

export const DEALS: Deal[] = [
  {
    id: "deal-naan-night",
    title: "Naan Stop Night",
    includes: ["Chicken Cheese Naan", "Pizza Naan", "Chicken Achari Naan"],
    image: naanImg,
    productIds: ["chicken-cheese-naan", "pizza-naan", "chicken-achari-naan"],
  },
  {
    id: "deal-family-desi",
    title: "Family Desi Feast",
    includes: ["Chicken Karahi Full", "4x Naan", "Fresh Green Salad", "Raita"],
    image: karahiImg,
    productIds: ["chicken-karahi-full", "naan", "fresh-green-salad", "raita"],
  },
  {
    id: "deal-burger-squad",
    title: "Burger Squad",
    includes: ["Al-Maidah Special Burger", "Zinger Burger", "French Fries"],
    image: burgerImg,
    productIds: ["almaidah-special-burger", "zinger-burger", "french-fries"],
  },
  {
    id: "deal-pizza-party",
    title: "Pizza Party",
    includes: ["Chicken Tikka Pizza (Large)", "Cheese Lover Pizza (Medium)"],
    image: pizzaImg,
    productIds: ["chicken-tikka-pizza", "cheese-lover-pizza"],
  },
];

export const dealTotal = (deal: Deal) =>
  deal.productIds.reduce((sum, id) => {
    const item = getProduct(id);
    return sum + (item?.price ?? 0);
  }, 0);
