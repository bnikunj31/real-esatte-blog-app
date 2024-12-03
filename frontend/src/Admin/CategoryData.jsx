import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Pagination,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";

const CategoryData = () => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [filterCategory, setFilterCategory] = useState(""); // State for filter selection

  const navigate = useNavigate();

  const headers = ["Serial No.", "Category", "Action"];

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_ROUTE}/api/property/propertyTypeAdd`
      );
      setRows(response.data.propertyTypes);
      setFilteredRows(response.data.propertyTypes); // Initialize filtered rows
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter rows dynamically based on selected category name
  useEffect(() => {
    const filtered = rows.filter((row) =>
      row.type_name.toLowerCase().includes(filterCategory.toLowerCase())
    );
    setFilteredRows(filtered);
    setPage(1); // Reset to the first page when filter changes
  }, [filterCategory, rows]);

  const handleEdit = (row) => {
    navigate(`/edit/category`, { state: { category: row } });
  };

  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setOpenDialog(true);
  };

  const confirmDelete = async () => {
    if (selectedRow) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_API_ROUTE}/api/property/${selectedRow._id}`
        );
        if (response.status === 200) {
          toast.success(response.data.msg || "Category deleted successfully!");
          await fetchData();
          setOpenDialog(false);
          setSelectedRow(null);
        }
      } catch (error) {
        console.error("Error deleting category:", error);
        toast.error("Failed to delete category.");
      }
    }
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  // Create options for react-select filter from categories
  const categoryOptions = rows.map((row) => ({
    label: row.type_name,
    value: row.type_name,
  }));

  return (
    <Box sx={{ m: { xs: 2, sm: 5 }, overflowX: "auto" }}>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
      {/* Filter with React Select */}
      <Box
        display="flex"
        sx={{ justifyContent: "space-around" }}
        gap={2}
        mb={3}
      >
        <span className="fs-3">Total Categories: {filteredRows.length}</span>
        <Select
          options={categoryOptions}
          value={categoryOptions.find(
            (option) => option.value === filterCategory
          )}
          onChange={(selectedOption) =>
            setFilterCategory(selectedOption ? selectedOption.value : "")
          }
          placeholder="Filter by Category"
          isClearable
          styles={{
            container: (base) => ({
              ...base,
              width: "80%", // Ensures it's responsive
            }),
            dropdownIndicator: (base) => ({
              ...base,
              padding: 4,
            }),
            menu: (base) => ({
              ...base,
              zIndex: 9999, // Ensure the dropdown doesn't get hidden
              width: "100%", // Ensure full width of the dropdown
            }),
            control: (base) => ({
              ...base,
              minWidth: 120, // Ensures the select box itself has a minimum width
              maxWidth: "100%", // Avoids shrinking
            }),
          }}
        />
      </Box>

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
                <TableRow key={row._id}>
                  <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{row.type_name}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEdit(row)}
                      sx={{ mb: { xs: 1, sm: 0 }, mr: { xs: 0, sm: 1 } }}
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
                      onClick={() => handleDeleteClick(row)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
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

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this category?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} sx={{ color: "red" }} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CategoryData;
