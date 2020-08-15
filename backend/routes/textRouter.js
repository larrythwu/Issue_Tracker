const router = require("express").Router();
const auth = require("../middleware/auth");
const Quill = require("../models/quillModel");

router.get("/", auth, async (req, res) => {
  try {
    const text = await Quill.findOne({
      userId: res.locals.user,
    });

    if (!text) res.status(400).json({ message: "Not found" });
    res.json(text);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const contents = req.body.content;
    console.log(contents);
    //validation
    if (!contents) return res.status(400).json({ message: "Fields empty" });

    const text = new Quill({
      userId: res.locals.user,
      content: contents,
    });

    //delete the old one and update the db with the new content
    const deletedTodo = await Quill.remove({ userId: res.locals.user });
    const savedText = await text.save();
    res.json(savedText);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
