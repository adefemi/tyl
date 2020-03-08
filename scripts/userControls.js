function userkey(val) {
  if (gameStart) {
    alert("Game already started");
    return;
  }
  if (val === "b" || val === "c") {
    if (val === "b") {
      useChoice = useChoice.filter((_, id) => id !== useChoice.length - 1);
      updateUserSelection();
    } else {
      useChoice = [];
      updateUserSelection();
    }
  } else {
    if (useChoice.length >= 3) {
      alert("max choice is 3");
    } else {
      useChoice.push(val);
      updateUserSelection();
    }
  }
}

function clearInputs() {
  for (let i = 0; i < 3; i++) {
    let inputCon = document.getElementById(`input${i + 1}`);
    let inputConTwin = document.getElementById(`input1${i + 1}`);
    inputCon.style.display = "none";
    inputConTwin.style.display = "none";
    if (inputCon.classList.contains("show-input")) {
      inputCon.classList.remove("show-input");
      inputConTwin.classList.remove("show-input");
    }
    inputCon.value = "";
    inputConTwin.value = "";
  }
}

function showButton(element) {
  setTimeout(() => {
    element.classList.add("show-input");
  }, 200);
}

function updateUserSelection() {
  clearInputs();
  for (let i = 0; i < useChoice.length; i++) {
    let inputCon = document.getElementById(`input${i + 1}`);
    let inputConTwin = document.getElementById(`input1${i + 1}`);
    inputCon.style.display = "block";
    inputCon.value = useChoice[i];
    inputConTwin.style.display = "block";
    inputConTwin.value = useChoice[i];
    showButton(inputCon);
    showButton(inputConTwin);
  }
  if (useChoice.length < 1) {
    playButton.innerText = "Feeling lucky";
    playButtonTwin.innerText = "Feeling lucky";
  } else {
    playButton.innerText = "Play";
    playButtonTwin.innerText = "Play";
  }
}
