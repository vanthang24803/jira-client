import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Task, TaskLevel, TaskType } from "@/types";
import TaskIcon from "@/assets/check.svg";
import StoryIcon from "@/assets/bookmark.svg";
import BugIcon from "@/assets/warning.svg";
import HighIcon from "@/assets/high.svg";
import MediumIcon from "@/assets/medium.svg";
import LowIcon from "@/assets/low.svg";
import MoreIcon from "@/assets/more.svg";
import { Box, Stack, Tooltip } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import UserIcon from "@/components/AddMember/icon";
import TaskDetail from "@/components/TaskDetail";

type Props = {
  data: Task | undefined;
};

export const getTaskIcon = (task: TaskType | undefined) => {
  switch (task) {
    case "Bug":
      return BugIcon;
    case "Story":
      return StoryIcon;
    case "Task":
      return TaskIcon;
    default:
      return TaskIcon;
  }
};

export const getTaskLevelIcon = (task: TaskLevel | undefined) => {
  switch (task) {
    case "High":
      return HighIcon;
    case "Highest":
      return HighIcon;
    case "Medium":
      return MediumIcon;
    case "Low":
      return LowIcon;
    case "Lowest":
      return LowIcon;
    default:
      return MediumIcon;
  }
};

export default function BoardItem({ data }: Props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        overflow: "unset",
        "&:hover": {
          bgcolor: "#fafafa",
        },
      }}
    >
      <React.Fragment>
        <CardContent
          onClick={handleClickOpen}
          sx={{
            px: "12px",
            cursor: "pointer",

            "&:last-child": {
              p: 1.5,
            },
          }}
        >
          <Stack
            direction="row"
            alignItems="start"
            justifyContent="space-between"
          >
            <Typography
              gutterBottom
              sx={{
                fontWeight: 500,
                pb: "4px",
              }}
            >
              {data?.name}
            </Typography>
            <Tooltip title="Action">
              <Box
                component="img"
                src={MoreIcon}
                alt="icon"
                sx={{
                  width: "20px",
                  cursor: "pointer",
                }}
              />
            </Tooltip>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center">
              <Tooltip title={data?.type || ""}>
                <Box
                  component="img"
                  src={getTaskIcon(data?.type)}
                  alt="icon"
                  sx={{
                    width: "20px",
                  }}
                />
              </Tooltip>
              <Tooltip title={data?.level || ""}>
                <Box
                  component="img"
                  src={getTaskLevelIcon(data?.level)}
                  alt="icon"
                  sx={{
                    width: "16px",
                  }}
                />
              </Tooltip>
            </Stack>
            {data && data?.assignees.length > 0 ? (
              <AvatarGroup
                max={3}
                sx={{
                  "& .MuiAvatar-root": {
                    width: 28,
                    height: 28,
                    fontSize: 14,
                    cursor: "pointer",
                  },
                }}
              >
                <Tooltip title={data.reporter.fullName}>
                  <Avatar
                    alt={data.reporter.fullName}
                    src={data.reporter.avatar}
                  />
                </Tooltip>
              </AvatarGroup>
            ) : (
              <Tooltip title="No Assignee">
                <Avatar
                  sx={{
                    bgcolor: "gray",
                    width: 34,
                    height: 34,
                    cursor: "pointer",
                  }}
                >
                  <UserIcon />
                </Avatar>
              </Tooltip>
            )}
          </Stack>
        </CardContent>
        <TaskDetail id={data?._id} handleClose={handleClose} open={open} />
      </React.Fragment>
    </Card>
  );
}
