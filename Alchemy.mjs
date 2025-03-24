import fetch from "node-fetch";
import elements from "./listOfStrings.mjs";
import { numbersToLetters } from "./numbersToLetter.mjs";
import { numbersTosolve } from "./numbersToLetter.mjs";
import symbolsOfElements from "./listOfSymbol.mjs";


const alchemy_Data_URL = "https://alchemy-kd0l.onrender.com/"
const alchemy_Answer = `${alchemy_Data_URL}answer`;

const PLAYER_NAME = "idahha2@uia.no"

const startURL = `${alchemy_Data_URL}start?player=${PLAYER_NAME}`;
const startResponse = await fetch(startURL);
const startData = await startResponse.json();



// 1. Code to Paracelsus lab

const allData = elements.map(elements => elements.Metal).join(' ');
//const answer = await answerPost(allData);
console.log(allData)
//console.log(answer)



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
    //let res = await answerPost(capitalLetters);

}
stringSearch()


// Numbers To letters to get the msg.
async function decodeMsg() {
    let msgDecoded = '';
    let numbers = numbersTosolve.split(' ').map(Number);

    for (let i = 0; i < numbersTosolve.length; i++) {
        let currentNumber = numbers[i];
        if (numbersToLetters[currentNumber])
            msgDecoded += numbersToLetters[currentNumber]
    }

    return msgDecoded;
}
decodeMsg()

//msg
const msg = 'to obtain access to the next vault input the formula for the fourth element combine mercury copper and sulfur over heat add salt and water infuse gold throug hair'
//console.log(msg)

const answerToMsg = symbolsOfElements.map(symbolsOfElements => symbolsOfElements.Symbol).join('');
console.log(answerToMsg)

const answerToQ = await answerPost(answerToMsg)
console.log(answerToQ)



function searchElements(search, category) {
    const results = elements.filter(element =>
        Object.values(element).some(value =>
            value.toString().toLowerCase().includes(search.toLowerCase())
        )
    );
    return results.map(results => results[category]);
};


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
        //console.log("PASSED");
        //response = await fetch(answer);
        //console.log("Obtaining response...");
        //console.log(response);
        return await response.json();
    } catch (exception) {
        console.error(exception);
    }
}
