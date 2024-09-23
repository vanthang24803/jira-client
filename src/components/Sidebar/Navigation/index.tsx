import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import { Link, useLocation } from "react-router-dom";
import { disableItems, menuItems } from "@/constant";

export default function NavigationSidebar() {
  const location = useLocation();
  const pathname = location.pathname;

  const parts = pathname.split("/");
  const lastPart = parts[parts.length - 1];

  const newPath = pathname.slice(0, pathname.lastIndexOf("/"));

  return (
    <Stack direction="column" spacing={1}>
      {menuItems.map((item, index) => (
        <Link
          key={index}
          to={`${newPath}/${item.url}`}
          style={{
            textDecoration: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "8px 16px",
              borderRadius: "4px",
              backgroundColor:
                lastPart === item.url ? "#f5f5f4" : "transparent",
              color: lastPart === item.url ? "#1375d6" : "black",
              cursor: "pointer",
              ":hover": {
                backgroundColor: "#f5f5f4",
              },
            }}
          >
            {item.icon}

            <Typography
              sx={{
                ml: 1,
                fontWeight: lastPart === item.url ? "medium" : "normal",
              }}
            >
              {item.label}
            </Typography>
          </Box>
        </Link>
      ))}
      <Divider />

      {disableItems.map((item, index) => (
        <Tooltip key={index} title="Not Implement">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "8px 16px",
              borderRadius: "4px",
              backgroundColor:
                lastPart === item.url ? "#f5f5f4" : "transparent",
              cursor: "pointer",
              ":hover": {
                backgroundColor: "#f5f5f4",
              },
            }}
          >
            {item.icon}

            <Typography
              sx={{
                ml: 1,
                color: lastPart === item.url ? "#1375d6" : "black",
                fontWeight: lastPart === item.url ? "medium" : "normal",
              }}
            >
              {item.label}
            </Typography>
          </Box>
        </Tooltip>
      ))}
    </Stack>
  );
}
