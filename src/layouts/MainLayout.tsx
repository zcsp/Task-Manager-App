import axios from 'axios';
import { ReactNode, useEffect, useState } from 'react';
import TopNav from '../components/Navigation/Navigation';

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
    <>
      <TopNav projects={projects} />
      {children}
    </>
  );
}

export default MainLayout;
