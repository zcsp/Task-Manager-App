import axios from "axios";
import { ChangeEventHandler, FocusEventHandler, MouseEventHandler, useEffect, useState } from "react";
import { useAppDataContext } from "../../contexts/AppContext";
import OutsideAlerter from "../OutsideAlerter";
import './DetailsSidebar.scss';
import NewUpdateEditor from "../NewUpdateEditor/NewUpdateEditor";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'


const DetailsSidebar = () => {

  const { currentTask, setCurrentTask } = useAppDataContext();
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
              <h1>
                {currentTask?.name}
              </h1>
              <button onClick={handleCloseClick}>close</button>
            </div>
          </div>
          <NewUpdateEditor afterSubmit={getUpdates} />
          {updates.map(update => (
            <ReactMarkdown rehypePlugins={[rehypeRaw]} children={update.content} />
          ))}
        </div>
      </OutsideAlerter>
    </div>
  )
}

export default DetailsSidebar;