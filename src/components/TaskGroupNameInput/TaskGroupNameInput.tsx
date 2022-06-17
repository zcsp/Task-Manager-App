import axios from "axios";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import './TaskGroupNameInput.scss';

const TaskGroupNameInput = ({ taskGroup, afterSubmit }: { taskGroup: any; afterSubmit: () => void; }) => {

  const [name, setName] = useState<string>(taskGroup.name || '');
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => setName(e.target.value);
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    axios
      .put(`/api/task_groups/${taskGroup.id}`, { task_group: { name } })
      .then((res) => {
        afterSubmit();
      })
      .catch((error) => console.error(error));
  }

  return (
    <form onSubmit={handleSubmit}>
      <input id="name" name="name" value={name} onChange={handleChange} className="tg-name-input sneaky-input" style={{ color: taskGroup.color }} />
    </form>
  )
}

export default TaskGroupNameInput;