import EVEoj from "EVEoj";
import express from "express";

let map;
const app = express();
const port = process.env.PORT || 5000;

const SDD = EVEoj.SDD.Create("json", {
  path: "./sdd"
});

SDD.LoadMeta()
.then(function() {
    map = EVEoj.map.Create(SDD, "K");
    return map.Load();
});

app.get("/health", (req, res) => {
  res.send("OK");
});

app.get("/api/v1/route", (req, res) => {
  const { start, end, preferHighSec = false, preferLowSec = false} = req.query;
  const resp = route({start, end, preferHighSec, preferLowSec});
  res.status(201).json(resp);
});

app.listen(port, () => {
  console.log(`EvERoutePlanner app listening on port ${port}`);
});

const route = function(args) {
  const startingSystem = args.start; //"Jita";
  const destinationList = args.end.split(","); //["Amarr", "Dodixie", "Friggi"];
  const preferHighSec = false || args.preferHighSec;
  const preferLowSec = false || args.preferLowSec;

  const start = map.GetSystem({name: startingSystem});
  
  return destinationList.map(destination => {
      const end = map.GetSystem({name: destination});
      if(!end) {
          throw Error(`Unknown system ${destination}`)
      }
      const route = map.Route(start.ID, end.ID, [], preferHighSec, preferLowSec);
      let routeDescription = route.length;
      if(route.length === 0) {
          if(startingSystem === destination) {
              routeDescription = "You're already there!";
          }
          else {
              routeDescription = "No route possible.";
          }
      }
      return `${startingSystem} to ${destination} route length: ${routeDescription}`;
  })
}

export default app;