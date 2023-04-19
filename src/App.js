import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.scss";

export default function App() {
  const [users, setUsers] = useState([]);
  const readUsers = () => {
    axios
    .get("/users")
    .then((res) => setUsers(res.data))
    .catch((err) => console.log(err));
  }
  useEffect(() => {
    //Read users
    readUsers()
  }, []);

  const onAddNew = () =>{
    const newUser = {
      "name": "trial",
      "password": "p",
      "profession": "k",
    }
    axios
    .post("/users", newUser)
    .then((res) => {
      readUsers()
      alert(res.data)
    })
    .catch((err) => console.log(err));
  }

  const onDeleteNew = (id) =>{
    axios
    .delete("/users/"+id)
    .then((res) => {
      readUsers()
      alert(res.data)
    })
    .catch((err) => console.log(err));
  }

  const onEditNew = (id, item) =>{
    item.profession = item.profession + "1";
    axios
    .put("/users/"+id, item)
    .then((res) => {
      readUsers()
      alert(res.data)
    })
    .catch((err) => console.log(err));
  }
  
  return (
    <div className="App">
      <h1>Fetched from local</h1>
      <div className="title-text">
        <strong>users</strong>(<i>JSON data from json file inside src</i>)
      </div>
      {users && <>
      {
        Object.keys(users)?.map((key) => {
          const { name, profession } = users[key];
          return <div key={name} className="list-row">
            <strong>{profession}</strong>
            <button onClick={()=>onDeleteNew(key)}> Delete</button>
            <button onClick={()=>onEditNew(key, users[key])}> Update</button>
          </div>
        })}
      <button onClick={onAddNew}> Add</button>
      </>}
    </div>
  );
}
