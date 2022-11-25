import React,{useState,useEffect} from 'react'
import { useParams } from "react-router";
import Sideopt from './Sideopt';
import { magic } from "../magic";
import Loading from "./Loading";
import TeamMembers from './TeamMembers';
function Project() {
  const [userMetadata, setUserMetadata] = useState();
  const params = useParams();
  const { name } = params;
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
  return userMetadata?(
   <div className='projectPage'>
    <Sideopt user={userMetadata.email}/>
    <div className='projectContent'>
    <h2>Welcome to your project {name}</h2>
    <br></br>
    <input placeholder='Enter email to add member' className='email'></input>
    <button className='addEmail'>Add Member</button>
    </div>
    <TeamMembers className='members'/>
   </div> 
  ):<Loading/>
}

export default Project