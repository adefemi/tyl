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
    document.getElementById(`input${i + 1}`).value = "";
  }
}

function updateUserSelection() {
  clearInputs();
  for (let i = 0; i < useChoice.length; i++) {
    document.getElementById(`input${i + 1}`).value = useChoice[i];
  }
}
