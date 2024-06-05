import mysql from "mysql";

export const db = mysql.createConnection({
  host: "localhost",
  user: "song1",
  password: "PJdaMMkfztnYxZDh",
  database: "song1",
});
