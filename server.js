const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB=require('./config/db');
dotenv.config({ path: './config/config.env' });

// connect with db

connectDB()
const app = express();
const routes = require('./routes/storeies');
const { connect } = require('http2');
// express.json() to enaple us sent data to api

app.use(express.json())
app.use(cors())

app.use(express.static(path.join(__dirname,'public')))

app.use('/api',routes)

const PORT=process.env.PORT||5000
app.listen(PORT,()=>{
console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`);
})