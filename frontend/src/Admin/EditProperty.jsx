import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
} from "@mui/material";
import Typography from "@mui/material/Typography";

import { styled } from "@mui/system";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";

const EditProperty = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const propertyData = location.state?.property || {};

  const [name, setName] = useState(propertyData.name || "");
  const [description, setDescription] = useState(
    propertyData.description || ""
  );
  const [propertyImages, setPropertyImages] = useState([]);
  const [propertyMap, setPropertyMap] = useState([]);
  const [propertyLocationMap, setPropertyLocationMap] = useState([]);
  const [propertyVideo, setPropertyVideo] = useState(
    propertyData.property_video || ""
  );

  const [propertyLocation, setPropertyLocation] = useState(
    propertyData.location || ""
  );

  const [type, setType] = useState(
    propertyData.type?.length > 0 ? propertyData.type : []
  );
  const [status, setStatus] = useState(propertyData.status || "available");
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [rating, setRatings] = useState(
    propertyData.rating?.length > 0
      ? propertyData.rating
      : [{ key: "", value: "" }]
  );
  const [ratingName, setRatingName] = useState();
  const [ratingValue, setRatingValue] = useState();
  const [priceAndArea, setPriceAndArea] = useState(
    propertyData.priceAndArea?.length > 0
      ? propertyData.priceAndArea
      : [{ area: "", price: "" }]
  );

  const handlePriceAndAreaChange = (index, field, value) => {
    const updated = [...priceAndArea];
    updated[index][field] = value;
    setPriceAndArea(updated);
  };

  const addPriceAndAreaRow = () => {
    setPriceAndArea([...priceAndArea, { area: "", price: "" }]);
  };

  const removePriceAndAreaRow = (index) => {
    const updated = priceAndArea.filter((_, i) => i !== index);
    setPriceAndArea(updated);
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["bold", "italic", "underline"],
      ["link"],
      ["image"],
      [{ color: [] }, { background: [] }],
      ["blockquote", "code-block"],
      ["clean"],
    ],
  };

  useEffect(() => {
    const fetchPropertyTypes = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_ROUTE}/api/property/propertyTypeAdd`
        );

        setPropertyTypes(response.data.propertyTypes || []);
      } catch (error) {
        toast.error("Failed to fetch property types.");
      }
    };
    fetchPropertyTypes();
  }, []);

  const validateForm = () => {
    if (!name) {
      toast.error("Please enter the property name.");
      return false;
    }
    if (!description) {
      toast.error("Please enter a description.");
      return false;
    }

    if (!propertyLocation) {
      toast.error("Please enter the location.");
      return false;
    }
    if (!type) {
      toast.error("Please select a property type.");
      return false;
    }
    return true;
  };

  const handleRatingChange = (index, field, value) => {
    setRatings((prevRatings) =>
      prevRatings.map((rating, i) =>
        i === index ? { ...rating, [field]: value } : rating
      )
    );
  };

  const addRatingRow = () => {
    setRatings((prevRatings) => [...prevRatings, { key: "", value: "" }]);
  };

  const removeRatingRow = (index) => {
    setRatings((prevRatings) => prevRatings.filter((_, i) => i !== index));
  };

  const options = [
    { value: "available", label: "Available" },
    { value: "sold", label: "Sold" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("property_video", propertyVideo || "");
      formData.append("location", propertyLocation);
      formData.append("type", JSON.stringify(type.map((t) => t.id)));
      formData.append("status", status);
      formData.append("rating", JSON.stringify(rating));
      formData.append("PriceAndArea", JSON.stringify(priceAndArea));

      propertyImages.forEach((file) => {
        formData.append("property_images", file);
      });
      propertyMap.forEach((file) => {
        formData.append("property_map", file);
      });
      propertyLocationMap.forEach((file) => {
        formData.append("property_location_map", file);
      });

      try {
        const response = await axios.patch(
          `${import.meta.env.VITE_API_ROUTE}/api/property/propertyUpdate/${propertyData._id
          }`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (response.status === 201) {
          toast.success("Property updated successfully!");
          navigate("/properties");
        }
      } catch (error) {
        toast.error(error.response?.data?.msg || "Failed to update property.");
      }
    }
  };

  const handleFileChange = (setter) => (event) => {
    const files = Array.from(event.target.files);
    setter((prev) => [...prev, ...files]);
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen px-2 sm:px-5">
      <ToastContainer />
      <Box
        component="form"
        sx={{ width: { xs: "100%", md: "80%", lg: "70%" }, m: 2 }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <p className="text-xl text-center text-gray-600">Edit Property</p>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Property Name"
              variant="standard"
              fullWidth
              required
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <label htmlFor="description">Description</label>
            <ReactQuill
              modules={modules}
              value={description}
              onChange={setDescription}
              placeholder="Edit your Property"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Rating</Typography>
          </Grid>
          {rating.map((rating, index) => (
            <Grid container item spacing={2} key={index}>
              <Grid item xs={5}>
                <TextField
                  value={rating.key}
                  onChange={(e) =>
                    handleRatingChange(index, "key", e.target.value)
                  }
                  label="Rating Name"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  value={rating.value}
                  onChange={(e) =>
                    handleRatingChange(index, "value", e.target.value)
                  }
                  label="Rating Value"
                  inputProps={{
                    step: 0.5,
                    min: 0,
                    max: 5,
                  }}
                  type="number"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  onClick={() => removeRatingRow(index)}
                  color="secondary"
                  fullWidth
                  disabled={rating.length === 1}
                >
                  Remove
                </Button>
              </Grid>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button onClick={addRatingRow} fullWidth>
              Add Rating
            </Button>
          </Grid>
          {/* PriceAndArea Section */}
          <Grid item xs={12}>
            <Typography variant="h6">Price and Area</Typography>
          </Grid>
          {priceAndArea.map((item, index) => (
            <Grid container item spacing={2} key={index}>
              <Grid item xs={5}>
                <TextField
                  value={item.area}
                  onChange={(e) =>
                    handlePriceAndAreaChange(index, "area", e.target.value)
                  }
                  label="Area"
                  type="number"
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={5}>
                <TextField
                  value={item.price}
                  onChange={(e) =>
                    handlePriceAndAreaChange(index, "price", e.target.value)
                  }
                  label="Price"
                  type="number"
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={2}>
                <Button
                  onClick={() => removePriceAndAreaRow(index)}
                  color="secondary"
                  fullWidth
                  disabled={priceAndArea.length === 1}
                >
                  Remove
                </Button>
              </Grid>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button onClick={addPriceAndAreaRow} fullWidth>
              Add Price and Area
            </Button>
          </Grid>
          {/* File Uploads */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  fullWidth
                >
                  Property Images
                  <VisuallyHiddenInput
                    type="file"
                    onChange={handleFileChange(setPropertyImages)}
                    multiple
                  />
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  fullWidth
                >
                  Property Map
                  <VisuallyHiddenInput
                    type="file"
                    onChange={handleFileChange(setPropertyMap)}
                    multiple
                  />
                </Button>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  fullWidth
                >
                  Location Map
                  <VisuallyHiddenInput
                    type="file"
                    onChange={handleFileChange(setPropertyLocationMap)}
                    multiple
                  />
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="propertyVideo"
              value={propertyVideo}
              onChange={(e) => setPropertyVideo(e.target.value)}
              label="propertyVideo"
              type="text"
              variant="standard"
              fullWidth
              required
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="location"
              value={propertyLocation}
              onChange={(e) => setPropertyLocation(e.target.value)}
              label="Location"
              type="text"
              variant="standard"
              fullWidth
              required
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Type</Typography>
            <Select
              options={propertyTypes.map((pt) => ({
                label: pt.type_name,
                value: pt._id, // Use `_id` for the value to map back to your data source
              }))}
              value={type.map((id) => {
                const propertyType = propertyTypes.find((pt) => pt._id === id);
                return propertyType ? { label: propertyType.type_name, value: propertyType._id } : null;
              }).filter((option) => option !== null)} // Filter out null values
              onChange={(selectedOptions) =>
                setType(selectedOptions.map((option) => option.value)) // Store only the selected `_id`s
              }
              placeholder="Select Type"
              isMulti
              styles={{
                menu: (provided) => ({ ...provided, zIndex: 9999 }), // Fix dropdown z-index
              }}
            />
          </Grid>


          <Grid item xs={12}>
            <div style={{ margin: "16px 0" }}>
              <label
                htmlFor="status-select"
                style={{ marginBottom: "8px", display: "block" }}
              >
                Status
              </label>
              <Select
                id="status-select"
                options={options}
                value={options.find((option) => option.value === status)}
                onChange={(selectedOption) => setStatus(selectedOption?.value)}
                isClearable
              />
            </div>
          </Grid>
          ;
          <Grid item xs={12} className="text-right">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="mt-3"
            >
              Update Property
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default EditProperty;
