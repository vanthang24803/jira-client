import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CreateProject from "@/components/CreateProject";

export default function Projects() {
  return (
    <Box p={4}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h5" fontWeight={500}>
          Project
        </Typography>

        <CreateProject />
      </Stack>
    </Box>
  );
}
