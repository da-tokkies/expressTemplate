const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser =require('body-parser');
const postsRoutes = require('./routes/posts');
const cors = require('cors');
require('dotenv/config');
// middlewares
app.use(bodyParser.json());
app.use('/posts', postsRoutes);
app.use(cors());
// routes
app.get('/', (req,res) =>{
    res.send("we are on home")
});



mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true })
const db = mongoose.connection;
db.on('error', (error)=>{console.error(error)});
db.once('open', () => console.log('connected'));
app.listen(3000);