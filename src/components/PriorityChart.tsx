import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js modules
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface PriorityChartProps {
  high: number;
  normal: number;
  low: number;
}

const PriorityChart: React.FC<PriorityChartProps> = ({ high, normal, low }) => {
  const data = {
    labels: ["High", "Normal", "Low"],
    datasets: [
      {
        label: "Priority Distribution",
        data: [high, normal, low],
        backgroundColor: ["#FF4D4D", "#FFDD57", "#4CAF50"],
      },
    ],
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-bold text-center my-4">Priority Distribution</h2>
      <Bar data={data} />
    </div>
  );
};

export default PriorityChart;
