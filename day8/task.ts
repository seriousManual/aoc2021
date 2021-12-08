import { readFileSync } from 'fs';

function task1(input: string) {
    return input
        .split('\n')
        .filter(Boolean)
        .map(line => line.split('|')[1].trim().split(' '))
        .flat()
        .filter(entry => entry.length === 2 || entry.length === 4 || entry.length === 3 || entry.length === 7)
        .length
}

console.log(task1(readFileSync(__dirname + '/test_input.txt', 'utf8')));
console.log(task1(readFileSync(__dirname + '/input.txt', 'utf8')));