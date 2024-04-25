import React, { useState } from "react";
import axios from "./axios.js";

export default function Books() {
  const newBook = {
    name: "",
  };
  const newUpdateBook = {
    bookId: "",
    name: "",
  };
  const newDeleteBook = {
    bookId: ""
  };
  const newViewCategories = {
    bookId: false,
    name: false,
  };

  const [book, setBook] = useState(newBook);
  const [updateBook, setUpdateBook] = useState(newUpdateBook);
  const [deleteBook, setDeleteBook] = useState(newDeleteBook);
  const [viewCategories, setViewCategories] = useState(newViewCategories);
  const [viewBooks, setViewBooks] = useState([]);
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
  const handleBookChange = (e) => {
    const { name, value } = e.target;
    setBook((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateBookChange = (e) => {
    const { name, value } = e.target;
    setUpdateBook((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDeleteBookChange = (e) => {
    const { name, value } = e.target;
    setDeleteBook((prevState) => ({
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
      if (type === "addbook") {
        await axios.post(`/books`, book);
        setBook(newBook);
      } else if (type === "editbook") {
        await axios.put(`/books`, updateBook);
        setUpdateBook(newUpdateBook);
      } else if (type === "viewbooks") {
        const { bookId, name } = viewCategories;
        let url = "/books?";
        if (bookId) {
          url += `bookId=${bookId}&`
        }
        if (name) {
          url += `name=${name}&`
        }
        const books = await axios.get(url);
        setViewBooks(books.data);
      } 
      else  if (type === "deletebooks") {
        await axios.delete(`/books/${deleteBook.bookId}`);
        setDeleteBook(newDeleteBook);
      }
    } catch (e) {
      //alert(e);
    }
  };

  return (
    <div>
      <h2>Add Book</h2>
      <input
        type="text"
        name="name"
        value={book.name}
        onChange={handleBookChange}
        placeholder="Book Name"
      />
      <button onClick={() => handleClick("addbook")}>Button</button>
      <h2>Edit Book</h2>
      <input
        type="text"
        name="bookId"
        value={updateBook.bookId}
        onChange={handleUpdateBookChange}
        placeholder="Book ID"
      />
      <input
        type="text"
        name="name"
        value={updateBook.name}
        onChange={handleUpdateBookChange}
        placeholder="Book Name"
      />
      <button onClick={() => handleClick("editbook")}>Button</button>
      <h2>Delete Book</h2>
      <input
        type="text"
        name="bookId"
        value={deleteBook.bookId}
        onChange={handleDeleteBookChange}
        placeholder="Book ID"
      />
      <button onClick={() => handleClick("deletebooks")}>Button</button>
      <h2>View All Books</h2>
      <input
        type="checkbox"
        name="bookId"
        checked={viewBooks.bookId}
        onChange={handleViewCategories}
      />
      Book Id
      <input
        type="checkbox"
        name="name"
        checked={viewBooks.name}
        onChange={handleViewCategories}
      />
      Name
      <button onClick={() => handleClick("viewbooks")}>Button</button>
      {viewBooks.length !== 0 && (
        <div>
          {viewBooks.map((book) => {
            return (
              <div>
                <hr></hr>
                {book.id && <>Book Id: {book.id}</>}
                <br></br>
                {book.name && <>Name: {book.name}</>}
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
