import { useState } from "react";
import { foodListings, isListingClosingSoon } from "./data/foodListings.js";
import { getCategoryImage } from "./data/listingOptions.js";
import FoodListingForm from "./components/FoodListingForm.jsx";
import FoodListingList from "./components/FoodListingList.jsx";

function App() {
  const [listings, setListings] = useState(foodListings);

  const availableListings = listings.filter((l) => l.status === "Available");
  const availableCount = availableListings.length;
  const availablePortions = availableListings.reduce((sum, l) => sum + l.portions, 0);
  const closingSoonCount = listings.filter(isListingClosingSoon).length;

  // Wired for you: your form's onValid calls this, and the new listing appears.
  function handleAddListing(draft) {
    const newListing = {
      ...draft,
      id: crypto.randomUUID(),
      status: "Available",
      featured: false,
      postedByMe: true,
      allergens: [],
      storageInstructions: "Confirm safe storage with the provider at pickup.",
      imageUrl: getCategoryImage(draft.category),
    };
    setListings((prev) => [newListing, ...prev]);
  }

  // STRETCH: write handleDeleteListing (filter listings by id) and pass it as
  // onDelete to <FoodListingList>. A Delete button then shows on your listings.

  return (
    <div className="board">
      <header className="board-header">
        <p className="board-eyebrow">Community Board</p>
        <h1 className="board-title">Food Rescue Network</h1>
        <p className="board-subtitle">
          Surplus food from local providers. Post what you have to share, and it
          goes straight onto the board for neighbours to collect.
        </p>

        <div className="board-stats">
          <div className="stat">
            <span className="stat-value">{availableCount}</span>
            <span className="stat-label">Listings available now</span>
          </div>
          <div className="stat">
            <span className="stat-value">{availablePortions}</span>
            <span className="stat-label">Portions available now</span>
          </div>
          <div className="stat">
            <span className="stat-value">{closingSoonCount}</span>
            <span className="stat-label">Closing within 2 hours</span>
          </div>
        </div>
      </header>

      <FoodListingForm onAddListing={handleAddListing} />

      <main>
        <FoodListingList listings={listings} />
      </main>

      <footer className="board-footer">
        Food Rescue Network is a classroom prototype for learning React. It
        isn&apos;t a real food-sharing service and makes no food-safety
        guarantees. All providers and neighbourhoods are fictional.
      </footer>
    </div>
  );
}

export default App;
