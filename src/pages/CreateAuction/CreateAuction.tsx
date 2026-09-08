import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import auctionApi from "@/api/auctionApi";
import categoryApi from "@/api/categoryApi";
import type { Category } from "@/models/Category";
import { InputField, SelectField, TextareaField } from "@/components/common/FormField";
import Button from "@/components/common/Button";
import ErrorBanner from "@/components/common/ErrorBanner";
import { extractErrorMessage } from "@/api/axiosClient";
import { validateRequired, validatePositivePrice, validateFutureDateTime, validateImageUrl } from "@/utils/validators";
import "./CreateAuction.css";

// F2: Sellers create an auction with title, description, image, starting price,
// end time, and category. Route access is already restricted to Sellers via
// <SellerRoute />.
export default function CreateAuction() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [endTime, setEndTime] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    categoryApi.getAll().then(setCategories).catch(() => setCategories([]));
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const validationError =
      validateRequired(title, "Title") ??
      validateRequired(description, "Description") ??
      validateImageUrl(imageUrl) ??
      validatePositivePrice(startingPrice, "Starting price") ??
      validateFutureDateTime(endTime, "Closing date & time") ??
      (categoryId ? null : "Choose a category for your lot.");

    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setIsSubmitting(true);
    try {
      const created = await auctionApi.create({
        title,
        description,
        imageUrl: imageUrl.trim() || null,
        startingPrice: Number(startingPrice),
        endTime: new Date(endTime).toISOString(),
        categoryId,
      });
      navigate(`/auctions/${created.id}`);
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  }

  // Minimum selectable end time is "now" so sellers can't schedule a closed auction.
  const minDateTime = new Date(Date.now() + 5 * 60 * 1000).toISOString().slice(0, 16);

  return (
    <div className="container create-auction">
      <span className="eyebrow">New listing</span>
      <h1>List a new lot</h1>
      <p>Give bidders what they need to trust the listing — clear photos, an honest description, and a fair starting price.</p>

      {error ? <ErrorBanner message={error} /> : null}

      <form className="create-auction__form" onSubmit={handleSubmit}>
        <InputField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          maxLength={200}
          placeholder="e.g. 1970s Leica M4 35mm Camera"
        />

        <TextareaField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          maxLength={4000}
          placeholder="Condition, provenance, included accessories…"
        />

        <InputField
          label="Image URL"
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://…"
          hint="Link to a photo of the item. Optional, but listings with photos get more bids."
        />

        <div className="create-auction__row">
          <InputField
            label="Starting price ($)"
            type="number"
            min={0.01}
            step="0.01"
            value={startingPrice}
            onChange={(e) => setStartingPrice(e.target.value)}
            required
          />
          <SelectField label="Category" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
            <option value="">Select a category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </SelectField>
        </div>

        <InputField
          label="Closing date & time"
          type="datetime-local"
          value={endTime}
          min={minDateTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />

        <Button type="submit" size="lg" isLoading={isSubmitting}>
          Publish lot
        </Button>
      </form>
    </div>
  );
}
