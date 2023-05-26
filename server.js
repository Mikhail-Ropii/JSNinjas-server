const app = require("./app");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

// const { DB_HOST, PORT = 3000 } = process.env;
const PORT = 3000;
const DB_HOST =
  "mongodb+srv://mainUser:qwerty12345@cluster0.vuhy5ts.mongodb.net/superheroes?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => console.log("Database connection successful"))
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
