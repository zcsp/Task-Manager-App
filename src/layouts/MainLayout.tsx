import axios from 'axios';
import { ReactNode, useEffect, useState } from 'react';
import SideNav from '../components/Navigation/Navigation';
import './MainLayout.scss';

function MainLayout({ children }: { children: ReactNode }) {

  const [projects, setProjects] = useState([]);

  const getProjects = () => {
    axios
      .get("/api/projects")
      .then((res) => {
        setProjects(res.data)
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    getProjects();
  }, [])

  return (
    <div id="main-layout">
      <SideNav projects={projects} />
      <main>
        {children}
      </main>
    </div>
  );
}

export default MainLayout;
