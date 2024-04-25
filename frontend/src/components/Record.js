import React, { useState } from "react";
import axios from "./axios.js";

export default function Record() {
  const newRecord = {
    status:"",
    bookId:"",
    userId:"",
  };
  const newUpdateRecord = {
    recId: "",
    status:"",
    bookId:"",
    userId:"",
  };
  const newDeleteRecord = {
    recId: ""
  };
  const newViewCategories = {
    recId: false,
    status: false,
    bookId: false,
    userId: false,
  };

  const [record, setRecord] = useState(newRecord);
  const [updateRecord, setUpdateRecord] = useState(newUpdateRecord);
  const [deleteRecord, setDeleteRecord] = useState(newDeleteRecord);
  const [viewCategories, setViewCategories] = useState(newViewCategories);
  const [viewRecord, setViewRecord] = useState([]);
  const handleRecordChange = (e) => {
    const { name, value } = e.target;
    setRecord((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateRecordChange = (e) => {
    const { name, value } = e.target;
    setUpdateRecord((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDeleteRecordChange = (e) => {
    const { name, value } = e.target;
    setDeleteRecord((prevState) => ({
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
      if (type === "addrecord") {
        await axios.post(`/records`, record);
        setRecord(newRecord);
      } else if (type === "editrecord") {
        console.log(updateRecord)
        await axios.put(`/records`, updateRecord);
        setUpdateRecord(newUpdateRecord);
      } else if (type === "viewrecord") {
        const { recId,status,bookId,userId } = viewCategories;
        let url = "/records?";
        if (userId) {
          url += `userId=${userId}&`;
        }
        if (status) {
          url += `status=${status}&`;
        }
        if (bookId) {
            url += `bookId=${bookId}&`;
          }
          if (recId) {
            url += `recId=${recId}&`;
          }
        const users = await axios.get(url);
        setViewRecord(users.data);
      } 
      else  if (type === "deleterecord") {
        await axios.delete(`/records/${deleteRecord.recId}`);
        setDeleteRecord(newDeleteRecord);
      }
    } catch (e) {
      //alert(e);
    }
  };

  return (
    <div>
      <h2>Add Record</h2>
      <input
        type="text"
        name="status"
        value={record.status}
        onChange={handleRecordChange}
        placeholder="Status"
      />
      <input
        type="text"
        name="userId"
        value={record.userId}
        onChange={handleRecordChange}
        placeholder="UserId"
      />
      <input
        type="text"
        name="bookId"
        value={record.bookId}
        onChange={handleRecordChange}
        placeholder="BookId"
      />
      <button onClick={() => handleClick("addrecord")}>Button</button>
      <h2>Edit Record</h2>
      <input
        type="text"
        name="recId"
        value={updateRecord.recId}
        onChange={handleUpdateRecordChange}
        placeholder="Record ID"
      />
      <input
        type="text"
        name="status"
        value={updateRecord.status}
        onChange={handleUpdateRecordChange}
        placeholder="Status"
      />
      <input
        type="text"
        name="userId"
        value={updateRecord.userId}
        onChange={handleUpdateRecordChange}
        placeholder="UserId"
      />
      <input
        type="text"
        name="bookId"
        value={updateRecord.bookId}
        onChange={handleUpdateRecordChange}
        placeholder="BookId"
      />
      <button onClick={() => handleClick("editrecord")}>Button</button>
      <h2>Delete Record</h2>
      <input
        type="text"
        name="recId"
        value={deleteRecord.recId}
        onChange={handleDeleteRecordChange}
        placeholder="Record ID"
      />
      <button onClick={() => handleClick("deleterecord")}>Button</button>
      <h2>View All Records</h2>
      <input
        type="checkbox"
        name="recId"
        checked={viewRecord.recId}
        onChange={handleViewCategories}
      />
      Rec Id
      <input
        type="checkbox"
        name="status"
        checked={viewRecord.status}
        onChange={handleViewCategories}
      />
      Status
      <input
        type="checkbox"
        name="userId"
        checked={viewRecord.userId}
        onChange={handleViewCategories}
      />
      User Id
      <input
        type="checkbox"
        name="bookId"
        checked={viewRecord.bookId}
        onChange={handleViewCategories}
      />
      Book Id
      <button onClick={() => handleClick("viewrecord")}>Button</button>
      {viewRecord.length !== 0 && (
        <div>
            
          {viewRecord.map((record) => {
                // console.log(record.id);
                // console.log(record.status);
                // console.log(record.userId);
                // console.log(record.bookId);
            return (
              <div>
                <hr></hr>
                {record.id && <>Record Id: {record.id}</>}
                <br></br>
                {record.status && <>Status: {record.status}</>}
                <br></br>
                {record.userId && <>User Id: {record.userId}</>}
                <br></br>
                {record.bookId && <>Book Id: {record.bookId}</>}
              </div>
            );
          })}
          <hr></hr>
        </div>
      )}
    </div>
  );
}
