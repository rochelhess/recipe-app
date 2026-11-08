const express = require("express");
const pool = require("./db");

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Recipe API is running!");
});

app.get("/recipes", (req, res) => {
  res.json([
    {
      id: 1,
      title: "Honey Cake",
    },
    {
      id: 2,
      title: "Roasted Salmon",
    },
    {
      id: 3,
      title: "Chicken Soup",
    },
  ]);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
