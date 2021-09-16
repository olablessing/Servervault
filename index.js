import express from "express";

import bodyParser from "body-parser";

import mongoose from "mongoose";

import userRouter from "./routes/user.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// // app.use(cookieParser);
// app.use(csrfMiddleware)

app.use("/user", userRouter);

const CONNECTION_URL =
  "mongodb+srv://oladipupo:oladipupo@cluster0.fch7c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const CONNECTION_URL = 'MONGODB_URL=mongodb+srv://rojar:rojar@cluster0.rzotv.mongodb.net/rojar?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port :${PORT}`))
  )
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);

// https://gains12.herokuapp.com/ | https://git.heroku.com/gains12.git

// https://stormy-fortress-13347.herokuapp.com/ | https://git.heroku.com/stormy-fortress-13347.git
