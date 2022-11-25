import React,{useState,useEffect} from 'react'
import { useParams } from "react-router";
import Sideopt from './Sideopt';
import { magic } from "../magic";
import Loading from "./Loading";
import TeamMembers from './TeamMembers';
import { addDoc, collection, getDoc, getDocs } from "firebase/firestore";
import db from "./firebase";
function Project() {
  const [userMetadata, setUserMetadata] = useState();
  const params = useParams();
  const { name } = params;
  const [reqStatus,setStatus]=useState("");
  useEffect(() => {
    // On mount, we check if a user is logged in.
    // If so, we'll retrieve the authenticated user's profile.
    magic.user.isLoggedIn().then((magicIsLoggedIn) => {
      if (magicIsLoggedIn) {
        magic.user.getMetadata().then(setUserMetadata);
      } else {
        // If no user is logged in, redirect to `/login`
        history.push("/login");
      }
    });
  }, []);
  const [request,setRequest]=useState("");
  const requestCol = collection(db, "requests");
  const sendRequest=(e)=>{
    e.preventDefault();
    addDoc(requestCol, { projectName:name, sender: userMetadata.email,team:name,reciever:request})
    .then((res) => {
      console.log(res);
      setRequest("Request Sent Succesfully")
    })
    .catch((err) => {
      console.log(err.message);
    });
  }
  return userMetadata?(
   <div className='projectPage'>
    <Sideopt user={userMetadata.email}/>
    <div className='projectContent'>
    <h2>Welcome to your project {name}</h2>
    <br></br>
    <input placeholder='Enter email to add member' className='email'
    value={request}
    onChange={(e) => setRequest(e.target.value)}
    ></input>
    <button className='addEmail' onClick={sendRequest}>Add Member</button>
    <br></br>
    </div>
    <p>{reqStatus}</p>
    <TeamMembers className='members'/>
   </div> 
  ):<Loading/>
}

export default Project