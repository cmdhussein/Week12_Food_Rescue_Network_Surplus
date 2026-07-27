/*
 * ============================================================
 *  Food Rescue Network - sample listing data
 * ============================================================
 *
 *  This is FICTIONAL data written for a classroom prototype.
 *  The providers, neighbourhoods and pickup times are made up.
 *
 *  BOARD_TIME is a fixed "right now" for the whole app. We do NOT
 *  use new Date() for the current time, because then the board would
 *  look different for every student (and different every hour of the
 *  day). Freezing the clock means everybody sees the same three
 *  "Closing Soon" listings, so screenshots and grading match.
 *
 *  READ this file to understand the shape of a listing object,
 *  but do NOT edit it. Your components should work with the data
 *  exactly as it is here.
 *
 *  At the BOTTOM of this file there is also a helper you will want:
 *  isListingClosingSoon(listing) -> true or false. Use it instead of
 *  working out the two-hour rule yourself.
 * ============================================================
 */

// The moment the board is "opened". Every time calculation compares
// a listing's availableUntil against this fixed value.
export const BOARD_TIME = new Date("2026-01-15T15:00:00");

/*
 * Each listing object has exactly these keys:
 *
 *   id                  number  - unique, use it as your .map() key
 *   title               string  - what the food is
 *   provider            string  - who is donating it
 *   category            string  - Bakery | Produce | Prepared Meals | Dairy | Pantry | Protein
 *   portions            number  - roughly how many people it feeds
 *   pickupNeighborhood  string  - where to collect it
 *   availableUntil      string  - ISO date string, the collection deadline
 *   allergens           array   - strings; may be empty
 *   storageInstructions string  - how to keep it safe on the way
 *   description         string  - a sentence for the collector
 *   imageUrl            string  - path into /public/images
 *   status              string  - "Available"
 *   featured            boolean - highlighted by the coordinators
 */
export const foodListings = [
  {
    id: 1,
    title: "Day-End Bread & Pastries",
    provider: "Sunrise Bakery",
    category: "Bakery",
    portions: 24,
    pickupNeighborhood: "Riverside",
    availableUntil: "2026-01-15T16:30:00",
    allergens: ["Wheat", "Eggs"],
    storageInstructions: "Keep dry; room temperature is fine today.",
    description: "Fresh loaves, rolls and pastries from this morning's bake.",
    imageUrl: "/images/bread.svg",
    status: "Available",
    featured: false,
  },
  {
    id: 2,
    title: "Surplus Garden Vegetables",
    provider: "Greenline Grocers",
    category: "Produce",
    portions: 40,
    pickupNeighborhood: "Cedar Flats",
    availableUntil: "2026-01-15T20:00:00",
    allergens: [],
    storageInstructions: "Refrigerate on arrival; best used within three days.",
    description: "Carrots, greens and root vegetables in good condition.",
    imageUrl: "/images/vegetables.svg",
    status: "Available",
    featured: true,
  },
  {
    id: 3,
    title: "Catered Lunch Trays",
    provider: "Northside Conference Center",
    category: "Prepared Meals",
    portions: 60,
    pickupNeighborhood: "Downtown Core",
    availableUntil: "2026-01-15T16:45:00",
    allergens: ["Dairy", "Soy"],
    storageInstructions: "Keep chilled below 4C. Reheat thoroughly before serving.",
    description: "Untouched catering trays from a cancelled afternoon session.",
    imageUrl: "/images/lunch-trays.svg",
    status: "Available",
    featured: true,
  },
  {
    id: 4,
    title: "Chilled Dairy Crates",
    provider: "Lakeview Market",
    category: "Dairy",
    portions: 18,
    pickupNeighborhood: "Lakeview",
    availableUntil: "2026-01-16T09:00:00",
    allergens: ["Dairy"],
    storageInstructions: "Must stay refrigerated the whole way. Bring a cooler.",
    description: "Milk, yoghurt and butter approaching their sell-by date.",
    imageUrl: "/images/dairy.svg",
    status: "Available",
    featured: false,
  },
  {
    id: 5,
    title: "Rice, Lentils & Pantry Staples",
    provider: "Horn Market Co-op",
    category: "Pantry",
    portions: 75,
    pickupNeighborhood: "Cedar Flats",
    availableUntil: "2026-01-16T18:00:00",
    allergens: ["Sesame"],
    storageInstructions: "Shelf stable. Store somewhere cool and dry.",
    description: "Sealed bags of rice, lentils and spices from an overstocked order.",
    imageUrl: "/images/pantry.svg",
    status: "Available",
    featured: false,
  },
  {
    id: 6,
    title: "Restaurant Soup & Stew",
    provider: "Hooyo's Kitchen",
    category: "Prepared Meals",
    portions: 30,
    pickupNeighborhood: "Riverside",
    availableUntil: "2026-01-15T16:00:00",
    allergens: ["Celery"],
    storageInstructions:
      "Still hot. Transfer to sealed containers and chill or serve today.",
    description:
      "Large batches of vegetable soup and beef stew made fresh this morning.",
    imageUrl: "/images/soup.svg",
    status: "Available",
    featured: false,
  },
  {
    id: 7,
    title: "Fresh Fruit Cases",
    provider: "Orchard Lane Distributors",
    category: "Produce",
    portions: 52,
    pickupNeighborhood: "West End",
    availableUntil: "2026-01-15T22:00:00",
    allergens: [],
    storageInstructions: "Keep out of direct sun. Sort ripe fruit first.",
    description: "Apples, bananas and oranges from a rejected wholesale shipment.",
    imageUrl: "/images/fruit.svg",
    status: "Available",
    featured: true,
  },
  {
    id: 8,
    title: "Halal Chicken Portions",
    provider: "Barakah Butchers",
    category: "Protein",
    portions: 36,
    pickupNeighborhood: "Downtown Core",
    availableUntil: "2026-01-16T12:00:00",
    allergens: [],
    storageInstructions: "Frozen solid. Keep frozen until you are ready to cook.",
    description: "Frozen halal chicken portions, individually wrapped.",
    imageUrl: "/images/chicken.svg",
    status: "Available",
    featured: false,
  },
];

/*
 * PROVIDED — the "closing soon" rule, so it is written once and used in
 * both the card and the board stats. A listing is closing soon when its
 * pickup window has not already passed and ends within two hours of
 * BOARD_TIME. Compared against BOARD_TIME, never new Date().
 */
const TWO_HOURS_IN_MS = 2 * 60 * 60 * 1000;

export function isListingClosingSoon(listing) {
  const gap = new Date(listing.availableUntil) - BOARD_TIME;
  return gap > 0 && gap <= TWO_HOURS_IN_MS;
}
