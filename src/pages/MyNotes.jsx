import React, { useEffect, useState } from "react";
import NewNoteGen from "../Components/NewNoteGen";
import { handleFetchAllNotes } from "../controller/controller";
import { getToken } from "../formHandler/useFormData";
import Note from "../Components/Note";
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=search" />;

const Notes =  () => {

    const [notes, setNotes] = useState([]);
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("")
    const token = getToken()

    useEffect( () => {
            const fetchNotes = async() => { 
            try{ 

                const response = await handleFetchAllNotes (token);
                if(!response || response.length === 0)
                {
                    setMessage("create a new note!");
                    return;
                };
                setMessage("");
                setNotes(response);
            }
            catch(error)
            {

                setMessage("");
                setErrorMessage("failed loading your messages");
            }
        };
        fetchNotes();

    }
     , [])

    return(
        <div id="notesPageContainer">

            <section id="searchNoteSection">
                <form id="searchNoteForm" onSubmit={
                    (e) =>{
                        e.preventDefault();
                    }
                }> <button id="searchNoteButton" type="submit" ><span className="material-symbols-outlined">search</span></button> <input id="searchNoteInput" type="text"  placeholder="Search" /></form>
            </section>



            <section id="newNoteSection"> <NewNoteGen setNotes={setNotes} setErrorMessage={setErrorMessage}/></section>
           
           
            {message && <div className="message"> {message} </div>}

           
            {errorMessage && <div className="errorMessage"> {errorMessage} </div>}
           


            <section id="existingNotesSection"> { notes.map(note => <Note noteObject={note} key={note.noteId} />)}</section>
        </div>
    );
}
export default Notes;