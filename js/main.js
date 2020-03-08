////////////////////////////////////////////////////////////
// MAIN
////////////////////////////////////////////////////////////
var stageW = 1280;
var stageH = 768;
var contentW = 1024;
var contentH = 576;

/*!
 *
 * START BUILD GAME - This is the function that runs build game
 *
 */
function initMain() {
  if (!$.browser.mobile || !isTablet) {
    $("#canvasHolder").show();
  }

  initGameCanvas(stageW, stageH);
  buildGameCanvas();
  buildGameButton();
  initPhysics();

  readyGame();
  goPage("game");

  resizeCanvas();
}

var windowW = (windowH = 0);
var scalePercent = 0;
var offset = { x: 0, y: 0, left: 0, top: 0 };

/*!
 *
 * GAME RESIZE - This is the function that runs to resize and centralize the game
 *
 */
function resizeGameFunc() {}
