const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Route = require('../models/Route');

const routes = [
  {
    bus_no: "500A",
    stops: ["Silk Board", "BTM", "Jayanagar", "Majestic"]
  },
  {
    bus_no: "201",
    stops: ["Electronic City", "Silk Board", "HSR", "Koramangala"]
  },
  {
    bus_no: "300",
    stops: ["Majestic", "Rajajinagar", "Yeshwanthpur"]
  },
  {
    bus_no: "401",
    stops: ["BTM", "HSR", "Bellandur", "Marathahalli"]
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    await Route.deleteMany(); // Clear existing
    console.log("Existing routes cleared");

    await Route.insertMany(routes);
    console.log("Sample routes inserted");

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();
