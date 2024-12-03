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
  Box,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";

const UsersData = () => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const [filterName, setFilterName] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [filterRole, setFilterRole] = useState(""); // Track selected role for filtering

  const navigate = useNavigate();

  const headers = ["Name", "Email", "Phone", "Role", "Action"];

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_ROUTE}/api/users/fetch`
      );
      setRows(response.data);
      setFilteredRows(response.data); // Initialize filtered rows
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = rows.filter(
      (row) =>
        row.username.toLowerCase().includes(filterName.toLowerCase()) &&
        row.email.toLowerCase().includes(filterEmail.toLowerCase()) &&
        (filterRole === "" ||
          row.role.toLowerCase() === filterRole.toLowerCase()) // Filter by role
    );
    setFilteredRows(filtered);
    setPage(1); // Reset to first page when filters are applied
  }, [filterName, filterEmail, filterRole, rows]);

  const handleEdit = (row) => {
    navigate(`/edit/users`, { state: { user: row } });
  };

  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setOpenDialog(true);
  };

  const confirmDelete = async () => {
    if (selectedRow) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_API_ROUTE}/api/users/${selectedRow._id}`
        );
        if (response.status === 200) {
          toast.success("User deleted successfully!");
          await fetchData();
          setOpenDialog(false);
          setSelectedRow(null);
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error("Error deleting user");
      }
    }
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  // React Select options for Name and Email filters
  const nameOptions = rows.map((row) => ({
    label: row.username,
    value: row.username,
  }));
  const emailOptions = rows.map((row) => ({
    label: row.email,
    value: row.email,
  }));

  return (
    <Box sx={{ m: { xs: 2, sm: 5 }, overflowX: "auto" }}>
      {/* Filter Inputs with React Select */}
      <Box
        display="flex"
        gap={2}
        mb={3}
        flexWrap="wrap"
        sx={{ justifyContent: "space-around" }}
      >
        <span className="fs-3">Total Users: {filteredRows.length}</span>

        {/* Name Filter with React Select */}
        <Select
          options={nameOptions}
          value={nameOptions.find((option) => option.value === filterName)}
          onChange={(selectedOption) =>
            setFilterName(selectedOption ? selectedOption.value : "")
          }
          placeholder="Filter by Name"
          isClearable
          styles={{
            container: (base) => ({
              ...base,
              width: "350px",
            }),
          }}
        />

        {/* Email Filter with React Select */}
        <Select
          options={emailOptions}
          value={emailOptions.find((option) => option.value === filterEmail)}
          onChange={(selectedOption) =>
            setFilterEmail(selectedOption ? selectedOption.value : "")
          }
          placeholder="Filter by Email"
          isClearable
          styles={{
            container: (base) => ({
              ...base,
              width: "350px",
            }),
          }}
        />

        {/* Role Filter using Radio Buttons */}
        <FormControl component="fieldset" style={{ padding: "10px" }}>
          <RadioGroup
            row
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <FormControlLabel value="" control={<Radio />} label="All" />
            <FormControlLabel value="admin" control={<Radio />} label="Admin" />
            <FormControlLabel value="user" control={<Radio />} label="User" />
          </RadioGroup>
        </FormControl>
      </Box>

      {/* Data Table */}
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
                  <TableCell>{row.username}</TableCell>
                  <TableCell>
                    <a href={`mailto:${row.email}`}>{row.email}</a>
                  </TableCell>
                  <TableCell>
                    <a href={`tel:${row.phone}`}>{row.phone}</a>
                  </TableCell>
                  <TableCell>{row.role}</TableCell>
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
            Are you sure you want to delete this user?
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

      <ToastContainer />
    </Box>
  );
};

export default UsersData;
