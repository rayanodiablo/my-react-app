import axios from "axios";

export function getToken (key){
    return localStorage.getItem(key) ;
}

export function setToken(key, value){
    localStorage.setItem(key, value);
}


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
        console.log("token sent is : " + token + " of type :" + typeof token);
        const response = await axios.delete(`http://localhost:3000/SignedIn/Notes?noteId=${noteId}`,  {
            headers : {
                Authorization : `Bearer ${token}`
            }
    });
        console.log(`note with note id: ${noteId} successfully deleted! response: ${response.data}`);
        return response.data;
    }
    catch(error){
        console.error(`error occured while deleting the note with id : ${JSON.stringify(noteId)} error: ${error.message}`);
        throw error;
    }
}

export async function handleUpdate (noteObject, token) {
    try{
        const response = await axios.put("http://localhost:3000/SignedIn/Notes", noteObject, {
            headers : {
                "Content-Type" : "application/json",
                Authorization : `Bearer ${token}`
            }
        })
        return response.data;
    }
    catch(error)
    {
        console.log("error has happend while updating the note!: ", error.message);
        throw error;
    }
}

export async function handleLogout (){
    // Clear access token from localStorage
    localStorage.removeItem("accessToken");
  
    // Send request to backend to clear the refresh token cookie
    try {
      await axios.post("http://localhost:3000/logout"); // Your logout route to clear the cookie
      // Redirect to login page after successful logout
      window.location.href = "/SignIn"; // Adjust to your route
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  

// handleRequestToProtected(async (accessToken) =>{
//      addnNote(noteId, accessToken)})

// Unified request handler for protected routes
export async function handleRequestToProtected(requestHandler) {
    const accessToken = getToken("accessToken");  // Fetch token from storage

    try {
        // Try using the provided access token first
        const response = await requestHandler(accessToken);
        console.log("✅ Request successful! Response:", JSON.stringify(response));
        return response;
    } catch (err) {
        console.warn("⚠️ Access token expired or invalid. Attempting refresh...");

        const refreshToken = getToken("refreshToken");
        if (!refreshToken) {
            console.error("❌ No refresh token found. Redirecting to sign-in.");
            window.location.href = "/SignIn";  // Redirect user for re-authentication
            throw new Error("No refresh token available");
        }

        try {
            // Attempt to get a new access token using the refresh token
            const { data } = await axios.post("http://localhost:3000/token", {}, {
                withCredentials: true // Sends the secure cookie automatically
            });

            const newAccessToken = data.accessToken;
            setToken("accessToken", newAccessToken);  // Save the new access token

            // Retry the original request with the new token
            const retryResponse = await requestHandler(newAccessToken);
            console.log("✅ Request successful after token refresh:", retryResponse.data);
            return retryResponse;
        } catch (refreshError) {
            console.error("❌ Refresh token invalid or expired. Redirecting to sign-in.");
            window.location.href = "/SignIn";  
            throw new Error("Failed to refresh token: " + refreshError.message);
        }
    }
}
