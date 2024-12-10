import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../Style/PropertyDetail.css";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import Contact1 from "../component/Contacts";

const PropertyDetail = () => {
  const { state } = useLocation();
  const [property, setProperty] = useState(state?.card || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [properties, setProperties] = useState([]);
  const [cards, setCards] = useState([]);
  const [randomProperties, setRandomProperties] = useState([]);
  const removeHtmlTags = (str) => {
    return str.replace(/<[^>]*>/g, "");
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (!property) {
      setLoading(true);
      const fetchPropertyData = async () => {
        try {
          const id = state?.id || "";
          const response = await fetch(
            `${import.meta.env.VITE_API_ROUTE}/api/property/fetch/${id}`
          );
          if (!response.ok) throw new Error("Failed to fetch property details");
          const data = await response.json();
          console.log("response", data);
          setProperty(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchPropertyData();
    }
  }, [property, state]);

  useEffect(() => {
    if (state?.card) {
      console.log(state.card);
      setProperty(state.card);
    }
  }, [state]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_ROUTE}/api/property/fetch`
        );
        if (!response.ok) throw new Error("Failed to fetch properties");
        const data = await response.json();
        setProperties(data);

        // Generate random properties
        const filteredData = data.filter((item) => item._id !== property._id);
        const shuffled = filteredData.sort(() => 0.5 - Math.random());
        setRandomProperties(shuffled.slice(0, 5));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (property?._id) {
      fetchProperties();
    }
  }, [property?._id]);

  if (loading) return <p>Loading properties...</p>;

  if (error) return <p>Error: {error}</p>;

  const displayProperties = cards.length >= 5 ? cards.slice(0, 5) : cards;

  if (loading) return <div>Loading property data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!property) return <div>No property data available.</div>;

  // Handle Click
  const handleClick = (e, id, data) => {
    e.preventDefault();
    console.log(id);
    navigate(`/property/${id}`, { state: { card: data } });
  };

  const {
    name,
    location: propertyLocation,
    description,
    property_images,
    priceAndArea,
    type,
    status,
    property_map,
    property_location_map,
    property_video,
    rating,
  } = property;

  const extractVideoId = (url) => {
    const regExp =
      /^.*(?:youtu.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[1].length === 11 ? match[1] : null;
  };

  const videoId = extractVideoId(property_video);

  const mapCarouselResponsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <div className="container pb-5">
      {/* Property Images (Carousel) */}
      <div
        id="propertyImagesCarousel"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        data-bs-interval="2000"
      >
        <div className="carousel-inner">
          {property_images.map((image, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <img
                src={image}
                className="d-block w-100 img-fluid h-[60vh] object-fit-cover"
                alt={`Property image ${index + 1}`}
                onError={(e) => (e.target.src = "path_to_default_image.jpg")}
              />
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#propertyImagesCarousel"
          data-bs-slide="prev"
          style={{ opacity: 0 }}
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          style={{ opacity: 0 }}
          className="carousel-control-next"
          type="button"
          data-bs-target="#propertyImagesCarousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Property Title and Location */}
      <div className="mb-4 row">
        <div className="col-md-12">
          <h1 className="py-2 fs-1 text-capitalize">{name}</h1>
          <p className="lead text-muted d-flex align-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="black"
              className="bi bi-geo-alt me-2"
              viewBox="0 0 16 16"
            >
              <path d="M8 0C5.243 0 3 2.243 3 5c0 3.034 2.656 5.987 5.8 9.06a.5.5 0 0 0 .4.17.5.5 0 0 0 .4-.17C10.344 10.987 13 8.034 13 5c0-2.757-2.243-5-5-5zm0 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
            </svg>
            <strong>{propertyLocation}</strong>
          </p>
        </div>
      </div>

      {/* Property Description */}
      <div className="mb-4 row">
        <div className="col-md-8">
          <div
            className="description"
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
        </div>
      </div>

      {/* Property Details */}
      <div className="mb-4 row">
        <div className="col-12">
          <div className="table-responsive">
            <table className="table table-bordered w-100">
              <tbody>
                <tr>
                  <th scope="row">Type</th>
                  <td>
                    {Array.isArray(type)
                      ? type.length > 0
                        ? type.map((t) => t.name).join(", ")
                        : "No Type"
                      : type.name || "No Type"}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Status</th>
                  <td>{status}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-12">
          <div className="table-responsive">
            <table className="table table-bordered w-100">
              <tbody>
                <tr>
                  <th scope="row">Area</th>
                  {priceAndArea && priceAndArea.length > 0 ? (
                    priceAndArea.map((item) => (
                      <td key={`area-${item._id}`}>{`${item.area} sq ft.`}</td>
                    ))
                  ) : (
                    <td colSpan="2">No data available</td>
                  )}
                </tr>
                <tr>
                  <th scope="row">Price</th>
                  {priceAndArea && priceAndArea.length > 0 ? (
                    priceAndArea.map((item) => (
                      <td key={`price-${item._id}`}>
                        {item.price > 0
                          ? `₹${item.price}`
                          : "Enquiry For Price"}
                      </td>
                    ))
                  ) : (
                    <td colSpan="2">No data available</td>
                  )}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Ratings */}
      <div className="mb-4 row">
        <div className="col-12">
          <div className="table-responsive">
            <h1 className="fs-2 my-2">{name} Reviews & Ratings</h1>
            <table className="table table-bordered w-100">
              <tbody>
                {rating && rating.length > 0 ? (
                  rating.map((column) => (
                    <tr key={column.key}>
                      <th scope="row">{column.key}</th>
                      <td className="flex gap-2">
                        {Array.from({ length: 5 }, (_, index) => {
                          if (index < column.value) {
                            return (
                              <FaStar key={index} style={{ color: "gold" }} />
                            );
                          } else if (
                            index === Math.floor(column.value) &&
                            column.value % 1 !== 0
                          ) {
                            return (
                              <FaStarHalfAlt
                                key={index}
                                style={{ color: "gold" }}
                              />
                            );
                          } else {
                            return (
                              <FaRegStar
                                key={index}
                                style={{ color: "lightgray" }}
                              />
                            );
                          }
                        })}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      No ratings available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-semibold mb-5">
          Other Properties You Might Like
        </h2>

        <div className=" sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {randomProperties.map((property, index) => (
            <div key={index} className="bg-white rounded-lg  overflow-hidden">
              <div className="p-4">
                <Link
                  to={`/property/${property._id}`}
                  state={{ card: property }}
                  className="text-xl font-semibold text-blue-500 mb-2 block hover:underline"
                >
                  {property.name}
                </Link>
                <p className="text-gray-700 text-sm">
                  {removeHtmlTags(property.description).slice(0, 100)}...
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Property Map Carousel */}
      {property_map && property_map.length > 0 && (
        <div className="mb-4">
          <Carousel
            responsive={mapCarouselResponsive}
            swipeable={true}
            draggable={true}
            showDots={false}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            keyBoardControl={false}
            transitionDuration={500}
            containerClass="carousel-container"
            arrows={false}
          >
            {property_map.map((mapImage, index) => (
              <div key={index} className="p-2">
                <img
                  style={{ aspectRatio: "1", height: "400px", width: "500px" }}
                  src={mapImage}
                  className="rounded img-fluid"
                  alt={`Map ${index + 1}`}
                />
              </div>
            ))}
          </Carousel>
        </div>
      )}

      {/* Property Video */}
      {videoId && (
        <div className="mb-4">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            width="100%"
            height="400"
            title="Property Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* Property Location Map Images */}
      <div className="">
        {property_location_map && property_location_map.length > 0 && (
          <div className="property-location-map mb-4 grid grid-cols-1 md:grid-cols gap-4  ">
            {property_location_map.map((mapImage, index) => (
              <div key={index} className="map-image-wrapper">
                <img
                  src={mapImage}
                  className="rounded img-fluid  object-cover h-[80vh] w-full"
                  alt={`Location Map ${index + 1}`}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <Contact1 name={name} />
    </div>
  );
};

export default PropertyDetail;
