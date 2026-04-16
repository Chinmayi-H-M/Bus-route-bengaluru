function findTransferRoutes(source, destination, routes) {
  source = source.trim().toLowerCase();
  destination = destination.trim().toLowerCase();

  let result = [];

  routes.forEach(route1 => {
    routes.forEach(route2 => {
      const stops1 = route1.stops.map(s => s.toLowerCase());
      const stops2 = route2.stops.map(s => s.toLowerCase());

      stops1.forEach(stop => {
        if (
          stops1.indexOf(source) !== -1 &&
          stops2.indexOf(destination) !== -1 &&
          stops1.indexOf(source) < stops1.indexOf(stop) &&
          stops2.indexOf(stop) < stops2.indexOf(destination)
        ) {
          result.push({
            from: route1.bus_no,
            changeAt: stop,
            to: route2.bus_no
          });
        }
      });
    });
  });

  return result;
}

module.exports = { findTransferRoutes };