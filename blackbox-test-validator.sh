#!/bin/bash
echo Hello World!
numFiles=$(ls -1q ./instances/ | wc -l | xargs)

i=0
for problemPath in ./instances/*
do
	i=$((i+1))
	filename=$(basename -- "$problemPath")
	name="${filename%%.*}"
	degreeSolutionPath="./solutions/minDegree/${name}.td"
	fillinSolutionPath="./solutions/minFillIn/${name}.td"
	degreefillinSolutionPath="./solutions/minDegreeFillIn/${name}.td"

	# skip empty solution file
	[ -s $degreeSolutionPath ] || continue

	echo "${i}/${numFiles}"
	./td-validate $problemPath $degreeSolutionPath 
	./td-validate $problemPath $fillinSolutionPath
	./td-validate $problemPath $degreefillinSolutionPath
done