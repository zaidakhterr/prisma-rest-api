const express = require("express");
const { PrismaClient } = require("@prisma/client");
const port = 4000;

const app = express();

const prisma = new PrismaClient({
  log: ["query", "info", "warn"],
});

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

// Listen
app.listen(port, () => {
  console.log(`App started at http://localhost:${port}`);
});
