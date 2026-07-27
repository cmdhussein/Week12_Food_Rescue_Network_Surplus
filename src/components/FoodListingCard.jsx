import { useState } from "react";
import { isListingClosingSoon } from "../data/foodListings.js";

function FoodListingCard({ listing, onDelete }) {
  const [showDetails, setShowDetails] = useState(false);

  const isClosingSoon = isListingClosingSoon(listing);
  const hasAllergens = listing.allergens.length > 0;
  const cardClassName =
    "listing-card" +
    (isClosingSoon ? " listing-card--closing" : "") +
    (listing.featured ? " listing-card--featured" : "");
  const detailsId = `listing-details-${listing.id}`;

  return (
    <article className={cardClassName}>
      <div className="listing-media">
        <img src={listing.imageUrl} alt={`${listing.title} donated by ${listing.provider}`} />
        <div className="listing-media-tag">{listing.portions} portions</div>
      </div>

      <div className="listing-body">
        <h2 className="listing-title">{listing.title}</h2>
        <p className="listing-provider">{listing.provider}</p>

        <div className="badge-row">
          <span className="badge badge--category">{listing.category}</span>
          <span className={"badge badge--" + listing.status.toLowerCase()}>{listing.status}</span>
          {isClosingSoon && <span className="badge badge--closing">Closing Soon</span>}
          {listing.featured && <span className="badge badge--featured">Featured</span>}
          {listing.postedByMe && <span className="badge badge--mine">Your listing</span>}
        </div>

        <div className="listing-meta">
          <span className="listing-meta-item">
            <span aria-hidden="true">📍</span>
            {listing.pickupNeighborhood}
          </span>
          <span className="listing-meta-item">
            <span aria-hidden="true">🍽️</span>
            Feeds about {listing.portions}
          </span>
        </div>

        <button
          type="button"
          className="details-button"
          onClick={() => setShowDetails((prev) => !prev)}
          aria-expanded={showDetails}
          aria-controls={detailsId}
        >
          {showDetails ? "Hide pickup details" : "Show pickup details"}
        </button>

        {showDetails && (
          <div className="listing-details" id={detailsId}>
            <div className="detail-row">
              <span className="detail-label">About</span>
              <span className="detail-value">{listing.description || "No description provided."}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Neighbourhood</span>
              <span className="detail-value">{listing.pickupNeighborhood}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Storage</span>
              <span className="detail-value">{listing.storageInstructions}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Allergens</span>
              {hasAllergens ? (
                <div className="allergen-row">
                  {listing.allergens.map((allergen) => (
                    <span className="allergen-chip" key={allergen}>{allergen}</span>
                  ))}
                </div>
              ) : (
                <span className="allergen-none">No listed allergens</span>
              )}
            </div>
          </div>
        )}

        {onDelete && listing.postedByMe && (
          <div className="listing-actions">
            <button
              type="button"
              className="action-button action-button--delete"
              onClick={() => onDelete(listing.id)}
              aria-label={`Delete ${listing.title}`}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

export default FoodListingCard;
