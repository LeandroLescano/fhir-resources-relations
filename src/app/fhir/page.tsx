"use client";

import React, {useEffect, useRef, useState} from "react";
import {DataSet} from "vis-data";
import {Edge, IdType, Network, Node, Options} from "vis-network";
import {useRouter} from "next/router";
import Head from "next/head";
import {getFHIRResources} from "src/utils/processText";

const Graph = () => {
  const nodes = useRef<DataSet<any, any>>(new DataSet());
  const edges = useRef<DataSet<any, any>>(new DataSet());
  const [selectedNode, setSelectedNode] = useState<{[key: string]: string}>({});

  const [loading, setLoading] = useState(false);
  const network = useRef<Network | null>(null);
  const highlightActive = useRef(false);

  const visJsRef = useRef<HTMLDivElement>(null);

  const getData = async () => {
    const resources = getFHIRResources();

    const resourcesNodes = resources.map((res) => ({
      label: res.resourceType,
      id: res.resourceType,
      group: "1",
    }));
    nodes.current.clear();
    nodes.current.update(resourcesNodes);

    const resourcesEdges = [];

    for (const res of resources) {
      for (const props of Object.entries(res)) {
        const edgeLabel = props[0];
        const connections = props[1];
        if (connections) {
          if (typeof connections !== "string") {
            for (const connection of connections as string[]) {
              resourcesEdges.push({
                from: res.resourceType,
                to: connection,
                label: edgeLabel,
              });
            }
          }
        }
      }
    }
    const groupedEdges: any[] = [];
    for (const edge of resourcesEdges) {
      const findedEdge = groupedEdges.find(
        (e) => e.from === edge.from && edge.to === e.to
      );
      if (findedEdge) {
        findedEdge.label += ", " + edge.label;
      } else {
        groupedEdges.push(edge);
      }
    }
    console.log({groupedEdges});
    edges.current.clear();
    edges.current.update(groupedEdges);
  };

  useEffect(() => {
    const options: Options = {
      autoResize: true,
      locale: "es",
      layout: {
        randomSeed: 1,
        improvedLayout: true,
        hierarchical: {
          enabled: false,
          levelSeparation: 10,
          nodeSpacing: 10,
          treeSpacing: 1,
          blockShifting: false,
          edgeMinimization: true,
          parentCentralization: true,
          direction: "LR", // UD, DU, LR, RL
          sortMethod: "hubsize", // hubsize, directed
          shakeTowards: "roots", // roots, leaves
          // enabled: true,
          // levelSeparation: 150,
          // nodeSpacing: 110,
          // treeSpacing: 200,
          // blockShifting: false,
          // edgeMinimization: true,
          // parentCentralization: true,
          // direction: "LR",
          // sortMethod: "directed",
          // shakeTowards: "roots",
        },
      },
      physics: {
        enabled: true, //! if true, AFFECTS PERFORMANCE
        // forceAtlas2Based: {
        //   gravitationalConstant: -26,
        //   centralGravity: 0.005,
        //   springLength: 230,
        //   springConstant: 0.18,
        // },
        maxVelocity: 146,
        solver: "forceAtlas2Based",
        timestep: 0.35,
        stabilization: {iterations: 150},
        hierarchicalRepulsion: {
          avoidOverlap: 2,
        },
      },
      edges: {
        smooth: {
          enabled: true,
          type: "dynamic",
          roundness: 0.5,
        },
        font: {
          size: 12,
          strokeWidth: 0,
          color: "white",
        },
        arrows: {
          to: {
            enabled: true,
            scaleFactor: 1,
            type: "arrow",
          },
        },
        color: {inherit: "to"},
      },
      nodes: {
        shape: "box",
        shadow: true,
        borderWidth: 0,
        font: {
          multi: "html",
          face: "tahoma",
        },
      },
    };

    getData().then(() => {
      network.current =
        visJsRef.current &&
        new Network(
          visJsRef.current,
          {nodes: nodes.current, edges: edges.current},
          options
        );

      network.current?.on("click", (params) => {
        neighbourhoodHighlight(params);
        // setSelectedNodes(network.current?.getSelectedNodes());
      });
      network.current?.on("oncontext", (params) => {
        params.event.preventDefault();
        let currentNode = nodes.current.get(
          network.current?.getNodeAt(params.pointer.DOM) as string
        );
        if (currentNode && currentNode.length === undefined) {
          // setlocalSelectedNode(currentNode);
          setSelectedNode(currentNode);
          neighbourhoodHighlight({nodes: [currentNode.id]});
        }
      });

      network.current?.once("stabilizationIterationsDone", function () {
        // network.current?.setOptions({physics: false});
      });

      network.current?.on("selectNode", (event: {nodes: string[]}) => {
        if (event.nodes?.length === 1) {
          let selected = {
            ...nodes.current
              .get({returnType: "Array"})
              .find((n: any) => n.id === event.nodes[0]),
          };
          delete selected?.label;
          delete selected?.group;
          delete selected?.color;
          delete selected?.hiddenLabel;
          delete selected?.font;
          delete selected?.idClass;
          delete selected?.idType;
          delete selected?.type;
          delete selected?.class;
          delete selected?.id;
          // setSelectedNode(JSON.stringify(selected, undefined, 2));
          setSelectedNode(selected);
        }
      });
      network.current?.on("selectEdge", (event: {edges: string[]}) => {
        let edge = edges.current
          .get({returnType: "Array"})
          .find((ed) => ed.id === event.edges[0]);
      });
    });
  }, []);

  const neighbourhoodHighlight = (params: any) => {
    let allNodes = nodes.current.get({returnType: "Object"});
    let allEdges = edges.current.get({returnType: "Object"});
    // if something is selected:
    if (params.nodes.length > 0) {
      highlightActive.current = true;
      var i, j;
      var lSelectedNode = params.nodes[0];
      if (!allNodes[lSelectedNode]) return;
      var degrees = 2;
      // mark all nodes as hard to read.
      for (var nodeId in allNodes) {
        allNodes[nodeId].color = "rgba(200,200,200,0.2)";
        allNodes[nodeId].font = {
          color: "rgba(255,255,255,0.3)",
        };
        if (allNodes[nodeId].hiddenLabel === undefined) {
          allNodes[nodeId].hiddenLabel = allNodes[nodeId].label;
          allNodes[nodeId].label = undefined;
        }
      }
      for (var edgeId in allEdges) {
        allEdges[edgeId].font = {
          color: "rgba(255,255,255,0.2)",
        };
      }
      var connectedNodes = network.current?.getConnectedNodes(lSelectedNode)!;
      var allConnectedNodes: any[] = [];

      // get the second degree nodes
      for (i = 1; i < degrees; i++) {
        for (j = 0; j < connectedNodes.length; j++) {
          allConnectedNodes = allConnectedNodes.concat(
            network.current?.getConnectedNodes(connectedNodes[j] as IdType)
          );
        }
      }

      // all second degree nodes get a different color and their label back
      for (i = 0; i < allConnectedNodes.length; i++) {
        if (allNodes[allConnectedNodes[i]]) {
          const secondDegreeEdges = network.current?.getConnectedEdges(
            allNodes[allConnectedNodes[i]].id
          );
          if (secondDegreeEdges) {
            for (const edge of secondDegreeEdges) {
              allEdges[edge].font.color = "rgba(150,150,150,0.3)";
            }
          }
          allNodes[allConnectedNodes[i]].color = "rgba(150,150,150,0.3)";
          allNodes[allConnectedNodes[i]].font = {
            color: "rgba(150,150,150,0.5)",
          };
          if (allNodes[allConnectedNodes[i]].hiddenLabel !== undefined) {
            allNodes[allConnectedNodes[i]].label =
              allNodes[allConnectedNodes[i]].hiddenLabel;
            allNodes[allConnectedNodes[i]].hiddenLabel = undefined;
          }
        }
      }

      // all first degree nodes get their own color and their label back
      for (i = 0; i < connectedNodes.length; i++) {
        if (allNodes[connectedNodes[i] as IdType]) {
          allNodes[connectedNodes[i] as IdType].color = undefined;
          allNodes[connectedNodes[i] as IdType].font = {
            color: "black",
          };
          if (allNodes[connectedNodes[i] as IdType].hiddenLabel !== undefined) {
            allNodes[connectedNodes[i] as IdType].label =
              allNodes[connectedNodes[i] as IdType].hiddenLabel;
            allNodes[connectedNodes[i] as IdType].hiddenLabel = undefined;
          }
        }
      }

      // the main node gets its own color and its label back
      allNodes[lSelectedNode].color = undefined;
      allNodes[lSelectedNode].font = {
        color: "black",
      };
      if (allNodes[lSelectedNode].hiddenLabel !== undefined) {
        allNodes[lSelectedNode].label = allNodes[lSelectedNode].hiddenLabel;
        allNodes[lSelectedNode].hiddenLabel = undefined;
      }
      const firstDegreeEdges = network.current?.getConnectedEdges(
        allNodes[lSelectedNode].id
      );
      if (firstDegreeEdges) {
        for (const edge of firstDegreeEdges) {
          allEdges[edge].font.color = "white";
        }
      }
    } else {
      setSelectedNode({});
      if (highlightActive.current === true) {
        // reset all nodes
        for (var nodeId in allNodes) {
          allNodes[nodeId].color = undefined;
          allNodes[nodeId].font = {
            color: "black",
          };
          if (allNodes[nodeId].hiddenLabel !== undefined) {
            allNodes[nodeId].label = allNodes[nodeId].hiddenLabel;
            allNodes[nodeId].hiddenLabel = undefined;
          }
        }
        for (var edgeId in allEdges) {
          allEdges[edgeId].color = undefined;
          allEdges[edgeId].font = {
            color: "white",
          };
          if (allEdges[edgeId].hiddenLabel === undefined) {
            allEdges[edgeId].hiddenLabel = allEdges[edgeId].label;
            allEdges[edgeId].label = undefined;
          }
        }
        highlightActive.current = false;
      }
    }

    // transform the object into an array
    const updateArray = [];
    for (nodeId in allNodes) {
      if (allNodes.hasOwnProperty(nodeId)) {
        updateArray.push(allNodes[nodeId]);
      }
    }
    const updateEdgeArray = [];
    for (edgeId in allEdges) {
      if (allEdges.hasOwnProperty(edgeId)) {
        updateEdgeArray.push(allEdges[edgeId]);
      }
    }
    // setNodes(updateArray);
    edges.current.update(updateEdgeArray);
    nodes.current.update(updateArray);
  };

  return (
    <>
      <Head>
        <title>FHIR</title>
      </Head>
      <div
        style={{
          display: "flex",
          cursor: loading ? "wait" : "auto",
        }}
      >
        <div
          ref={visJsRef}
          style={{
            height: "100vh",
            flex: 2,
            backgroundColor: "#1a1a1a",
          }}
        />
      </div>
    </>
  );
};

export default Graph;
