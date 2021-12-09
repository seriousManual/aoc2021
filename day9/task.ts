import { readFileSync } from 'fs';

function makeTable(input: string): number[][] {
    return input
        .split('\n')
        .filter(Boolean)
        .map(line => 
            line
                .split('')
                .map(Number)
        )
}

type coordinates = {x: number, y: number, current: number}[]

function getLowPointCoordinates(input: number[][]): coordinates {
    const lowPoints = []
    const sizeX = input[0].length
    const sizeY = input.length

    for (let x = 0; x < sizeX; x++) {
        for (let y = 0; y < sizeY; y++) {
            const current = input[y][x]
            const neighbors = [
                input[y] && input[y][x - 1],
                input[y] && input[y][x + 1],
                input[y - 1] && input[y - 1][x],
                input[y + 1] && input[y + 1][x],
            ]

            if (neighbors.every(n => n === undefined || n > current)) {
                lowPoints.push({ x, y, current })
            }
        }
    }

    return lowPoints
}

function task1(input: number[][]): number {
    const coordinates = getLowPointCoordinates(input)
    return coordinates.reduce((acc, { current }) => acc + current + 1, 0)
}

function task2(input: number[][]): number {
    const coordinates = getLowPointCoordinates(input)

    const basins = []
    for (const { x, y } of coordinates) {
        basins.push(floodFill(input, x, y))
    }

    basins.sort((a, b) => b - a)

    const [a, b, c] = basins

    return a * b * c
}

function floodFill(input: number[][], x: number, y: number) {
    const sizeX = input[0].length
    const sizeY = input.length

    const queue: {x: number, y: number}[] = [{ x, y }]
    const visited: Record<string, boolean> = {}

    while (queue.length) {
        const next = queue.shift()


        if (next === undefined) {
            break
        }

        const { x, y } = next
        
        if (input[y][x] === 9) {
            continue
        }

        const hash = `${x}-${y}`
        visited[hash] = true

        if (x > 0 && !visited[`${x - 1}-${y}`]) {
            queue.push({ x: x - 1, y })
        }

        if (x < sizeX - 1 && !visited[`${x + 1}-${y}`]) {
            queue.push({ x: x + 1, y })
        }

        if (y > 0 && !visited[`${x}-${y - 1}`]) {
            queue.push({ x, y: y - 1 })
        }

        if (y < sizeY - 1 && !visited[`${x}-${y + 1}`]) {
            queue.push({ x, y: y + 1 })
        }
    }

    return Object.keys(visited).length
}

console.log(task1(makeTable(readFileSync(__dirname + '/test_input.txt', 'utf8'))));
console.log(task1(makeTable(readFileSync(__dirname + '/input.txt', 'utf8'))));

console.log(task2(makeTable(readFileSync(__dirname + '/test_input.txt', 'utf8'))));
console.log(task2(makeTable(readFileSync(__dirname + '/input.txt', 'utf8'))));