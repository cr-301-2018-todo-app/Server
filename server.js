'use strict';

const PORT = process.env.PORT;
if (!PORT) throw new Error('PORT is missing!');
// To provide PORT, in your terminal:
// export PORT=3000

const express = require('express');
const cors = require('cors');

const app = express();

// Middleware goes here (app.use)
app.use(cors());
// Middleware to parse request.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (request, response) => response.send('Server works!'));

// Temporary "database"
const tasks = [
  {
    title: 'Eat Lunch',
    description: 'I are teh hungry',
    category: 'Food'
  }
];

// API Routes
app.get('/tasks', (req, res) => {
  // let SQL = `...`
  // client.query(SQL)...

  res.send(tasks);
});

app.post('/tasks/add', (req, res) => {
  let newTask = {};
  newTask.title = req.body.title;
  newTask.description = req.body.description;
  newTask.category = req.body.category;

  tasks.push(newTask);
  console.log(tasks);
  res.sendStatus(201);

  // let SQL = `INSERT INTO tasks ...`
  // client.query(SQL)...
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
