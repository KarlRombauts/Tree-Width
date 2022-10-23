// @ts-ignore
import p5, { Vector } from 'p5';
//@ts-ignore
import { sketch } from 'p5js-wrapper';
import { without } from 'ramda';

import './style.css';
import {
  convertToGraph,
  getSubsetOfVisEdges,
  getSubsetOfVisVertices,
} from './visualisation/algoUtils';
import { Edge, renderBlueEdge, renderEdge } from './visualisation/Edge';
import {
  getDragOffset,
  getMousePos,
  setHoverState,
} from './visualisation/mouseUtils';
import { defaultState } from './visualisation/Types';
import {
  renderActiveVertex,
  renderInactiveVertex,
  Vertex,
} from './visualisation/Vertex';

enum Mode {
  ADDING_EDGE,
  MOVING,
}

let verts: Vertex[] = [];
let edges: Edge[] = [];
let numVerts = 5;
let displayText = 'Add some vertices and edges';
let draggedVert: Vertex | undefined = undefined;
let dragOffset: Vector | undefined = undefined;
let selectedVert: Vertex | undefined = undefined;
let mode = Mode.MOVING;
let tempEdge = [];

sketch.setup = function () {
  createCanvas(500, 500);

  for (let i = 0; i < numVerts; i++) {
    verts.push(new Vertex(i));
  }

  createEdge(verts[0], verts[1]);
};

function fullyConnectGraph() {
  edges = [];
  for (let i = 0; i < verts.length; i++) {
    for (let j = i + 1; j < verts.length; j++) {
      createEdge(verts[i], verts[j]);
    }
  }
}

sketch.draw = function () {
  background(230);
  edges.forEach(renderEdge);
  verts.forEach(renderActiveVertex);
  fill(0);
  textSize(20);
  text(displayText, 10, 490);
};

sketch.mouseMoved = function () {
  edges.forEach(setHoverState);
  verts.forEach(setHoverState);
};

sketch.mousePressed = function () {
  const hoveredVert = verts.find((vert) => vert.state.hover);
  if (!hoveredVert) {
    return createVertex(getMousePos());
  }

  if (mode === Mode.MOVING) {
    startDrag(hoveredVert);
  }

  if (mode === Mode.ADDING_EDGE) {
    hoveredVert.state.selected = true;
    if (!selectedVert) {
      selectedVert = hoveredVert;
    } else {
      createEdge(selectedVert, hoveredVert);
      clearSelected();
    }
  }
};

function startDrag(vertex: Vertex) {
  draggedVert = vertex;
  if (draggedVert) {
    draggedVert.state.selected = true;
    dragOffset = getDragOffset(draggedVert);
  }
}

function createVertex(position: Vector) {
  const maxId = verts.reduce((maxId, vert) => max(maxId, vert.id), 0);
  const newVert = new Vertex(maxId + 1, position);
  newVert.state.hover = true;
  newVert.state.selected = true;
  verts.push(newVert);
  draggedVert = newVert;
  dragOffset = getDragOffset(draggedVert);
}

function deleteVert(vert: Vertex) {
  const edgesToDelete = edges.filter(
    (edge) => edge.v === vert || edge.u === vert,
  );
  edges = without(edgesToDelete, edges);
  verts = without([vert], verts);
}

function createEdge(u: Vertex, v: Vertex) {
  const newEdge = new Edge(u, v);
  if (isNonExistingEdge(newEdge)) {
    edges.push(newEdge);
  }
}

function deleteEdge(edge: Edge) {
  edges = without([edge], edges);
}

function isNonExistingEdge(newEdge: Edge) {
  return !edges.some((edge) => edge.equal(newEdge));
}

sketch.mouseReleased = function () {
  if (draggedVert) {
    draggedVert.state.selected = false;
    draggedVert = undefined;
  }
};

sketch.mouseDragged = function () {
  if (draggedVert && dragOffset) {
    draggedVert.position = Vector.sub(getMousePos(), dragOffset);
  }
};

sketch.keyPressed = function keyPressed() {
  switch (keyCode) {
    case SHIFT:
      mode = Mode.ADDING_EDGE;
      return;
    case BACKSPACE:
      return deleteUnderCursor();
  }

  switch (key) {
    case 'C':
      fullyConnectGraph();
  }
};

sketch.keyReleased = function keyReleased() {
  switch (keyCode) {
    case SHIFT:
      mode = Mode.MOVING;
      clearSelected();
      break;
  }
};

function deleteUnderCursor() {
  const hoveredVert = verts.find((vert) => vert.state.hover);
  const hoveredEdge = edges.find((edge) => edge.state.hover);
  if (hoveredVert) {
    deleteVert(hoveredVert);
  }
  if (hoveredEdge) {
    deleteEdge(hoveredEdge);
  }
}

function clearSelected() {
  verts.forEach((vert) => (vert.state = defaultState()));
  verts.forEach(setHoverState);
  selectedVert = undefined;
}
