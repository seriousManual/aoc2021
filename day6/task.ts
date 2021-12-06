import { readFileSync } from 'fs';

function getAgeMap(input: number[]): number[] {
    let ageMap = new Array(9).fill(0)
    input.forEach(entry => ageMap[entry + 1]++)
    return ageMap
}

function oneIteration(ageMap: number[]) {
    const cntZero = ageMap[0]

    for (let i = 1; i < ageMap.length; i++) {
        ageMap[i - 1] = ageMap[i]
    }

    ageMap[8] = cntZero
    ageMap[6] += cntZero

    return ageMap
}

function run(ageMap: number[], n: number) {
    for (let i = 0; i <= n; i++) {
        ageMap = oneIteration(ageMap)
    }

    return ageMap.reduce((acc, cur) => acc + cur, 0)
}

console.log(run(getAgeMap([3, 4, 3, 1, 2]), 18))
console.log(run(getAgeMap([3, 4, 3, 1, 2]), 80))

console.log(run(getAgeMap(readFileSync(__dirname + '/input.txt', 'utf8').split(',').map(n => parseInt(n, 10))), 80))
console.log(run(getAgeMap(readFileSync(__dirname + '/input.txt', 'utf8').split(',').map(n => parseInt(n, 10))), 256))