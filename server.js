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
let nextTaskId = 1;
const tasks = [
  {
    id: nextTaskId++,
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

app.get('/task/:id', (req, res) => {
  // let SQL = `SELECT ... WHERE id = $1`
  console.log(`Finding task with id = ${req.params.id}`)

  let currentTask = tasks.find(task => task.id === parseInt(req.params.id));
  console.log(currentTask)
  if (currentTask) {
    res.send(currentTask);
  }
  else {
    res.sendStatus(404);
  }
});

app.post('/tasks/add', (req, res) => {
  let newTask = {};
  newTask.id = nextTaskId++;
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
