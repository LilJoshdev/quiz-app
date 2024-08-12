var questionIndex = 0;
var timerInterval;


//  >>>>>>>>>>>>>>>>>>>>>>>>> modals overlay >>>>>>>>>>>>>>>>>>>>

const modal = document.getElementById('modal-container');
const modalText = document.querySelector('.modalText');


window.onload = function() {
  modal.classList.toggle('hidden');
}


function openModal() {
  modal.classList.toggle('hidden');
}


function clickCloseModalBtn() {
  const modal = document.getElementById('modal-container');
  modal.classList.toggle('hidden');

}
// clickCloseModalBtn()




// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> TIMER FUNCTION >>>>>>>>>>>>>>>>>>>.


function startTimer() {
  let timeCounter = 50;
  const timer = document.getElementById('timer');

  timerInterval = setInterval(() => {
    timeCounter = timeCounter - 1;
    timer.textContent = timeCounter;
    timer.style.color = 'green'

    if(timeCounter <= 15) {
      timer.style.color = 'red'
    }
    waitingSoundPlay()



    if (timeCounter === 0) {
      clearInterval(timerInterval);

      gameOver()
      modalText.textContent = "Time up!! Game Over 😔"
      modalText.style.color = 'red'

    }
  }, 1000);
}




// >>>>>>>>>>>>>>>>>>>>>> DISPLAY QUESTION AND OPTIONS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function showQuestns() {
  const questionContainer = document.querySelector('.question');
  const optionBtns = document.querySelector('.options');
  const question = questionsData[questionIndex];

  questionContainer.textContent = question.question;
  optionBtns.textContent = ''

  question.options.forEach(option => {

    console.log('option',option);
    const optionButton = document.createElement('p');
    optionButton.textContent = option;
    optionButton.className = 'option'
    optionButton.onclick = () => checkAnswer(option);
    optionBtns.appendChild(optionButton);

  });

  startTimer();
  
}
showQuestns();




// >>>>>>>>>>>>>>>>>>>>>>> CHECK TO SEE IF ANSWER IS CORRECT >>>>>>>>>>>>>>>>>>>>>>>>

function checkAnswer(selectedOption) {
  clearInterval(timerInterval); 

  const question = questionsData[questionIndex];
  const correctOption = question.correctAnswer;

  if (selectedOption === correctOption) {
    const optionBtns = document.querySelectorAll('.options p');
    optionBtns.forEach(optBtn => {
      if(optBtn.textContent == correctOption){
        optBtn.classList.add('correct')
      }
    });
    openModal()
    correctOptionSoundPlay()
    stopTimerSound()
    setTimeout(() => {
      openModal();
    }, 2000);

  
    modalText.textContent = "Correct"
    modalText.style.color = 'green'
    questionIndex = questionIndex + 1;

    if (questionIndex < questionsData.length) {
      prizeWon()
      setTimeout(() => {
        showQuestns()
      },4000);
      
    } else {
      gameOver()
      modalText.textContent = "Congratulations🤝!! You have won the game and won $5,000,000 🙌💯"
      modalText.style.color = 'green'
    }

    // For Wrong answer selections
  } else if(questionIndex >= 10 && selectedOption !== correctOption){

    wrongOptionSoundPlay()
    setTimeout(() => {
      gameOver();
    }, 3000);
      modalText.textContent =  'WRONG ANSWER!! WELLDONE🙌!, YOU WON ONLY $100,000';
      modalText.style.color = '#ff0000';

    }else if(questionIndex >= 5 && selectedOption !== correctOption) {
      wrongOptionSoundPlay()
      setTimeout(() => {
        gameOver();
      }, 3000);
      modalText.textContent =  'WRONG ANSWER! YOU GO HOME WITH $4000 👍';
      modalText.style.color = '#ff0000';

    }else if(questionIndex <= 4 && selectedOption !== correctOption){
      wrongOptionSoundPlay()
      setTimeout(() => {
        gameOver();
      }, 3000);
      modalText.textContent =  'WRONG ANSWER! YOU GO HOME WITH NOTHING 😢';
      modalText.style.color = '#ff0000';
    }
    
    else{
      openModal()
      wrongOptionSoundPlay()
  
    modalText.textContent = "Wrong answer"
    modalText.style.color = 'red'

  }
}





// >>>>>>>>>>>>>>>>>> PRIZES WON >>>>>>>>>>>>>>>>>>>>>>>>

