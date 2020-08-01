const router = require("express").Router();
const auth = require("../middleware/auth");
const Todo = require("../models/todoModel");

router.post("/", auth, async (req, res) => {
  try {
    const title = req.body.title;
    const description = req.body.description;

    //validation
    if (!title || !description)
      return res.status(400).json({ message: "Fields empty" });

    const newTodo = new Todo({
      userId: res.locals.user,
      title,
      description,
    });

    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/all", auth, async (req, res) => {
  const todos = await Todo.find({ userId: res.locals.user });
  res.json(todos);
});

router.get("/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findOne({
      userId: res.locals.user,
      _id: req.params.id,
    });

    if (!todo) res.status(400).json({ message: "Not found" });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findOne({
      userId: res.locals.user,
      _id: req.params.id,
    });

    if (!todo) res.status(400).json({ message: "Nothing to delete" });

    const deletedTodo = await Todo.findByIdAndRemove(req.params.id);
    res.json(deletedTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
