import axios from "axios";
import { ChangeEventHandler, FormEventHandler, MouseEventHandler, useState } from "react";

const DeleteTaskButton = ({ taskId, afterSubmit }: { taskId: string; afterSubmit: () => void; }) => {

  const handleClick: MouseEventHandler = (e) => {
    e.preventDefault();
    axios
      .delete(`/api/tasks/${taskId}`)
      .then((res) => {
        afterSubmit();
      })
      .catch((error) => console.error(error));
  }

  return (
    <button onClick={handleClick}>
      x
    </button>
  )
}

export default DeleteTaskButton;