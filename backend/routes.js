import express from "express";
import query from "./query.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const app = express.Router();

app.get("/books", async (req, res) => {
  try {
    let { bookId, name } = req.query;
    if (!bookId && !name) {
      return res.status(203).json([]);
    }
    bookId = bookId ? true : false;
    name = name ?  true : false;

    const books = await prisma.book.findMany({
      select: {
        id: bookId,
        name: name,
      },
    });

    res.status(200).json(books);
  }
  catch (e) {
    console.log(e.message);
    res.status(400).send("Bad data");
  }
});

app.get("/users", async (req, res) => {
  try {
    let { userId, name } = req.query;
    if (!userId && !name) {
      return res.status(203).json([]);
    }
    userId = userId ? true : false;
    name = name ?  true : false;

    const users = await prisma.user.findMany({
      select: {
        id: userId,
        username: name,
      },
    });

    res.status(200).json(users);
  }
  catch (e) {
    console.log(e.message);
    res.status(400).send("Bad data");
  }
});

app.get("/records", async (req, res) => {
  try {
    let { recId, status, userId,bookId } = req.query;
    if (!userId && !status && !recId && !bookId) {
      return res.status(203).json([]);
    }



    userId = userId ? true : false;
    status = status ? true : false;
    recId = recId ? true : false;
    bookId = bookId ? true : false;


    const records = await prisma.record.findMany({
      select: {
        id: recId,
        status: status,
        bookId: bookId,
        userId: userId
      },
    });

    res.status(200).json(records);
  }
  catch (e) {
    console.log(e.message);
    res.status(400).send("Bad data");
  }
});

app.post("/users", async (req, res) => {
  try {
    const { name } = req.body;

    const user = await prisma.user.create({
      data: {
        username: name,
      },
    });

    res.status(200).send("User created successfully");
  } catch (e) {
    res.status(409).send("Username already exists");
  }
});

app.post("/books", async (req, res) => {
  try {
    const { name } = req.body;

    const book = await prisma.book.create({
      data: {
        name: name,
      },
    });

    res.status(200).send("Book created successfully");
  } catch (e) {
    res.status(409).send("Book already exists");
  }
});

app.put("/users", async (req, res) => {
  try {
    const { userId, name } = req.body;
    const user = await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        username: name,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }

    res.status(200).send("User updated successfully");
  } catch (e) {
    res.status(400).send(e.message);
  }
});

app.put("/books", async (req, res) => {
  try {
    const { bookId, name } = req.body;

    const book = await prisma.book.update({
      where: {
        id: Number(bookId),
      },
      data: {
        name: name,
      },
    });
    if (!book) {
      throw new Error("Book not found");
    }

    res.status(200).send("Book updated successfully");
  } catch (e) {
    res.status(400).send(e.message);
  }
});

app.get("/users/all", async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).send(users);
});

app.get("/books/all", async (req, res) => {
  const books = await prisma.book.findMany();
  res.status(200).send(books);
});

app.get("/records/all", async (req, res) => {
  const records = await prisma.record.findMany();
  res.status(200).send(records);
});

// Function to add a record to the record table
app.post("/records", async (req, res) => {
  try {
    const { bookId, userId, status } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
    });
    if (!user) {
      throw new Error("User not found");
    }

    const book = await prisma.book.findUnique({
      where: {
        id: Number(bookId),
      },
    });
    if (!book) {
      throw new Error("Book not found");
    }

    const record = await prisma.record.create({
      data: {
        userId: Number(userId), 
        bookId: Number(bookId),
        status: status,
      },
    });

    res.status(200).send("Record created successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});


// Function to edit a record in the record table
app.put("/records", async (req, res) => {
  try {
    const { recId, bookId, userId, status } = req.body;
    // console.log(recId);
    // console.log(bookId);
    // console.log(userId);
    // console.log(status);
    const user = await prisma.user.findUnique({ 
      where: {
        id: Number(userId),
      },
    });
    if (!user) {
      throw new Error("User not found");
    }

    const book = await prisma.book.findUnique({
      where: {
        id: Number(bookId),
      },
    });
    if (!book) {
      throw new Error("Book not found");
    }

    const record = await prisma.record.update({
      where: {
        id: Number(recId),
      },
      data: {
        userId: Number(userId), 
        bookId: Number(bookId), 
        status: status,
      },
    });

    res.status(200).send("Record updated successfully");
  } catch (error) {
    res.status(400).send(error.message);
    console.log(error.message);
  }
});


//Function to delete a record in the record table
app.delete("/records/:recordId", async (req, res) => {
  const { recordId } = req.params;
  const sql = "DELETE FROM record WHERE id = ?";
  await query(sql, [recordId]);

  res.status(200).send("Deleted record successfully");
});

//Function to delete a user in the user table
app.delete("/users/:userId", async (req, res) => {
  const { userId } = req.params;
  const sql = "DELETE FROM user WHERE id = ?";
  await query(sql, [userId]);

  res.status(200).send("Deleted user successfully");
});

//Function to delete a book in the book table
app.delete("/books/:bookId", async (req, res) => {
  const { bookId } = req.params;
  const sql = "DELETE FROM book WHERE id = ?";
  await query(sql, [bookId]);

  res.status(200).send("Deleted book successfully");
});

export default app;
