let canvas;
let canvasPosition;
let gameStart = false;
let mainSpeed = 1;
let gameDataList = [];
let timeToNextSelect = 3000;
let selections = 0;
let selectedValues = [];
const colorGradients = [
  ["#a32626", "#ff3c3c", "#501414"],
  ["#cfcc3e", "#edea44", "#8d8a2a"],
  ["#56ac34", "#76fb49", "#397121"],
  ["#32b3ac", "#4cfff7", "#21736d"],
  ["#366ab3", "#4e97ff", "#1d3964"],
  ["#5c45a3", "#936aff", "#37265e"],
  ["#8c3c9e", "#e965ff", "#522a64"],
  ["#a32470", "#ff38af", "#57143a"],
  ["#4ba374", "#72ffb2", "#316247"],
  ["#766d9a", "#bdafff", "#22222e"]
];

setUpEnvironment();

function addBall(val) {
  const ballFigure = document.createElement("div");
  ballFigure.classList.add("ball");
  ballFigure.id = `ball${val}`;
  ballFigure.style.background = `
        radial-gradient(
          circle at 50% 120%,
          ${colorGradients[val][0]},
          ${colorGradients[val][1]} 80%,
          ${colorGradients[val][2]} 100%
        )
      `;

  const valueMain = document.createElement("span");
  valueMain.setAttribute("data-value", val.toString());
  valueMain.classList.add("value");

  const valueSub = document.createElement("span");
  valueSub.setAttribute("data-value", val.toString());
  valueSub.classList.add("value1");

  ballFigure.appendChild(valueMain);
  ballFigure.appendChild(valueSub);
  canvas.appendChild(ballFigure);
}

function setUpEnvironment() {
  canvas = document.getElementById("myCanvas");
  canvasPosition = canvas.getBoundingClientRect();
  const totalCount = 9;
  canvas.innerHTML = "";

  setTimeout(() => {
    for (let i = 0; i <= totalCount; i++) {
      for (let j = 0; j < 3; j++) {
        gameDataList.push(i);
      }
      addBall(i);
      addBall(i);
    }

    getAllBalls();
    startGame();
  }, 1000);
}

function startGame() {
  const balls = document.getElementsByClassName("ball");

  for (let i = 0; i < balls.length; i++) {
    const ballPosition = balls[i].getBoundingClientRect();
    const ball = balls[i];
    centerBall(ball, ballPosition, canvasPosition);

    startTrigger(ball, true);
  }
}

function startTrigger(ball, down = true, positionVal = null) {
  const randomMovement = Math.floor(Math.random() * (4 - 1 + 1) + 1);
  const randomMovement2 = Math.floor(Math.random() * (4 - 1 + 1) + 1);

  let speed = Math.floor(Math.random() * (30 - 25 + 1) + 25);
  if (gameStart) {
    speed = 1;
  }
  let position;
  if (positionVal) {
    position = positionVal;
  } else {
    position = checkNextBounce(ball);
  }
  dropBall(
    ball,
    canvasPosition,
    position,
    speed,
    randomMovement,
    randomMovement2
  );
}

function centerBall(ball, ballPosition, canvasPosition) {
  ball.style.left = `${canvasPosition.width / 2 - ballPosition.width / 2}px`;
  ball.style.top = `${canvasPosition.height / 2 - ballPosition.height / 2}px`;
}

function dropBall(ball, canvasPosition, position, speed, moveY, moveX) {
  if (position === "topLeft") {
    handleTopLeft(ball, canvasPosition, speed, moveY, moveX);
  } else if (position === "topRight") {
    handleTopRight(ball, canvasPosition, speed, moveY, moveX);
  } else if (position === "bottomLeft") {
    handleBottomLeft(ball, canvasPosition, speed, moveY, moveX);
  } else {
    handleBottomRight(ball, canvasPosition, speed, moveY, moveX);
  }
}

function handleTopLeft(ball, canvasPosition, speed, moveY, moveX) {
  ball.style.top = `${ball.offsetTop - moveY}px`;
  ball.style.left = `${ball.offsetLeft - moveX}px`;
  if (!checkIfTouchCanvasBorder(ball, canvasPosition, "topLeft")) {
    setTimeout(
      () =>
        dropBall(
          ball,
          canvasPosition,
          "topLeft",
          gameStart ? mainSpeed : speed,
          moveY,
          moveX
        ),
      gameStart ? mainSpeed : speed
    );
  } else {
    startTrigger(ball, false, checkNextBounce(ball, "topLeft"));
  }
}

function handleTopRight(ball, canvasPosition, speed, moveY, moveX) {
  ball.style.top = `${ball.offsetTop - moveY}px`;
  ball.style.left = `${ball.offsetLeft + moveX}px`;

  if (!checkIfTouchCanvasBorder(ball, canvasPosition, "topRight")) {
    setTimeout(
      () =>
        dropBall(
          ball,
          canvasPosition,
          "topRight",
          gameStart ? mainSpeed : speed,
          moveY,
          moveX
        ),
      gameStart ? mainSpeed : speed
    );
  } else {
    startTrigger(ball, false, checkNextBounce(ball, "topRight"));
  }
}

