const express = require("express");
const prisma = require("./client");
const author = require("./routes/author");
const port = 4000;

const app = express();

// Middleware
app.use(express.json());

// Routes
app.get("/", async (req, res) => {
  const allAuthors = prisma.author.findMany();
  const allBooks = prisma.book.findMany();
  return res.json({
    authors: allAuthors,
    books: allBooks,
  });
});

app.use("/", author);

// Listen
app.listen(port, () => {
  console.log(`App started at http://localhost:${port}`);
});
