const fs = require("fs");

const readFromJSON = (topologyID) => {
  try {
    return JSON.parse(
      fs.readFileSync(`./Topologies/${topologyID}.json`, "utf8")
    );
  } catch (err) {
    console.error("Topology Not Found");
    return false;
  }
};

const storeJSONToMem = (topologyID) => {
  // returns True || False
  const newTopology = readFromJSON(topologyID);
  if (!newTopology) {
    // Topology JSON not Found
    console.error("Topology Not Found in JSON");
    return false;
  }

  // Get Topologies in Memory
  let topologies = topologiesInMem();
  console.log(topologies);
  // TODO LATER should check if top with same ID is in mem
  topologies.push(newTopology);

  // Write Topologies to Mem

  fs.writeFile("memory.json", JSON.stringify(topologies), (err) => {
    if (err) {
      throw err;
    }
    console.log("Added Topology to Mem");
  });
};

const topologiesInMem = () => {
  let topologies = fs.readFileSync("memory.json");
  return JSON.parse(topologies);
};

module.exports = {
  readFromJSON,
  storeJSONToMem,
  topologiesInMem,
};
