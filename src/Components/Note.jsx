import React, { useEffect, useRef, useState } from "react";
import { handleDeleteNote, handleUpdate, handleRequestToProtected } from "../controller/controller";
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=close" />;

const Note = ({noteObject, setNotes} ) => {

    const [noteContent, setNoteContent] = useState(noteObject.noteContent);
    const [lastSavedState, setNextState] = useState(noteObject.noteContent);
    const textareaRef = useRef(null);

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
        try{
            console.log("updated note should be : ", updatedNoteObject.noteContent);
            console.log("note id is: ", updatedNoteObject.noteId)
            const response = await handleRequestToProtected(async (token)=>{ await handleUpdate(updatedNoteObject, token)}); 
            console.log("updated the note successfully! , response : ",response);
            setNextState(noteContent);
        }
        catch(error)
        {
            console.error("error while updating the note!!, error: ",error.message);
        }


    };

    const handleDelete = async (e) => {
        try{
            const response = await handleRequestToProtected(async (accessToken)=>{  await handleDeleteNote(noteObject.noteId, accessToken)});
            console.log("note deleted ! response from the server: ", response);
            //setVisible(false);
            setNotes((prevNotes) => prevNotes.filter((object) => object.noteId !== noteObject.noteId));
            return;
        }
        catch(err){
            console.log("error deleting the note from the server! error: ",err.message );

        }
    }

    const adjustHeight = () =>{
        const textarea = textareaRef.current
        if (textarea) {
            const minHeight = 216;
            textarea.style.minHeight = 'auto';
            const newHeight = textarea.scrollHeight < minHeight ? `${minHeight}px` : `${textarea.scrollHeight}px`;
            textarea.style.minHeight = newHeight;
        }
    }

    useEffect(adjustHeight, [noteContent]);

    return(
           ( 
            <div className="noteContainer">
                <div className="noteNavBar">
                    <button onClick={handleDelete}>x</button>
                </div>
                <textarea ref={textareaRef} name="noteContent" className="noteContent" value={noteContent} onChange={handleChange} onBlur={handleBlur} placeholder="Note..." >
                </textarea>
            </div>
            
           ) 
    
    )
}

export default Note;