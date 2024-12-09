import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,

  Grid,
} from "@mui/material";
import Typography from '@mui/material/Typography';

import { styled } from "@mui/system";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useLocation, useNavigate } from "react-router-dom";

const EditProperty = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const propertyData = location.state?.property || {};
  console.log("data", propertyData);

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


  const [price, setPrice] = useState(propertyData.price || "");
  const [area, setArea] = useState(propertyData.area || "");
  const [propertyLocation, setPropertyLocation] = useState(
    propertyData.location || ""
  );

  const [type, setType] = useState(propertyData.type || "");
  const [status, setStatus] = useState(propertyData.status || "available");
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [rating, setRatings] = useState(
    propertyData.rating?.length > 0
      ? propertyData.rating
      : [{ key: "", value: "" }]
  );
  const [ratingName, setRatingName] = useState();
  const [ratingValue, setRatingValue] = useState();
  const [priceAndArea, setPriceAndArea] = useState(propertyData.priceAndArea?.length > 0 ? propertyData.priceAndArea : [{ area: "", price: "" }]);
  // console.log(priceAndArea)

  const handlePriceAndAreaChange = (index, field, value) => {
    const updated = [...priceAndArea];
    updated[index][field] = value;  // Correct field names ('area' or 'price')
    setPriceAndArea(updated);
  };


  const addPriceAndAreaRow = () => {
    setPriceAndArea([...priceAndArea, { area: "", price: "" }]);  // Add a new row with empty values
  };

  const removePriceAndAreaRow = (index) => {
    const updated = priceAndArea.filter((_, i) => i !== index);  // Remove the row at the specified index
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

  const handleSubmit = async (e) => {
    e.preventDefault();



    if (validateForm()) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("property_video", propertyVideo || "");
      formData.append("price", price);
      formData.append("area", area);
      formData.append("location", propertyLocation);
      formData.append("type", type);
      formData.append("status", status);
      formData.append("rating", JSON.stringify(rating));
      formData.append("PriceAndArea", JSON.stringify(setPriceAndArea));

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

        if (response.status === 200) {
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
          {/* {priceAndArea.map((item, index) => (

            <Grid container item spacing={2} key={index}>

              {console.log([item])}
              <Grid item xs={5}>
                <TextField
                  value={item.area}
                  onChange={(e) =>
                    handlePriceAndAreaChange(index, "price", e.target.value)
                  }
                  label="Name"
                  type="number"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  value={item.price}
                  onChange={(e) =>
                    handlePriceAndAreaChange(index, "area", e.target.value)
                  }
                  label="Value"
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
          ))} */}
          {priceAndArea.map((item, index) => (
            <Grid container item spacing={2} key={index}>
              {console.log(item)} 
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
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              label="Price"
              type="number"
              variant="standard"
              fullWidth
              required
              margin="normal"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              label="Area"
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
            <FormControl variant="standard" fullWidth margin="normal">
              <InputLabel>Type</InputLabel>
              <Select value={type} onChange={(e) => setType(e.target.value)}>
                {propertyTypes.map((pt) => (
                  <MenuItem key={pt._id} value={pt.type_name}>
                    {pt.type_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl variant="standard" fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="available">Available</MenuItem>
                <MenuItem value="sold">Sold</MenuItem>
              </Select>
            </FormControl>
          </Grid>

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
