import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProjectDescriptionInput from '../../components/ProjectDescriptionInput/ProjectDescriptionInput';
import TaskGroupTable from '../../components/TaskGroupTable/TaskGroupTable';
import MainLayout from '../../layouts/MainLayout';
import './ProjectPage.scss';

function ProjectPage() {

  const { project_id } = useParams();

  const [project, setProject] = useState<any>();
  const [users, setUsers] = useState([]);
  const [statuses, setStatuses] = useState([]);

  const resetProject = () => {
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

  const createTaskGroup = () => {
    axios
      .post("/api/task_groups", { project_id: project.id })
      .then((res) => {
        console.log(res.data)
        setProject(res.data)
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    resetProject()
    resetUsers()
    resetStatuses();
  }, [project_id])

  if (!project) {
    return <>Loading...</>
  }

  return (
    <MainLayout>
      <div id="project-page">
        <h1>{project.name}</h1>
        <ProjectDescriptionInput projectId={project.id} projectDescription={project.description} afterSubmit={() => resetProject()} />
        {project.task_groups && project.task_groups.map((tg: any) => (
          <TaskGroupTable taskGroup={tg} users={users} reloadFn={resetProject} statuses={statuses} key={`${tg.name}-${tg.id}`} />
        ))}
        <button onClick={createTaskGroup}>
          New Task Group
        </button>
      </div>
    </MainLayout>
  );
}

export default ProjectPage;
