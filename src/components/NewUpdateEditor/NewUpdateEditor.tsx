import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { MouseEventHandler, useRef, useState } from "react";
import { useAppDataContext } from "../../contexts/AppContext";
import Button from "../Button";
import './NewUpdateEditor.scss';

const NewUpdateEditor = ({ afterSubmit }: { afterSubmit: () => void; }) => {

  const { currentTask, currentUser } = useAppDataContext();
  const editorRef = useRef<Editor>(null);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const openEditor = () => setIsEditing(true);
  const closeEditor = () => setIsEditing(false);

  const handleUpdate: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (editorRef.current && editorRef.current.editor) {
      let content = editorRef.current.editor.getContent();
      axios
        .post(`/api/updates`, { update: { content, task_id: currentTask.id, user_id: currentUser.id } })
        .then((res) => {
          afterSubmit();
          if (editorRef.current && editorRef.current.editor) {
            editorRef.current.editor.resetContent();
          }
        })
        .catch((error) => console.error(error));
    }
  }

  const handleCancel: MouseEventHandler<HTMLButtonElement> = (e) => {
    closeEditor();
  }

  return (
    <div id="new-update-editor">
      {!isEditing ? (
        <input placeholder="Write an update..." onClick={openEditor} />
      ) : (
        <>
          <div>
            <Editor
              ref={editorRef}
              apiKey="emsqvxp8ckgrd8rdofg68w9lvgj01eduldukzn0x5g63m0om"
              init={{
                plugins: 'a11ychecker advcode casechange export formatpainter image editimage linkchecker autolink lists checklist media mediaembed pageembed permanentpen table advtable',
                toolbar: 'a11ycheck addcomment showcomments casechange checklist code export formatpainter image editimage pageembed permanentpen table tableofcontents',
                auto_focus: true
              }}
            />
          </div>
          <div id="new-update-actions">
            <Button onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleUpdate}>
              Update
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default NewUpdateEditor;