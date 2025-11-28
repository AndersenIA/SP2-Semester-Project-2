import { getAllListings } from "../api/listings.js";
import { renderFeedItems } from "../ui/renderFeed.js";
import { renderPopularItems } from "./renderFeed.js";

export async function loadFeed() {
  try {
    const listings = await getAllListings();

    console.log("Listings loaded:", listings); // <— put BEFORE render

    // Call your existing feed renderer
    renderFeedItems(listings);
    renderPopularItems(listings);
  } catch (error) {
    console.error(error);
  }
}
