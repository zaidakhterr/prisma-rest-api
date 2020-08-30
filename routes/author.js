const router = require("express").Router();
const prisma = require("../client");

// Add Author
router.post("/author", async (req, res) => {
  const { name, email } = req.body;

  try {
    const newAuthor = await prisma.author.create({
      data: {
        email,
        name,
      },
    });

    return res.json(newAuthor);
  } catch (e) {
    if (e.code === "P2002" && e.meta.target.includes("email")) {
      return res.status(400).json("Duplicate Email");
    } else {
      return res.status(500).json(e);
    }
  }
});

// Remove Author
router.delete("/author", async (req, res) => {
  const { id } = req.body;

  try {
    const deletedAuthor = await prisma.author.delete({
      where: {
        id: Number(id),
      },
    });

    return res.json(deletedAuthor);
  } catch (e) {
    if (e.code === "P2016") {
      return res.status(404).json("Author does not exist");
    } else {
      return res.status(500).json(e);
    }
  }
});

// Find Author by ID
router.get("/author/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const author = await prisma.author.findOne({
      where: {
        id: Number(id),
      },
      include: {
        books: true,
      },
    });

    if (!author) {
      return res.status(404).json("Author does not exist");
    }

    return res.json(author);
  } catch (e) {
    return res.status(500).json(e);
  }
});

// Get All Authors
router.get("/authors", async (req, res) => {
  const { id } = req.params;

  try {
    const allAuthors = await prisma.author.findMany();

    return res.json(allAuthors);
  } catch (e) {
    return res.status(500).json(e);
  }
});

module.exports = router;
