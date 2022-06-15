import axios from "axios";
import { ChangeEventHandler, FormEventHandler, useState } from "react";

const TaskStatusInput = ({ taskId, taskStatusId, statuses, afterSubmit }: { taskId: string; taskStatusId: string; statuses: any[]; afterSubmit: () => void; }) => {

  const [statusId, setStatusId] = useState<string>(taskStatusId);
  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => setStatusId(e.target.value);
  const handleSubmit: FormEventHandler<HTMLSelectElement> = (e) => {
    e.preventDefault();
    axios
      .put(`/api/tasks/${taskId}`, { task: { status_id: statusId } })
      .then((res) => {
        afterSubmit();
      })
      .catch((error) => console.error(error));
  }

  return (
    <select onChange={handleChange} value={statusId} onBlur={handleSubmit}>
      <option value="" />
      {statuses.map(s => (
        <option value={s.id}>{s.name}</option>
      ))}
    </select>
  )
}

export default TaskStatusInput;