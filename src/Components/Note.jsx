import React from "react";


const Note = ({noteContent}) => {


    return(
        <div className="noteContainer">
            <div className="noteNavBar">
                
            </div>
            <div className="noteContent">
                {noteContent}
            </div>
        </div>
    )
}

export default Note;