import { useState } from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import {
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  Box,
} from "@mui/material";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
  },
  cutout: "45%",
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

type Props = {
  chartData: number[];
};

export default function ChartSelector({ chartData }: Props) {
  const data = {
    labels: ["Task", "Story", "Bug"],
    datasets: [
      {
        label: "Task Status",
        data: chartData,
        backgroundColor: [
          "rgba(135, 206, 235, 0.6)",
          "rgba(60, 179, 113, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
        borderColor: [
          "rgba(135, 206, 235, 1)",
          "rgba(60, 179, 113, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const [chartType, setChartType] = useState<"pie" | "donut">("pie");

  return (
    <Card sx={{ mr: 4, py: 0.5 }}>
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography gutterBottom sx={{ fontSize: 14, fontWeight: 600 }}>
            Task Status Distribution
          </Typography>
          <Select
            sx={{
              height: "35px",
              ".MuiSelect-select": {
                display: "flex",
                alignItems: "center",
                gap: "4px",
              },
            }}
            value={chartType}
            onChange={(e) => setChartType(e.target.value as "pie" | "donut")}
          >
            <MenuItem value="pie">Pie Chart</MenuItem>
            <MenuItem value="donut">Donut Chart</MenuItem>
          </Select>
        </Box>
        {chartType === "pie" ? (
          <Pie data={data} options={{ ...options, cutout: undefined }} />
        ) : (
          <Doughnut data={data} options={options} />
        )}
      </CardContent>
    </Card>
  );
}
