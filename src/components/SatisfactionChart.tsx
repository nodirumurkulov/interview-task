import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface SatisfactionChartProps {
  good: number;
  bad: number;
}

const SatisfactionChart: React.FC<SatisfactionChartProps> = ({
  good,
  bad,
}) => {
  const data = {
    labels: ["Good", "Bad"],
    datasets: [
      {
        data: [good, bad],
        backgroundColor: ["#4CAF50", "#FF4D4D"],
      },
    ],
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-bold text-center my-4">Satisfaction Ratings</h2>
      <Pie data={data} />
    </div>
  );
};

export default SatisfactionChart;
