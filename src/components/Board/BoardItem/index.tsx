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

type Props = {
  data: Task | undefined;
};

export default function BoardItem({ data }: Props) {
  const getTaskIcon = (task: TaskType | undefined) => {
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

  const getTaskLevelIcon = (task: TaskLevel | undefined) => {
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
                <Tooltip title="Remy Sharp">
                  <Avatar
                    alt="Remy Sharp"
                    src="https://i.pinimg.com/474x/fb/6c/21/fb6c2120eee711a3d7f67b9582d4c222.jpg"
                  />
                </Tooltip>
                <Tooltip title="Travis Howard">
                  <Avatar
                    alt="Remy Sharp"
                    src="https://i.pinimg.com/236x/2d/39/4d/2d394ddaa1896dd3dfae0625f76fc272.jpg"
                  />
                </Tooltip>
                <Tooltip title="Remy Sharp">
                  <Avatar
                    alt="Remy Sharp"
                    src="https://i.pinimg.com/474x/fb/6c/21/fb6c2120eee711a3d7f67b9582d4c222.jpg"
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
      </React.Fragment>
    </Card>
  );
}
