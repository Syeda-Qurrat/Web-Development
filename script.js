import words from "./words.js"

const wordText = document.querySelector(".word");
const hintText=document.querySelector(".hint span");
const refreshBtn=document.querySelector(".refresh-word");
const checkBtn=document.querySelector(".check-word");
const inputField=document.querySelector("input");
const TimerText=document.querySelector(".time");

let selectedWord,timer;

const initTime = maxTime => {
    
    clearInterval(timer);
    TimerText.innerHTML = maxTime;

    timer = setInterval(()=>{
        if (maxTime > 0){
            maxTime--;
            TimerText.innerHTML = maxTime;
        }
        else{
            alert(`Sorry! Time is up ${selectedWord} was the correct word`);
            clearInterval(timer);
        }

    },1000)
}

const initGame = () =>{

    initTime(30)
    const randomobj = words[Math.floor(Math.random() * words.length)]
    selectedWord = randomobj.word;
    const hint = randomobj.hint;

    const wordArray = selectedWord.split("");

    for(let i = wordArray.length - 1; i > 0; i--){

        let j=Math.floor(Math.random()*(i+1));

        let temp = wordArray[i]
        wordArray[i] = wordArray[j];
        wordArray[j] = temp;

    }
    wordText.innerHTML = wordArray.join("")
    hintText.innerHTML = hint;
    inputField.value = "";

    console.log(randomobj)
    console.log(selectedWord)
    console.log(hint)
    console.log(wordArray)
}
const checkWord=()=>{
    let userWord = inputField.value.toLowerCase();
    if(!userWord) return alert ("Please enter a word")
    if(userWord !== selectedWord) { 
        return alert (`OOPS! ${userWord} entered is incorrect`)
    }
    alert('Congratulations! You guessed it')
    initGame()
};

checkBtn.addEventListener("click",checkWord)
refreshBtn.addEventListener("click", initGame)

initGame()