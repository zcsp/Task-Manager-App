import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProjectDescriptionInput from '../../components/ProjectDescriptionInput/ProjectDescriptionInput';
import TaskGroupTable from '../../components/TaskGroupTable/TaskGroupTable';
import MainLayout from '../../layouts/MainLayout';
import { useNavigate } from "react-router-dom";
import './ProjectPage.scss';
import NewTaskFormRow from '../../components/NewTaskForm';
import Button from '../../components/Button';
import { useAppDataContext } from '../../contexts/AppContext';
import IconButton from '../../components/IconButton';

function ProjectPage() {

  const { project_id } = useParams();
  let navigate = useNavigate();
  const {
    project,
    setProject,
    resetProject,
  } = useAppDataContext();

  useEffect(() => {
    resetProject(project_id)
  }, [project_id])

  const createTaskGroup = () => {
    axios
      .post("/api/task_groups", { project_id: project.id, color: '#0693e3' })
      .then((res) => {
        setProject(res.data)
      })
      .catch((error) => console.error(error));
  }

  const handleDelete = () => {
    if (window.confirm(`Do you want to delete the project ${project.name}?`)) {
      axios
        .delete(`/api/projects/${project.id}`)
        .then((res) => {
          navigate('/')
        })
        .catch((error) => console.error(error));
    }
  }

  if (!project) {
    return <>Loading...</>
  }

  return (
    <MainLayout>
      <div id="project-page">
        <div id="project-page-name" className="flex-container">
          <h1 style={{ marginRight: '8px' }}>{project.name}</h1>
          <IconButton variant="danger" onClick={handleDelete}>
            x
          </IconButton>
        </div>
        <ProjectDescriptionInput projectId={project.id} projectDescription={project.description} afterSubmit={() => resetProject(project_id)} />
        {project.task_groups && project.task_groups.map((tg: any) => (
          <Fragment key={`${tg.name}-${tg.id}`}>
            <TaskGroupTable taskGroup={tg} />
            <NewTaskFormRow taskGroup={tg} afterSubmit={() => resetProject(project_id)} />
          </Fragment>
        ))}
        <Button onClick={createTaskGroup}>
          New Task Group
        </Button>
      </div>
    </MainLayout>
  );
}

export default ProjectPage;
