import { readFileSync } from 'fs';

type hepp = Array<[string, number]>

const lines: hepp = readFileSync(__dirname + '/' + process.argv[2], 'utf8')
    .split('\n')
    .map(line => {
        const [dir, value] = line.split(' ')
        return [dir, parseInt(value, 10)]
    })

console.log(lines);


function task1(lines: hepp) {
    let horizontal = 0
    let depth = 0

    lines.forEach(([direction, value]) => {
        switch (direction) {
            case 'forward':
                horizontal += value
                break
            case 'down':
                depth += value
                break
            case 'up':
                depth -= value
        }
    })

    return horizontal * depth
}

function task2(lines: hepp) {
    let aim = 0
    let horizontal = 0
    let depth = 0

    lines.forEach(([direction, value]) => {
        switch (direction) {
            case 'forward':
                horizontal += value
                depth += (aim * value)
                break
            case 'down':
                aim += value
                break
            case 'up':
                aim -= value
        }
    })

    return horizontal * depth
}

console.log([task1(lines), task2(lines)])