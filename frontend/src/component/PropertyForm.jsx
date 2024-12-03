import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Add, Remove } from "@mui/icons-material";

const PropertyForm = () => {
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

  const quillRef = useRef(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [propertyImages, setPropertyImages] = useState([]);
  const [propertyMap, setPropertyMap] = useState([]);
  const [propertyLocationMap, setPropertyLocationMap] = useState([]);
  const [propertyVideo, setPropertyVideo] = useState("");
  const [price, setPrice] = useState("");
  const [area, setArea] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("available");
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [fields, setFields] = useState([{ key: "", value: "" }]);
  console.log(fields);

  useEffect(() => {
    const fetchPropertyTypes = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_ROUTE}/api/property/propertyTypeAdd`
        );
        setPropertyTypes(
          Array.isArray(response.data.propertyTypes)
            ? response.data.propertyTypes
            : []
        );
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
    if (propertyImages.length === 0) {
      toast.error("Please upload at least one property image.");
      return false;
    }
    if (propertyMap.length === 0) {
      toast.error("Please upload at least one property map.");
      return false;
    }
    if (!price || isNaN(price) || price <= 0) {
      toast.error("Please enter a valid price.");
      return false;
    }
    if (!area) {
      toast.error("Please enter the area.");
      return false;
    }
    if (!location) {
      toast.error("Please enter the location.");
      return false;
    }
    if (!type) {
      toast.error("Please select a property type.");
      return false;
    }
    return true;
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
      formData.append("location", location);
      formData.append("type", type);
      formData.append("status", status);
      formData.append("ratings", JSON.stringify(fields));

      propertyImages.forEach((file) => {
        formData.append("property_images", file);
      });
      propertyMap.forEach((file) => {
        formData.append("property_map", file);
      });

      if (propertyLocationMap.length > 0) {
        propertyLocationMap.forEach((file) => {
          formData.append("property_location_map", file);
        });
      }

      for (let pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }
      try {
        console.log("Form data", formData);
        const response = await axios.post(
          `${import.meta.env.VITE_API_ROUTE}/api/property/propertyAdd`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          toast.success("Property added successfully!");
          setName("");
          setDescription("");
          setPropertyImages([]);
          setPropertyMap([]);
          setPropertyLocationMap([]);
          setPropertyVideo("");
          setPrice("");
          setArea("");
          setLocation("");
          setType("");
          setStatus("available");
          setFields([{ key: "", value: "" }]);
        }
      } catch (error) {
        toast.error(error.response?.data?.msg || "Failed to add property.");
      }
    }
  };

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

  const handleFileChange = (setter) => (event) => {
    const files = Array.from(event.target.files);
    setter((prev) => [...prev, ...files]);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFields = [...fields];
    updatedFields[index][name] = value;
    setFields(updatedFields);
  };

  const handleAddField = () => {
    setFields([...fields, { key: "", value: "" }]);
  };

  const handleRemoveField = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
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
        encType="multipart/form-data"
      >
        <p className="text-xl text-center text-gray-600">Add New Property</p>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="name"
              value={name}
              ref={quillRef}
              onChange={(e) => setName(e.target.value)}
              label="Property Name"
              variant="standard"
              fullWidth
              required
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <ReactQuill
              modules={modules}
              value={description}
              onChange={setDescription}
              placeholder="Enter property description"
            />
          </Grid>

          <Grid
            item
            xs={12}
            className="
          mb-3"
          >
            <div className="flex items-center justify-between">
              {/* <p className="font-semibold text-md">Property Attributes</p> */}
            </div>
            {fields.map((field, index) => (
              <Grid container key={index} spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={5}>
                  <TextField
                    name="key"
                    label="Key"
                    value={field.key}
                    onChange={(e) => handleInputChange(index, e)}
                    variant="standard"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    name="value"
                    label="Value"
                    type="number"
                    inputProps={{
                      step: 0.5,
                      min: 0,
                      max: 5,
                    }}
                    value={field.value}
                    onChange={(e) => handleInputChange(index, e)}
                    variant="outlined"
                    size="small"
                    sx={{ flex: 1 }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton
                    aria-label="remove"
                    color="error"
                    onClick={() => handleRemoveField(index)}
                  >
                    <Remove />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
            <Button
              className="mt-3"
              startIcon={<Add />}
              size="small"
              variant="outlined"
              onClick={handleAddField}
            >
              Add
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  fullWidth
                  sx={{
                    backgroundColor: "#2c3e50",
                    "&:hover": { backgroundColor: "#2c354f" },
                  }}
                >
                  Property Images
                  <VisuallyHiddenInput
                    type="file"
                    inputProps={{ multiple: true }}
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
                  sx={{
                    backgroundColor: "#2c3e50",
                    "&:hover": { backgroundColor: "#2c354f" },
                  }}
                >
                  Property Map
                  <VisuallyHiddenInput
                    type="file"
                    inputProps={{ multiple: true }}
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
                  sx={{
                    backgroundColor: "#2c3e50",
                    "&:hover": { backgroundColor: "#2c354f" },
                  }}
                >
                  Location Map
                  <VisuallyHiddenInput
                    type="file"
                    inputProps={{ multiple: true }}
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
              label="Property Video Link (Optional)"
              variant="standard"
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              label="Price"
              type="number"
              variant="standard"
              fullWidth
              margin="normal"
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              label="Area (sq. ft.)"
              type="number"
              variant="standard"
              fullWidth
              margin="normal"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              label="Location"
              variant="standard"
              fullWidth
              margin="normal"
              required
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl variant="standard" fullWidth required>
              <InputLabel id="type-label">Property Type</InputLabel>
              <Select
                labelId="type-label"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <MenuItem value="">
                  <em>Select property type</em>
                </MenuItem>
                {propertyTypes.map((propertyType) => (
                  <MenuItem key={propertyType._id} value={propertyType._id}>
                    {propertyType.type_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl variant="standard" fullWidth required>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="available">Available</MenuItem>
                <MenuItem value="sold">Sold</MenuItem>
                <MenuItem value="not available">Not Available</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                backgroundColor: "#2980b9",
                "&:hover": { backgroundColor: "#21669e" },
              }}
            >
              Submit Property
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default PropertyForm;
