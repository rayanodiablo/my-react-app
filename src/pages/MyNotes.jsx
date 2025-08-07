import React, { useEffect, useState } from "react";
import NewNoteGen from "../Components/NewNoteGen";
import { handleFetchAllNotes, handleLogout, handleRequestToProtected } from "../controller/controller";
import Note from "../Components/Note";
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=search" />;

const Notes =  () => {

    const [notes, setNotes] = useState([]);
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    useEffect( () => {
            const fetchNotes = async() => { 
            try{ 

                const response = await handleRequestToProtected( async (accessToken) => await handleFetchAllNotes (accessToken));
                console.log("from the mynotes component, here are the notes: ", response);
                if(!response || response.length === 0)
                {
                    return;
                };
                setNotes(response);
            }
            catch(error)
            {

                setErrorMessage("failed loading your messages");
                return;
            }
        };
        fetchNotes();

    }
     , [])

    async function handleLogoutClick (e){
        try{
            setIsButtonDisabled(true);
            await handleLogout();
            console.log("logged out successfully!");
            return;
        }
        catch(err)
        {
            setErrorMessage("error logging out!");
            console.error("error logging out!", err.message);
            return;
        }
        finally{
            setIsButtonDisabled(false);
        }
    }

    return(
        <div id="notesPageContainer">

            <button id="logout" onClick={handleLogoutClick} disabled={isButtonDisabled}>
                {isButtonDisabled ? 'Logging Out...' : 'Log Out'}
            </button>
            <section id="searchNoteSection">
                <form id="searchNoteForm" onSubmit={
                    (e) =>{
                        e.preventDefault();
                    }
                }> <button id="searchNoteButton" type="submit" ><span className="material-symbols-outlined">search</span></button> <input id="searchNoteInput" type="text"  placeholder="Search" /></form>
            </section>



            <section id="newNoteSection"> <NewNoteGen setNotes={setNotes} setErrorMessage={setErrorMessage}/></section>
           
            { notes.length === 0 && <div className="messages"> {"Create new Notes!"} </div>}

           
            {errorMessage && <div className="errorMessage"> {errorMessage} </div>}
           


            <section id="existingNotesSection"> { notes.map(note => <Note noteObject={note} key={note.id} setNotes={setNotes} />)}</section>
        </div>
    );
}
export default Notes;