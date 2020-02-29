let useChoice = [];
let roller;
let playButton;
(() => {
  playButton = document.getElementById("play");
  playButton.addEventListener("click", playButtonControl);
})();

function playButtonControl() {
  if (!gameStart && useChoice.length < 3) {
    alert("Enter your choices first");
    return;
  }
  gameStart = !gameStart;
  playButton.innerText = "Playing";
  playButton.backgroundColor = "#a32470";
  rotateKicker();
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
  playButton.innerText = "Play";
  playButton.backgroundColor = "#3DA7DB";
  useChoice = [];
  gameDataList = [];
  selections = 0;
  selectedValues = [];
  clearInputs();
  setUpEnvironment();
}
