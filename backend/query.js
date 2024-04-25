import mysql from "mysql2/promise";

const config = {
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "book_management",
}

const query = async (command, params) => {
  const con = await mysql.createConnection(config);
  const [results, ] = await con.execute(command, params);
  return results;
}

export default query;