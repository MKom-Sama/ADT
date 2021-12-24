const fs = require("fs");

const { readFromJSON, storeJSONToMem , topologiesInMem } = require("./functions");

// let topologyInJSON = readFromJSON("top1");

// storeJSONToMem("top_1");
// storeJSONToMem("top_2");

let topologies = topologiesInMem()
console.log('topInMem',topologies)
// console.log(topologyInJSON);
