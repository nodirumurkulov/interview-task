import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js modules
ChartJS.register(ArcElement, Tooltip, Legend);

// Props to accept data dynamically
interface TaskTypesChartProps {
  problems: number;
  questions: number;
  tasks: number;
}

const TaskTypesChart: React.FC<TaskTypesChartProps> = ({
  problems,
  questions,
  tasks,
}) => {
  const data = {
    labels: ["Problems", "Questions", "Tasks"],
    datasets: [
      {
        data: [problems, questions, tasks],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-bold text-center my-4">Task Types Distribution</h2>
      <Pie data={data} />
    </div>
  );
};

export default TaskTypesChart;
