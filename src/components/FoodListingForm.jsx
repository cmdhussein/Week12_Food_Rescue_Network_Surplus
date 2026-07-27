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

function FoodListingForm({ onAddListing }) {
  return (
    <section className="post-panel">
      <h2 className="post-panel-title">Post surplus food</h2>
      <p className="post-panel-intro">
        Fields marked * are required. Your listing goes straight onto the board.
      </p>

      <form className="listing-form" noValidate>
        <p className="post-panel-intro">Replace this message with your form fields.</p>
      </form>
    </section>
  );
}

export default FoodListingForm;
