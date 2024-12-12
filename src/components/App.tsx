import { Routes, Route, Link } from "react-router-dom";
import IssuesList from "../components/IssuesList";
import Data from "../components/Data";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold text-center">Service Desk Dashboard</h1>
        <nav className="mt-4">
          <ul className="flex justify-center gap-6">
            <li>
              <Link
                to="/"
                className="text-lg hover:underline focus:outline-none focus:ring-2 focus:ring-white rounded"
              >
                Issues List
              </Link>
            </li>
            <li>
              <Link
                to="/data"
                className="text-lg hover:underline focus:outline-none focus:ring-2 focus:ring-white rounded"
              >
                Data Insights
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="p-6">
        <Routes>
          <Route path="/" element={<IssuesList />} />
          <Route path="/data" element={<Data />} />
        </Routes>
      </main>
      <footer className="bg-gray-200 text-center py-4 mt-6">
        <p className="text-sm text-gray-600">© 2024 Service Desk Dashboard</p>
      </footer>
    </div>
  );
};

export default App;
