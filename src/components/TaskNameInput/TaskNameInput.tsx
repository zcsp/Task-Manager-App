import axios from "axios";
import { ChangeEventHandler, FocusEventHandler, FormEventHandler, MouseEventHandler, useEffect, useRef, useState } from "react";
import { useAppDataContext } from "../../contexts/AppContext";
import './TaskNameInput.scss';

const TaskNameInput = ({ task, afterSubmit }: { task: any; afterSubmit: () => void; }) => {

  const [name, setName] = useState<string>(task.name || '');
  const [width, setWidth] = useState(0);
  const inputRef = useRef(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const { setCurrentTask } = useAppDataContext();

  useEffect(() => {
    if (h1Ref.current) {
      setWidth(h1Ref.current.offsetWidth)
    }
  }, [name, h1Ref.current]);

  const updateTaskName = () => {
    if (name !== task.name) {
      axios
        .put(`/api/tasks/${task.id}`, { task: { name } })
        .then((res) => {
          afterSubmit();
        })
        .catch((error) => console.error(error));
    }
  }

  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (inputRef.current && document.activeElement === inputRef.current) {
      setCurrentTask(task);
    }
  }
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => setName(e.target.value);
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    updateTaskName();
  }
  const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    updateTaskName();
  }

  return (
    <div onClick={handleClick}>
      <form className="task-name-form" onSubmit={handleSubmit}>
        <h1 style={{ visibility: 'hidden', height: 0 }} ref={h1Ref}>{name}</h1>
        <input
          ref={inputRef}
          className="task-name-input sneaky-input"
          id="name"
          name="name"
          value={name}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{ width }}
        />
      </form>
    </div>
  )
}

export default TaskNameInput;