import axios from "axios";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useAppDataContext } from "../contexts/AppContext";

const TaskUserInput = ({ taskId, taskUserId, afterSubmit }: { taskId: string; taskUserId: string; afterSubmit: () => void; }) => {

  const { users } = useAppDataContext();
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
    <select className="custom-select" placeholder="Select User" onChange={handleChange} value={userId} onBlur={handleSubmit}>
      <option value="">Unassigned</option>
      {users.map((u: any) => (
        <option value={u.id}>{u.name}</option>
      ))}
    </select>
  )
}

export default TaskUserInput;