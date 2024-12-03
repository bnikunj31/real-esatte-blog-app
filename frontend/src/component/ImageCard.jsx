import  { useState } from "react";

function ImageCard() {
  // Array of image URLs (replace with your own URLs or import the images)
  const images = [
    "https://m.media-amazon.com/images/I/81I8czRpRGL._SX679_.jpg",
    "https://m.media-amazon.com/images/I/41Z7pMrVZfL._SS100_.jpg",
    "https://m.media-amazon.com/images/I/41loD+NHEfL._SS100_.jpg",
    "https://m.media-amazon.com/images/I/416jpMTQ+vL._SS100_.jpg",
  ];

  // State to track the main displayed image
  const [mainImage, setMainImage] = useState(images[0]);

  // Function to change main image when a thumbnail is clicked
  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  return (
    
    <div className="items-center h-full p-4 bg-white">
      <div className="flex flex-col w-full p-4 bg-transparent border border-danger md:flex-row">
        {/* Thumbnails on the left side */}
        <div className="flex flex-col w-full mr-4 space-y-2 sm:w-24 md:w-32 lg:w-40">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => handleThumbnailClick(image)}
              className={`w-16 h-16 object-cover rounded-md cursor-pointer ${
                mainImage === image ? "border-2 border-yellow-500" : ""
              }`}
            />
          ))}
        </div>

        {/* Main Image Display */}
        <div className="flex-grow mt-4 md:mt-0">
          <img
            src={mainImage}
            alt="Main"
            className="object-cover w-full rounded-md h-96"
          />
        </div>

        {/* Description on the right side */}
        <div className="w-full mt-4 md:mt-0 md:ml-4 sm:w-3/4 md:w-2/3 lg:w-1/2">
  <table className="table table-bordered" style={{ maxHeight: "250px", overflowY: "auto" }}>
    <thead >
      <tr>
        <th scope="col">Price:</th>
        <td style={{border:"1px solid"}}>12</td>
      </tr>
      <tr>
        <th scope="col">Area:</th>
        <td>12</td>
      </tr>
      <tr>
        <th scope="col">Location:</th>
        <td>12</td>
      </tr>
      <tr>
        <th scope="col">Type:</th>
        <td>12</td>
      </tr>
      <tr>
        <th scope="col">Status:</th>
        <td>12</td>
      </tr>
    </thead>
  </table>
</div>

      </div>
   
    </div>
  );
}

export default ImageCard;
