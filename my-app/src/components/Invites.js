import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Sideopt from "./Sideopt";
import { magic } from "../magic";
import Loading from "./Loading";
import TeamMembers from "./TeamMembers";
import { addDoc, collection, getDoc, getDocs } from "firebase/firestore";
import db from "./firebase";
import Accept from "./Accept";
function Invites() {
  const [userMetadata, setUserMetadata] = useState();
  const params = useParams();
  const name  ={ params};
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
  const [invites, setInvites] = useState([]);
  const invitesRef = collection(db, "requests");
  useEffect(() => {
    const getInvites = async () => {
      const data = await getDocs(invitesRef);
      console.log(data);
      setInvites(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(invites)
    };
    getInvites();
  }, []);
  const [request, setRequest] = useState("");
  const requestCol = collection(db, "requests");
  const sendRequest = (e) => {
    e.preventDefault();
    addDoc(requestCol, {
      projectName: name,
      sender: userMetadata.email,
      team: name,
      reciever: request,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const [project,setproject]=useState("");
  function updateRequest(){
    console.log()
  }
  return userMetadata ? (
    <div className="projectPage">
      <Sideopt user={userMetadata.email} />
      <div className="requests">
        <h3>Requests to Join</h3>
        <table>
        {
        invites.map((invite) => {
            if(userMetadata.email==invite.reciever)
            return (
        
            <div>
            <h4><i>{invite.sender} </i> inviting you for project <i>{invite.projectName}</i></h4>
            <Accept sender={invite.sender} reciever={invite.reciever} project={invite.projectName}/>
            </div>
            );
        
        })}
        </table>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default Invites;
