/*
 * ============================================================
 *  Food Rescue Network - board options
 * ============================================================
 *
 *  PROVIDED for Week 12. Read this file so you know what it
 *  hands you, but you should not need to change it.
 *
 *  Everything the form and the filter bar offer as a choice
 *  lives here, in one place. That matters: the category list
 *  in the "Post surplus food" form and the category list in
 *  the filter bar are the SAME array, so the two can never
 *  drift apart and offer different options.
 *
 *  Notice that the category list is not typed out by hand. It
 *  is read out of the listing data itself, so it is always
 *  right about how many categories exist, even if the data
 *  changes later. Never hard-code the categories in your
 *  components - import LISTING_CATEGORIES instead.
 * ============================================================
 */

import { foodListings } from "./foodListings.js";

/*
 * Every category that actually appears in the data, in the order
 * it first shows up. A Set drops the repeats, and the spread turns
 * it back into a plain array we can .map() over in JSX.
 *
 * Today that is: Bakery, Produce, Prepared Meals, Dairy, Pantry, Protein.
 */
export const LISTING_CATEGORIES = [
  ...new Set(foodListings.map((listing) => listing.category)),
];

/*
 * The full life of a listing on the board. Week 12 only gives you
 * buttons for the first two - "Collected" is here because the status
 * filter should offer the whole set, and a later week adds the button
 * that moves a listing into it.
 */
export const LISTING_STATUSES = ["Available", "Reserved", "Collected"];

/*
 * One picture per category, using the artwork already in /public/images.
 */
export const CATEGORY_IMAGES = {
  Bakery: "/images/bread.svg",
  Produce: "/images/vegetables.svg",
  "Prepared Meals": "/images/lunch-trays.svg",
  Dairy: "/images/dairy.svg",
  Pantry: "/images/pantry.svg",
  Protein: "/images/chicken.svg",
};

// Used when a category has no artwork of its own, so a card never
// renders a broken image.
export const FALLBACK_IMAGE = "/images/pantry.svg";

/*
 * The form does not ask providers for a photo - people posting
 * surplus food in a hurry should not have to find one. So a new
 * listing borrows the artwork for its category, and falls back to
 * the pantry shelf picture if the category is unknown or missing.
 */
export function getCategoryImage(category) {
  return CATEGORY_IMAGES[category] || FALLBACK_IMAGE;
}
