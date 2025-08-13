import React, { useEffect, useRef, useState, forwardRef } from "react";
import { handleDeleteNote, handleUpdate, handleRequestToProtected } from "../controller/controller";
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=close" />;

const Note = forwardRef(({noteObject, setNotes, setNoteFocused}, forwardedRef ) => {


    const [noteState, noteStateSetter] = useState(noteObject);

    const [lastSavedState, setNextState] = useState(noteObject);
    const focusedNoteRef = useRef(null); 

    const textareaRef = useRef(null);
    const titleTextareaRef = useRef(null);

    function handleNoteChange (e) {
        const {value, name} = e.target;
        noteStateSetter((prev) => ({
            ...prev,
            [name] : value // only change the input that is being typed into
        }));
    };
    
    useEffect(() => {
    if (forwardedRef) {
      // Forwarded ref points to the main content textarea
      forwardedRef.current = textareaRef.current;
    }
  }, [forwardedRef]);


    
    async function handleBlur (e) {
        
        
        if(noteState.content === lastSavedState.content && noteState.title === lastSavedState.title  )
        {
            console.log("no changes made!");
            if(!focusedNoteRef.current.contains(e.relatedTarget)){
                setNoteFocused({
                isFocused : false,
                focusedNoteObject : null
                })
            }
        
            return;
        };

        try{

            console.log(`the object with content: ${noteState.content} has lost focused`);

            //logout for developpement debugging purposes
            console.log("updated note should be : ", noteState.content);
            console.log("note id is: ", noteState.id);

            //actual code
            const response = await handleRequestToProtected(async (token)=>{ await handleUpdate(noteState, token)}); 
            console.log("updated the note successfully! , response : ",response);

            setNextState(noteState);
            const changedField = e.target.name
            setNotes((prevNotes) => {
                const nextNotes = prevNotes;
                nextNotes.find(notesObj => notesObj.id === noteObject.id)[changedField] = noteState[changedField];
                console.log(nextNotes)
                return nextNotes;
            });

        }
        catch(error)
        {
            console.error("error while updating the note!!, error: ",error.message);
        }
        finally{
            if(!focusedNoteRef.current.contains(e.relatedTarget)){
                setNoteFocused({
                isFocused : false,
                focusedNoteObject : null
                })
            }
        }


    };

    const handleFocus = async (e) =>{
        if (e.target.closest('.note-delete-btn')) return; // ignore delete clicks

        setNoteFocused({
        isFocused : true,
        focusedNoteObject : noteState        
    });
    console.log(`the object with content: ${noteState.content} has been focused`);

    }

    const handleDelete = async (e) => {
        try{
            const response = await handleRequestToProtected(async (accessToken)=>{  await handleDeleteNote(noteObject.id, accessToken)});
            console.log("note deleted ! response from the server: ", response);
            //setVisible(false);
            setNotes((prevNotes) => prevNotes.filter((object) => object.id !== noteObject.id));
            return;
        }
        catch(err){
            console.log("error deleting the note from the server! error: ",err.message );

        }
    }

    const adjustHeight = () =>{
        const textarea = textareaRef.current
        const titleTextarea = titleTextareaRef.current
        
        if (textarea) {
            const minHeight = 216;
            textarea.style.minHeight = 'auto';
            const newHeight = textarea.scrollHeight < minHeight ? `${minHeight}px` : `${textarea.scrollHeight}px`;
            textarea.style.minHeight = newHeight;
        }
        if (titleTextarea) {
            const minHeight = 40;
            titleTextarea.style.minHeight = 'auto';
            const newHeight = titleTextarea.scrollHeight < minHeight ? `${minHeight}px` : `${titleTextarea.scrollHeight}px`;
            titleTextarea.style.minHeight = newHeight;
        }
    }

    useEffect(adjustHeight, [noteState]);

    return(
           ( 
            <div className="noteContainer" onFocus={handleFocus} ref={focusedNoteRef} >
                <div className="noteNavBar note-delete-btn">
                    <button  onClick={(e) => {handleDelete(noteObject.id);}}>x</button>
                </div>
                <textarea ref={titleTextareaRef} name="title" className="noteTitle" value={noteState.title} onChange={handleNoteChange} onBlur={handleBlur} placeholder="Title..."></textarea>
                <textarea ref={textareaRef} name="content" className="noteContent" value={noteState.content} onChange={handleNoteChange} onBlur={handleBlur} placeholder="Note..." >
                </textarea>
                <div className="noteMetadata"> <div className="noteMetadataDiv createdAt">Created: {noteState.created_at.replace("T", " ").replace("Z", "").split(".")[0]}</div>   <div className="noteMetadataDiv UpdatedAt">Updated: {noteState.updated_at.replace("T", " ").replace("Z", "").split(".")[0]}</div>  </div>
            </div>

            
           ) 
    
    )
});

export default Note;