import express from "express";
import cors from "cors";
import routes from "./routes.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})

// const data = {
//   book_name: "Percy Jackson: Sea of Monsters",
//   book_id: 4,
//   user_name: "Bob",
//   user_id: 8,
//   status: "Borrowed"
// }

// const recordIdToEdit = 12;
// const newData = {
//   book_name: "The glass wall",
//   book_id: 1,
//   user_name: "Barry",
//   user_id: 1,
//   status: "Returned"
// };

// const userIdToDelete = 7;
// const bookIdToDelete = 6;

// const recordIdToDelete = 11;

// const userChoice = 5;





//Add a record using prepared statements
//const recordDataToAdd = ["Percy Jackson: The Lightning Thief", 2, "Zach", 3, "Borrowed"];
// functions.addRecord(con, recordDataToAdd, function(err, result) { // Call addRecord from functions module
//   if (err) throw err;
//   console.log("Record added successfully:", result);
// });




//EXAMPLE of connecting front-end to database using express

// app.get("/courses", async (req, res) => {
//     const data = req.body;
//     const records = await prisma.record.findMany({})
//     res.send(records)
// })