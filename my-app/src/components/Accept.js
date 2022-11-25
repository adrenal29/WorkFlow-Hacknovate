import React from "react";
import { addDoc, collection, getDoc, getDocs } from "firebase/firestore";
import db from "./firebase";
function Accept(props) {
  function accept() {
    console.log(props.sender, props.reciever, props.project);
  }
  return (
    <div>
      <button onClick={accept}>Accept</button>
    </div>
  );
}

export default Accept;
