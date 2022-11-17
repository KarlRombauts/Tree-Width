import { range, zip } from 'ramda';
import { Graph } from '../graph';
import { getMaxBy, shuffle } from '../helper/arrayUtils';
import { random } from '../helper/randomness';
import { fitness, FitnessFunction } from './fitness';
import { exchangeMutation, insertionMutation } from './mutation';
import { orderBasedCrossover } from './orderBasedCrossover';
import { orderCrossover } from './orderCrossover';
import { selection } from './selection';

export type GeneticOptions = {
  populationSize?: number;
  elitism?: number;
  tournamentRatio?: number;
  mutationRate?: number;
};

export class GeneticAlgorithm {
  population: number[][];
  scores: number[];
  graph: Graph;
  fitness: FitnessFunction;
  populationSize: number;
  elitismRatio: number;
  tournamentRatio: number;
  mutationRate: number;

  constructor(
    graph: Graph,
    {
      populationSize = 30,
      elitism = 0.1,
      tournamentRatio = 0.2,
      mutationRate = 0.8,
    }: GeneticOptions = {},
  ) {
    this.graph = graph;
    this.fitness = fitness(graph);
    this.elitismRatio = elitism;
    this.populationSize = populationSize;
    this.population = this.createRandomPopulation(populationSize);
    this.scores = this.population.map((permutation) =>
      this.fitness(permutation),
    );
    this.tournamentRatio = tournamentRatio;
    this.mutationRate = mutationRate;
  }

  executeRound() {
    this.population = this.getNextPopulation();
    this.scores = this.population.map((permutation) =>
      this.fitness(permutation),
    );

    const paired = zip(this.population, this.scores);
    const [best, score] = getMaxBy((pair) => pair[1], paired);

    return { best, score };
  }

  createRandomPopulation(size: number): number[][] {
    const population: number[][] = [];
    const vertices = this.graph.getVertices();
    for (let i = 0; i < size; i++) {
      population.push(shuffle(vertices));
    }
    return population;
  }

  getTournamentSize() {
    return Math.round(this.populationSize * this.tournamentRatio);
  }

  getNextPopulation() {
    const newPopulation: number[][] = [];
    const selected = selection(
      this.population,
      this.scores,
      this.getTournamentSize(),
    );
    console.log(this.population);
    console.log(this.scores);
    console.log(selected);

    const elites = this.getElites(); //.map((elite) => {
    newPopulation.push(...elites);

    const numParents = this.populationSize - this.getNumElites();
    for (let i = 0; i < numParents; i += 2) {
      const parent1 = selected[i];
      const parent2 = selected[i + 1];

      const children = this.crossover(parent1, parent2).map((child) => {
        return Math.random() < this.mutationRate ? this.mutate(child) : child;
      });
      newPopulation.push(...children);
    }

    return newPopulation;
  }

  mutate(permutation: number[]) {
    return insertionMutation(permutation);
  }

  getElites() {
    const population = this.population;
    const scores = this.scores;
    const sortedPopulation = zip(population, scores)
      .sort((a, b) => b[1] - a[1])
      .map((item) => item[0]);
    return sortedPopulation.slice(0, this.getNumElites());
  }

  getNumElites() {
    const nonElites = this.populationSize * (1 - this.elitismRatio);
    const roundedNonElites = Math.round(nonElites / 2) * 2; // Round to an even number
    return this.populationSize - roundedNonElites;
  }

  tournamentSelection() {
    const tournamentSize = Math.round(
      this.populationSize * this.tournamentRatio,
    );
    const tournament = shuffle(this.population).slice(0, tournamentSize);
    return getMaxBy((permutation) => this.fitness(permutation), tournament);
  }

  crossover(parent1: number[], parent2: number[]) {
    const crossoverFunctions = [orderBasedCrossover, orderCrossover];

    let index = random(0, crossoverFunctions.length);
    const child1 = crossoverFunctions[index](parent1, parent2);
    index = random(0, crossoverFunctions.length);
    const child2 = crossoverFunctions[0](parent2, parent1);
    return [child1, child2];
  }
}
