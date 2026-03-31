const express = require('express');
const app = express();

app.use(express.json());


const routes = [
  
  {
    bus_no: "201",
    stops: ["Electronic City", "Silk Board", "HSR", "Koramangala"]
  }
];
app.get('/home',(req,res)=>{
  res.send("Welcome to the bus route api");
})