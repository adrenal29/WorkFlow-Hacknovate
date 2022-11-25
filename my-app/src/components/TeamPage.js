import React, { useState, useEffect, useCallback } from "react";
import Sideopt from "./Sideopt";
import { useHistory } from "react-router";
import { useParams } from "react-router";
import { useProSidebar } from "react-pro-sidebar";
import { magic } from "../magic";
import Loading from "./Loading";
import { addDoc, collection, getDoc, getDocs } from "firebase/firestore";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import "../css/teampage.css";
import db from "./firebase";
function TeamPage() {
  const [userMetadata, setUserMetadata] = useState();
  const params = useParams();
  const { name } = params;
  const logout = useCallback(() => {
    magic.user.logout().then(() => {
      history.push("/login");
    });
  }, [history]);

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
   const [open,setOpen]=useState(false)
  const [projectName,setProjectName]=useState("")
  const projectCol = collection(db, "projects");
  const saveTeam=(e)=>{
    e.preventDefault();
    addDoc(projectCol, { projectName, admin: userMetadata.email,team:name })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err.message);
    });
      setOpen(false)
  }
  return userMetadata ? (
    <div className="teamPage">
      <Sideopt user={userMetadata.email} />

      <div className="team-area">
        <h3>{name}</h3>
        <h2>{userMetadata.email}</h2>
        <button onClick={()=>setOpen(true)} className="create"> Create a project</button>
        <Dialog open={open}  >
          <DialogTitle>Enter name for your new project</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label=""
                type="email"
                fullWidth
                variant="standard"
                value={projectName}
                onChange={(e)=>setProjectName(e.target.value)}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={saveTeam}>Create</Button>
          </DialogActions>
        </Dialog>
      </div>
      <button onClick={logout} className="logoutBtn">
        Logout
      </button>
    </div>
  ) : (
    <Loading />
  );
}

export default TeamPage;
