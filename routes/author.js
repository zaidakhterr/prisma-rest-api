const router = require("express").Router();

router.get("/author", (req, res) => {
  return res.json("author");
});

module.exports = router;
