import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ProjectCategory, ProjectDetail } from "@/types";
import SoftwareIcon from "@/assets/software.svg";
import MarketingIcon from "@/assets/marketing.svg";
import BusinessIcon from "@/assets/business.svg";

type Props = {
  data: ProjectDetail | undefined;
};

export default function SidebarIcon({ data }: Props) {
  const getIcon = (category: ProjectCategory | undefined) => {
    switch (category) {
      case "Software":
        return SoftwareIcon;
      case "Marketing":
        return MarketingIcon;
      case "Business":
        return BusinessIcon;
      default:
        return SoftwareIcon;
    }
  };
  return (
    <Box>
      <Stack direction="row" spacing={1}>
        <Box
          component="img"
          src={getIcon(data?.category)}
          alt="icon"
          sx={{
            width: "35px",
          }}
        />
        <Stack direction="column">
          <Typography fontWeight={500}>{data?.name}</Typography>
          <Typography fontSize={12} color="#6e6c66">
            {data?.category}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
