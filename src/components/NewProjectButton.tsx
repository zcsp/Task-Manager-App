import axios from "axios";
import { ChangeEventHandler, FormEventHandler, MouseEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Modal from "./Modal";

const NewProjectButton = ({ afterSubmit }: { afterSubmit: () => void; }) => {
  let navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  // todo: use proper form handler package
  const [projectName, setProjectName] = useState<string>('');
  const [projectDescription, setProjectDescription] = useState<string>('');

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setProjectName(e.target.value);
  }
  const handleDescriptionChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setProjectDescription(e.target.value);
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    axios
      .post(`/api/projects`, { project: { name: projectName, description: projectDescription } })
      .then((res) => {
        closeModal();
        let projectId = res.data.id;
        navigate(`/project/${projectId}`, { replace: true })
        // todo: reload projects after it's moved to a context
      })
      .catch((error) => console.error(error));
  }

  return (
    <>
      <Button onClick={openModal}>
        New Project
      </Button>
      <Modal isOpen={modalOpen}>
        <h3>Create Project</h3>
        <form onSubmit={handleSubmit}>
          <input placeholder="Project Name" name="name" value={projectName} onChange={handleNameChange} />
          <textarea placeholder="Description" value={projectDescription} onChange={handleDescriptionChange} />
          <input type="submit" value="Create" />
        </form>
        <Button onClick={closeModal}>close</Button>
      </Modal>
    </>
  )
}

export default NewProjectButton;