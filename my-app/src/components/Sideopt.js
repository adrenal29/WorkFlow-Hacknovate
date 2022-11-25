import React ,{useState,useEffect}from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { addDoc, collection, getDoc, getDocs, snapshotEqual } from "firebase/firestore";
import db from "./firebase";
import { Link } from 'react-router-dom';

function Sideopt(props) {
  const [teams , setTeams] = useState([]);
  const [projects,setProjects]=useState([]);
  const teamsRef=collection(db,'teams');
  const projectRef=collection(db,'projects')
  useEffect(()=>{
    const getTeams=async ()=>{
      const data=await getDocs(teamsRef);
      console.log(data)
      setTeams(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
    }
    getTeams();
  },[])
  useEffect(()=>{
    const getProjects=async ()=>{
      const data=await getDocs(projectRef);
      console.log(data)
      setProjects(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
    }
    getProjects();
  },[])
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <Sidebar>
        <Menu>
          <SubMenu label="Teams">
            {
              teams.map((team)=>{
                if(team.admin==props.user)
                return(
                  
                    <MenuItem routerLink={<Link to={"/team/"+team.teamName} />}>{team.teamName}</MenuItem>
                 
                )
              })
            }
          </SubMenu>
          <SubMenu label="Projects">
            {
              projects.map((project)=>{
                if(project.admin==props.user)
                return(
                  
                    <MenuItem routerLink={<Link to={"/project/"+project.projectName} />}>{project.projectName}</MenuItem>
                 
                )
              })
            }
          </SubMenu>
          <MenuItem routerLink={<Link to={"/invites/"+props.user} />}>Invites</MenuItem>
          <MenuItem>Requests</MenuItem>
          <MenuItem routerLink={<Link to={"/tasks/"+props.user} />}>Tasks</MenuItem>
          <MenuItem> Help </MenuItem>
        </Menu>
      </Sidebar>
      ;
    </div>
  );
}

export default Sideopt;
