import axios from "axios";
import { ChangeEventHandler, FocusEventHandler, MouseEventHandler, useEffect, useState } from "react";
import { useAppDataContext } from "../../contexts/AppContext";
import OutsideAlerter from "../OutsideAlerter";
import './DetailsSidebar.scss';
import { Editor } from '@tinymce/tinymce-react';
import NewUpdateEditor from "../NewUpdateEditor/NewUpdateEditor";

const DetailsSidebar = () => {

  const { currentTask, setCurrentTask } = useAppDataContext();
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    setOpen(currentTask !== undefined)
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

          <NewUpdateEditor />

          <Editor
            apiKey="emsqvxp8ckgrd8rdofg68w9lvgj01eduldukzn0x5g63m0om"
            init={{
              // selector: 'textarea',
              plugins: 'a11ychecker advcode casechange export formatpainter image editimage linkchecker autolink lists checklist media mediaembed pageembed permanentpen table advtable',
              toolbar: 'a11ycheck addcomment showcomments casechange checklist code export formatpainter image editimage pageembed permanentpen table tableofcontents',
            }}
          />
        </div>
      </OutsideAlerter>
    </div>
  )
}

export default DetailsSidebar;