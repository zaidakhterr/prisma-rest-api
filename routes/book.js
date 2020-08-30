const router = require("express").Router();
const prisma = require("../client");

// Add Book
router.post("/book", async (req, res) => {
  const { title, authorId } = req.body;

  try {
    const author = await prisma.author.findOne({
      where: {
        id: Number(authorId),
      },
    });

    if (!author) {
      return res.status(404).json("Author does not exist");
    }

    const newBook = await prisma.book.create({
      data: {
        title,
        author: {
          connect: {
            id: Number(authorId),
          },
        },
      },
      select: {
        id: true,
        title: true,
        author: true,
      },
    });

    return res.json(newBook);
  } catch (e) {
    return res.status(500).json(e);
  }
});

// Remove Book
router.delete("/book", async (req, res) => {
  const { id } = req.body;

  try {
    const deletedBook = await prisma.book.delete({
      where: {
        id: Number(id),
      },
    });

    return res.json(deletedBook);
  } catch (e) {
    if (e.code === "P2016") {
      return res.status(404).json("Book does not exist");
    } else {
      return res.status(500).json(e);
    }
  }
});

// Find Book by ID
router.get("/Book/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const book = await prisma.book.findOne({
      where: {
        id: Number(id),
      },
      select: {
        title: true,
        author: true,
      },
    });

    if (!book) {
      return res.status(404).json("Book does not exist");
    }

    return res.json(book);
  } catch (e) {
    return res.status(500).json(e);
  }
});

module.exports = router;
