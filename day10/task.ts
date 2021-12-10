import { readFileSync } from 'fs';

const opening = ['{', '[', '(', '<']
const closing = ['}', ']', ')', '>']

function parseInput(input: string): string[][] {
    return input
        .split('\n')
        .filter(Boolean)
        .map(line => line.split(''))
}

function validateInput(input: string[]): string | true | string[] {
    const consumed: string[] = []

    for (const char of input) {
        if (opening.includes(char)) {
            consumed.push(char)
        } else if (closing.includes(char)) {
            const lastConsumed = consumed[consumed.length - 1]
            
            if (lastConsumed === '{' && char === '}') {
                consumed.pop()
            } else if (lastConsumed === '[' && char === ']') {
                consumed.pop()
            } else if (lastConsumed === '(' && char === ')') {
                consumed.pop()
            } else if (lastConsumed === '<' && char === '>') {
                consumed.pop()
            } else {
                return char
            }
        }
    }

    if (consumed.length > 0) {
        return consumed
    }

    return true
}

const pointsTask1: Record<string, number> = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
}

const pointsTask2: Record<')' | ']' | '}' | '>', number> = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4
}

function task1(input: string[][]): number {
    return input.reduce((sum, line) => {
        const result = validateInput(line)
        if (result === true || Array.isArray(result)) return sum

        return sum + pointsTask1[result]
    }, 0)
}

function task2(input: string[][]): number {
    const lineScores = input
        .map(line => validateInput(line))
        .filter(rest => Array.isArray(rest))
        .map(line => {
            return (line as string[]).map(char => {
                if (char === '{') return '}'
                if (char === '[') return ']'
                if (char === '<') return '>'
                if (char === '(') return ')'
            })
        })
        .map(line => line.reverse())
        .map(line => {
            return (line as string[]).reduce((acc: number, current: string) => {
                // @ts-ignore
                return acc * 5 + pointsTask2[current]
            }, 0)
        })
        .sort((a, b) => b - a)

    return lineScores[Math.floor(lineScores.length / 2)]
}

// console.log(validateInput('([])'.split('')))
// console.log(validateInput('{()()()}'.split('')))
// console.log(validateInput('<([{}])>'.split('')))
// console.log(validateInput('[<>({}){}[([])<>]]'.split('')))
// console.log(validateInput('(((((((((())))))))))'.split('')))
// console.log(validateInput('(((((((((())))))'.split('')))

// console.log(validateInput('<)'.split('')))
// console.log(validateInput('{()()()>'.split('')))
// console.log(validateInput('(((()))}'.split('')))
// console.log(validateInput('<([]){()}[{}])'.split('')))
// console.log(validateInput('<)'.split('')))

console.log(task1(parseInput(readFileSync(__dirname + '/test_input.txt', 'utf8'))));
console.log(task1(parseInput(readFileSync(__dirname + '/input.txt', 'utf8'))));

console.log(task2(parseInput(readFileSync(__dirname + '/test_input.txt', 'utf8'))));
console.log(task2(parseInput(readFileSync(__dirname + '/input.txt', 'utf8'))));