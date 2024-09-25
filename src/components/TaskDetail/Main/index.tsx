import _http from "@/libs/http";
import { Task } from "@/types";
import { Box, Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

type Props = {
  data: Task | undefined;
};

export default function MainTaskDetail({ data }: Props) {
  const [open, setOpen] = useState(false);
  const [summary, setSummary] = useState(data?.name);
  const [description, setDescription] = useState(data?.description);

  const queryClient = useQueryClient();
  const { slug } = useParams();

  const refetchAllQueries = () => queryClient.invalidateQueries();

  const handleUpdate = async () => {
    const jsonSender = {
      ...data,
      name: summary,
      description,
    };

    try {
      await _http.put(`/projects/${slug}/tasks/${data?._id}`, jsonSender);
      setOpen(false);
      refetchAllQueries();
      toast.success("Task updated!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid size={8}>
      <Box display="flex" flexDirection="column" gap={1.5}>
        {open ? (
          <Box display="flex" flexDirection="column" gap={2} mr={4}>
            <Box display="flex" flexDirection="column">
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: 12,
                }}
              >
                Summary
              </Typography>
              <TextField
                variant="outlined"
                size="small"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
            </Box>

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
            <Box display="flex" alignItems="center" gap={2}>
              <Button variant="contained" onClick={handleUpdate}>
                Save
              </Button>
              <Button variant="text" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </Box>
          </Box>
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            gap={1}
            mr={4}
            onClick={() => setOpen(!open)}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 500,
              }}
            >
              {data?.name}
            </Typography>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 14,
              }}
            >
              Description
            </Typography>
            <Box width="100%" maxHeight="30vh" height="auto">
              <div
                dangerouslySetInnerHTML={{
                  __html: data?.description || "Nothing",
                }}
              />
            </Box>
          </Box>
        )}

        <Typography
          sx={{
            fontWeight: 500,
            fontSize: 14,
          }}
        >
          Comments
        </Typography>
        <Box width="100%" height="10vh"></Box>
      </Box>
    </Grid>
  );
}
