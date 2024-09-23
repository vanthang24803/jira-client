import React, { useState } from "react";
import { Project } from "@/types/project";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Avatar,
  Typography,
  TablePagination,
  TextField,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import { format } from "date-fns";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import SearchIcon from "@mui/icons-material/Search";
import { categories } from "@/constant";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Link } from "react-router-dom";

type SortKey = keyof Project;

type Props = {
  data: Project[] | undefined;
};

export default function ProjectData({ data }: Props) {
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: "ascending" | "descending";
  } | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const filteredData = React.useMemo(() => {
    return (data || []).filter((project) => {
      const matchesSearchTerm = project.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory
        ? project.category === selectedCategory
        : true;
      return matchesSearchTerm && matchesCategory;
    });
  }, [data, searchTerm, selectedCategory]);

  const sortedData = React.useMemo(() => {
    let sortableItems = [...filteredData];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredData, sortConfig]);

  const requestSort = (key: SortKey) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig && sortConfig.key === key) {
      direction =
        sortConfig.direction === "ascending" ? "descending" : "ascending";
    }
    setSortConfig({ key, direction });
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value as string);
  };

  return (
    <Stack py={4} direction="column" spacing={2}>
      <Stack direction="row" alignContent="center" spacing={2}>
        <TextField
          variant="outlined"
          placeholder="Search projects"
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            mb: 2,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />

        <Select
          labelId="category-select-label"
          id="category-select"
          value={selectedCategory}
          onChange={handleCategoryChange}
          displayEmpty
          sx={{
            width: "160px",
            height: "50px",
          }}
        >
          <MenuItem value="">
            <em>All Categories</em>
          </MenuItem>
          {categories.map((item, index) => (
            <MenuItem value={item.value} key={index}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </Stack>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                onClick={() => requestSort("name")}
                style={{ cursor: "pointer" }}
              >
                <Stack direction="row" alignItems="center">
                  <Typography>Name</Typography>
                  {sortConfig?.key === "name" &&
                    (sortConfig.direction === "ascending" ? (
                      <ArrowUpwardIcon
                        sx={{
                          fontSize: 16,
                        }}
                      />
                    ) : (
                      <ArrowDownwardIcon
                        sx={{
                          fontSize: 16,
                        }}
                      />
                    ))}
                </Stack>
              </TableCell>
              <TableCell
                onClick={() => requestSort("category")}
                style={{ cursor: "pointer" }}
              >
                <Stack direction="row" alignItems="center">
                  <Typography>Category</Typography>
                  {sortConfig?.key === "category" &&
                    (sortConfig.direction === "ascending" ? (
                      <ArrowUpwardIcon
                        sx={{
                          fontSize: 16,
                        }}
                      />
                    ) : (
                      <ArrowDownwardIcon
                        sx={{
                          fontSize: 16,
                        }}
                      />
                    ))}
                </Stack>
              </TableCell>
              <TableCell>Members</TableCell>
              <TableCell>Tasks</TableCell>
              <TableCell>Lead</TableCell>
              <TableCell
                onClick={() => requestSort("url")}
                style={{ cursor: "pointer" }}
              >
                <Stack direction="row" alignItems="center">
                  <Typography>URL</Typography>
                  {sortConfig?.key === "url" &&
                    (sortConfig.direction === "ascending" ? (
                      <ArrowUpwardIcon
                        sx={{
                          fontSize: 16,
                        }}
                      />
                    ) : (
                      <ArrowDownwardIcon
                        sx={{
                          fontSize: 16,
                        }}
                      />
                    ))}
                </Stack>
              </TableCell>
              <TableCell
                onClick={() => requestSort("createdAt")}
                style={{ cursor: "pointer" }}
              >
                <Stack direction="row" alignItems="center">
                  <Typography>Created At</Typography>
                  {sortConfig?.key === "createdAt" &&
                    (sortConfig.direction === "ascending" ? (
                      <ArrowUpwardIcon
                        sx={{
                          fontSize: 16,
                        }}
                      />
                    ) : (
                      <ArrowDownwardIcon
                        sx={{
                          fontSize: 16,
                        }}
                      />
                    ))}
                </Stack>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((project) => (
                <TableRow key={project._id}>
                  <TableCell>
                    <Link
                      to={`${project.url}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {project.name}
                    </Link>
                  </TableCell>
                  <TableCell>{project.category}</TableCell>
                  <TableCell>{project.members}</TableCell>
                  <TableCell>{project.tasks}</TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                        }}
                        src={project.pm.avatar}
                        alt={`${project.pm.fullName}`}
                      />
                      <Typography>{`${project.pm.fullName}`}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`${project.url}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {window.location.href}/{project.url}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {format(new Date(project.createdAt), "dd/MM/yyyy hh:mm")}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 50]}
        component="div"
        count={sortedData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Stack>
  );
}
