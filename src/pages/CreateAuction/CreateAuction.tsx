import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import auctionApi from "@/api/auctionApi";
import categoryApi from "@/api/categoryApi";
import type { Category } from "@/models/Category";
import { InputField, SelectField, TextareaField } from "@/components/common/FormField";
import Button from "@/components/common/Button";
import ErrorBanner from "@/components/common/ErrorBanner";
import { extractErrorMessage } from "@/api/axiosClient";
import { validateRequired, validatePositivePrice, validateFutureDateTime } from "@/utils/validators";
import { useI18n } from "@/context/I18nContext";
import "./CreateAuction.css";

export default function CreateAuction() {
  const navigate = useNavigate();
  const { t } = useI18n();
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

        <div className="field">
          <label className="field__label">{t.pages.createAuctionImage}</label>
          <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} disabled={isUploading} />
          {isUploading ? <p className="field__hint">Uploading…</p> : null}
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