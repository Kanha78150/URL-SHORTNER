import express from "express";
const app = express();

app.get("/api/create", (req, res) => {
  res.send("Hello, World!");
});

app.listen(5000, () => {
  console.log(`Server is running on port ${`http://localhost:5000`}`);
});
