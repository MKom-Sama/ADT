const fs = require("fs");

const {
  readFromJSON,
  storeJSONToMem,
  topologiesInMem,
  writeFromMemToJSON,
  deleteTopFromMem,
  getDeviceList,
  getNodeDeviceList,
} = require("./functions");

(async () => {
  try {
    // Loading all JSON Topologies into Memory
    await storeJSONToMem("top_1");
    await storeJSONToMem("top_2");
    await storeJSONToMem("top_3");

    // Reading Topologies in Memory
    topInMem = topologiesInMem();
    console.log("Topologies Stored in Memory", topInMem);

    // Writing From Memory to JSON
    // NB : Delete top_3.json file and re-run (To also see the error messages)
    writeFromMemToJSON("top_3");

    // Deleting Topology from Memory
    await deleteTopFromMem("top_1");
    console.log(
      "Topologies in Memory after deleting top_1",
      await topologiesInMem()
    );

    // Components in a Topology (mem || json default  mem )
    let componentsInTop = getDeviceList("top_2", "mem");
    console.log("Components in top_2 ", componentsInTop);

    // Components connected on a node in a Topology (mem || json default mem)
    let node = "vin";
    let componentsOnNode = getNodeDeviceList("top_2", node, "mem");
    console.log(
      `components connected on node ${node} in top_2 : `,
      componentsOnNode
    );

  } catch (err) {
    console.log(err);
  }
})();
