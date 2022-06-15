import axios from "axios";
import { ChangeEventHandler, FormEventHandler, useState } from "react";

const TaskUserInput = ({ taskId, taskUserId, users, afterSubmit }: { taskId: string; taskUserId: string; users: any[]; afterSubmit: () => void; }) => {

  const [userId, setUserId] = useState<string>(taskUserId);
  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => setUserId(e.target.value);
  const handleSubmit: FormEventHandler<HTMLSelectElement> = (e) => {
    e.preventDefault();
    axios
      .put(`/api/tasks/${taskId}`, { task: { user_id: userId } })
      .then((res) => {
        afterSubmit();
      })
      .catch((error) => console.error(error));
  }

  return (
    <select placeholder="Select User" onChange={handleChange} value={userId} onBlur={handleSubmit}>
      <option value="">Unassign</option>
      {users.map(u => (
        <option value={u.id}>{u.name}</option>
      ))}
    </select>
  )
}

export default TaskUserInput;