import { Vector } from 'p5';
import { without } from 'ramda';
import { Graph } from '../algorithm/graph';
import { convertToGraph } from './algoUtils';
import { Edge, renderEdge, renderHoverEdge } from './Edge';
import { Preset, presetGraphBuilder } from './GraphPresets';
import { getDragOffset, getMousePos, setHoverState } from './mouseUtils';
import { defaultState } from './Types';
import {
  renderActiveVertex,
  renderHoveredVertex,
  renderSelectedVertex,
  Vertex,
} from './Vertex';

export enum Mode {
  SELECT,
  MOVING,
  DEFAULT,
}

export class VisualGraph {
  edges: Edge[] = [];
  vertices: Vertex[] = [];
  private graph: Graph = new Graph();

  selectedVertex?: Vertex;
  draggedVertex?: Vertex;
  dragOffset?: Vector;

  constructor() {
    this.loadPreset(Preset.Petersen);
  }

  loadPreset(preset: Preset) {
    const { edges, vertices } = presetGraphBuilder(preset);
    this.edges = edges;
    this.vertices = vertices;
    this.graph = convertToGraph(edges);
  }

  addVertex(position?: Vector): Vertex {
    const vertex = new Vertex(this.getNextVertexId(), position);
    this.vertices.push(vertex);
    return vertex;
  }

  deleteVertex(vertex: Vertex) {
    this.deleteIncidentEdges(vertex);
    this.vertices = without([vertex], this.vertices);
  }

  addEdge(v: Vertex, u: Vertex): Edge {
    const edge = new Edge(u, v);
    if (!this.hasEdge(edge)) {
      this.edges.push(edge);
    }
    this.graph = convertToGraph(this.edges);
    return edge;
  }

  fullyConnectGraph() {
    this.edges = [];
    const V = this.vertices;
    for (let i = 0; i < V.length; i++) {
      for (let j = i + 1; j < V.length; j++) {
        this.addEdge(V[i], V[j]);
      }
    }
  }

  deleteEdge(edge: Edge) {
    this.edges = without([edge], this.edges);
  }

  deleteIncidentEdges(vertex: Vertex) {
    this.edges = this.edges.filter(
      (edge) => !(edge.v === vertex || edge.u === vertex),
    );
    this.graph = convertToGraph(this.edges);
  }

  hasEdge(newEdge: Edge): boolean {
    return this.edges.some((edge) => edge.equal(newEdge));
  }

  getNextVertexId() {
    return this.vertices.reduce((maxId, vert) => max(maxId, vert.id), 0) + 1;
  }

  getGraph() {
    return this.graph;
  }

  render() {
    this.edges.forEach((edge) => renderEdge(edge));
    this.vertices.forEach(renderActiveVertex);
  }

  clearSelected() {
    this.vertices.forEach((vertex) => (vertex.state = defaultState()));
    this.vertices.forEach(setHoverState);
    this.selectedVertex = undefined;
  }
}

export class GraphGUI {
  mode: Mode;
  private graph: VisualGraph;

  selectedVertex?: Vertex;
  draggedVertex?: Vertex;
  hoveredVertex?: Vertex;
  hoveredEdge?: Edge;
  dragOffset?: Vector;

  constructor(graph: VisualGraph) {
    this.graph = graph;
    this.mode = Mode.DEFAULT;
  }

  enterSelectMode() {
    this.mode = Mode.SELECT;
  }

  exitSelectMode() {
    this.mode = Mode.DEFAULT;
    this.selectedVertex = undefined;
  }

  render() {
    this.graph.edges.forEach((edge) => {
      if (edge === this.hoveredEdge) {
        return renderHoverEdge(edge);
      }
      return renderEdge(edge);
    });
    this.graph.vertices.forEach((vertex) => {
      if (vertex === this.selectedVertex) {
        return renderSelectedVertex(vertex);
      }

      if (vertex === this.hoveredVertex || vertex === this.draggedVertex) {
        return renderHoveredVertex(vertex);
      }

      return renderActiveVertex(vertex);
    });
  }

  findHoveredVertex() {
    return this.graph.vertices.find((vertex) => vertex.isInside(getMousePos()));
  }

  findHoveredEdge() {
    return this.graph.edges.find((edge) => edge.isInside(getMousePos()));
  }

  handleMouseMove() {
    this.hoveredEdge = this.findHoveredEdge();
    this.hoveredVertex = this.findHoveredVertex();
  }

  handleMouseDrag() {
    if (this.draggedVertex && this.dragOffset) {
      this.draggedVertex.position = Vector.sub(getMousePos(), this.dragOffset);
    }
  }

  handleMouseRelease() {
    if (this.draggedVertex) {
      this.selectedVertex = undefined;
      this.draggedVertex = undefined;
      this.dragOffset = undefined;
    }
  }

  addVertex() {
    const newVertex = this.graph.addVertex(getMousePos());
    this.hoveredVertex = newVertex;

    if (this.selectedVertex) {
      this.addEdge(this.selectedVertex, newVertex);
    }
    this.startDrag(newVertex);
  }

  addEdge(u: Vertex, v: Vertex) {
    this.graph.addEdge(u, v);
    this.selectedVertex = undefined;
  }

  handleMousePress() {
    if (!this.hoveredVertex) {
      return this.addVertex();
    }

    if (this.mode === Mode.DEFAULT) {
      this.startDrag(this.hoveredVertex);
    }

    if (this.mode === Mode.SELECT) {
      if (!this.selectedVertex) {
        this.selectedVertex = this.hoveredVertex;
      } else {
        this.addEdge(this.selectedVertex, this.hoveredVertex);
      }
    }
  }

  startDrag(vertex: Vertex) {
    this.draggedVertex = vertex;
    this.selectedVertex = vertex;
    this.dragOffset = getDragOffset(this.draggedVertex);
  }

  clearSelected() {
    this.selectedVertex = undefined;
  }

  deleteUnderCursor() {
    if (this.hoveredVertex) {
      this.graph.deleteVertex(this.hoveredVertex);
    }
    if (this.hoveredEdge) {
      this.graph.deleteEdge(this.hoveredEdge);
    }
  }
}

// newVert.state.hover = true;
// newVert.state.selected = true;
// draggedVert = newVert;
// dragOffset = getDragOffset(draggedVert);
// this.graph = convertToGraph(this.edges)
