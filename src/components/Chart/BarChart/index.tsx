import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, CardContent, Typography } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

type Props = {
  chartData: number[];
};

export default function BarChart({ chartData }: Props) {
  const data = {
    labels: ["Backlog", "Develop", "In Process", "Done"],
    datasets: [
      {
        label: "Status",
        data: chartData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 205, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 205, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card sx={{ mr: 4, cursor: "pointer" }}>
      <CardContent>
        <Typography
          gutterBottom
          sx={{ fontSize: 14, textTransform: "capitalize", fontWeight: 600 }}
        >
          Task Progress Breakdown
        </Typography>
        <Bar data={data} options={options} />
      </CardContent>
    </Card>
  );
}
