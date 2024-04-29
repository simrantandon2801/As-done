// app.js
require('dotenv').config()
const express = require('express');
const cors = require('cors');
const taskRouter = require('./routes/task');

const app = express();

app.use(cors());
app.use(express.json());


const database=require('./db')
database();
app.use('/api/tasks', taskRouter);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
