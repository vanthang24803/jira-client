import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { PropsWithChildren } from "react";

export default function ProjectLayout({ children }: PropsWithChildren) {
  const { slug } = useParams();

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid size={2}>
          <Sidebar slug={slug} />
        </Grid>
        <Grid size={10}>{children}</Grid>
      </Grid>
    </Box>
  );
}
