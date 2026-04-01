const express = require('express');
const app = express();




const routes = [
  {
    bus_no: "500A",
    stops: ["Silk Board", "BTM", "Jayanagar", "Majestic"]
  },
  {
    bus_no: "201",
    stops: ["Electronic City", "Silk Board", "HSR", "Koramangala"]
  }
];
app.get('/home',(req,res)=>{
  res.send("Welcome to the bus route api");
})