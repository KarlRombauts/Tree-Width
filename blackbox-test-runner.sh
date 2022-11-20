#!/bin/bash
echo Hello World!
numFiles=$(ls -1q ./instances/ | wc -l | xargs)

mkdir -p ./solutions/minDegree
mkdir -p ./solutions/minFillIn
mkdir -p ./solutions/minDegreeFillIn

i=0
for problemPath in ./instances/*
do
	i=$((i+1))
	filename=$(basename -- "$problemPath")
	name="${filename%%.*}"
	degreeSolutionPath="./solutions/minDegree/${name}.td"
	fillinSolutionPath="./solutions/minFillIn/${name}.td"
	degreefillinSolutionPath="./solutions/minDegreeFillIn/${name}.td"
	echo "${i}/${numFiles}"
	node cli-program.js -m minDegree < $problemPath > $degreeSolutionPath 
	node cli-program.js -m minFillIn < $problemPath > $fillinSolutionPath
	node cli-program.js -m minDegreeFillIn < $problemPath > $degreefillinSolutionPath
done