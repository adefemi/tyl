let useChoice = [];
let gameStart = false;
let matchChoice = [];
let roller;
let playButton;
(() => {
  playButton = document.getElementById("play");
  playButtonTwin = document.getElementById("play1");
  playButton.addEventListener("click", playButtonControl);
  playButtonTwin.addEventListener("click", playButtonControl);
})();

function hightUserSelection(value) {
  const inputList = document.getElementsByClassName("input-field-v");
  const inputListTwin = document.getElementsByClassName("input-field-v1");
  for (var i = 0; i < inputList.length; i++) {
    if (inputList[i].classList.contains("selected")) continue;
    if (inputListTwin[i].classList.contains("selected")) continue;
    const inputVal = inputList[i].querySelector("input").value;
    const inputValTwin = inputListTwin[i].querySelector("input").value;
    if (parseInt(inputVal.toString()) === parseInt(value.toString())) {
      inputList[i].classList.add("selected");
      inputListTwin[i].classList.add("selected");
      matchChoice.push(value);
      break;
    }
  }
}

function playButtonControl() {
  if (gameStart) {
    alert("Game already started!!!");
    return;
  }
  if (useChoice.length < 1) {
    generateUserChoice();
    return;
  }
  playButton.innerText = "playing...";
  playButtonTwin.innerText = "playing...";
  score_arr = useChoice;
  setRevealBalls();
  gameStart = true;
  startSpin();
}

function generateUserChoice() {
  for (var i = 0; i < 3; i++) {
    useChoice.push(Math.floor(Math.random() * (9 - 0 + 1) + 0));
    updateUserSelection();
  }
}

function navigateLink(val) {
  if (val === 1) {
    window.location.href = "/game-main.html";
  }
}

function resetGameBoard() {
  gameStart = false;
  if (matchChoice.length >= useChoice.length) {
    window.location.href = "/won.html";
  } else {
    window.location.href = "/not-win.html";
  }
  stopGame();
  startGame();
  resetEnvironment();
}

function rotateKicker() {
  roller = document.getElementById("roller");
  if (gameStart) {
    startRoller();
    setTimeout(() => randomlySelectValue(), timeToNextSelect);
  }
}

function startRoller(speed = 2000) {
  roller.style.animation = `rotate linear infinite ${speed}ms`;
  if (speed > 300) {
    setTimeout(() => startRoller(speed - 100), 200);
  }
}

function stopRoller(speedMain = null) {
  let tempSpeed = speedMain;
  if (tempSpeed) {
    roller.style.animation = `rotate linear infinite ${tempSpeed}ms`;
  } else {
    tempSpeed = parseFloat(
      roller.style.animationDuration.substring(
        0,
        roller.style.animationDuration.length - 2
      )
    );
  }
  if (tempSpeed < 2000) {
    setTimeout(() => stopRoller(tempSpeed + 100), 200);
  } else {
    roller.style.animation = `none`;
    gameStart = false;
    if (selectedValues.sort().toString() === useChoice.sort().toString()) {
      alert("You win");
    } else {
      alert("you lose");
    }
    resetEnvironment();
  }
}

function randomlySelectValue() {
  const selectedValue =
    gameDataList[Math.floor(Math.random() * gameDataList.length)];
  // update game data list
  gameDataList = gameDataList.filter(item => item !== selectedValue);
  selections += 1;
  selectedValues.push(selectedValue);
  showSelected(selectedValue);
  if (selections >= 3) {
    stopRoller();
  }
}

function showSelected(selectedValue) {
  const selectionHolder = document.getElementById("ball-selected");
  selectionHolder.setAttribute("data-value", selectedValue);
  selectionHolder.style.backgroundColor = colorGradients[selectedValue][0];
  selectionHolder.style.display = "flex";
  setTimeout(() => {
    selectionHolder.style.display = "none";
    setPlacementInRack(selectedValue);
  }, 2000);
}

function setPlacementInRack(selectedValue) {
  const ballEmptyList = document.getElementsByClassName("ball-empty");
  ballEmptyList[selectedValues.length - 1].setAttribute(
    "data-value",
    selectedValue
  );
  ballEmptyList[selectedValues.length - 1].style.backgroundColor =
    colorGradients[selectedValue][0];
  if (selections >= 3) {
    return;
  }
  setTimeout(() => randomlySelectValue(), timeToNextSelect);
}

function resetEnvironment() {
  const ballEmptyList = document.getElementsByClassName("ball-empty");
  for (let i = 0; i < ballEmptyList.length; i++) {
    ballEmptyList[i].setAttribute("data-value", "?");
    ballEmptyList[i].style.backgroundColor = "#DDDDDD";
  }
  const inputList = document.getElementsByClassName("input-field-v");
  for (var i = 0; i < inputList.length; i++) {
    if (inputList[i].classList.contains("selected")) {
      inputList[i].classList.remove("selected");
    }
  }
  playButton.innerText = "Play";
  playButtonTwin.innerText = "Play";
  playButton.style.backgroundColor = "#db5c2a";
  playButtonTwin.style.backgroundColor = "#db5c2a";
  useChoice = [];
  gameDataList = [];
  selections = 0;
  selectedValues = [];
  updateUserSelection();
}
