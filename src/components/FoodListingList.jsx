import FoodListingCard from "./FoodListingCard.jsx";

function FoodListingList({ listings, onDelete }) {
  if (listings.length === 0) {
    return (
      <div className="board-grid">
        <p className="board-empty">No listings yet. Post the first one above.</p>
      </div>
    );
  }

  return (
    <div className="board-grid">
      {listings.map((listing) => (
        <FoodListingCard key={listing.id} listing={listing} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default FoodListingList;
