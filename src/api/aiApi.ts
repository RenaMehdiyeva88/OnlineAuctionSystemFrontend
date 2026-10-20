import axiosClient from "./axiosClient";
import type { AxiosResponse } from "axios";

export interface AiChatResponse {
  reply: string;
}

// Every field is a *suggestion* grounded in real categories and real
// current prices from the backend — any of them can be null if there
// wasn't enough data to suggest it, and the seller can edit all of them
// before saving the auction (see SuggestListingQueryHandler).
export interface AiListingSuggestion {
  suggestedTitle: string | null;
  suggestedCategoryId: string | null;
  suggestedCategoryName: string | null;
  suggestedStartingPrice: number | null;
  note: string;
}

const aiApi = {
  // Backend grounds every answer in real, current auction data (never
  // invents prices/bids/winners) — see AskAiAssistantQueryHandler. Works
  // for both logged-in and anonymous visitors.
  chat: (message: string) =>
    axiosClient
      .post<AiChatResponse>("/ai/chat", { message })
      .then((res: AxiosResponse<AiChatResponse>) => res.data),

  // Seller-only — powers the "Suggest with AI" button on the create-auction
  // form. sellerInput is whatever the seller has typed into title/description
  // so far.
  suggestListing: (sellerInput: string) =>
    axiosClient
      .post<AiListingSuggestion>("/ai/suggest-listing", { sellerInput })
      .then((res: AxiosResponse<AiListingSuggestion>) => res.data),
};

export default aiApi;
