import { createRoot } from "react-dom/client";
import "tailwindcss/tailwind.css";
import App from "components/App";
import { BrowserRouter } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  PointElement,
  LineElement, // Added for line charts
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  PointElement,
  LineElement, // Registering LineElement
  Title,
  Tooltip,
  Legend
);

const container = document.getElementById("root") as HTMLDivElement;
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
