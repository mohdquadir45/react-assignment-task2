const express = require("express");
const cors = require('cors');
const tableRouter = require("./routes/table.route")
const connect = require("./configs/db");
require("dotenv").config();
let port=process.env.PORT || 5000;

const app = express();

app.use(cors())

app.use(express.json());
app.use(express.static('public'));
app.get("/", (req,res)=> {
    res.send({
        "message":"Home Page"
    })
})

app.use("/table",tableRouter)



app.listen(port, function() {

  try {
    connect();
    console.log(`listening on port ${port}`);
  } catch (err) {
    console.error(err.message);
  }
});


module.exports = app;