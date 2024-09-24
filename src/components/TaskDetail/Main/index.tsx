import { Task } from "@/types";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

type Props = {
  data: Task | undefined;
};

export default function MainTaskDetail({ data }: Props) {
  return (
    <Grid size={8}>
      <Box display="flex" flexDirection="column" gap={1} mr={4}>
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
            dangerouslySetInnerHTML={{ __html: data?.description || "Nothing" }}
          />
        </Box>
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
