import { readFileSync } from 'fs';

const lines = readFileSync(__dirname + '/' + process.argv[2], 'utf8')
    .split('\n')
    .map(line => parseInt(line, 10))

function task1(lines: number[]) {
    return lines.reduce((numberInc, line: number, index, lines: number[]) => {
        if (lines[index - 1] !== undefined && lines[index - 1] < line) numberInc++

        return numberInc
    }, 0)
}

function task2(lines: number[]) {
    return lines.reduce((numberInc, line: number, index, lines: number[]) => {
        const sumCurrentWindow = [lines[index], lines[index + 1], lines[index + 2]].reduce((sum, line) => sum + line, 0)
        const sumPreviousWindow = [lines[index - 1], lines[index], lines[index + 1]].reduce((sum, line) => sum + line, 0)

        return sumCurrentWindow > sumPreviousWindow ? numberInc + 1 : numberInc
    }, 0)
}

console.log([task1(lines), task2(lines)])