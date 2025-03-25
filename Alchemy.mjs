import fetch from "node-fetch";
import elements from "./listOfStrings.mjs";
import { numbersToLetters } from "./numbersToLetter.mjs";
import { numbersTosolve } from "./numbersToLetter.mjs";
import symbolsOfElements from "./listOfSymbol.mjs";
import { alphabetCipher, elementSymbol, grid, newAlpabet, sequenceSymbols, textTosearch } from "./taskFourStrings.mjs";


const alchemy_Data_URL = "https://alchemy-kd0l.onrender.com/"
const alchemy_Answer = `${alchemy_Data_URL}answer`;

const PLAYER_NAME = "idahha2@uia.no"

const startURL = `${alchemy_Data_URL}start?player=${PLAYER_NAME}`;
const startResponse = await fetch(startURL);
const startData = await startResponse.json();



// 1. Code to Paracelsus lab

const allData = elements.map(elements => elements.Metal).join(' ');
const answer = await answerPost(allData);
console.log(answer);


// 2. search string for poem answer

async function stringSearch() {
    let poem = "“Still flows the Icy Lethe, Veiling all ’neath Eldritch Rime.”"
    let capitalLetters = '';

    for (let i = 0; i < poem.length; i++) {
        let letters = poem[i];

        if (letters >= 'A' && letters <= 'Z') {
            capitalLetters += letters;
        }
    }
    console.log(capitalLetters)
    let res = await answerPost(capitalLetters);

}
stringSearch();


// 3.
async function decodeMsg() {
    let msgDecoded = '';
    let numbers = numbersTosolve.split(' ').map(Number);

    for (let i = 0; i < numbersTosolve.length; i++) {
        let currentNumber = numbers[i];
        if (numbersToLetters[currentNumber]) {
            msgDecoded += numbersToLetters[currentNumber]
        }

    }
    console.log(msgDecoded);
    return msgDecoded;
}
decodeMsg();


const msg = 'to obtain access to the next vault input the formula for the fourth element combine mercury copper and sulfur over heat add salt and water infuse gold throug hair';
console.log(msg);

const answerToMsg = symbolsOfElements.map(symbolsOfElements => symbolsOfElements.Symbol).join('');
console.log(answerToMsg);

const answerToQ = await answerPost(answerToMsg);
console.log(answerToQ);


// 4. 

let string = textTosearch;
let capitalLetters = [];
for (let i = 0; i < string.length; i++) {
    let stringSearch = string[i];

    for (let j = 0; j < stringSearch.length; j++) {
        const letters = stringSearch[j];

        if (letters >= 'A' && letters <= 'Z') {
            capitalLetters.push(letters);

        }
    }
}
console.log(capitalLetters);


function findLetterPlacement() {
    const base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let soveldString = '';
    for (let i = 0; i < alphabetCipher.length; i++) {
        let letter = alphabetCipher[i];
        let IndexChip = newAlpabet.indexOf(letter);

        if (IndexChip !== -1) {
            soveldString += base[IndexChip]
        } else {
            soveldString += letter
        }
    }
    return soveldString;
}
console.log(findLetterPlacement());


function findSequence(sequence, grid) {
    const positions = [];


    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col <= grid[row].length - sequence.length; col++) {
            let match = true;
            for (let seq = 0; seq < sequence.length; seq++) {
                if (grid[row][col + seq] !== sequence[seq]) {
                    match = false;
                    break;
                }
            }
            if (match) {
                positions.push('Horizontal', row + 1);
            }
        }
    }

    for (let col = 0; col < grid[0].length; col++) {
        for (let row = 0; row <= grid.length - sequence.length; row++) {
            let match = true;
            for (let seq = 0; seq < sequence.length; seq++) {
                if (grid[row + seq][col] !== sequence[seq]) {
                    match = false;
                    break;
                }
            }
            if (match) {
                positions.push('Vertical', col + 1);
            }
        }
    }
    return positions;
};

const result = findSequence(sequenceSymbols, grid);
console.log(result);


// Task 4 answer.

const res = 'Argon';
console.log(res);
const taskAnswer = await answerPost(res);
console.log(taskAnswer);





async function answerPost(answer) {
    try {
        //console.log(alchemy_Answer);
        const response = await fetch(`${alchemy_Answer}`,
            {
                method: "POST",
                body: JSON.stringify({ player: PLAYER_NAME, answer: answer }),
                headers: {
                    "Content-Type": "application/json",
                }
            });
        return await response.json();
    } catch (exception) {
        console.error(exception);
    }
};
