import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import RightAppBar from "./RightAppbar";
import LeftAppBar from "./LeftAppbar";

export default function Appbar() {
  return (
    <Container maxWidth={false} disableGutters={true}>
      <Box width="100%" borderBottom="1px solid #ccc">
        <Container maxWidth={false}>
          <Stack
            alignItems="center"
            direction="row"
            height="3rem"
            px={2}
            justifyContent="space-between"
          >
            <LeftAppBar />
            <RightAppBar />
          </Stack>
        </Container>
      </Box>
    </Container>
  );
}
