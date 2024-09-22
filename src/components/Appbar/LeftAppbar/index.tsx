import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import { Link, useLocation } from "react-router-dom";
import Logo from "@/assets/logo-small.svg";
import Typography from "@mui/material/Typography";

const navigation = [
  {
    name: "You work",
    url: "#",
  },
  {
    name: "Project",
    url: "/dashboard/project",
  },
  {
    name: "Filter",
    url: "#",
  },
  {
    name: "Dashboards",
    url: "#",
  },
  {
    name: "Teams",
    url: "#",
  },
];

export default function LeftAppBar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Stack direction="row" spacing={6}>
      <Link to="#">
        <Box
          component="img"
          src={Logo}
          alt="logo"
          sx={{
            width: "60px",
          }}
        />
      </Link>
      <Stack direction="row" spacing={2} alignItems="center">
        {navigation.map((item, index) => (
          <Link
            key={index}
            to={item.url}
            style={{
              textDecoration: "none",
            }}
          >
            <Typography
              fontSize={14}
              fontWeight={item.url == currentPath ? 700 : 500}
              color={item.url == currentPath ? "primary" : "black"}
              sx={{
                cursor: "pointer",
              }}
            >
              {item.name}
            </Typography>
          </Link>
        ))}
      </Stack>
    </Stack>
  );
}
