import React, { useState, useEffect, useCallback } from "react";
import Sideopt from "./Sideopt";
import { useHistory } from "react-router";
import { useParams } from "react-router";
import { useProSidebar } from "react-pro-sidebar";
import { magic } from "../magic";
import Loading from "./Loading";
import { addDoc, collection, getDoc, getDocs } from "firebase/firestore";
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
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
function Task() {
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
  const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }
  
  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }
  
  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files, allFiles) => {
    console.log(files.map(f => f.meta))
    allFiles.forEach(f => f.remove())
  }

   const [open,setOpen]=useState(false)
  const [projectName,setProjectName]=useState("")
  const projectCol = collection(db, "projects");
  return userMetadata ? (
    <div className="teamPage">
      <Sideopt user={userMetadata.email} />

      <div className="team-area">
        Tasks
        <h5>1. Quarterly Finanncial Report</h5>
        <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      accept="image/*,audio/*,video/*"
    />
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default Task;
