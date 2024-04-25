import React, { useState } from "react";
import axios from "./axios.js";

export default function User() {
  const newUser = {
    name: "",
  };
  const newUpdateUser = {
    userId: "",
    name: "",
  };
  const newDeleteUser = {
    userId: ""
  };
  const newViewCategories = {
    userId: false,
    name: false,
  };

  const [user, setUser] = useState(newUser);
  const [updateUser, setUpdateUser] = useState(newUpdateUser);
  const [deleteUser, setDeleteUser] = useState(newDeleteUser);
  const [viewCategories, setViewCategories] = useState(newViewCategories);
  const [viewUser, setViewUser] = useState([]);
  {
    /*
    const [user, setUser] = useState({
      username: "",
    });
    const [updateUser, setUpdateUser] = useState({
      userId: "",
      username: "",
    });
    const [record, setRecord] = useState({
      userId: "",
      bookId: "",
      status: "",
    });
    const [updateRecord, setUpdateRecord] = useState({
      recordId: "",
      userId: "",
      bookId: "",
      status: "",
    });*/
  }
  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateUserChange = (e) => {
    const { name, value } = e.target;
    setUpdateUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDeleteUserChange = (e) => {
    const { name, value } = e.target;
    setDeleteUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleViewCategories = (e) => {
    const { name, checked } = e.target;
    setViewCategories((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleClick = async (type) => {
    try {
      if (type === "adduser") {
        await axios.post(`/users`, user);
        setUser(newUser);
      } else if (type === "edituser") {
        console.log(updateUser)
        await axios.put(`/users`, updateUser);
        setUpdateUser(newUpdateUser);
      } else if (type === "viewuser") {
        const { userId, name } = viewCategories;
        let url = "/users?";
        if (userId) {
          url += `userId=${userId}&`
        }
        if (name) {
          url += `name=${name}&`
        }
        const users = await axios.get(url);
        setViewUser(users.data);
      } 
      else  if (type === "deleteuser") {
        await axios.delete(`/users/${deleteUser.userId}`);
        setDeleteUser(newDeleteUser);
      }
    } catch (e) {
      //alert(e);
    }
  };

  return (
    <div>
      <h2>Add User</h2>
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleUserChange}
        placeholder="User Name"
      />
      <button onClick={() => handleClick("adduser")}>Button</button>
      <h2>Edit User</h2>
      <input
        type="text"
        name="userId"
        value={updateUser.userId}
        onChange={handleUpdateUserChange}
        placeholder="User ID"
      />
      <input
        type="text"
        name="name"
        value={updateUser.name}
        onChange={handleUpdateUserChange}
        placeholder="User Name"
      />
      <button onClick={() => handleClick("edituser")}>Button</button>
      <h2>Delete User</h2>
      <input
        type="text"
        name="userId"
        value={deleteUser.userId}
        onChange={handleDeleteUserChange}
        placeholder="User ID"
      />
      <button onClick={() => handleClick("deleteuser")}>Button</button>
      <h2>View All Users</h2>
      <input
        type="checkbox"
        name="userId"
        checked={viewUser.userId}
        onChange={handleViewCategories}
      />
      User Id
      <input
        type="checkbox"
        name="name"
        checked={viewUser.name}
        onChange={handleViewCategories}
      />
      Name
      <button onClick={() => handleClick("viewuser")}>Button</button>
      {viewUser.length !== 0 && (
        <div>
          {viewUser.map((user) => {
            return (
              <div>
                <hr></hr>
                {user.id && <>User Id: {user.id}</>}
                <br></br>
                {user.username && <>Name: {user.username}</>}
              </div>
            );
          })}
          <hr></hr>
        </div>
      )}
      {/*
        <h2>Add User</h2>
        <input
          type="text"
          name="user_name"
          value={user.username}
          onChange={handleChange}
          placeholder="User Name"
        />
        <button onClick={handleClick("adduser")}>Button</button>
  
        <h2>Edit User</h2>
        <input
          type="text"
          name="user_id"
          value={user.userId}
          onChange={handleChange}
          placeholder="User ID"
        />
        <input
          type="text"
          name="user_name"
          value={user.username}
          onChange={handleChange}
          placeholder="User Name"
        />
        <button onClick={handleClick("edituser")}>Button</button>
  
        <h2>Add Record</h2>
        <input
          type="text"
          name="book_id"
          value={record.book_id}
          onChange={handleChange}
          placeholder="Book ID"
        />
        <input
          type="text"
          name="user_id"
          value={record.user_id}
          onChange={handleChange}
          placeholder="User ID"
        />
        <input
          type="text"
          name="status"
          value={record.status}
          onChange={handleChange}
          placeholder="Status"
        />
        <button onClick={handleClick("addrecord")}>Button</button>
  
        <h2>Edit Record</h2>
        <input
          type="text"
          name="user_id"
          value={record.id}
          onChange={handleChange}
          placeholder="Record ID"
        />
        <input
          type="text"
          name="book_id"
          value={record.book_id}
          onChange={handleChange}
          placeholder="Book ID"
        />
        <input
          type="text"
          name="user_id"
          value={record.user_id}
          onChange={handleChange}
          placeholder="User ID"
        />
        <input
          type="text"
          name="status"
          value={record.status}
          onChange={handleChange}
          placeholder="Status"
        />
    <button onClick={handleClick("editrecord")}>Button</button>*/}
    </div>
  );
}
