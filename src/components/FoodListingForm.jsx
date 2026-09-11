// Build the whole form here. Replace the placeholder with your fields.
//   1. useForm() -> register, handleSubmit, reset, errors. Add a Zod schema
//      with zodResolver for validation.
//   2. Schema: title, provider, pickupNeighborhood are required strings; category
//      is required (options from LISTING_CATEGORIES in ../data/listingOptions.js);
//      portions is z.coerce.number().min(1); description is optional.
//   3. Fields go inside <form>: {...register("name")}, a <label>, and an
//      {errors.name && ...} message. Classes: form-field (+ --full), form-label,
//      form-input, form-select, form-textarea, field-error.
//   4. onValid(data): onAddListing(data) then reset() — it appears on the board.

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LISTING_CATEGORIES } from "../data/listingOptions.js";

const listingSchema = z.object({
  title: z.string().min(2).max(100),
  provider: z.string().min(2).max(100),
  pickupNeighborhood: z.string().min(2).max(100),
  category: z.enum(LISTING_CATEGORIES),
  portions: z.coerce.number().min(1),
  description: z.string().max(200).optional()
});

function FoodListingForm({ onAddListing }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(listingSchema),
  });

  const onValid = (data) => {
    onAddListing(data);
    reset();
  };

  return (
    <section className="post-panel">
      <h2 className="post-panel-title">Post surplus food</h2>
      <p className="post-panel-intro">
        Fields marked * are required. Your listing goes straight onto the board.
      </p>

      <form className="listing-form" noValidate>
        onSubmit={handleSubmit(onValid)}

        <div className="form-field">
          <label className="form-label" htmlFor="title">
            Title *
            </label>

          <input
            id="title"
            className="form-input"
            type="text"
            {...register("title")}
          />

          {errors.title && (
            <p className="field-error">{errors.title.message}</p>
          )}
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="provider">
            Provider *
          </label>

          <input
            id="provider"
            className="form-input"
            type="text"
            {...register("provider")}
          />

          {errors.provider && (
            <p className="field-error">{errors.provider.message}</p>
          )}
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="pickupNeighborhood">
            Pickup Neighborhood *
          </label>

          <input
            id="pickupNeighborhood"
            className="form-input"
            type="text"
            {...register("pickupNeighborhood")}
          />

          {errors.pickupNeighborhood && (
            <p className="field-error">{errors.pickupNeighborhood.message}</p>
          )}
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="category">
            Category *
          </label>

          <select
            id="category"
            className="form-select"
            {...register("category")}
          >
            <option value="">Select a category</option>
            {LISTING_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {errors.category && (
            <p className="field-error">{errors.category.message}</p>
          )}
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="portions">
            Portions *
          </label>

          <input
            id="portions"
            className="form-input"
            type="number"
            min="1"
            {...register("portions")}
          />

          {errors.portions && (
            <p className="field-error">{errors.portions.message}</p>
          )}
        </div>

        <div className="form-field form-field--full">
          <label className="form-label" htmlFor="description">
            Description
          </label>

          <textarea
            id="description"
            className="form-textarea"
            {...register("description")}
          />

          {errors.description && (
            <p className="field-error">{errors.description.message}</p>
          )}
        </div>

        <button type="submit" className="form-submit">
          Post Listing
        </button>
      </form>
    </section>
  );
}

export default FoodListingForm;
