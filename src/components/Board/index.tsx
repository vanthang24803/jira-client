import { Button, Stack, Tooltip, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import BoardItem from "./BoardItem";
import AddCardIcon from "@mui/icons-material/AddCard";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import { Task } from "@/types";

type Props = {
  name: string;
  tasks: Task[] | undefined;
};

export default function Board({ name, tasks }: Props) {
  return (
    <Grid size={3}>
      <Box
        sx={{
          width: "280px",
          height: "71vh",
          bgcolor: "#f3f4f6",
          borderRadius: "4px",
        }}
      >
        {/* HEADER */}
        <Box py={1} px={2} height={50}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography
              fontWeight={500}
              sx={{
                color: "#737373",
                fontSize: 13,
                textTransform: "uppercase",
              }}
            >
              {name} {tasks?.length}
            </Typography>
          </Stack>
        </Box>
        {/* MAIN */}
        <Box
          sx={{
            height: "calc(71vh - 50px - 50px)",
          }}
          gap={2}
          px={1}
        >
          <Stack
            direction="column"
            spacing={1}
            sx={{
              overflowX: "hidden",
              overflowY: "auto",
              m: "0 5px",
              maxHeight: "calc(71vh - 50px - 50px - 5px)",
              "&::-webkit-scrollbar": {
                width: "4px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#ced0da",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#bfc2cf",
              },
            }}
          >
            {tasks?.map((item) => (
              <BoardItem key={item._id} data={item} />
            ))}
          </Stack>
        </Box>

        {/* FOOTER */}
        <Box
          py={1}
          px={2}
          height={50}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Button
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
      </Box>
    </Grid>
  );
}