function prizeWon () {

  const prizeDivs = document.querySelectorAll('.prize div');
  const prizeDivLength = prizeDivs.length
  console.log("prizeDivLength", prizeDivLength)
  
 
  prizeDivs.forEach(div => {
    div.classList.remove('progress-color')
  });

  prizeDivs[prizeDivLength - questionIndex].classList.add('progress-color')

  if(questionIndex === 5){
  
    modalText.textContent = 'Congratulations!! You have $4000 guaranteed'
    modalText.style.color = 'green'
    setTimeout(() => {
      guaranteedSoundPlay()
    }, 4000);
    setTimeout(()=>{
      stopTimerSound()
    },2000)

  }else if (questionIndex === 10) {
   
      modalText.textContent = 'CONGRATULATIONS YOU NOW HAVE $100,000 GUARANTEED!';
      modalText.style.color = 'green';
      setTimeout(()=>{
        guaranteedSoundPlay()
      },4000)

    }else if (questionIndex === 15) {

      modalText.textContent = 'CONGRATULATIONS YOU HAVE WON THE GAME WITH $5,000,000 GUARANTEED!';
      modalText.style.color = 'green';
    }
  

}



// >>>>>>>>>>>>>>>>>>>>>>>>> lifelines functions >>>>>>>>>>>>>>>>>>>>>>


function fiftyFifty() {
  const fiftyFifty_Btn = document.getElementById('fiftyFifty-lifeline')
  fiftyFifty_Btn.addEventListener("click", () => {
    const allOptions = document.querySelectorAll('.options p');
    const correctAnswer = questionsData[questionIndex].correctAnswer;
    const wrongOptions = questionsData[questionIndex].options.filter(option => option !== correctAnswer);
    const randomWrongOption = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
  
    allOptions.forEach(option => {
      console.log("fiftyfiftybtn", option);
      if (option.textContent !== correctAnswer && option.textContent !== randomWrongOption) {
        option.classList.add('hidden');
      }
    });
      fiftyFifty_Btn.style.visibility = "hidden";
      lifelineSoundPlay()

  })


}
fiftyFifty()



function callFriend() {
  const callAfriendBtn = document.getElementById('call-A-friend')
  callAfriendBtn.addEventListener("click", function(){
    const correctAnswer = questionsData[questionIndex].correctAnswer;
    openModal()
    setTimeout(() => {
      openModal();
    }, 5000);
    modalText.textContent = `John Doe thinks the answer is '${correctAnswer}'`
    modalText.style.color = 'blue'

    callAfriendBtn.style.visibility = "hidden";
    lifelineSoundPlay()
  })

}
callFriend()




function askAudienceFunc() {
  const askTheAudienceBtn = document.getElementById('ask-audience');
  askTheAudienceBtn.addEventListener("click", () => {
    

    // Generate 4 random numbers
    const firstNum = Math.floor(Math.random() * 101); // Generate a random percentage between 0 and 100
    const secondNum =  Math.floor(Math.random() * (101 - firstNum))
    const thirdNum =  Math.floor(Math.random() * (101 - (firstNum + secondNum)))
    const fourthNum =  100 - (firstNum + secondNum + thirdNum)

    const audienceResponse = {};
  
    let myArray = [ firstNum,secondNum, thirdNum, fourthNum]
    let audienceCorrectResponse = generateMax(myArray)
    const audienceWrongResponse = myArray.filter(audWrngNum => audWrngNum !== audienceCorrectResponse)
    // console.log("myArray", myArray);

    const correctAnswer = questionsData[questionIndex].correctAnswer;
    const options = Array.from(document.querySelectorAll('.options p'))

    



    let audWrngOption = options.filter((wrngOp) => wrngOp.textContent !== correctAnswer)
    
    audWrngOption.forEach((option, index) => {
      audienceResponse[option.textContent] = audienceWrongResponse[index] + '%'
    })
    options.forEach((option, index) => {
      if (option.textContent === correctAnswer) {
        audienceResponse[option.textContent] = audienceCorrectResponse + '%';
      }
    });

    
    openModal();
    modalText.textContent = `\n${JSON.stringify(audienceResponse)}`;
    modalText.style.color = "yellow";
    askTheAudienceBtn.style.visibility = "hidden";
    lifelineSoundPlay();
    
  })
  function generateMax(array) {
    
    let maxNum = 0
  
    for (let i = 0; i < array.length; i++) {
      if(maxNum < array[i]) {
        maxNum = array[i]
      }
      
    }
    return maxNum
  }
}
askAudienceFunc()




