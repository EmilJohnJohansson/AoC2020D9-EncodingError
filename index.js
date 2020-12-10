const { count } = require('console');
const fs = require('fs');

function parseInput(fileName) {
    const content = fs.readFileSync(fileName, 'utf8');
    return content.split('\n').map(c => parseInt(c));
}

function findFirstNonSumable(input, preamble) {
    var copy = JSON.parse(JSON.stringify(input));
    var numbers = [];

    for (var i = 0; i < preamble; i++) {
        numbers.push(copy.shift());
    }

    while (copy.length > 0) {
        const examed = copy.shift();
        var sumable = false;

        numbers.forEach(n1 => {
            numbers.forEach(n2 => {
                if (!(sumable || n1 === n2)) {
                    sumable = n1 + n2 === examed;
                }
            });
        });

        if (!sumable){
            return examed;
        }

        numbers.shift();
        numbers.push(examed);
    }

    return undefined;
}

function findContRange(target, input) {
    var copy = JSON.parse(JSON.stringify(input));
    var found = false;
    var range = [];

    while (copy.length > 0 && !found) {
        var counter = 0;
        var total = 0;
        range = [];
        while (total < target) {
            total += copy[counter];
            range.push(copy[counter]);
            counter++;
        }        

        found = target === total;

        copy.shift();
    }

    return range;
}

const input = parseInput(process.argv[2]);
const preamble = parseInt(process.argv[3])

const theNumber = findFirstNonSumable(input, preamble);
const contRange = findContRange(theNumber, input)

console.log(theNumber);
// console.log(contRange)
console.log(Math.min(...contRange) + Math.max(...contRange));