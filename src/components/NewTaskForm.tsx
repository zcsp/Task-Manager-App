import axios from "axios";
import { ChangeEventHandler, FormEventHandler, useState } from "react";

const NewTaskRow = ({ taskGroup, afterSubmit }: { taskGroup: any; afterSubmit: () => void; }) => {

  const [name, setName] = useState<string>('');
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => setName(e.target.value);
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const reqBody: any = {}
    Array.from(formData.entries()).map(([k, v]) => {
      reqBody[k] = v;
    })
    axios
      .post("/api/tasks", {
        task: reqBody,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      })
      .then((res) => {
        setName('');
        afterSubmit();
      })
      .catch((error) => console.error(error));
  }

  return (
    <div style={{ marginBottom: '12px' }}>
      <form onSubmit={handleSubmit}>
        <input type="hidden" id="task_group_id" name="task_group_id" value={taskGroup.id} readOnly />
        <input type="text" placeholder="New Task" id="name" name="name" value={name} onChange={handleChange} />
      </form>
    </div>
  )
}

export default NewTaskRow;