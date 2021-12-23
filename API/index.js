const fs = require("fs");

const { readFromJSON, storeJSONToMem } = require("./functions");

let topologyInJSON = readFromJSON("top1");

storeJSONToMem("top_1");
storeJSONToMem("top_2");

console.log(topologyInJSON);
