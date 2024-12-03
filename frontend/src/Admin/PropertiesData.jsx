import React, { useState, useEffect } from "react";
import Select from "react-select";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Pagination,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  RadioGroup,
  FormControlLabel,
  Radio,
  Slider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PropertiesData = () => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [filters, setFilters] = useState({
    name: null,
    price: [0, 1000000],
    type: null,
    status: "all",
  });

  const navigate = useNavigate();

  const headers = [
    "Name",
    "Description",
    "Property Images",
    "Property Map",
    "Property Location Map",
    "Property Video",
    "Price",
    "Area",
    "Location",
    "Type",
    "Status",
    "Action",
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_ROUTE}/api/property/fetch`
      );
      setRows(response.data);
      setFilteredRows(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  const handleEdit = (row) => {
    navigate("/edit/property", { state: { property: row } });
  };

  const handleDeleteDialogOpen = (id) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_ROUTE}/api/property/action/${deleteId}`
      );
      toast.success(response.data.msg);
      fetchData();
      handleDeleteDialogClose();
    } catch (error) {
      console.error("Error deleting property:", error);
      toast.error("Failed to delete property");
      handleDeleteDialogClose();
    }
  };

  const stripHtmlTags = (htmlString) => {
    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    return doc.body.textContent || "";
  };

  const ImageCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }, [images.length]);

    return (
      <div className="image-carousel">
        {images.length > 0 && (
          <img
            src={images[currentIndex]}
            alt="Property"
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              transition: "opacity 1s ease-in-out",
            }}
          />
        )}
      </div>
    );
  };

  const applyFilters = () => {
    let filtered = [...rows];

    if (filters.name) {
      filtered = filtered.filter((row) =>
        row.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    if (filters.type) {
      filtered = filtered.filter((row) => row.type === filters.type);
    }

    if (filters.status !== "all") {
      filtered = filtered.filter((row) => row.status === filters.status);
    }

    filtered = filtered.filter(
      (row) => row.price >= filters.price[0] && row.price <= filters.price[1]
    );

    setFilteredRows(filtered);
    setPage(1);
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Box sx={{ m: { xs: 2, sm: 5 } }}>
      <ToastContainer />

      {/* Filters */}
      <Box
        display="flex"
        gap={2}
        mb={3}
        flexWrap="wrap"
        sx={{ justifyContent: "space-between" }}
      >
        {/* Name Filter */}
        <Select
          options={rows.map((row) => ({
            label: row.name,
            value: row.name,
          }))}
          placeholder="Filter by Name"
          isClearable
          onChange={(selected) =>
            handleFilterChange("name", selected ? selected.value : null)
          }
          styles={{
            container: (base) => ({ ...base, width: "300px" }), // Adjust width here
          }}
        />

        {/* Price Filter */}
        <Box sx={{ width: "300px" }}>
          {" "}
          {/* Adjust width here */}
          <Slider
            value={filters.price}
            onChange={(e, value) => handleFilterChange("price", value)}
            valueLabelDisplay="auto"
            min={0}
            max={1000000}
            step={5000}
          />
          <Box display="flex" justifyContent="space-between">
            <span>&#8377;{filters.price[0]}</span>
            <span>&#8377;{filters.price[1]}</span>
          </Box>
        </Box>

        {/* Type Filter */}
        <Select
          options={[...new Set(rows.map((row) => row.type))].map((type) => ({
            label: type,
            value: type,
          }))}
          placeholder="Filter by Type"
          isClearable
          onChange={(selected) =>
            handleFilterChange("type", selected ? selected.value : null)
          }
          styles={{
            container: (base) => ({ ...base, width: "300px" }), // Adjust width here
          }}
        />

        {/* Status Filter */}
        <Box sx={{ width: "300px" }}>
          {" "}
          {/* Adjust width here */}
          <RadioGroup
            row
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
          >
            <FormControlLabel value="all" control={<Radio />} label="All" />
            <FormControlLabel
              value="available"
              control={<Radio />}
              label="Available"
            />
            <FormControlLabel value="sold" control={<Radio />} label="Sold" />
          </RadioGroup>
        </Box>
      </Box>
      <span className="fs-3 mb-2">Total Users: {filteredRows.length}</span>

      {/* Table */}
      <TableContainer
        component={Paper}
        sx={{ width: "100%", overflowX: "auto" }}
      >
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#2c3e50" }}>
              {headers.map((header, index) => (
                <TableCell
                  key={index}
                  style={{ color: "white", minWidth: 120 }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows
              .slice((page - 1) * rowsPerPage, page * rowsPerPage)
              .map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>
                    {row.description
                      ? `${stripHtmlTags(row.description).slice(0, 50)}...`
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    {row.property_images && row.property_images.length > 0 ? (
                      <ImageCarousel images={row.property_images} />
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell>
                    {row.property_map && row.property_map.length > 0 ? (
                      <ImageCarousel images={row.property_map} />
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell>
                    {row.property_location_map &&
                    row.property_location_map.length > 0 ? (
                      <ImageCarousel images={row.property_location_map} />
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell>
                    {row.property_video ? (
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() =>
                          window.open(row.property_video, "_blank")
                        }
                      >
                        Watch Video
                      </Button>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>{row.area}</TableCell>
                  <TableCell>{row.location}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>
                    <div className="flex">
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleEdit(row)}
                        sx={{ mr: 1 }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        sx={{
                          color: "red",
                          borderColor: "red",
                          ml: { xs: 0, sm: 1 },
                          width: "fit-content",
                        }}
                        onClick={() => handleDeleteDialogOpen(row.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="center" my={2}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
          variant="outlined"
          shape="rounded"
          sx={{ "& .MuiPaginationItem-root": { minWidth: { xs: 24, sm: 32 } } }}
        />
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleDeleteDialogClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this property? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            sx={{ color: "red", borderColor: "red" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PropertiesData;
