import React, { useState } from "react";
import { handleDeleteNote, handleUpdate } from "../controller/controller";
import { getToken } from "../formHandler/useFormData";
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=close" />;

const Note = ({noteObject}) => {

    const [noteContent, setNoteContent] = useState(noteObject.noteContent);
    const [lastSavedState, setNextState] = useState(noteObject.noteContent);
    const [visible, setVisible] = useState(true);

    function handleChange (e) {
        setNoteContent(e.target.value);
    };

    async function handleBlur (e) {
        if(noteContent === lastSavedState)
        {
            console.log("no changes made!");
            return;
        };
        const updatedNoteObject = {
            noteId : noteObject.noteId,
            noteContent
        };
        const token = getToken();
        try{
            console.log("updated note should be : ", updatedNoteObject.noteContent);
            console.log("note id is: ", updatedNoteObject.noteId)
            const response = await handleUpdate(updatedNoteObject, token);
            console.log("updated the note successfully! , response : ",response.data);
            setNextState(noteContent);
            setVisible(false);
        }
        catch(error)
        {
            console.error("error while updating the note!!, error: ",error.message);
        }


    };

    const handleDelete = async (e) => {
        try{
            const token = getToken();
            const response = await handleDeleteNote(noteObject.noteId, token);
            console.log("note deleted ! response from the server: ", response);
            setVisible(false);
        }
        catch(err){
            console.log("error deleting the note from the server! error: ",err.message );

        }
    }

    return(
         visible ? 
           ( 
            <div className="noteContainer">
                <div className="noteNavBar">
                    <button onClick={handleDelete}><span class="material-symbols-outlined-close">x</span></button>
                </div>
                <textarea name="noteContent" className="noteContent" value={noteContent} onChange={handleChange} onBlur={handleBlur} placeholder="Note..." >
                </textarea>
            </div>
            
           ) : null
    
    )
}

export default Note;