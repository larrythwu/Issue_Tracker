const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = Todo = mongoose.model("todo", todoSchema);
