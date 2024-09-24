import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Board from "../Board";
import { ProjectDetail } from "@/types";

type Props = {
  data: ProjectDetail | undefined;
};

export default function BoardContainer({ data }: Props) {
  const processTask = data?.tasks.filter((x) => x.status === "Process");
  const backlogTask = data?.tasks.filter((x) => x.status === "Backlog");
  const doneTask = data?.tasks.filter((x) => x.status === "Done");
  const developTask = data?.tasks.filter((x) => x.status === "Develop");

  return (
    <Box mt={2}>
      <Grid container spacing={4}>
        <Board name="Backlog" tasks={backlogTask} />
        <Board name="Develop" tasks={developTask} />
        <Board name="In Process" tasks={processTask} />
        <Board name="Done" tasks={doneTask} />
      </Grid>
    </Box>
  );
}
