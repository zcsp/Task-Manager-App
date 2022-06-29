import axios from "axios";
import { ChangeEventHandler, FocusEventHandler, MouseEventHandler, useEffect, useState } from "react";
import { useAppDataContext } from "../../contexts/AppContext";
import OutsideAlerter from "../OutsideAlerter";
import './DetailsSidebar.scss';
import NewUpdateEditor from "../NewUpdateEditor/NewUpdateEditor";
import UpdateCard from "../UpdateCard";
import TaskNameInput from "../TaskNameInput/TaskNameInput";
import { useParams } from "react-router-dom";

const DetailsSidebar = () => {

  const { currentTask, setCurrentTask, resetProject } = useAppDataContext();
  const { project_id } = useParams();
  const [open, setOpen] = useState<boolean>(false);
  const [updates, setUpdates] = useState<any[]>([]);

  const getUpdates = () => {
    axios
      .get(`/api/tasks/${currentTask.id}/updates`)
      .then((res) => {
        setUpdates(res.data);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    setOpen(currentTask !== undefined)
    if (currentTask) {
      getUpdates();
    }
  }, [currentTask])

  const handleCloseClick: MouseEventHandler<HTMLButtonElement | HTMLDivElement> = (e) => {
    setCurrentTask(undefined)
  }

  if (!currentTask) {
    return <></>
  }

  return (
    <div
      id="details-sidebar-backdrop"
      className={open ? 'open' : ''}
    >
      <OutsideAlerter
        handleClick={handleCloseClick}
      >
        <div id="details-sidebar">
          <div>
            <div className="flex-container">
              <TaskNameInput task={currentTask} afterSubmit={() => resetProject(project_id)} />
              <button onClick={handleCloseClick}>close</button>
            </div>
          </div>
          <NewUpdateEditor afterSubmit={getUpdates} />
          <div id="update-cards">
            {updates.map(update => (
              <UpdateCard update={update} />
            ))}
          </div>
        </div>
      </OutsideAlerter>
    </div>
  )
}

export default DetailsSidebar;