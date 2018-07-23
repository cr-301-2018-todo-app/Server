'use strict';

const PORT = process.env.PORT;
if (!PORT) throw new Error('PORT is missing!');
// To provide PORT, in your terminal:
// export PORT=3000

const express = require('express');
const app = express();

// Middleware goes here (app.use)

app.get('/', (request, response) => response.send('Server works!'));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
