import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../Style/Loader.css";

// CategoriesCards component with API call to fetch category-specific properties
const CategoriesCards = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_ROUTE}/api/property/fetch/${categoryId}`
        );
        console.log("API Response Data:", response.data);
        setCards(response.data);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchProperties();
    } else {
      setError("Category ID is missing.");
      setLoading(false);
    }
  }, [categoryId]);

  const truncateDescription = (htmlString, maxLength) => {
    const plainText = htmlString.replace(/<[^>]+>/g, "");
    return plainText.length > maxLength
      ? plainText.substring(0, maxLength) + "..."
      : plainText;
  };

  const handleReadMore = (card) => {
    navigate(`/property/${card._id}`, { state: { card } });
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="custom-spinner"></div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <div className="row">
        {cards.map((card) => (
          <div className="px-3 mb-4 col-lg-3 col-md-4 col-sm-6" key={card._id}>
            <div className="card h-100">
              <a
                href={card.property_images[0]}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="card-img-top img-fluid h-60"
                  loading="lazy"
                  decoding="async"
                  src={card.property_images[0] || "default-image.jpg"}
                  alt={card.title}
                />
              </a>
              <div className="card-body">
                <h5 className="card-title">{card.title}</h5>
                <p className="card-text">{card.location}</p>
                <p
                  className="card-text"
                  dangerouslySetInnerHTML={{
                    __html: truncateDescription(card.description, 50),
                  }}
                ></p>
                <p className="card-text">
                  <strong>Type:</strong> {card.type}
                </p>
                <p className="card-text">
                  <strong>Price:</strong> ₹{card.price}
                </p>
                <div className="d-flex justify-content-between">
                  <p className="card-text">
                    <strong>Area:</strong> {card.area}
                  </p>
                </div>
                <button
                  className="mt-2 btn w-100 btn-outline-secondary"
                  onClick={() => handleReadMore(card)}
                >
                  Read More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesCards;
