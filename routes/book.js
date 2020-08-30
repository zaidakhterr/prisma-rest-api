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

module.exports = router;
