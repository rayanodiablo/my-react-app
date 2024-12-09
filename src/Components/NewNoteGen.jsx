import React, { useState } from "react";

const NewNoteGen = () =>
{
    const [noteContent, setNoteContent] = useState("");



    const handleBlur = () => {
        if(noteContent.trim() !== "")
        {
            //saving the note the user left
            console.log('saving note: ', noteContent);
            setNoteContent("");
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
        onInput={handleInputChange} > {noteContent}</textarea>
    )
}

export default NewNoteGen;