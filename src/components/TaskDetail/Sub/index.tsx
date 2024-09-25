import { getTaskIcon, getTaskLevelIcon } from "@/components/Board/BoardItem";
import { taskLevel, taskStatus, taskTypes } from "@/constant";
import { Task, TaskLevel, TaskStatus, TaskType } from "@/types";
import { Box, Select, MenuItem, Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import Divider from "@mui/material/Divider";
import { formatDistanceToNowStrict } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";
import _http from "@/libs/http";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

type Props = {
  data: Task | undefined;
};

export default function SubTaskDetail({ data }: Props) {
  const queryClient = useQueryClient();
  const { slug } = useParams();

  const refetchAllQueries = () => queryClient.invalidateQueries();

  const [selectedType, setSelectedType] = useState<TaskType>(
    data?.type || "Task"
  );
  const [selectedPriority, setSelectedPriority] = useState<TaskLevel>(
    data?.level || "Medium"
  );
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus>(
    data?.status || "Process"
  );

  const onUpdateField = async (field: keyof Task, value: any) => {
    const updatedData = { ...data, [field]: value };

    try {
      await _http.put(`/projects/${slug}/tasks/${data?._id}`, updatedData);
      refetchAllQueries();
      switch (field) {
        case "status":
          setSelectedStatus(value);
          toast.success("Status updated");
          break;
        case "level":
          setSelectedPriority(value);
          toast.success("Priority updated");
          break;
        case "type":
          setSelectedType(value);
          toast.success("Type updated");
          break;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid2 size={4}>
      <Box display="flex" flexDirection="column" gap={2}>
        {/* Status Section */}
        <Box display="flex" flexDirection="column">
          <Typography
            sx={{ fontWeight: 600, fontSize: 12, textTransform: "uppercase" }}
          >
            Status
          </Typography>
          <Select
            value={selectedStatus}
            onChange={(e) => onUpdateField("status", e.target.value)}
            sx={{
              height: "35px",
              width: "200px",
              ".MuiSelect-select": {
                display: "flex",
                alignItems: "center",
                textTransform: "uppercase",
                fontWeight: 500,
                gap: "4px",
              },
            }}
          >
            {taskStatus.map((item, index) => (
              <MenuItem
                value={item.value}
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: "35px",
                  textTransform: "uppercase",
                  fontSize: 13,
                  fontWeight: 500,
                  gap: 1,
                }}
              >
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* Type Section */}
        <Box display="flex" flexDirection="column">
          <Typography sx={{ fontWeight: 500, fontSize: 12 }}>
            Issue Type
          </Typography>
          <Select
            value={selectedType}
            onChange={(e) => onUpdateField("type", e.target.value)}
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
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <Box
                  component="img"
                  src={getTaskIcon(item.value as TaskType)}
                  alt="icon"
                  sx={{ width: "20px" }}
                />
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* Priority Section */}
        <Box display="flex" flexDirection="column">
          <Typography
            sx={{ fontWeight: 600, fontSize: 12, textTransform: "uppercase" }}
          >
            Priority
          </Typography>
          <Select
            value={selectedPriority}
            onChange={(e) => onUpdateField("level", e.target.value)}
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
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <Box
                  component="img"
                  src={getTaskLevelIcon(item.value as TaskLevel)}
                  alt="icon"
                  sx={{ width: "16px" }}
                />
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Divider />

        <Box display="flex" flexDirection="column">
          <Typography sx={{ fontSize: 13 }}>
            Created at{" "}
            {formatDistanceToNowStrict(data?.createdAt || new Date())}
          </Typography>
          <Typography sx={{ fontSize: 13 }}>
            Updated at{" "}
            {formatDistanceToNowStrict(data?.updatedAt || new Date())}
          </Typography>
        </Box>
      </Box>
    </Grid2>
  );
}
