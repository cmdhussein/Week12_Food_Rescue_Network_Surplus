# Week 12 — Food Rescue Network: Post Surplus Food 🤝

Last week the board could only be read. This week a provider can **post surplus
food** through a real form — and you're building that form.

Same repo, same data, same stylesheet. **You write the React.** This week's
tools: **React Hook Form** for the form wiring, and **Zod** for validation.

## Setup

1. **Fork** this repository to your own GitHub account (the **Fork** button, top
   right). You need your own copy so you can push your work and submit the link.
2. **Clone your fork** — use *your* username, not the school's:

   ```bash
   git clone https://github.com/YOUR-USERNAME/THIS-REPO.git
   cd THIS-REPO
   ```

3. **Install and run:**

   ```bash
   npm install
   npm run dev
   ```

`npm install` pulls in `react-hook-form`, `@hookform/resolvers`, and `zod`.

Open the URL Vite prints (usually <http://localhost:5173>). You'll see the board
from Week 11 — eight cards and the three stat boxes — plus a **"Post surplus
food"** panel that's empty except for a placeholder message. That's yours to build.

## The data (provided — read, don't edit)

- `src/data/foodListings.js` — the eight listings, and `isListingClosingSoon()`.
- `src/data/listingOptions.js` — `LISTING_CATEGORIES` (the category options) and
  `getCategoryImage()`.

## Your task — build the form

Open `src/components/FoodListingForm.jsx`. You get the `<form>` and a placeholder
message — everything else is yours. The top comment is your work order.

1. **Set up React Hook Form** — import and call `useForm`. Pull `register`,
   `handleSubmit`, `reset`, and `formState: { errors }` off it.
2. **Write a Zod schema** — connect it with `zodResolver`. Keep it basic: the
   required text fields (`title`, `provider`, `pickupNeighborhood`) use
   `z.string().trim().min(1, "message")`, `category` is required, `portions` uses
   `z.coerce.number().min(1, "message")`, and `description` is optional.
3. **Build the fields** — `title`, `provider`, `category` (a `<select>` of
   `LISTING_CATEGORIES`), `portions` (a number), `pickupNeighborhood`, and
   `description` (a textarea). Each is `{...register("name")}` with a `<label>`
   and an `{errors.name && ...}` message. The CSS classes are ready, so it looks
   right with no CSS from you.
4. **Handle submit** — `handleSubmit(onValid)`; on valid, call `onAddListing(data)`
   then `reset()`. `App` already passes `onAddListing` in and owns the board, so
   your validated listing appears at the top with a **"Your listing"** badge. An
   empty submit shows the messages and posts nothing.

When it works: filling the form and submitting adds your listing to the board and
clears the form; an empty submit shows the error messages and posts nothing.

## Stretch goal — delete a listing

Your posted listings show a **Delete** button (the card is already built for it —
it renders when `App` passes a delete handler down). Wire it up:

1. In `App.jsx`, write `handleDeleteListing(id)` — remove that listing with
   `setListings((prev) => prev.filter((listing) => listing.id !== id))`. Never
   mutate the array; `filter` builds a new one.
2. Pass it down: `<FoodListingList listings={listings} onDelete={handleDeleteListing} />`.

Now Delete removes your listing and every stat number updates on its own. That's
the same **lifting state up** loop as posting — the card sends an event *up* to
`App`, which owns the list the whole board reads.
