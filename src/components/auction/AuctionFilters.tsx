import { useState, type FormEvent } from "react";
import type { Category } from "@/models/Category";
import type { AuctionSearchParams } from "@/models/Auction";
import Button from "@/components/common/Button";
import { useI18n } from "@/context/I18nContext";
import { validatePriceRange } from "@/utils/validators";
import "./AuctionFilters.css";

interface AuctionFiltersProps {
  categories: Category[];
  initialValues?: AuctionSearchParams;
  onApply: (params: AuctionSearchParams) => void;
}

// F8: category-based browsing and search with price range filter
export default function AuctionFilters({ categories, initialValues, onApply }: AuctionFiltersProps) {
  const { t } = useI18n();
  const [keyword, setKeyword] = useState(initialValues?.keyword ?? "");
  const [categoryId, setCategoryId] = useState(initialValues?.categoryId ?? "");
  const [minPrice, setMinPrice] = useState(initialValues?.minPrice?.toString() ?? "");
  const [maxPrice, setMaxPrice] = useState(initialValues?.maxPrice?.toString() ?? "");
  const [rangeError, setRangeError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const validationError = validatePriceRange(minPrice, maxPrice);
    if (validationError) {
      setRangeError(validationError);
      return;
    }

    setRangeError(null);
    onApply({
      keyword: keyword.trim() || undefined,
      categoryId: categoryId || undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    });
  }

  function handleReset() {
    setKeyword("");
    setCategoryId("");
    setMinPrice("");
    setMaxPrice("");
    setRangeError(null);
    onApply({});
  }

  return (
    <form className="auction-filters" onSubmit={handleSubmit}>
      <input
        className="auction-filters__search"
        type="search"
        placeholder={t.ui.filterSearchPlaceholder}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        aria-label={t.ui.filterSearchAria}
      />

      <select
        className="auction-filters__select"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        aria-label={t.ui.filterCategoryAria}
      >
        <option value="">{t.ui.filterAllCategories}</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <div className="auction-filters__price">
        <input
          type="number"
          min={0}
          placeholder={t.ui.filterMinPlaceholder}
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          aria-label={t.ui.filterMinAria}
        />
        <span>–</span>
        <input
          type="number"
          min={0}
          placeholder={t.ui.filterMaxPlaceholder}
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          aria-label={t.ui.filterMaxAria}
        />
      </div>

      <div className="auction-filters__actions">
        <Button type="submit" size="sm">
          {t.ui.filterApply}
        </Button>
        <Button type="button" size="sm" variant="ghost" onClick={handleReset}>
          {t.ui.filterReset}
        </Button>
      </div>
      {rangeError ? <span className="auction-filters__error">{rangeError}</span> : null}
    </form>
  );
}