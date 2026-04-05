const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());


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

function findBuses(source, destination){
  source = source.trim().toLowerCase();
  destination = destination.trim().toLowerCase();
  return routes.filter(route =>{
    const stops = route.stops.map(stop => stop.trim().toLowerCase());
    const s = stops.indexOf(source);
    const d = stops.indexOf(destination);
    return s!==-1 && d!==-1 && s<d;
  });
}

app.get('/home',(req,res)=>{
  res.send("Welcome to the bus route api");
})

app.post("/find-route", (req,res) =>{
  const { source, destination } = req.body;

  if(!source || !destination){
    return res.json({ message: "Enter source and Destination" });
  }

  const result = findBuses(source, destination);

  if(result.length ===0){
    return res.json({message:"No routes found"});
  }
  res.json({ result });
})

