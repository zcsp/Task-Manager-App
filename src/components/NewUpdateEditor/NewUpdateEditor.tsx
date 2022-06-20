import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";
import { useAppDataContext } from "../../contexts/AppContext";
import Button from "../Button";

const NewUpdateEditor = () => {

  const { currentTask } = useAppDataContext();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const openEditor = () => setIsEditing(true);
  const closeEditor = () => setIsEditing(false);

  const handleUpdate = () => {
    if (currentTask) {
      console.log()
    }
  }

  if (!isEditing) {
    return (
      <input placeholder="Write an update..." onClick={openEditor} />
    )
  } else {
    return (
      <>
        <div style={{ marginBottom: '8px' }}>
          <Editor
            apiKey="emsqvxp8ckgrd8rdofg68w9lvgj01eduldukzn0x5g63m0om"
            init={{
              plugins: 'a11ychecker advcode casechange export formatpainter image editimage linkchecker autolink lists checklist media mediaembed pageembed permanentpen table advtable',
              toolbar: 'a11ycheck addcomment showcomments casechange checklist code export formatpainter image editimage pageembed permanentpen table tableofcontents',
              auto_focus: true
            }}
            onBlur={closeEditor}
          />
        </div>
        <Button onClick={handleUpdate}>
          Update
        </Button>
      </>
    )
  }
}

export default NewUpdateEditor;