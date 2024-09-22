import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CreateProject from "@/components/CreateProject";
import ProjectData from "@/components/ProjectData";
import { useQuery } from "@tanstack/react-query";
import { fetchProject } from "@/api/Project";
import { Skeleton } from "@mui/material";

export default function Projects() {
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: () => fetchProject(),
  });
  return (
    <Box p={4}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h5" fontWeight={500}>
          Projects
        </Typography>
        <CreateProject handlerData={refetch} />
      </Stack>
      {isLoading ? (
        <Skeleton
          variant="rounded"
          width="100%"
          height="60vh"
          animation="pulse"
          sx={{
            mt: 4,
          }}
        />
      ) : (
        <ProjectData data={data?.data.result} />
      )}
    </Box>
  );
}
