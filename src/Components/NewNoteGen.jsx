import React, { useState } from "react";
import { handleAddNote, handleRequestToProtected } from "../controller/controller";

const NewNoteGen = ({setNotes, setErrorMessage} ) =>
{
    const [content, setcontent] = useState("");



    const handleBlur = async () => {
        if(content.trim() !== "")
        {
            //saving the note the user left
            
            console.log('saving note: ', content);
            try{
                const response = await handleRequestToProtected(async (accessToken)=> await handleAddNote({content}, accessToken));
                console.log("response received from the server : ", JSON.stringify(response[0]));
                const newNoteObject = response[0];
                setNotes((prev) =>[newNoteObject, ...prev]);
                setErrorMessage("");
                
            }
            catch(error)
            {
                console.log("error has occured : ",error.message);
                setErrorMessage("error creating the new note!, the cause");
                
            }
            finally
            {
                setcontent("");
                return
            }

        }

        console.log("newNoteGen component has lost focus!");
        setcontent("");
        return ;   
    };

    const handleInputChange = (e) =>{

        const text = e.target.value;
        setcontent(text);
    }

    return(
        <textarea id="newNoteGen"
        placeholder="New Note..."
        value={content}
        onBlur={handleBlur}
        onInput={handleInputChange} > </textarea>
    )
}

export default NewNoteGen;