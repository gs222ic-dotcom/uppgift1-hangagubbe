/* Uppgift 1 */
//Hänga gubbe//

// Globala konstanter och variabler
const wordList = [
  "BLOMMA",
  "LASTBIL",
  "SOPTUNNA",
  "KÖKSBORD",
  "RADIOAPPARAT",
  "VINTER",
  "SOMMAR",
  "DATORMUS",
  "LEJON",
  "ELEFANT",
  "JULTOMTE",
  "SKOGSHYDDA",
  "BILNUMMER",
  "BLYERTSPENNA",
  "SUDDGUMMI",
  "KLÄDSKÅP",
  "VEDSPIS",
  "LJUSSTAKE",
  "SKRIVBORD",
  "ELDGAFFEL",
  "STEKPANNA",
  "KASTRULL",
  "KAFFEBRYGGARE",
  "TALLRIK",
  "SOFFBORD",
  "TRASMATTA",
  "FLYGPLAN",
  "FLYGPLATS",
  "TANGENTBORD",
  "DATORSPEL",
  "WEBBPLATS",
  "TELEFON",
  "STJÄRNA",
  "KANELBULLE",
  "SEMLA",
  "ÄPPELPAJ",
  "BLÅBÄR",
  "LINGONSYLT",
  "TRAKTOR",
  "CYKELKEDJA",
  "BOKHYLLA",
  "BOKSTAV",
  "GRILLPLATS",
  "SOLSTOL",
  "BADPLATS",
  "SNÖGUBBE",
  "PARAPLY",
]; // Lista (array) med ord som ska väljas slumpmässigt

const startButton = document.querySelector("#start"); // button-element för startknappen
const infoElement = document.querySelector("#message"); // div-element för meddelanden
const letterButtons = document.querySelectorAll("#letterButtons button"); // Array med button-element för bokstavsknapparna
const hangmanImage = document.querySelector("#hangman"); // img-elementet för bilder på galgen och gubben
let guessNr; // Nummer för aktuell bild som visas (0-6)
let randomWord; // Textsträng med det ord som slumpmässigt väljs ur wordList
let boxElements; // Array med span-element för bokstäverna i ordet
let startTime; // Tid då spelet startas
let previousWord = ""; // innan vald ord

const hangmanImages = [
  
  "img/h0.png",
  "img/h1.png",
  "img/h2.png",
  "img/h3.png",
  "img/h4.png",
  "img/h5.png",
  "img/h6.png"
];

const maxAttempts = 6;

// --------------------------------------------------
// Global setup

//inaktivera startknapp och aktivera bokstavsknappar.
letterButtons.forEach(button => button.disabled = true);
startButton.disabled = false;



startButton.addEventListener ("click",startGame); 

letterButtons.forEach(button =>
  button.addEventListener("click", guessLetter)
);


// Starta nytt spel. Visa första bilden (h0.png),sätt bildnummer till 0
function startGame() {

infoElement.innerHTML= "";
guessNr = 0; //
hangmanImage.src= hangmanImages[0]; 
 startTime = Date.now(); //för att kunna räkna tiden spelaren har från början till slut

letterButtons.forEach(button => {
    button.disabled = false;
  });
 
startButton.disabled = true; // inaktiveras startknapp 
selectRandomWord();// för att välja ett slumpmässigt ord

console.log ("Spel har startats");
console.log("Ordet är random vald");

  }


// --------------------------------------------------
// Ett ord väljs slumpmässigt. Visa en ruta för varje bokstav i ordet
// Ordet ska ej vara samma som föregående ord, om man spelar flera gånger

function selectRandomWord() {
  const boxes = document.querySelector("#boxes");
  boxes.innerHTML= ""; // radera gammalt
  boxElements = []; 
// loop att spelaren välja nytt ord som är inte samma som den innan 
  do {
  randomWord = wordList[Math.floor(Math.random() * wordList.length)];
} while (randomWord === previousWord);

previousWord = randomWord;

 
for ( let i=0; i < randomWord.length; i++) {
    const span= document.createElement ("span");
    span.innerText= "_"; // för att visa _ för varje bokstav i ordet
    boxes.appendChild (span);
    boxElements.push (span);// sparar referns i arrey

  } 
  console.log("Valt ord:" , randomWord);
}

// --------------------------------------------------
// Kontrollera om bokstaven finns i ordet och skriv i så fall ut den.
// Om bokstaven ej finns, uppdateras bilden med galgen och gubben
// Om alla bokstäver är gissade eller om den sista bilden visades, avslutas spelet lägg till UNDER 



// Gisa bokstav
function guessLetter(event) {
  const button= event.target;
  const letter = button.value;// väde på bokstaven
  button.disabled=true; //detta ska inakrivera knappen
  
  
  let hittad = false;//kontrol om bokstaven finns i ordet
  // Loop- den gå igenom ordets bokstav för bokstav för att jämföra med gissningen
  for (let i = 0; i < randomWord.length; i++) {
    // Villkorsats-jämföra om bokstaven på plats [i] är samma som den spelaren tryckte på
    if (randomWord[i] === letter) {
      boxElements[i].innerText = letter;
      boxElements[i].classList.add("marked");
      hittad = true;
    }
  }
//Villkorsats som kontrollera om bokstaven INTE finns i ordet efter att loopen kört klart
  if (!hittad) {
    guessNr++;
    hangmanImage.src = hangmanImages[guessNr];
  }

//villkorsats för kontroll om spelaren har förlurat 
  if (guessNr === maxAttempts) { 
    endGame(true);
    return; 
  }


// kontroll att alla bokstäver hittats
let allaHittade = true;

for (let i= 0; i<boxElements.length; i++) {
  if(!boxElements [i].classList.contains ("marked")){
    allaHittade = false;
     break;
  }
}
  if (allaHittade) { // om alla bosktäver har hittats
    endGame(false);
    
    }
  }
// --------------------------------------------------


// sedan aktivera startknappen och inaktivera bokstavsknapparna
function endGame (manHanged) {
  const endTime = Date.now ();
  const totalTime = Math.floor ((endTime-startTime)/ 1000);
  
// sedan aktivera startknappen och inaktivera bokstavsknapparna
  letterButtons.forEach(button => button.disabled = true);
  startButton.disabled = false;

// att visa slutmeddelande 
  if (manHanged) { 
     console.log ( "Gubbe är hängd");
  }
  else  { console.log ("Grattis");
  
  };
  if (manHanged) {
    hangmanImage.src = hangmanImages[maxAttempts];
    infoElement.innerHTML = `Tyvärr du har förlorad. Lycka till nästa gång :) .<br>Ordet var: ${randomWord}<br>Tid: ${totalTime} sekunder`;
    console.log("Slut av spelet med förust");
  } else {
    infoElement.innerHTML = `Grattis! Du vann!<br>Ordet var: ${randomWord}<br>Tid: ${totalTime} sekunder`;
    console.log("Slut av spelet med vinst");
  }
  
};