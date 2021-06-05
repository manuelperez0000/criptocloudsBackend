const express = require('express')
const path = require('path');
const renderRouter = require('./routes/index');
const firebaseRouter = require('./routes/firebase');
const apiRouter = require('./routes/api');

const port = 3000;
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './public')));
const cors = require('cors');
app.use(cors());

app.use('/', renderRouter);
app.use('/firebase', firebaseRouter);
app.use('/api', apiRouter);

app.listen(port, () => {
    console.log(`server on port http://localhost:${port}`);
  });


   