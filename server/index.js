const express = require('express')
const app = express()
const mongoose = require('moongoose')

//database connection

app.listen(3001, ()=>{
    console.log('You are connected');
})