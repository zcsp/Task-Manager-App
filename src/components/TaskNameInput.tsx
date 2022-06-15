import axios from "axios";
import { ChangeEventHandler, FormEventHandler, useState } from "react";

const TaskNameInput = ({ taskId, taskName, afterSubmit }: { taskId: string; taskName: string; afterSubmit: () => void; }) => {

  const [name, setName] = useState<string>(taskName || '');
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => setName(e.target.value);
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    axios
      .put(`/api/tasks/${taskId}`, { task: { name } })
      .then((res) => {
        afterSubmit();
      })
      .catch((error) => console.error(error));
  }

  return (
    <form onSubmit={handleSubmit}>
      <input id="name" name="name" value={name} onChange={handleChange} className="sneaky-input" />
    </form>
  )
}

export default TaskNameInput;