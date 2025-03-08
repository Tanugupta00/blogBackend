const dotenv = require("dotenv");
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express();
dotenv.config();


app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

const port = 3800;

// mongoose.connect('mongodb://localhost:27017/mydb', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
mongoose.connect(process.env.MONGOLAB_URI, {
  dbName: process.env.DB_NAME
}).then(resp => {
  console.log("Database Connected!")
}).catch(error => console.log("Unable to connect to DB! " + error));

app.use(express.json());
console.log("Server is starting...");

app.use('/api', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});