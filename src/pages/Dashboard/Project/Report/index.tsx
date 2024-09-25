import { fetchReport } from "@/api/Report";
import BarChart from "@/components/Chart/BarChart";
import PieChart from "@/components/Chart/PieChart";
import ReportTable from "@/components/ReportTable";
import { Box, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function ProjectReport() {
  const { slug } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: [`report`],
    queryFn: () => fetchReport(slug || ""),
  });

  const chart = data?.data.chart;

  return (
    <Box
      sx={{
        p: 4,
      }}
    >
      {!isLoading ? (
        <Box display="flex" flexDirection="column" gap={3}>
          <Grid container>
            <Grid size={8}>
              <BarChart chartData={chart?.status || []} />
            </Grid>
            <Grid size={4}>
              <PieChart chartData={chart?.type || []} />
            </Grid>
          </Grid>
          <ReportTable members={data?.data.members || []} />
        </Box>
      ) : (
        <Box
          width="100%"
          height="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress size="3rem" />
        </Box>
      )}
    </Box>
  );
}
