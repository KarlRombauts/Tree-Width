var argv = require('argv');

import { Graph } from '../algorithm/graph';
import {
  Bag,
  geneticMethod,
  getTreeWidth,
  greedyDegreeFillInMethod,
  greedyDegreeMethod,
  greedyFillInMethod,
} from '../algorithm/treeDecomposition';
import { parseGraphFile } from './grFileParser';
import { treeDecompositionToString } from './tdFileOutput';

const args = argv
  .option([
    {
      name: 'method',
      short: 'm',
      type: 'string',
      description: 'Defines tree decomposition heuristic used',
    },
    {
      name: 'runs',
      short: 'r',
      type: 'int',
      description:
        'Defines the number of runs for the genetic evolution (default = 100)',
    },

    {
      name: 'tw-only',
      short: '-w',
      type: 'boolean',
      description:
        'Outputs only estimated treeWidth rather than tree decomposition',
    },
  ])
  .run();

const methods = {
  genetic: geneticMethod,
  minDegree: greedyDegreeMethod,
  minFillIn: greedyFillInMethod,
  minDegreeFillIn: greedyDegreeFillInMethod,
};

if (!Object.hasOwn(methods, args.options.method)) {
  process.stderr.write(
    `Please specify a valid method, options are: ${Object.keys(methods).join(
      ', ',
    )}\n`,
  );
  process.exit(1);
}

const methodName: keyof typeof methods = args.options.method;
const method = methods[methodName];

process.stdin.on('data', (data) => {
  const graph = parseGraphFile(data.toString());

  let td: { tree: Graph; bags: Bag[] };
  if (method === geneticMethod) {
    td = method(graph, args.options.runs);
  } else {
    td = method(graph);
  }

  //   const getTreeWidth(bags)
  if (args.options['tw-only']) {
    console.log(getTreeWidth(td.bags));
  } else {
    const output = treeDecompositionToString(graph, td);
    console.log(output);
  }
});
