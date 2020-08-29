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

module.exports = router;
