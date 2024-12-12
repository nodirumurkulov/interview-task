import { createRoot } from 'react-dom/client';
import 'tailwindcss/tailwind.css';
import App from 'components/App';
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
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  PointElement, // Registering PointElement
  LineElement,  // Registering LineElement
  Title,
  Tooltip,
  Legend
);

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);

root.render(<App />);
