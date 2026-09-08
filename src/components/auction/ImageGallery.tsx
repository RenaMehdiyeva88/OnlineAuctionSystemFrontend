import { useState, useEffect } from "react";
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
        <p>No images available</p>
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
          aria-label="Previous image"
          disabled={images.length <= 1}
        >
          <span className="gallery-nav__icon">‹</span>
        </button>

        <div className="gallery-main">
          <img
            src={images[currentIndex]}
            alt={`${title} - Image ${currentIndex + 1} of ${images.length}`}
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
          aria-label="Next image"
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
                aria-label={`View image ${index + 1}`}
              >
                <img src={image} alt={`Thumbnail ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Info */}
      <div className="gallery-info">
        <p className="gallery-info__text">
          Use arrow keys or buttons to navigate
        </p>
      </div>
    </div>
  );
}
