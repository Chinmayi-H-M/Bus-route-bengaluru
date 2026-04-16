const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');
const Route = require('./models/Route');
const { findTransferRoutes } = require('./utils/routeLogic');

app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

function findBuses(source, destination, routes){
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

app.post("/find-route", async (req, res) => {
  try {
    const { source, destination } = req.body;

    // Fetch dynamic routes from MongoDB
    const routes = await Route.find({});

    const direct = findBuses(source, destination, routes);
    const transfer = findTransferRoutes(source, destination, routes);

    res.json({
      direct,
      transfer
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

app.listen(3000, ()=>{
  console.log("Server running on port 3000");
});