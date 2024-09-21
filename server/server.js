const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();
const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser'); 
app.use(bodyParser.json()); // req.body
const PORT = process.env.PORT || 3000;

// Import the router files
const userRoutes = require('./routes/userRoutes');
const candidateRoutes = require('./routes/candidateRoutes');

// Use the routers
// app.use('/', userRoutes);

app.use('/user', userRoutes);
app.use('/candidate', candidateRoutes);

app.get('/',(req,res)=>
{
res.send("voting app");
})
app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}`);
})