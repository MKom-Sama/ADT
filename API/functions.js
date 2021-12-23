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
  const data = readFromJSON(topologyID);
  if (!data) {
    // Topology JSON not Found
    console.error("Topology Not Found");
    return false;
  }
  // Topology JSON Found
  fs.writeFile("memory.txt", JSON.stringify(data), (err) => {
    if (err) {
      throw err;
    }
    console.log("JSON data is saved.");
  });
};



module.exports = {
  readFromJSON,
  storeJSONToMem,
};
