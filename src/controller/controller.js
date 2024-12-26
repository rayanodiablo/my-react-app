import axios from "axios";

export async function handleSignUp (userInfos) 
{
    try{
        const theUserName = userInfos.userName;
        console.log(`the request body sent is : ${JSON.stringify(userInfos)}`);

        const response = await axios.post("http://localhost:3000/SignUp",  userInfos, {
            headers: { "Content-Type": "application/json" },
        });

        console.log("signed up user successfully! response: ", JSON.parse(response.data));
        return response.data;
    }  
    catch(error){
        console.error("error while singing up !", error.message);
        throw error;
    }
}

export async function handleSignIn(userInfos){
    try{
        const response = await axios.post("http://localhost:3000/SignIn", userInfos, {
            headers : {
                "Content-Type" : "application/json"
            }
        });
        console.log("signed in the user successfully! response: ", response.data);
        return response.data;

    }
    catch(error){
        console.error("error while signing in the user!", error.message);
        throw error;
    }
}

//Authorization: `Bearer ${token}`

export async function handleFetchAllNotes (token)
{

    try{
        const response = await axios.get("http://localhost:3000/SignedIn/Notes" , {
            headers : {
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        console.log("fetched all user notes successfully! response:", response.data);
        return response.data;
    }
    catch(error)
    {
        console.error("error while fetching user notes! ", error.message);
        throw error;
    }
   
}

export async function handleAddNote (noteContent, token) 
{
    try{
        const response = await axios.post("http://localhost:3000/SignedIn/Notes", noteContent, {
            headers : {
                "Content-Type" : "application/json",
                Authorization : `Bearer ${token}`
            }
        });
        
        console.log("new note created : ",response.data);
        return response.data;
    }
    catch(error)
    {
        console.error("error occured when creating the new note");
        throw error;
    }
}

export async function handleDeleteNote (noteId, token) {
    try{
        const response = axios.delete("http://localhost:3000/SignedIn/Notes",  {
            headers : {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            data : {noteId}
        },
    );
        console.log(`note with note id: ${noteId} successfully deleted! response: ${response}`);
        return response.data;
    }
    catch(error){
        console.error(`error occured while deleting the note with id : ${noteId} error: ${error.message}`);
        throw error;
    }
}

