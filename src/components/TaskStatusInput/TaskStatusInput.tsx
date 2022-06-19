import axios from "axios";
import { ChangeEventHandler, useEffect, useState } from "react";
import './TaskStatusInput.scss';

const getStatusById = (id: string, statuses: any[]) => {
  let status = statuses.filter(s => s.id == id)[0]
  return status
}

const TaskStatusInput = ({ taskId, taskStatusId, statuses, afterSubmit }: { taskId: string; taskStatusId: string; statuses: any[]; afterSubmit: () => void; }) => {
  const [status, setStatus] = useState<any>(undefined);

  useEffect(() => {
    if (statuses) {
      setStatus(getStatusById(taskStatusId, statuses))
    }
  }, [taskStatusId, statuses])

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    e.preventDefault();
    let newStatus = getStatusById(e.target.value, statuses)
    setStatus(newStatus)
    axios
      .put(`/api/tasks/${taskId}`, { task: { status_id: newStatus.id } })
      .then((res) => {
        afterSubmit();
      })
      .catch((error) => console.error(error));
  }

  return (
    <select
      onChange={handleChange}
      value={status?.id || ''}
      className="custom-select task-status-input"
      style={{ backgroundColor: status?.color }}
    >
      <option value="" />
      {statuses.map(s => (
        <option value={s.id}>{s.name}</option>
      ))}
    </select>
  )
}

export default TaskStatusInput;