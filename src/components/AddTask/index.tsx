import {
  Avatar,
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import AddCardIcon from "@mui/icons-material/AddCard";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Divider from "@mui/material/Divider";
import DialogTitle from "@mui/material/DialogTitle";

import { Fragment, useState } from "react";
import { taskLevel, taskTypes } from "@/constant";
import ReactQuill from "react-quill";
import { getTaskIcon, getTaskLevelIcon } from "../Board/BoardItem";
import { Member, TaskLevel, TaskType } from "@/types";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProjectDetail } from "@/api/Project";
import { toast } from "sonner";
import _http from "@/libs/http";

export default function AddTask() {
  const { slug } = useParams();
  const { data: project, refetch } = useQuery({
    queryKey: [`project/${slug}`],
    queryFn: () => fetchProjectDetail(slug || ""),
  });

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedType, setSelectedType] = useState<TaskType>("Task");
  const [selectedPriority, setSelectedPriority] = useState<TaskLevel>("Medium");
  const [selectedReporter, setSelectedReporter] = useState<Member | null>(null);
  const [selectedAssignees, setSelectedAssignees] = useState<Member[]>([]);
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
    setSelectedReporter(null);
    setSelectedAssignees([]);
    setSummary("");
    setDescription("");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    const jsonSender = {
      type: selectedType,
      level: selectedPriority,
      reporter: selectedReporter,
      assignees: selectedAssignees,
      name: summary,
      description,
    };
    try {
      setLoading(true);

      await _http.post(
        `/projects/${project?.data.result._id}/tasks`,
        jsonSender
      );

      refetch();

      toast.success("Create task successfully!");

      handleClose();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <Box
        py={1}
        px={2}
        height={50}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Button
          onClick={handleClickOpen}
          fullWidth
          sx={{
            fontSize: "0.85rem",
            justifyContent: "flex-start",
            letterSpacing: "-0.05em",
            px: 2,
          }}
          startIcon={
            <AddCardIcon
              sx={{
                color: "#2563eb",
              }}
            />
          }
        >
          Add new card
        </Button>
        <Tooltip
          title="Drag to move"
          sx={{
            cursor: "pointer",
          }}
        >
          <DragHandleIcon />
        </Tooltip>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            width: "650px",
            maxWidth: "100%",
            height: "auto",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">Create Issue</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={1.5}>
            {/* TYPE */}
            <Box display="flex" flexDirection="column">
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: 12,
                }}
              >
                Issue Type
              </Typography>
              <Select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as TaskType)}
                sx={{
                  height: "35px",
                  ".MuiSelect-select": {
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  },
                }}
              >
                {taskTypes.map((item, index) => (
                  <MenuItem
                    value={item.value}
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Box
                      component="img"
                      src={getTaskIcon(item.value as TaskType)}
                      alt="icon"
                      sx={{
                        width: "20px",
                      }}
                    />
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Divider />

            {/* NAME */}
            <Box display="flex" flexDirection="column">
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: 12,
                }}
              >
                Short Summary
              </Typography>
              <TextField
                variant="outlined"
                size="small"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
            </Box>

            {/* DESC */}
            <Box display="flex" flexDirection="column">
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: 12,
                }}
              >
                Description
              </Typography>
              <ReactQuill value={description} onChange={setDescription} />
            </Box>

            {/* Reporter */}
            <Box display="flex" flexDirection="column">
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: 12,
                }}
              >
                Reporter
              </Typography>
              <Select
                value={selectedReporter?.email || ""}
                onChange={(e) =>
                  setSelectedReporter(
                    project?.data.result.members.find(
                      (m) => m.email === e.target.value
                    ) || null
                  )
                }
                sx={{
                  height: "35px",
                  ".MuiSelect-select": {
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  },
                }}
              >
                {project?.data.result.members.map((item, index) => (
                  <MenuItem
                    value={item.email}
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Avatar
                      src={item.avatar}
                      alt={item.fullName}
                      sx={{
                        width: 18,
                        height: 18,
                      }}
                    />
                    {item.fullName}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            {/* Assignees */}
            <Box display="flex" flexDirection="column">
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: 12,
                }}
              >
                Assignees
              </Typography>
              <Select
                multiple
                value={selectedAssignees.map((a) => a.email)}
                onChange={(e) =>
                  setSelectedAssignees(
                    project?.data.result.members.filter((m) =>
                      e.target.value.includes(m.email)
                    ) || []
                  )
                }
                sx={{
                  height: "35px",
                  ".MuiSelect-select": {
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  },
                }}
              >
                {project?.data.result.members.map((item, index) => (
                  <MenuItem
                    value={item.email}
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Avatar
                      src={item.avatar}
                      alt={item.fullName}
                      sx={{
                        width: 18,
                        height: 18,
                      }}
                    />
                    {item.fullName}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            {/* Priority */}
            <Box display="flex" flexDirection="column">
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: 12,
                }}
              >
                Priority
              </Typography>
              <Select
                value={selectedPriority}
                onChange={(e) =>
                  setSelectedPriority(e.target.value as TaskLevel)
                }
                sx={{
                  height: "35px",
                  ".MuiSelect-select": {
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  },
                }}
              >
                {taskLevel.map((item, index) => (
                  <MenuItem
                    value={item.value}
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Box
                      component="img"
                      src={getTaskLevelIcon(item.value as TaskLevel)}
                      alt="icon"
                      sx={{
                        width: "16px",
                      }}
                    />
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleSave}
            autoFocus
            disabled={loading}
            variant="contained"
            sx={{
              boxShadow: "none",
            }}
          >
            Create Issue
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
