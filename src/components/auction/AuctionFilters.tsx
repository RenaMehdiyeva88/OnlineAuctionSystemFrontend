import { useState, type FormEvent } from "react";
import type { Category } from "@/models/Category";
import type { AuctionSearchParams } from "@/models/Auction";
import Button from "@/components/common/Button";
import { validatePriceRange } from "@/utils/validators";
import "./AuctionFilters.css";

interface AuctionFiltersProps {
  categories: Category[];
  initialValues?: AuctionSearchParams;
  onApply: (params: AuctionSearchParams) => void;
}

// F8: category-based browsing and search with price range filter
export default function AuctionFilters({ categories, initialValues, onApply }: AuctionFiltersProps) {
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
        placeholder="Search lots by title…"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        aria-label="Search by title"
      />

      <select
        className="auction-filters__select"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        aria-label="Filter by category"
      >
        <option value="">All categories</option>
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
          placeholder="Min $"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          aria-label="Minimum price"
        />
        <span>–</span>
        <input
          type="number"
          min={0}
          placeholder="Max $"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          aria-label="Maximum price"
        />
      </div>

      <div className="auction-filters__actions">
        <Button type="submit" size="sm">
          Apply filters
        </Button>
        <Button type="button" size="sm" variant="ghost" onClick={handleReset}>
          Reset
        </Button>
      </div>
      {rangeError ? <span className="auction-filters__error">{rangeError}</span> : null}
    </form>
  );
}