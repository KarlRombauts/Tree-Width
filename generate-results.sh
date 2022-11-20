#!/bin/bash
echo Hello World!
numFiles=$(ls -1q ./instances/ | wc -l | xargs)

touch ./results.csv
echo "Problem ID, Min Degree, Min Fill-in, Min Degree + Fill-in, Genetic" > ./results.csv

i=0
for problemPath in ./instances/*
do
	i=$((i+1))
	filename=$(basename -- "$problemPath")
	name="${filename%%.*}"
	degreeSolutionPath="./solutions/minDegree/${name}.td"
	fillinSolutionPath="./solutions/minFillIn/${name}.td"
	degreefillinSolutionPath="./solutions/minDegreeFillIn/${name}.td"
	geneticPath="./solutions/genetic/${name}.td"
	echo "${i}/${numFiles}"

	minDegree=$(node cli-program.js -m minDegree --tw-only < $problemPath) 
	minFillIn=$(node cli-program.js -m minFillIn --tw-only < $problemPath)
	minDegreeFillIn=$(node cli-program.js -m minDegreeFillIn --tw-only < $problemPath)
	genetic=$(node cli-program.js -m genetic --runs 200 --tw-only < $problemPath)

	
	echo "${i}, ${minDegree}, ${minFillIn}, ${minDegreeFillIn}, ${genetic}" >> ./results.csv

done