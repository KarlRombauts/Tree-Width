// @ts-ignore
//@ts-ignore
import { Renderer } from 'p5';
import { sketch } from 'p5js-wrapper';
import {
  buildTreeDecomposition,
  getTreeBags,
} from '../algorithm/eliminationOrdering';
import { GeneticAlgorithm } from '../algorithm/genetic/geneticAlgorithm';
import { Graph } from '../algorithm/graph';
import {
  MinDegreeAndFillInOrdering,
  MinDegreeOrdering,
  MinFillInOrdering,
  PermutationOrdering,
} from '../algorithm/Ordering';

import { getTreeWidth as getTreeWidth } from '../algorithm/treeDecomposition';
import '../style.css';
import { GraphGUI, VisualGraph } from './graph';
import { createGraphSelector } from './GraphPresets';
import { getTextWidth } from './textUtils';
import { renderTree } from './tree';

let displayText = 'Add some vertices and edges';
let graph: Graph = new Graph();
let canvas: Renderer;
let prevGraph: Graph = new Graph();
let geneticAlgorithm = new GeneticAlgorithm(graph);
const { order: order1 } = getTreeBags(graph, new MinDegreeOrdering());
const { order: order2 } = getTreeBags(graph, new MinFillInOrdering());
const { order: order3 } = getTreeBags(graph, new MinDegreeAndFillInOrdering());
geneticAlgorithm.population[0] = order1;
geneticAlgorithm.population[1] = order2;
geneticAlgorithm.population[2] = order3;

let visualGraph: VisualGraph;
let graphGUI: GraphGUI;
let calculateTreeDecomposition = greedyDegreeMethod;

sketch.setup = function () {
  canvas = createCanvas(window.innerWidth - 10, window.innerHeight - 155);

  visualGraph = new VisualGraph();
  graphGUI = new GraphGUI(visualGraph);

  createGraphSelector((preset) => {
    visualGraph.loadPreset(preset);
  });
  createMethodSelector();
};

sketch.windowResized = function () {
  resizeCanvas(windowWidth - 10, windowHeight - 155);
};

sketch.draw = function () {
  background(230);
  fill(0);
  textSize(20);

  text(displayText, 10, height - 20);

  graphGUI.render();

  if (visualGraph.getGraph().getEdges().length > 0) {
    const { bags, tree } = calculateTreeDecomposition(visualGraph.getGraph());
    const treeWidthMsg = `EstimatedTreewidth = ${getTreeWidth(bags)}`;
    text(treeWidthMsg, width - 20 - getTextWidth(20, treeWidthMsg), 30);
    renderTree(tree, bags, graphGUI.hoveredVertex?.id);
  }
};

enum MethodOptions {
  MinDegree = 'Min degree',
  MinFillIn = 'Min fill-in',
  MinDegreeFillIn = 'Min degree + fill-in',
  Genetic = 'Genetic algorithm',
}

export function createMethodSelector() {
  const select: any = createSelect();
  select.position(140, 10);
  select.option(MethodOptions.MinDegree);
  select.option(MethodOptions.MinFillIn);
  select.option(MethodOptions.MinDegreeFillIn);
  select.option(MethodOptions.Genetic);

  select.changed(() => {
    const value: MethodOptions = select.value();
    switch (value) {
      case MethodOptions.MinDegree:
        calculateTreeDecomposition = greedyDegreeMethod;
        break;
      case MethodOptions.MinFillIn:
        calculateTreeDecomposition = greedyFillInMethod;
        break;
      case MethodOptions.MinDegreeFillIn:
        calculateTreeDecomposition = greedyDegreeFillInMethod;
        break;
      case MethodOptions.Genetic:
        calculateTreeDecomposition = geneticMethod;
        break;
    }
  });
}

function greedyDegreeMethod(graph: Graph) {
  return buildTreeDecomposition(graph, new MinDegreeOrdering());
}

function greedyFillInMethod(graph: Graph) {
  return buildTreeDecomposition(graph, new MinFillInOrdering());
}

function greedyDegreeFillInMethod(graph: Graph) {
  return buildTreeDecomposition(graph, new MinDegreeAndFillInOrdering());
}

function geneticMethod(graph: Graph) {
  if (prevGraph !== graph) {
    geneticAlgorithm = new GeneticAlgorithm(graph);
  }
  const { best: permutation } = geneticAlgorithm.executeRound();
  const output = buildTreeDecomposition(
    graph,
    new PermutationOrdering(permutation),
  );
  prevGraph = graph;

  return output;
}

sketch.mouseMoved = function () {
  graphGUI.handleMouseMove();
};

sketch.mousePressed = function () {
  graphGUI.handleMousePress();
};

sketch.mouseReleased = function () {
  graphGUI.handleMouseRelease();
};

sketch.mouseDragged = function () {
  graphGUI.handleMouseDrag();
};

sketch.keyPressed = function keyPressed() {
  switch (keyCode) {
    case SHIFT:
      graphGUI.enterSelectMode();
      break;
    case BACKSPACE:
      graphGUI.deleteUnderCursor();
      break;
  }
};

sketch.keyReleased = function keyReleased() {
  switch (keyCode) {
    case SHIFT:
      graphGUI.exitSelectMode();
      break;
  }
};
