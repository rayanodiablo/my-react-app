import React from "react";
import NewNoteGen from "../Components/NewNoteGen";
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=search" />
const Notes =  () => {

    return(
        <div id="notesPageContainer">

            <section id="searchNoteSection">
                <form id="searchNoteForm"> <button id="searchNoteButton" ><span className="material-symbols-outlined">search</span></button> <input id="searchNoteInput" type="text"  placeholder="Search" /></form>
            </section>

            <section id="newNoteSection"> <NewNoteGen/></section>
            <section id="notes"></section>
        </div>
    );
}
export default Notes;