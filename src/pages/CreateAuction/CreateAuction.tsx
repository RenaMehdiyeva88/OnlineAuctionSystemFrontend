import { useEffect, useRef, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import auctionApi from "@/api/auctionApi";
import categoryApi from "@/api/categoryApi";
import aiApi from "@/api/aiApi";
import type { Category } from "@/models/Category";
import { InputField, SelectField, TextareaField } from "@/components/common/FormField";
import Button from "@/components/common/Button";
import ErrorBanner from "@/components/common/ErrorBanner";
import { extractErrorMessage } from "@/api/axiosClient";
import { validateRequired, validatePositivePrice, validateFutureDateTime } from "@/utils/validators";
import { useI18n } from "@/context/I18nContext";
import { pickImageForListing } from "@/utils/imageFallback";
import "./CreateAuction.css";

export default function CreateAuction() {
  const navigate = useNavigate();
  const { t, language } = useI18n();
  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [startingPrice, setStartingPrice] = useState("");
  const [endTime, setEndTime] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [aiNote, setAiNote] = useState<string | null>(null);
  // Last AI-generated random idea, to tell "untouched idea" from text the seller wrote.
  const shownTitlesRef = useRef<string[]>([]);
  const lastIdeaRef = useRef<{ title: string; description: string } | null>(null);

  useEffect(() => {
    categoryApi.getAll().then(setCategories).catch(() => setCategories([]));
  }, []);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setIsUploading(true);
    try {
      const url = await auctionApi.uploadImage(file);
      const apiOrigin = new URL(import.meta.env.VITE_API_BASE_URL ?? "https://localhost:7201/api").origin;
      setImageUrl(`${apiOrigin}${url}`);
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setIsUploading(false);
    }
  }

  async function handleSuggestWithAi() {
    // If the form still holds the last AI-generated idea untouched, treat it
    // as empty so pressing the button again gives a NEW idea. Text the seller
    // typed or edited goes through the normal "suggest from my text" path.
    const lastIdea = lastIdeaRef.current;
    const isUntouchedIdea = !!lastIdea && title === lastIdea.title && description === lastIdea.description;
    const sellerInput = isUntouchedIdea ? "" : `${title} ${description}`.trim();

    setError(null);
    setAiNote(null);
    setIsSuggesting(true);
    try {
      // The language model invents the listing; we only tell it which ideas
      // were already shown so repeated clicks give something new.
      const suggestion = await aiApi.suggestListing(sellerInput, language, shownTitlesRef.current);

      // Every suggestion is pre-filled into the normal, still-editable form
      // fields — nothing is saved until the seller reviews and submits the
      // form themselves. Each field only overwrites if the AI actually had
      // a suggestion for it (fields can come back null).
      if (suggestion.suggestedTitle) setTitle(suggestion.suggestedTitle);
      if (suggestion.suggestedDescription) setDescription(suggestion.suggestedDescription);
      if (suggestion.suggestedCategoryId) setCategoryId(suggestion.suggestedCategoryId);
      if (suggestion.suggestedStartingPrice != null) {
        setStartingPrice(String(suggestion.suggestedStartingPrice));
      }

      if (suggestion.suggestedTitle && suggestion.suggestedDescription) {
        lastIdeaRef.current = { title: suggestion.suggestedTitle, description: suggestion.suggestedDescription };
        shownTitlesRef.current = [...shownTitlesRef.current, suggestion.suggestedTitle].slice(-8);

        // A random idea comes complete: if no closing time is set yet, default
        // to 3 days from now (local time, format of <input type="datetime-local">).
        if (!endTime) {
          const d = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
          const pad = (n: number) => String(n).padStart(2, "0");
          setEndTime(`${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`);
        }

        // Add a photo of the same kind of item from the project's local
        // gallery — or none if nothing matches (never a random, wrong photo).
        // An image the seller uploaded themselves is never replaced.
        if (!imageUrl || imageUrl.includes("/images/lots/")) {
          const picture = pickImageForListing(suggestion.suggestedTitle, suggestion.suggestedDescription);
          setImageUrl(picture ? `${window.location.origin}${picture}` : "");
        }
      }
      setAiNote(suggestion.note);
    } catch (err) {
      setError(extractErrorMessage(err) || t.pages.createAuctionAiError);
    } finally {
      setIsSuggesting(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const validationError =
      validateRequired(title, t.pages.createAuctionValidationTitle) ??
      validateRequired(description, t.pages.createAuctionValidationDescription) ??
      validatePositivePrice(startingPrice, t.pages.createAuctionValidationPrice) ??
      validateFutureDateTime(endTime, t.pages.createAuctionValidationEndTime) ??
      (categoryId ? null : t.pages.createAuctionValidationCategory);

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

  const minDateTime = new Date(Date.now() + 5 * 60 * 1000).toISOString().slice(0, 16);

  return (
    <div className="container create-auction">
      <span className="eyebrow">{t.pages.createAuctionEyebrow}</span>
      <h1>{t.pages.createAuctionTitle}</h1>
      <p>{t.pages.createAuctionSubtitle}</p>

      {error ? <ErrorBanner message={error} /> : null}

      <form className="create-auction__form" onSubmit={handleSubmit}>
        <InputField
          label={t.pages.createAuctionTitleField}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          maxLength={200}
          placeholder={t.pages.createAuctionTitlePlaceholder}
        />

        <TextareaField
          label={t.pages.createAuctionDescription}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          maxLength={4000}
          placeholder={t.pages.createAuctionDescPlaceholder}
        />

        <div className="create-auction__ai">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            isLoading={isSuggesting}
            onClick={handleSuggestWithAi}
          >
            {isSuggesting ? t.ui.aiGenerating : t.pages.createAuctionAiSuggest}
          </Button>
          <p className="field__hint">{aiNote ?? t.pages.createAuctionAiHint}</p>
        </div>

        <div className="field">
          <label className="field__label">{t.pages.createAuctionImage}</label>
          <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} disabled={isUploading} />
          {isUploading ? <p className="field__hint">{t.ui.uploading}</p> : null}
          {imageUrl ? (
            <img src={imageUrl} alt="" style={{ maxWidth: 200, marginTop: 8, borderRadius: 8, display: "block" }} />
          ) : null}
        </div>

        <div className="create-auction__row">
          <InputField
            label={t.pages.createAuctionStartingPrice}
            type="number"
            min={0.01}
            step="0.01"
            value={startingPrice}
            onChange={(e) => setStartingPrice(e.target.value)}
            required
          />
          <SelectField label={t.pages.createAuctionCategory} value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
            <option value="">{t.pages.createAuctionCategoryPlaceholder}</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </SelectField>
        </div>

        <InputField
          label={t.pages.createAuctionEndTime}
          type="datetime-local"
          value={endTime}
          min={minDateTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />

        <Button type="submit" size="lg" isLoading={isSubmitting} disabled={isUploading}>
          {t.pages.createAuctionPublish}
        </Button>
      </form>
    </div>
  );
}