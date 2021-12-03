import { readFileSync } from 'fs';

type hepp = string[][]

const lines: hepp = readFileSync(__dirname + '/' + process.argv[2], 'utf8')
    .split('\n')
    .map(line => line.split(''))

function task1(lines: hepp) {
    const gamma: string[] = []
    const epsilon: string[] = []

    let lengthLine = lines[0].length
    for (let bitIndex = 0; bitIndex < lengthLine; bitIndex++) {
        let countZero = 0

        lines.forEach(line => {
            const bit = line[bitIndex]
        
            if (bit === '0') countZero++
        })
        

        if (countZero > lines.length / 2) {
            gamma.push('0')
            epsilon.push('1')
        } else {
            gamma.push('1')
            epsilon.push('0')
        }
    }
    
    return parseInt(gamma.join(''), 2) * parseInt(epsilon.join(''), 2)
}

function task2(lines: hepp) {
    let lengthLine = lines[0].length

    let listOxygen = [...lines]
    for (let bitIndex = 0; bitIndex < lengthLine; bitIndex++) {
        let countZero = 0

        listOxygen.forEach(line => {
            if (line[bitIndex] === '0') countZero++
        })

        if (countZero > listOxygen.length / 2) {
            listOxygen = listOxygen.filter(entry => entry[bitIndex] === '0')
        } else {
            listOxygen = listOxygen.filter(entry => entry[bitIndex] === '1')
        }

        if (listOxygen.length === 1) {
            break
        }
    }

    let listScrubber = [...lines]
    for (let bitIndex = 0; bitIndex < lengthLine; bitIndex++) {
        let countZero = 0

        listScrubber.forEach(line => {
            if (line[bitIndex] === '0') countZero++
        })

        if (countZero > listScrubber.length / 2) {
            listScrubber = listScrubber.filter(entry => entry[bitIndex] === '1')
        } else {
            listScrubber = listScrubber.filter(entry => entry[bitIndex] === '0')
        }

        if (listScrubber.length === 1) {
            break
        }
    }

    const valListOxygen = parseInt(listOxygen.flat().join(''), 2)
    const valListScrub = parseInt(listScrubber.flat().join(''), 2)

    return valListOxygen * valListScrub
}

console.log([task1(lines), task2(lines)]);
