const express = require('express');
const path = require('path');
const firebaseRouter = require('./routes/firebase');
const apiRouter = require('./routes/api');
const notifications = require('./routes/notifications');
const morgan = require('morgan');
const cors = require('cors');
const port = process.env.PORT || 3000;
const app = express()

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './public')));
app.use(cors());

app.use('/firebase', firebaseRouter);
app.use('/api', apiRouter);
app.use('/notifications', notifications);
app.use((req,res)=>{ res.sendFile( path.join(__dirname,'./public/index.html') ) });


app.listen(port, () => {
    console.log(`server on port http://localhost:${port}`);
  });


   