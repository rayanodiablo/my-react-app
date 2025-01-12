import React, { useState } from "react";
import { handleAddNote, handleRequestToProtected } from "../controller/controller";

const NewNoteGen = ({setNotes, setErrorMessage} ) =>
{
    const [noteContent, setNoteContent] = useState("");



    const handleBlur = async () => {
        if(noteContent.trim() !== "")
        {
            //saving the note the user left
            
            console.log('saving note: ', noteContent);
            try{
                const response = await handleRequestToProtected(async (accessToken)=> await handleAddNote({noteContent}, accessToken));
                console.log("response received from the server : ", JSON.stringify(response));
                setNotes((prev) =>[response, ...prev]);
                setErrorMessage("");
                
            }
            catch(error)
            {
                console.log("error has occured : ",error.message);
                setErrorMessage("error creating the new note!");
                
            }
            finally
            {
                setNoteContent("");
                return
            }

        }

        console.log("newNoteGen component has lost focus!");    
    };

    const handleInputChange = (e) =>{

        const text = e.target.value;
        setNoteContent(text);
    }

    return(
        <textarea id="newNoteGen"
        placeholder="New Note..."
        value={noteContent}
        onBlur={handleBlur}
        onInput={handleInputChange} > </textarea>
    )
}

export default NewNoteGen;