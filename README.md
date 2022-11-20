# Treewidth Algorithm

An implementation of various treewidth algorithms, a cli tool and a visualisation tool.

- Algorithm related files are under `src/algorithm`
- Visualisation related files are under `src/visualisation`
- Cli related files are under `src/cli`
- Unit test files are under `src/__tests__`

## Project setup

1. Ensure Node 16, NPM and yarn are installed
3. `cd` into repo's directory
4. run the `yarn` command in the terminal to install all the dependencies

## Building CLI Tool
1. run `yarn build:cli`

## CLI tool usage

You can run the cli-program using node
`node cli-program [options]`

See the help page of the tool for more information `node cli-program --help`

```
Usage: cli-program [options]

        --help, -h
                Displays help information about this script
                'cli-program -h' or 'cli-program --help'

        --method, -m
                Defines tree decomposition heuristic used

        --runs, -r
                Defines the number of runs for the genetic evolution (default = 100)

        --tw-only, --w
                Outputs only estimated treeWidth rather than tree decomposition
```
## Building Visualisation Tool
1. run `yarn build:vis`
2. run `yarn serve:vis`
3. Open `http://localhost:5000` in a browser

## Development (visualisation tool)
Note: if you just want to get the project up and running quickly you can also use the development environment rather than building the project.

1. `yarn run dev:vis`
2. Open `http://localhost:3000` in a browser

## Unit Tests
To run the unit test harness just run `yarn test`.

## Black box testing
1. Clone the td-validate repo https://github.com/holgerdell/td-validate
2. Make compile the binary file by following the instructions
3. Copy the binary file to this project's root folder
4. Ensure the binary file has execution privileges (chmod +x)
5. Generate all the tree-decompositions by running `./blackbox-test-runner.sh` from the root folder
	- This will take probably a few minutes as it is computing 600 tree decompostions on large graphs, but it will show you how a progress status
6. Validate all tree decompositions by running `./blackbox-test-validator.sh` from the root folder

## Generating Results
I would advise against this, but go ahead if you want. 

You can use the `./generate-results.sh` to produce a csv file that contains the estimated treewidth of using each method. You can stop the the script and it will save the what it has already calculated. And it will show you what problem instance it is currently up to.

A few words of warning. 
- This will take a long time to run. It is running a genetic algorithm for 200 runs for 200 large graphs. It took about an hour or so on my laptop, but thats not say much as its a bit slow :P 
	- You can go modify the number of runs in the `./generate-results.sh` file on line 23. 
- This script will also overwrite the results.csv file in the root directory. 

