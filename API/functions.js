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

  // Get Topology List in Memory
  let topologyList = topologiesInMem();

  // Check if top with same ID is in mem
  let isAlreadyInMem = false;
  topologyList.forEach((top) => {
    if (top.id == topologyID) isAlreadyInMem = true;
  });

  if (isAlreadyInMem) {
    console.error("Topology with same ID already exist in MEM");
    return;
  }

  topologyList.push(newTopology);

  // Write new Topology list to Mem

  fs.writeFile("memory.json", JSON.stringify(topologyList), (err) => {
    if (err) {
      throw err;
    }
    console.log("Added Topology to Mem");
  });
};

const topologiesInMem = () => {
  let topologyList = fs.readFileSync("memory.json");
  // If File is empty
  try {
    topologyList = JSON.parse(topologyList);
  } catch (err) {
    // File is Empty
    topologyList = [];
  }
  return topologyList;
};

const writeFromMemToJSON = (topologyID) => {
  // Finds topology in Mem
  let topologies = topologiesInMem();

  let foundTopology = false;
  topologies.forEach((top) => {
    if (top.id == topologyID) foundTopology = top;
  });

  if (!foundTopology) {
    console.error("Topology Not in Mem");
    return;
  }

  // Topology found in memory
  // Create a JSON file
  fs.writeFile(
    `./Topologies/${topologyID}.json`,
    JSON.stringify(foundTopology),
    (err, result) => {
      if (err) {
        console.log(err);
      }
    }
  );
};

const deleteTopFromMem = (topologyID) => {
  let topologyList = topologiesInMem();

  let newTopologyList = topologyList.filter((top) => top.id != topologyID);

  // Write new Topology list to Mem

  fs.writeFile("memory.json", JSON.stringify(newTopologyList), (err) => {
    if (err) {
      throw err;
    }
  });
};

const getDeviceList = (topologyID, dest = "mem") => {
  let deviceList = [];
  // Search in Memory By default
  let topology = isTopologyInMem(topologyID);

  if (topology && dest == "mem") {
    // Topology Found in  Mem
    deviceList = topology.components;
  }

  // Search in JSON Folder
  topology = readFromJSON(topologyID);

  if (topology && dest == "json") {
    // Topology Found in JSON Folder
    deviceList = topology.components;
  }

  return deviceList;
};

const getNodeDeviceList = (topologyID, nodeName, dest = "mem") => {
  let deviceList = getDeviceList(topologyID, dest);
  let deviceListOnNode = [];
  if (deviceList) {
    deviceList.forEach((device) => {
      let nodes = Object.values(device.netlist);
      if (nodes.includes(nodeName)) {
        deviceListOnNode.push(device);
      }
    });
  }
  return deviceListOnNode
};

// utils
const isTopologyInMem = (topologyID) => {
  // Finds topology in Mem
  let topologies = topologiesInMem();

  let foundTopology = false;
  topologies.forEach((top) => {
    if (top.id == topologyID) foundTopology = top;
  });

  return foundTopology;
};

module.exports = {
  readFromJSON,
  storeJSONToMem,
  topologiesInMem,
  writeFromMemToJSON,
  deleteTopFromMem,
  getDeviceList,
};
