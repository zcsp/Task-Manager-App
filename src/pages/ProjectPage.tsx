import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TaskGroupTable from '../components/TaskGroupTable/TaskGroupTable';
import MainLayout from '../layouts/MainLayout';

function ProjectPage() {

  const { project_id } = useParams();

  const [project, setProject] = useState<any>();
  const [users, setUsers] = useState([]);
  const [statuses, setStatuses] = useState([]);

  const reloadTable = () => {
    axios
      .get(`/api/projects/${project_id}`)
      .then((res) => {
        setProject(res.data)
      })
      .catch((error) => console.error(error));
  }

  const resetUsers = () => {
    axios
      .get("/api/users")
      .then((res) => {
        setUsers(res.data)
      })
      .catch((error) => console.error(error));
  }

  const resetStatuses = () => {
    axios
      .get("/api/statuses")
      .then((res) => {
        setStatuses(res.data)
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    reloadTable()
    resetUsers()
    resetStatuses();
  }, [project_id])

  if (!project) {
    return <>Loading...</>
  }

  return (
    <MainLayout>
      <h1>{project.name}</h1>
      {project.task_groups && project.task_groups.map((tg: any) => (
        <TaskGroupTable taskGroup={tg} users={users} reloadFn={reloadTable} statuses={statuses} key={`${tg.name}-${tg.id}`} />
      ))}
    </MainLayout>
  );
}

export default ProjectPage;