function handleBottomRight(ball, canvasPosition, speed, moveY, moveX) {
  ball.style.top = `${ball.offsetTop + moveY}px`;
  ball.style.left = `${ball.offsetLeft + moveX}px`;
  if (!checkIfTouchCanvasBorder(ball, canvasPosition, "bottomRight")) {
    setTimeout(
      () =>
        dropBall(
          ball,
          canvasPosition,
          "bottomRight",
          gameStart ? mainSpeed : speed,
          moveY,
          moveX
        ),
      gameStart ? mainSpeed : speed
    );
  } else {
    startTrigger(ball, false, checkNextBounce(ball, "bottomRight"));
  }
}

function handleBottomLeft(ball, canvasPosition, speed, moveY, moveX) {
  ball.style.top = `${ball.offsetTop + moveY}px`;
  ball.style.left = `${ball.offsetLeft - moveX}px`;
  if (!checkIfTouchCanvasBorder(ball, canvasPosition, "bottomLeft")) {
    setTimeout(
      () =>
        dropBall(
          ball,
          canvasPosition,
          "bottomLeft",
          gameStart ? mainSpeed : speed,
          moveY,
          moveX
        ),
      gameStart ? mainSpeed : speed
    );
  } else {
    startTrigger(ball, false, checkNextBounce(ball, "bottomLeft"));
  }
}

function checkIfTouchCanvasBorder(ball, canvasPosition, position) {
  const ballPosition = ball.getBoundingClientRect();
  const totalBallPositionV = ballPosition.height + ballPosition.top;
  let canvasTotalPositionV = canvasPosition.height + canvasPosition.top;
  let canvasTotalPositionH = canvasPosition.left + ballPosition.width;
  if (position === "bottomRight" || position === "topRight") {
    canvasTotalPositionH = canvasPosition.left + canvasPosition.width;
  }
  if (position === "topRight" || position === "topLeft") {
    canvasTotalPositionV = canvasPosition.top + ballPosition.height;
  }
  let totalBallPositionH = ballPosition.width + ballPosition.left;

  totalBallPositionH = validateCanvaxX(
    totalBallPositionV,
    canvasTotalPositionV,
    totalBallPositionH,
    canvasTotalPositionH,
    position
  );

  return totalBallPositionH.v <= 0 || totalBallPositionH.h <= 0;
}

function checkNextBounce(ball, position) {
  const ballPosition = ball.getBoundingClientRect();
  const bv = ballPosition.height + ballPosition.top;
  const bh = ballPosition.width + ballPosition.left;
  let possiblePositions = [];

  // check topLeft
  let canV = canvasPosition.top + ballPosition.height;
  let canH = canvasPosition.left + ballPosition.width;
  let diffV = bv - canV;
  let diffH = bh - canH;
  if (diffH > 50 && diffV > 50) possiblePositions.push("topLeft");

  // check topRight
  canV = canvasPosition.top + ballPosition.height;
  canH = canvasPosition.left + canvasPosition.width;
  diffV = bv - canV;
  diffH = canH - bh;
  if (diffH > 50 && diffV > 50) possiblePositions.push("topRight");

  // check bottomRight
  canV = canvasPosition.top + canvasPosition.height;
  canH = canvasPosition.left + canvasPosition.width;
  diffV = canV - bv;
  diffH = canH - bh;
  if (diffH > 50 && diffV > 50) possiblePositions.push("bottomRight");

  // check bottomLeft
  canV = canvasPosition.top + canvasPosition.height;
  canH = canvasPosition.left + ballPosition.width;
  diffV = canV - bv;
  diffH = bh - canH;
  if (diffH > 50 && diffV > 50) possiblePositions.push("bottomRight");

  let selected =
    possiblePositions[Math.floor(Math.random() * possiblePositions.length)];
  if (position === "topRight") {
    selected = "bottomLeft";
  }
  return selected;
}

function validateCanvaxX(
  totalBallPositionV,
  canvasTotalPositionV,
  totalBallPositionH,
  canvasTotalPositionH,
  position
) {
  let diffBallCanvaxHeight = canvasTotalPositionV - totalBallPositionV;
  let diffBallCanvaxWidth = totalBallPositionH - canvasTotalPositionH;
  if (position === "bottomRight" || position === "topRight") {
    diffBallCanvaxWidth = canvasTotalPositionH - totalBallPositionH;
  }
  if (position === "topRight" || position === "topLeft") {
    diffBallCanvaxHeight = totalBallPositionV - canvasTotalPositionV;
  }
  return {
    h: diffBallCanvaxWidth,
    v: diffBallCanvaxHeight
  };
}

function getAllBalls() {
  const balls = document.getElementsByClassName("ball");

  for (let i = 0; i < balls.length; i++) {
    randomizeBallRotation(balls[i]);
  }
}

function randomizeBallRotation(ball) {
  const randVal = Math.floor(Math.random() * (2 - 0 + 1) + 0);

  if (randVal === 0) {
    ball.getElementsByClassName("value")[0].style.animationName = "move-ball";
    ball.getElementsByClassName("value1")[0].style.animationName =
      "move-ball-v1";
  } else if (randVal === 1) {
    ball.getElementsByClassName("value")[0].style.animationName = "move-ball-x";
    ball.getElementsByClassName("value1")[0].style.animationName =
      "move-ball-x-v1";
  } else {
    ball.getElementsByClassName("value")[0].style.animationName = "move-ball-y";
    ball.getElementsByClassName("value1")[0].style.animationName =
      "move-ball-y-v1";
  }
}
