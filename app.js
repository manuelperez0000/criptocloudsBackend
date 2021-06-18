const express = require('express');
const path = require('path');
const renderRouter = require('./routes/index');
const firebaseRouter = require('./routes/firebase');
const apiRouter = require('./routes/api');
const morgan = require('morgan');
const cors = require('cors');
const { nextTick } = require('process');
const port = process.env.PORT || 3000;
const app = express()

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './public')));
app.use(cors());
/*app.set('view engine', 'html'); */

app.use('/firebase', firebaseRouter);
app.use('/api', apiRouter);
//app.use('/', renderRouter);
app.use((req,res)=>{ res.sendFile( path.join(__dirname,'./public/index.html') ) });


app.listen(port, () => {
    console.log(`server on port http://localhost:${port}`);
  });


   