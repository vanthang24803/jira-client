import { fetchTaskDetail } from "@/api/Project";
import { Box, Button, IconButton, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getTaskIcon } from "../Board/BoardItem";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid2";
import MainTaskDetail from "./Main";
import SubTaskDetail from "./Sub";
import { toast } from "sonner";
import _http from "@/libs/http";

type Props = {
  id: string | undefined;
  open: boolean;
  handleClose: () => void;
};

export default function TaskDetail({ id, open, handleClose }: Props) {
  const { slug } = useParams();
  const queryClient = useQueryClient();
  const refetchAllQueries = () => queryClient.invalidateQueries();

  const { data: task } = useQuery({
    queryKey: [`task-${id}`],
    queryFn: () => fetchTaskDetail(slug || "", id || ""),
  });

  const onDeleteTask = async () => {
    try {
      const response = await _http.delete(`/projects/${slug}/tasks/${id}`);

      if (response.status === 200) {
        refetchAllQueries();
        toast.success("Task deleted successfully!");
        handleClose();
      }
    } catch (error) {
      toast.error("You don't have permission to delete this task!");
      console.log(error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        sx: {
          width: "1000px",
          maxWidth: "100%",
          height: "auto",
          overflowY: "auto",
        },
      }}
    >
      <DialogTitle id="alert-dialog-title">
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Button
            variant="text"
            sx={{
              display: "flex",
              alignItems: "center",
              color: "gray",
              gap: 1,
              textTransform: "uppercase",
            }}
          >
            <Box
              component="img"
              src={getTaskIcon(task?.data.result.type)}
              alt="icon"
              sx={{
                width: "20px",
              }}
            />
            <Typography>
              {task?.data.result.type} - {task?.data.result.code}
            </Typography>
          </Button>

          <Box display="flex" alignItems="center" gap={0.25}>
            <IconButton aria-label="delete" onClick={onDeleteTask}>
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container>
          <MainTaskDetail data={task?.data.result} />
          <SubTaskDetail data={task?.data.result} />
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
