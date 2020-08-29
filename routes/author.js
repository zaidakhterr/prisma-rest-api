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

    res.json(newAuthor);
  } catch (e) {
    if (e.code === "P2002" && e.meta.target.includes("email")) {
      res.status(400).json("Duplicate Email");
    } else {
      res.status(500).json(e);
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

    res.json(deletedAuthor);
  } catch (e) {
    if (e.code === "P2016") {
      res.status(404).json("Author does not exist");
    } else {
      res.status(500).json(e);
    }
  }
});

module.exports = router;
