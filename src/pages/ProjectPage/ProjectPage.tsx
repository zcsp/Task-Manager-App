import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProjectDescriptionInput from '../../components/ProjectDescriptionInput/ProjectDescriptionInput';
import TaskGroupTable from '../../components/TaskGroupTable/TaskGroupTable';
import MainLayout from '../../layouts/MainLayout';
import { useNavigate } from "react-router-dom";
import './ProjectPage.scss';

function ProjectPage() {

  const { project_id } = useParams();
  let navigate = useNavigate();

  const [project, setProject] = useState<any>();
  const [users, setUsers] = useState([]);
  const [statuses, setStatuses] = useState([]);

  const resetProjects = () => {
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

  const handleDelete = () => {
    if (window.confirm(`Do you want to delete the project ${project.name}?`)) {
      axios
        .delete(`/api/projects/${project_id}`)
        .then((res) => {
          navigate('/')
        })
        .catch((error) => console.error(error));
    }
  }

  useEffect(() => {
    resetProjects()
    resetUsers()
    resetStatuses();
  }, [project_id])

  if (!project) {
    return <>Loading...</>
  }

  return (
    <MainLayout>
      <div id="project-page">
        <div className="flex-container">
          <h1 style={{ marginRight: '8px' }}>{project.name}</h1>
          <button onClick={handleDelete}>
            delete
          </button>
        </div>
        <ProjectDescriptionInput projectId={project.id} projectDescription={project.description} afterSubmit={() => resetProjects()} />
        {project.task_groups && project.task_groups.map((tg: any) => (
          <TaskGroupTable taskGroup={tg} users={users} reloadFn={resetProjects} statuses={statuses} key={`${tg.name}-${tg.id}`} />
        ))}
        <button onClick={createTaskGroup}>
          New Task Group
        </button>
      </div>
    </MainLayout>
  );
}

export default ProjectPage;
