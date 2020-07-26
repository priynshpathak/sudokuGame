const sudoArray = [
  "53--7----6--195----98----6-8---6---34--8-3--17---2---6-6----28----419--5----8--79",
  "534678912672195348198342567859761423426853791713924856961537284287419635345286179",
];

var gameStarted = false;
var timer;
var timeRemaining;
var finalScore = 0;
var selectedNum;
var selectedTile;
var disableSelect;
var accuracyFactor = (100 / 51).toFixed(2);
var correctPercentage = 0;

var handlekeydown = function (event) {
  console.log("Hey key pressed");
  if (
    (event.keyCode >= 49 && event.keyCode <= 57) ||
    (event.keyCode >= 97 && event.keyCode <= 105)
  ) {
    console.log(event.keyCode);
    selectedTile.textContent = String.fromCharCode(event.keyCode);
    selectedTile.style.color = "blue";
    console.log(selectedTile.id);

    if (sudoArray[1].charAt(selectedTile.id) === selectedTile.textContent)
      finalScore++;

    console.log("finalScore", finalScore);
  }
  else if(event.keyCode==48 || event.keyCode==96){
    selectedTile.textContent=" ";
  }
};

function clearBoard() {
  let temp = querySelAll(".numbers");
  for (let i = 0; i < temp.length; i++) {
    if (sudoArray[0].charAt(temp[i].id) == "-") temp[i].textContent = " ";
    temp[i].classList.remove("selected");
  }
  finalScore = 0;
}

window.onload = function () {
  console.log(mainlink);
  selectId("start-button").addEventListener("click", startGame);
};

function startGame() {
  
  let boardNumber;
  boardNumber = sudoArray[0];
  sudoBoard(boardNumber);
  selectId("start-button").classList.add("hidden");
  selectId("reset-button").classList.remove("hidden");
  selectId("submit-button").classList.remove("hidden");
  gameStarted = true;
  countDown();
}

function submitGame() {
    gameOver();
  }

function countDown() {
  let lvTimer = 240; //Setting it for 4 minutes -- 240 seconds

  timer = setInterval(() => {
    lvTimer--;

    if (lvTimer === 0) gameOver();

    selectId("result").innerHTML = minuteSecondTimer(lvTimer);
  }, 1000);
}

function gameOver() {
  clearTimeout(timer);
  correctPercentage = finalScore * accuracyFactor;
  if(finalScore===51){
    selectId("result").textContent="Congrat's you won genius , accuracy % is : "+correctPercentage;
  }
  else{
    selectId("result").textContent="So Sorry you have lost this round , accuracy % is : "+correctPercentage + " you manage to get : "+ finalScore +" tilesCorrect";
  }
  console.log("correctPercentage", correctPercentage);
  console.log(mainlink);
  finalScore=0;
  //setTimeout("pageRedirect()", 10000);
}

function minuteSecondTimer(time) {
  let mins = Math.floor(time / 60);
  if (mins < 10) mins = "0" + mins;

  let sc = time % 60;
  if (sc < 10) sc = "0" + sc;

  return mins + ":" + sc;
}

function sudoBoard(numbers) {
  if (!gameStarted) {
    let idCount = 0;
    //create 81 tiles
    for (let i = 0; i < 81; i++) {
      let numberCube = document.createElement("p");
      if (numbers.charAt(i) != "-") {
        //set tile text to correct number
        numberCube.textContent = numbers.charAt(i);
      } else {
        numberCube.addEventListener("click", function () {
          if (!disableSelect) {
            //If number is already selected
            if (numberCube.classList.contains("selected")) {
              //Then remove selection
              numberCube.classList.remove("selected");
              selectedTile = null;
            } else {
              //Deselect all others tiles
              for (let i = 0; i < 81; i++) {
                querySelAll(".numbers")[i].classList.remove("selected");
              }

              numberCube.classList.add("selected");
              selectedTile = numberCube;
              
            }
          }
        });
      }
      numberCube.id = idCount;
      idCount++;
      numberCube.classList.add("numbers");
      if (
        (numberCube.id > 17 && numberCube.id < 27) ||
        (numberCube.id > 44 && numberCube.id < 54)
      ) {
        numberCube.classList.add("bottomBorder");
      }

      if ((numberCube.id + 1) % 9 == 3 || (numberCube.id + 1) % 9 == 6) {
        numberCube.classList.add("rightBorder");
      }
      selectId("Game").appendChild(numberCube);
    }
  }
}


//generalized id and query selector
function selectId(id) {
  return document.getElementById(id);
}

function querySel(selector) {
  return document.querySelector(selector);
}

function querySelAll(selector) {
  return document.querySelectorAll(selector);
}
