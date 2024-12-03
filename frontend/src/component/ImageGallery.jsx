import React, { useState } from "react";
import "../Style/img.css"
const ImageGallery = () => {
  const images = [
    "https://m.media-amazon.com/images/I/51pdwNbBDML._SX522_.jpg",
    "https://m.media-amazon.com/images/I/41hQxF8U2BL._SX425_.jpg",
    "https://m.media-amazon.com/images/I/51oHf1RAbAL._SX425_.jpg",
    "https://m.media-amazon.com/images/I/51oHf1RAbAL._SX425_.jpg",
    
    
  ];

  const [mainImage, setMainImage] = useState(images[0]);

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  return (
    <div className="image-gallery-container">
      {/* Thumbnails Section */}
      <div className="thumbnails-container">
        {images.map((image, index) => (
          <div
            key={index}
            className={`thumbnail ${mainImage === image ? "active" : ""}`}
            onClick={() => handleThumbnailClick(image)}
          >
            <img src={image} alt={`Thumbnail ${index + 1}`} />
          </div>
        ))}
      </div>

      {/* Main Image Display */}
      <div className="main-image-container">
        <img src={mainImage} alt="Main Display" />
      </div>
    </div>
  );
};

export default ImageGallery;
