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
  "Img/h0.png",
  "Img/h1.png",
  "Img/h2.png",
  "Img/h3.png",
  "Img/h4.png",
  "Img/h5.png",
  "Img/h6.png"
];

const maxAttempts = 6;

// --------------------------------------------------
// Global setup

//inaktivera startknapp och aktivera bokstavsknappar.
letterButtons.forEach(button => button.disabled = true);
startButton.disabled = false;

// Initiera ett nytt spel. Visa första bilden (h0.png),sätt bildnummer till 0

startButton.addEventListener ("click",startGame); 

letterButtons.forEach(button =>
  button.addEventListener("click", guessLetter)
);


// start med ny spel
function startGame() {

infoElement.innerHTML= "";
guessNr = 0; //
hangmanImage.src= hangmanImages[0]; // sätt bildnummer till 0 
 startTime = Date.now(); //för att kunna räkna tiden spelaren har från början till slut

letterButtons.forEach(button => {
    button.disabled = false;
  });
 
startButton.disabled = true; // aktiveras startknapp 
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
// att spelaren välja nytt ord som är inte samma som den innan
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
  
  //VILLKORSATSER FÖR ATT kontrollera 
  //kontrol om bokstaven finns i ordet
  let hittad = false;
  for (let i = 0; i < randomWord.length; i++) {
    if (randomWord[i] === letter) {
      boxElements[i].innerText = letter;
      boxElements[i].classList.add("marked");
      hittad = true;
    }
  }

  if (!hittad) {
    guessNr++;
    hangmanImage.src = hangmanImages[guessNr];
  }

//kontroll om spelaren har förlurat
  if (guessNr === maxAttempts) { //max gräns 6 
    endGame(true);
    return; // stopar funktionen o avslutas körning av den
  }


// kontroll att alla bokstäver hittats
let allaHittade = true;
for (let i= 0; i<boxElements.length; i++) {
  if(!boxElements [i].classList.contains ("marked")){
    allaHittade = false;
  }
}
  if (allaHittade) { // om alla bosktäver har hittats
    endGame(false);
  
    }
  }
// --------------------------------------------------
// Avsluta spelet genom att skriva ut ett meddelande och
// sedan aktivera startknappen och inaktivera bokstavsknapparna
 // / manHanged är true eller false
function endGame (manHanged) {
  const endTime = Date.now ();
  const totalTime = Math.floor ((endTime-startTime)/ 1000);
  
// sedan aktivera startknappen och inaktivera bokstavsknapparna
  letterButtons.forEach(button => button.disabled = true);
  startButton.disabled = false;


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