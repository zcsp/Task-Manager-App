import axios from "axios";
import { ChangeEventHandler, FormEventHandler, MouseEventHandler, useRef, useState } from "react";
import { useAppDataContext } from "../../contexts/AppContext";
import './TaskNameInput.scss';

const TaskNameInput = ({ task, afterSubmit }: { task: any; afterSubmit: () => void; }) => {

  const [name, setName] = useState<string>(task.name || '');
  const inputRef = useRef(null);
  const { setCurrentTask } = useAppDataContext();
  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (inputRef.current && document.activeElement === inputRef.current) {
      setCurrentTask(task);
    }
  }
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => setName(e.target.value);
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (name !== task.name) {
      axios
        .put(`/api/tasks/${task.id}`, { task: { name } })
        .then((res) => {
          afterSubmit();
        })
        .catch((error) => console.error(error));
    }
  }

  return (
    <div onClick={handleClick}>
      <form className="task-name-form" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          className="task-name-input sneaky-input"
          id="name"
          name="name"
          value={name}
          onChange={handleChange}
        />
      </form>
    </div>
  )
}

export default TaskNameInput;