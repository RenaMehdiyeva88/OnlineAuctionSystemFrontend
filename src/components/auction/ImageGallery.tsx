import { useState, useEffect } from "react";
import { useI18n } from "@/context/I18nContext";
import { fmt } from "@/i18n/translations";
import "./ImageGallery.css";

interface ImageGalleryProps {
  images: string[];
  title: string;
  onImageChange?: (index: number) => void;
}

export default function ImageGallery({
  images,
  title,
  onImageChange,
}: ImageGalleryProps) {
  const { t } = useI18n();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    onImageChange?.(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    onImageChange?.(newIndex);
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
    onImageChange?.(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, images.length]);

  if (!images || images.length === 0) {
    return (
      <div className="gallery-empty">
        <div className="gallery-empty__icon">📸</div>
        <p>{t.ui.galleryEmpty}</p>
      </div>
    );
  }

  return (
    <div className="image-gallery">
      {/* Main Image Viewer */}
      <div className="gallery-viewer">
        <button
          className="gallery-nav gallery-nav--prev"
          onClick={handlePrevious}
          aria-label={t.ui.galleryPrev}
          disabled={images.length <= 1}
        >
          <span className="gallery-nav__icon">‹</span>
        </button>

        <div className="gallery-main">
          <img
            src={images[currentIndex]}
            alt={fmt(t.ui.galleryImageAlt, { title, n: currentIndex + 1, total: images.length })}
            className="gallery-main__image"
            loading="lazy"
          />
          <div className="gallery-counter">
            {currentIndex + 1} / {images.length}
          </div>
        </div>

        <button
          className="gallery-nav gallery-nav--next"
          onClick={handleNext}
          aria-label={t.ui.galleryNext}
          disabled={images.length <= 1}
        >
          <span className="gallery-nav__icon">›</span>
        </button>
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="gallery-thumbnails">
          <div className="gallery-thumbnails__scroll">
            {images.map((image, index) => (
              <button
                key={index}
                className={`gallery-thumbnail ${
                  index === currentIndex ? "is-active" : ""
                }`}
                onClick={() => handleThumbnailClick(index)}
                aria-label={fmt(t.ui.galleryViewImage, { n: index + 1 })}
              >
                <img src={image} alt={fmt(t.ui.galleryThumbnail, { n: index + 1 })} />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Info */}
      <div className="gallery-info">
        <p className="gallery-info__text">
          {t.ui.galleryHint}
        </p>
      </div>
    </div>
  );
}