function walkAway () {
  const walkaway = document.querySelector('.walkaway');
  walkaway.addEventListener('click', () => {
   
    if (questionIndex === 15) {
        gameOver();
        modalText.textContent =  'CONGRATS, YOU WILL WORK AWAY WITH $3,000,000 🙌🦾';
        modalText.style.color = '#08ea26';
    }else if(questionIndex === 14){
        gameOver();
        modalText.textContent =  'CONGRATS, YOU WILL WORK AWAY WITH $3,000,000 🙌🦾';
        modalText.style.color = '#08ea26';

    } else if (questionIndex === 13) {
        gameOver();
        modalText.textContent =  'Awesome Decision Dawg, You are working away with $1,000,000 🤝';
        modalText.style.color = '#08ea26';

    }else if (questionIndex === 12) {
        gameOver();
        modalText.textContent =  'Awesome Decision Dawg, You are working away with $500,000 🤝';
        modalText.style.color = '#08ea26'

    } else if (questionIndex === 11) {
        gameOver();
        modalText.textContent =  'Awesome Decision Dawg, You are working away with $200,000 🤝';
        modalText.style.color = '#08ea26'

    }else if (questionIndex === 10) {
        gameOver();
        modalText.textContent =  'Awesome Decision Dawg, You are working away with $100,000 🤝';
        modalText.style.color = '#08ea26'

    }else if (questionIndex === 9) {
        gameOver();
        modalText.textContent =  'Awesome Decision Dawg, You are working away with $50,000 🤝';
        modalText.style.color = '#08ea26'

    }else if (questionIndex === 8) {
        gameOver();
        modalText.textContent =  'Awesome Decision Dawg, You are working away with $25,000 🤝';
        modalText.style.color = '#08ea26'

    }else if (questionIndex === 7) {
        gameOver();
        modalText.textContent =  'Awesome Decision Dawg, You are working away with $16,000 🤝';
        modalText.style.color = '#08ea26'

    }else if (questionIndex === 6) {
        gameOver();
        modalText.textContent =  'Awesome Decision Dawg, You are working away with $8,000 🤝';
        modalText.style.color = '#08ea26'

    }else if (questionIndex === 5) {
        gameOver();
        modalText.textContent =  'Awesome Decision Dawg, You are working away with $4,000 🤝';
        modalText.style.color = '#08ea26'

    }else if (questionIndex === 4) {
        gameOver();
        modalText.textContent =  'Awesome Decision Dawg, You are working away with $2,000 🤝';
        modalText.style.color = '#08ea26'

    }else if (questionIndex === 3) {
        gameOver();
        modalText.textContent =  'Awesome Decision Dawg, You are working away with $1,000 🤝';
        modalText.style.color = '#08ea26'

    }else if (questionIndex === 2) {
        gameOver();
        modalText.textContent =  'Awesome Decision Dawg, You are working away with $500 🤝';
        modalText.style.color = '#08ea26'

    } else if (questionIndex === 1) {
        gameOver();
        modalText.textContent =  'Well!! better luck next time. You won $200 🤝';
        modalText.style.color = '#baab0a';

    }
     else {
      gameOver();
      modalText.textContent =  'YOU FAILED!!, You go home Empty 🥲';
      modalText.style.color = '#ea0808';
      
    }

    correctOptionSoundPlay()
    
});
}

walkAway()





// >>>>>>>>>>>>>>>>>> GAME OVER FUNCTION >>>>>>>>>>>>>>>>>>>>>>>>>>>

function gameOver () {
  const questionContainer = document.querySelector('.question');
  const optionBtns = document.querySelector('.options');
  const prizeDivs = document.querySelector('.prize');
  const lifelines = document.querySelector('.lifelines');
  const walkaway = document.querySelector('.walkaway');

  questionContainer.style.display = 'none'
  optionBtns.style.display = 'none'
  prizeDivs.style.display = 'none'
  lifelines.style.display = 'none'
  walkaway.style.display = 'none'

  stopTimerSound()
  clearInterval(timerInterval)
  openModal()
  playAgain()

  setTimeout(() => {
    letsPlayAgainSound()
  }, 4000)

}


// >>>>>>>>>>>>>>>>>>>>>> PLAY AGAIN FUNCTION >>>>>>>>>>>>>>>>>

function playAgain () {
  const playAgainElement = document.querySelector('.play-again-modal')
  const playAgainBtn = document.createElement('a')
  playAgainBtn.href = '/'
  playAgainBtn.textContent = 'Play Again'
  playAgainBtn.className = 'play-again'

  playAgainElement.appendChild(playAgainBtn)
}





// >>>>>>>>>>>>>>>>>>>>>>>>>> Sounds functionality >>>>>>>>>>>>>>>>>>>>>>>>>>>

function letsPlayAgainSound () {
  const letsPlay = document.getElementById('lets-play')
  letsPlay.play()
}

function lifelineSoundPlay(){
  const lifeline = document.getElementById('lifeline')
  lifeline.play()
}


function correctOptionSoundPlay(){
  const correct_answer = document.getElementById('correct-answer')
  correct_answer.play()
}

function wrongOptionSoundPlay(){
  const wrong_answer = document.getElementById('wrong-answer')
  wrong_answer.play()
}


function waitingSoundPlay(){
  const easy = document.getElementById('easy')
  easy.play()

}


function guaranteedSoundPlay(){
  const guaranteedSound = document.getElementById('guaranteed-sound')
  guaranteedSound.play()

}


// >>>>>>>>>>>> STOP SOUND >>>>>>>>>>>>>>>>>

function stopTimerSound() {
  const easy = document.getElementById('easy')
  easy.pause()
}

