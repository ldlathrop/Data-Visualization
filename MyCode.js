// I have an HTML cell that defines my clinton-container
//<div id="clinton.container" style="width: 400px; height: 400px;> </div>


// The following is in the js cell
function init() {

    // Finds the connections of each node
    sigma.classes.graph.addMethod("neighbors", function(nodeId) {
      var k,
          neighbors = {},
          index = this.allNeighborsIndex[nodeId] || {};

      for (k in index)
        neighbors[k] = this.nodesIndex[k];

      return neighbors;
    });

   // Creates an instance of Sigma.js
    var sigInst = new sigma({
      renderers: [
        {
          container: document.getElementById("clinton-container"),
          type: "canvas"
        }
      ]
    });

    // Customizes its settings
    sigInst.settings({
      // Drawing properties :
      defaultLabelColor: "#000",
      defaultLabelSize: 12,
      defaultLabelHoverColor: "#fff",
      //labelColor: "node",
      labelSize: "porportional",
      labelThreshold: 6,
      defaultHoverLabelBGColor: "#888",
      defaultLabelBGColor: "#ddd",
      defaultEdgeType: "curve",

      // Graph properties :
      minNodeSize: 2,
      maxNodeSize: 25,
      minEdgeSize: 0.3,
      maxEdgeSize: 1.0,

      // Mouse properties :
      zoomMax: 20
    });

    // Parses JSON file to fill the graph
    sigma.parsers.json(beakerLab.storageServicePath +
      "Files/Clinton/clinton.json",
      sigInst,
      function() {
        //  Little hack here:
        //  In the latest Sigma.js version have to delete edges" colors manually
        sigInst.graph.edges().forEach(function(e) {
          e.color = null;
        });

        // Also, to facilitate the update of node colors, store
        // their original color under the key originalColor:
        sigInst.graph.nodes().forEach(function(n) {
          n.originalColor = n.color;
        });

        sigInst.refresh();
      }
    );


     // When a node is clicked, check for each node to see if it is connected. If not, set its color as gray
     // Do the same for the edges

    var grayColor = "#e0e0e0";
    sigInst.bind("overNode", function(e) {
      var nodeId = e.data.node.id,
          toKeep = sigInst.graph.neighbors(nodeId);
      toKeep[nodeId] = e.data.node;

      sigInst.graph.nodes().forEach(function(n) {
        if (toKeep[n.id])
          n.color = n.originalColor;
        else
          n.color = grayColor;
      });

      sigInst.graph.edges().forEach(function(e) {
        if (e.source === nodeId || e.target === nodeId)
          e.color = null;
        else
          e.color = grayColor;
      });

    // Since the data has been modified, call the refresh method to make the colors update
      sigInst.refresh();
    });

    // When a node is no longer being hovered over, return to original colors
    sigInst.bind("outNode", function(e) {
      sigInst.graph.nodes().forEach(function(n) {
        n.color = n.originalColor;
      });

      sigInst.graph.edges().forEach(function(e) {
        e.color = null;
      });

      sigInst.refresh();
    });
  }

  if (document.addEventListener)
    document.addEventListener("DOMContentLoaded", init, false);
  else
    window.onload = init;
