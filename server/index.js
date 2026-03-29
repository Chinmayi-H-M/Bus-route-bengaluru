const express = require('express');
const app = express();

app.use(express.json());


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