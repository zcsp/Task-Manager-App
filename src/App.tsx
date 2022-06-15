import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';
import DashboardPage from './pages/DashboardPage';
import ProjectPage from './pages/ProjectPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/project/:project_id" element={<ProjectPage />} />
      </Routes>
    </Router>
  );
}

export default App;
