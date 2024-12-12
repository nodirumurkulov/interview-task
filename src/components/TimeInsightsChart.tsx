import React from "react";
import { Line } from "react-chartjs-2";

interface TimeInsightsProps {
  dates: string[];
  times: number[];
}

const TimeInsightsChart: React.FC<TimeInsightsProps> = ({ dates, times }) => {
  const data = {
    labels: dates,
    datasets: [
      {
        label: "Average Time to Resolve Issues (Hours)",
        data: times,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.3, // Adds smoothness to the line
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Time (Hours)",
        },
      },
    },
  };

  return (
    <div className="chart-container my-4">
      <h2 className="text-lg font-bold">Resolution Time Insights</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default TimeInsightsChart;
