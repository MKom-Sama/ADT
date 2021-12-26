const fs = require("fs");

const {
  readFromJSON,
  storeJSONToMem,
  topologiesInMem,
  writeFromMemToJSON,
} = require("./functions");

// let topologyInJSON = readFromJSON("top1");

storeJSONToMem("top_2");
// storeJSONToMem("top_3");

// let topologies = topologiesInMem();

// writeFromMemToJSON("top_3");

// console.log("topInMem", topologies);
// console.log(topologyInJSON);
