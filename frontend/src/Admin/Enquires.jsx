import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";

const Enquires = () => {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [expandedRows, setExpandedRows] = useState({});
  const [filterName, setFilterName] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_ROUTE}/api/enquiry/fetch`
      );
      if (response.status === 200) {
        setRows(response.data.enquires);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleDescription = (id) => {
    setExpandedRows((prevExpandedRows) => ({
      ...prevExpandedRows,
      [id]: !prevExpandedRows[id],
    }));
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const markAllAsRead = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.get(
        `${import.meta.env.VITE_API_ROUTE}/api/enquiry/readall`
      );
      console.log(response);
      if (response.status === 200) {
        if (response.data.updatedCount > 0) {
          toast.success("Successfully Readed");
          setTimeout(() => {
            location.reload();
          }, 3000);
        }
      }
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(filterName.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  const uniqueNames = Array.from(new Set(rows.map((row) => row.name)));

  const nameOptions = uniqueNames.map((name) => ({
    value: name,
    label: name,
  }));

  return (
    <Box sx={{ m: { xs: 2, sm: 5 }, overflowX: "auto" }}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-2 mb-2">
        <span className="fs-3 text-base sm:text-lg md:text-xl lg:text-2xl">
          Total Enquiries: {filteredRows.length}
        </span>

        {/* React Select for filtering by Name */}
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
              width: "100%", // Full width for small screens
              maxWidth: "400px", // Restrict max width on larger screens
            }),
          }}
        />

        <Button
          variant="contained"
          style={{ backgroundColor: "#2C3E50" }}
          onClick={markAllAsRead}
          sx={{
            padding: { xs: "8px", sm: "8px 16px" },
            fontSize: { xs: "12px", sm: "14px" },
            textTransform: "none",
            width: { xs: "100%", sm: "auto" }, // Full width for small screens
          }}
        >
          Mark All as Read
        </Button>
      </div>
      {/* Table */}
      <TableContainer
        component={Paper}
        sx={{ width: "100%", overflowX: "auto" }}
      >
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#2c3e50" }}>
              {[
                "Serial No.",
                "Name",
                "Email",
                "Phone",
                "Description",
                "Date",
              ].map((header, index) => (
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
                <TableRow
                  key={row._id}
                  style={{
                    backgroundColor: row.read ? "white" : "#ffe6e6", // Red background if unread
                  }}
                >
                  <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>
                    <a href={`mailto:${row.email}`}>{row.email}</a>
                  </TableCell>
                  <TableCell>
                    <a href={`tel:${row.phone}`}>{row.phone}</a>
                  </TableCell>
                  <TableCell>
                    {expandedRows[row._id] ? (
                      <>
                        {row.message}
                        <span
                          onClick={() => toggleDescription(row._id)}
                          style={{
                            color: "blue",
                            cursor: "pointer",
                            marginLeft: 4,
                          }}
                        >
                          Show Less
                        </span>
                      </>
                    ) : (
                      <>
                        {row.message.slice(0, 50)}
                        {row.message.length > 50 && (
                          <span
                            onClick={() => toggleDescription(row._id)}
                            style={{
                              color: "blue",
                              cursor: "pointer",
                              marginLeft: 4,
                            }}
                          >
                            Show All
                          </span>
                        )}
                      </>
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(row.date_submitted).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ToastContainer />;{/* Pagination */}
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
    </Box>
  );
};

export default Enquires;
