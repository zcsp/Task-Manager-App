import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';
import AppDataProvider from './contexts/AppContext';
import DashboardPage from './pages/DashboardPage';
import ProjectPage from './pages/ProjectPage/ProjectPage';

function App() {
  return (
    <AppDataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/project/:project_id" element={<ProjectPage />} />
        </Routes>
      </Router>
    </AppDataProvider>
  );
}

export default App;
