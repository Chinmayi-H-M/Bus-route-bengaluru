const mongoose = require('mongoose');

const routeSchema = mongoose.Schema({
  bus_no: {
    type: String,
    required: true,
  },
  stops: {
    type: [String],
    required: true,
  }
});

const Route = mongoose.model('Route', routeSchema);

module.exports = Route;
