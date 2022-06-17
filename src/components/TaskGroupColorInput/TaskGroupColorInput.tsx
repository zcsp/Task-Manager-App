import axios from "axios";
import { useState } from "react";
import { ColorChangeHandler, TwitterPicker } from "react-color";
import './TaskGroupColorInput.scss';

const TaskGroupColorInput = ({ taskGroup, afterSubmit }: { taskGroup: any; afterSubmit: () => void; }) => {

  const [open, setOpen] = useState<boolean>(false);
  const toggleOpen = () => setOpen(open => !open)
  const handleChangeComplete: ColorChangeHandler = (c, e) => {
    e.preventDefault();
    console.log(c)
    axios
      .put(`/api/task_groups/${taskGroup.id}`, { task_group: { color: c.hex } })
      .then((res) => {
        afterSubmit();
      })
      .catch((error) => console.error(error));
  }

  return (
    <div className="color-input-root" style={{ backgroundColor: taskGroup.color }} onClick={toggleOpen}>
      <div className="color-input-container">
        {open && <TwitterPicker onChangeComplete={handleChangeComplete} className="color-picker" />}
      </div>
    </div>
  )
}

export default TaskGroupColorInput;