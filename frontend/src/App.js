import React, { useState } from "react";
import Book from "./components/Book.js";
import Users from "./components/User.js";
import Record from "./components/Record.js";
import "./App.css";

// function DeleteForm({ mode }) {
//   const [id, setId] = useState("");

//   const handleChange = (e) => {
//     setId(e.target.value);
//   };

//   const handleClick = () => {
//     if (mode === "record") {
//       // Delete record functionality
//       console.log("Record deleted with ID:", id);
//     } else if (mode === "user") {
//       // Delete user functionality
//       console.log("User deleted with ID:", id);
//     } else if (mode === "book") {
//       // Delete book functionality
//       console.log("Book deleted with ID:", id);
//     }
//   };

//   return (
//     <div>
//       <h2>
//         Delete{" "}
//         {mode === "record" ? "Record" : mode === "user" ? "User" : "Book"}
//       </h2>
//       <input
//         type="text"
//         value={id}
//         onChange={handleChange}
//         placeholder={`${mode.toUpperCase()} ID`}
//       />
//       <button onClick={() => handleClick}>
//         Delete{" "}
//         {mode === "record" ? "Record" : mode === "user" ? "User" : "Book"}
//       </button>
//     </div>
//   );
// }

// function ViewRecords() {
//   const [checkboxes, setCheckboxes] = useState({
//     record_id: false,
//     book_name: false,
//     book_id: false,
//     user_name: false,
//     user_id: false,
//     status: false,
//   });

//   const handleCheckboxChange = (e) => {
//     const { name, checked } = e.target;
//     setCheckboxes((prevState) => ({
//       ...prevState,
//       [name]: checked,
//     }));
//   };

//   const handleButtonClick = () => {
//     // Perform action for viewing records
//     console.log("View Records:", checkboxes);
//   };

//   return (
//     <div>
//       <h2>View Records</h2>
//       <div>
//         <label>
//           <input
//             type="checkbox"
//             name="record_id"
//             checked={checkboxes.record_id}
//             onChange={handleCheckboxChange}
//           />
//           Record ID
//         </label>
//         <label>
//           <input
//             type="checkbox"
//             name="book_name"
//             checked={checkboxes.book_name}
//             onChange={handleCheckboxChange}
//           />
//           Book Name
//         </label>
//         <label>
//           <input
//             type="checkbox"
//             name="book_id"
//             checked={checkboxes.book_id}
//             onChange={handleCheckboxChange}
//           />
//           Book ID
//         </label>
//         <label>
//           <input
//             type="checkbox"
//             name="user_name"
//             checked={checkboxes.user_name}
//             onChange={handleCheckboxChange}
//           />
//           User Name
//         </label>
//         <label>
//           <input
//             type="checkbox"
//             name="user_id"
//             checked={checkboxes.user_id}
//             onChange={handleCheckboxChange}
//           />
//           User ID
//         </label>
//         <label>
//           <input
//             type="checkbox"
//             name="status"
//             checked={checkboxes.status}
//             onChange={handleCheckboxChange}
//           />
//           Status
//         </label>
//         <button onClick={handleButtonClick}>View Records</button>
//       </div>
//     </div>
//   );
// }

// function ViewUsers() {
//   const [checkboxes, setCheckboxes] = useState({
//     id: false,
//     name: false,
//   });

//   const handleCheckboxChange = (e) => {
//     const { name, checked } = e.target;
//     setCheckboxes((prevState) => ({
//       ...prevState,
//       [name]: checked,
//     }));
//   };

//   const handleButtonClick = () => {
//     // Perform action for viewing users
//     console.log("View Users:", checkboxes);
//   };

//   return (
//     <div>
//       <h2>View Users</h2>
//       <div>
//         <label>
//           <input
//             type="checkbox"
//             name="id"
//             checked={checkboxes.id}
//             onChange={handleCheckboxChange}
//           />
//           ID
//         </label>
//         <label>
//           <input
//             type="checkbox"
//             name="name"
//             checked={checkboxes.name}
//             onChange={handleCheckboxChange}
//           />
//           Name
//         </label>
//         <button onClick={handleButtonClick}>View Users</button>
//       </div>
//     </div>
//   );
// }

// function ViewBooks() {
//   const [checkboxes, setCheckboxes] = useState({
//     id: false,
//     name: false,
//   });

//   const handleCheckboxChange = (e) => {
//     const { name, checked } = e.target;
//     setCheckboxes((prevState) => ({
//       ...prevState,
//       [name]: checked,
//     }));
//   };

//   const handleButtonClick = () => {
//     // Perform action for viewing books
//     console.log("View Books:", checkboxes);
//   };

//   return (
//     <div>
//       <h2>View Books</h2>
//       <div>
//         <label>
//           <input
//             type="checkbox"
//             name="id"
//             checked={checkboxes.id}
//             onChange={handleCheckboxChange}
//           />
//           ID
//         </label>
//         <label>
//           <input
//             type="checkbox"
//             name="name"
//             checked={checkboxes.name}
//             onChange={handleCheckboxChange}
//           />
//           Name
//         </label>
//         <button onClick={handleButtonClick}>View Books</button>
//       </div>
//     </div>
//   );
// }

function App() {
  return (
    <div className="App">
      <div className="content">
        <h1>Welcome to the Book Management system</h1>
        <Book />
        <Users/>
        <Record />
      </div>
    </div>
  );
}

export default App;
