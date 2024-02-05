// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};
let userWord = "";
let newPointStructure = transform(oldPointStructure);

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const key in oldPointStructure) {
 
		 if (oldPointStructure[key].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${key}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  let userInput = input.question("Let's play some scrabble! Enter a word: ");
//   let wordScorer = oldScrabbleScorer(userInput)
//        console.log(wordScorer) 
      let currentWord = userWord += userInput
   return currentWord
};


let simpleScorer = (word)=>{
   console.log(`Your score is ${word.length}`)
      return word.length 
};

let vowelBonusScorer=(word)=>{
   let vowels = ["A","E", "I", "O", "U"]
   let score = 0;
   for (i = 0; i < word.length; i++){
      let letter = word[i].toUpperCase();
      if (vowels.includes(letter)){
      console.log(`Points for '${letter}': 3`)
         score += 3
      }else{
   console.log(`Points for '${letter}': 1`)
   score++
      }

   
    }
    console.log(`your score is ${score}`)
   return score
};



let scrabbleScorer=(word)=>{
   let totalScore = 0;
   for (i = 0; i < word.length; i++){
      for (key in newPointStructure){
       if(key === word[i]){
         console.log(`Point for '${word[i]}': ${newPointStructure[key]} `)
         totalScore += newPointStructure[key]
       }
      }
   }
 console.log(`your score is ${totalScore}`)
   return totalScore

};

const scoringAlgorithms = [
   {name: "Simple Score", description: "Each letter is worth 1 point.", scorerFunction: simpleScorer},
    {name: "Bonus Vowels", description: " Vowels	Vowels are 3 pts, consonants are 1 pt.", scorerFunction: vowelBonusScorer},
     {name: "Scrabble", description: "	The traditional scoring algorithm.", scorerFunction: scrabbleScorer}
   ];




function scorerPrompt() {
   let scoringPrompt = Number(input.question("Which scoring style is suitable for you: \n 0 - Simple: One point per character \n 1 - Vowel Bonus: Vowels are worth 3 points  \n 2 - Scrabble: Uses scrabble point system \n Enter 0, 1, 2: "));
   return scoringAlgorithms[scoringPrompt].scorerFunction(userWord)

}


function transform(oldPointStructure) {
   let newScoringStructure = {}
   for (key in oldPointStructure){
    oldPointStructure[key].forEach(letter => {
   let loweredLetter = letter.toLowerCase()
      newScoringStructure[loweredLetter] = parseInt(key)
    });
     
   }

  return newScoringStructure
};






function runProgram() {
   initialPrompt();
   scorerPrompt()
}


// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
