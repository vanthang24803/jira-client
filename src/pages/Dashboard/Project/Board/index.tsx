import { fetchProjectDetail } from "@/api/Project";
import {
  Breadcrumbs,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import SearchIcon from "@mui/icons-material/Search";
import AddMember from "@/components/AddMember";
import BoardContainer from "@/components/BoardContainer";
import { fetchTaskOfProject } from "@/api/Task";
import { useState, useEffect } from "react";

export default function ProjectBoard() {
  const { slug } = useParams();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const { data: project, refetch } = useQuery({
    queryKey: [`project/${slug}`],
    queryFn: () => fetchProjectDetail(slug || ""),
  });

  const { data: tasks } = useQuery({
    queryKey: [`project/${slug}/tasks`, debouncedSearch],
    queryFn: () => fetchTaskOfProject(slug || "", debouncedSearch),
  });

  return (
    <Box p={3}>
      <Stack direction="column" spacing={1}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            to="/dashboard/project"
            style={{
              textDecoration: "none",
              color: "black",
              fontWeight: 500,
            }}
          >
            Projects
          </Link>
          <Typography>{project?.data.result?.name}</Typography>
          <Typography>Project Details</Typography>
        </Breadcrumbs>
        <Typography variant="h6">{project?.data.result.name} Board</Typography>
        <Stack direction="row" alignItems="center" spacing={4}>
          {/* Search Input */}
          <TextField
            id="outlined-basic"
            placeholder="Search"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)} // Update search state on input change
            InputProps={{
              style: {
                height: "40px",
                fontSize: "12px",
                display: "flex",
                alignItems: "center",
              },
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          {/* Members and Add Member button */}
          <Stack direction="row" spacing={1}>
            <AvatarGroup max={4}>
              {project?.data.result.members.map((item) => (
                <Tooltip key={item._id} title={item.fullName}>
                  <Avatar
                    alt={item.fullName}
                    src={item.avatar}
                    sx={{
                      width: 34,
                      height: 34,
                      cursor: "pointer",
                    }}
                  />
                </Tooltip>
              ))}
            </AvatarGroup>
            <AddMember data={project?.data.result} reload={refetch} />
          </Stack>
        </Stack>
      </Stack>
      <BoardContainer data={tasks?.data.result} />
    </Box>
  );
}
