import React, { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router";
import { magic } from "../magic";
import Loading from "./Loading";
import Sidebar from "./Sideopt";
import { ProSidebarProvider } from "react-pro-sidebar";
import { useProSidebar } from "react-pro-sidebar";
import "../css/profile.css";
import { addDoc, collection, getDoc, getDocs } from "firebase/firestore";
import db from "./firebase";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export default function Profile() {
  const [userMetadata, setUserMetadata] = useState();
  const history = useHistory();

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

  /**
   * Perform logout action via Magic.
   */
  const logout = useCallback(() => {
    magic.user.logout().then(() => {
      history.push("/login");
    });
  }, [history]);

  const { collapseSidebar } = useProSidebar();
  const [teamName, setTeamName] = useState("");
  const [teamDesc, setTeamDesc] = useState("");
  const saveTeam = (e) => {
    e.preventDefault();
    if (teamName === "") return;
    const teamCol = collection(db, "teams");
    addDoc(teamCol, { teamName, admin: userMetadata.email, teamDesc })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
      setTeamName("")
      setTeamDesc("")
  };

  return userMetadata ? (
    <div className="dashboard">
      <Sidebar className="menu" user={userMetadata.email}/>
      <div className="content">
        <h4>Welcome {userMetadata.email}</h4>
        <div className="teamCreate">
          <h3>Create New Team</h3>

          <form className="teamForm" onSubmit={saveTeam}>
            <div className="inputBox">
              <label>Your Team Name</label>
              <input
                name
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              ></input>
            </div>
            <div className="inputBox">
              <label for="desc">Team Description</label>
              <textarea
                rows={10}
                cols={50}
                name="desc"
                value={teamDesc}
                onChange={(e) => setTeamDesc(e.target.value)}
              ></textarea>
            </div>
            <Popup trigger={ <button className="teamSubmit">Create Now</button>} position="right center">
              <div>Team created successufully</div>
            </Popup>
           
          </form>
        </div>
      </div>

      <button onClick={logout} className="logoutBtn">
        Logout
      </button>
    </div>
  ) : (
    <Loading />
  );
}
