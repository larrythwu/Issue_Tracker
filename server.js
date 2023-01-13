const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const app = express();

//express has its own body parser
app.use(express.json());

let corsOptions = {
  origin: ["URL ALLOWED"]
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log("Server listening on: ", PORT);
});

// app.use("/users", require("./routes/userRouter"));
// app.use("/todo", require("./routes/todoRouter"));
// app.use("/generaltext", require("./routes/textRouter"));
// app.use(express.static("./client/build"));

//refer to index.js in routes folder
const routes = require("./routes");
app.use(routes);
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}
app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

module.exports = app;
