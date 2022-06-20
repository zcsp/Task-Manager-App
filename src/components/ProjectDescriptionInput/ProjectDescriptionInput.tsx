import axios from "axios";
import { ChangeEventHandler, FocusEventHandler, useEffect, useState } from "react";
import './ProjectDescriptionInput.scss';

const ProjectDescriptionInput = ({ projectId, projectDescription, afterSubmit }: { projectId: string; projectDescription: string; afterSubmit: () => void; }) => {

  const [description, setDescription] = useState<string>(projectDescription || '');
  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => setDescription(e.target.value);
  const handleBlur: FocusEventHandler<HTMLTextAreaElement> = (e) => {
    e.preventDefault();
    axios
      .put(`/api/projects/${projectId}`, { project: { description } })
      .then((res) => {
        afterSubmit();
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    setDescription(projectDescription)
  }, [projectDescription])

  return (
    <textarea
      name="description"
      value={description}
      onChange={handleChange}
      className="sneaky-input project-description-input"
      onBlur={handleBlur}
      placeholder="Add project description"
    />
  )
}

export default ProjectDescriptionInput;