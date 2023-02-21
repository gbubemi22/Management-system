const dotenv = require("dotenv").config({ path: "./.env" });


const express = require("express");
const app = express();


const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require('path')



//Database
const connectDB = require("./DB/connect");




// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser(process.env.JWT_COOKIE));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);



app.use(express.static(path.join(__dirname, "./public")));
app.use("/public", express.static("public"));
app.use(express.urlencoded({ extended: true }));



// simple route
app.get("/", (req, res) => {
     res.json({ message: "Welcome to Employee application." });
   
   });



   //ErrorHandlerMiddleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");




app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);





//port
const port = process.env.PORT || 7000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`listing on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();