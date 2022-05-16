const instructionText = document.querySelector(".instructions");
instructionText.style.visibility = "hidden";
const playAgainButton = document.querySelector("#play-again");
playAgainButton.disabled = true;
const switchButton = document.querySelector("#switch");
switchButton.style.visibility = "hidden";
const stayButton = document.querySelector("#stay");
stayButton.style.visibility = "hidden";
const totalSwitches = document.querySelector("#switches");
let totalSwitchesCounter = 0;
const switchesWinRate = document.querySelector("#switches-win-rate");
let switchesWinCounter = 0;
const totalStays = document.querySelector("#stays");
let totalStaysCounter = 0;
const staysWinRate = document.querySelector("#stays-win-rate");
let staysWinCounter = 0;
const doors = document.querySelectorAll("[door]");
const icons = document.querySelectorAll("[icon]");
let totalGames = 0;
let correctDoorNumber = -1;
let currentlySelected = -1;
let alreadyOpened = -1;

playAgain();

function generateRandomNUmberUpTo3() {
  return Math.floor(Math.random() * 3);
}

// Called when Play Again Button is pressed.
function playAgain() {
  correctDoorNumber = generateRandomNUmberUpTo3();
  doors.forEach((door) => {
    door.classList.remove(...door.classList);
    door.classList.add("closed");
  });
  instructionText.innerText = "Choose a door";
  instructionText.style.visibility = "visible";
  setIcons(correctDoorNumber);
}

// Setting icons into doors
function setIcons(correctAnswerIndex) {
  icons.forEach(function (icon, i) {
    if (i === correctAnswerIndex) {
      icon.classList.remove(...icon.classList);
      icon.classList.add("fa");
      icon.classList.add("fa-check");
    } else {
      icon.classList.remove(...icon.classList);
      icon.classList.add("fa");
      icon.classList.add("fa-times");
    }
  });
}

doors.forEach(function (door, i) {
  door.addEventListener("click", () => {
    doorChosen(i, correctDoorNumber);
  });
});

function doorChosen(index, correctAnswerIndex) {
  currentlySelected = index;
  let randomDoorShown = false;
  let doorToBeOpenedIndex;
  while (!randomDoorShown) {
    doorToBeOpenedIndex = generateRandomNUmberUpTo3();
    if (
      doorToBeOpenedIndex != correctAnswerIndex &&
      doorToBeOpenedIndex != index
    ) {
      doors.forEach(function (door, i) {
        if (i === doorToBeOpenedIndex && !randomDoorShown) {
          door.classList.remove("closed");
          door.classList.add("opened");
          alreadyOpened = doorToBeOpenedIndex;
          randomDoorShown = true;
        }
      });
    }
  }
  doors.forEach(function (door, i) {
    if (i === index) {
      door.classList.add("selected");
    }
  });
  switchingTime();
}

function switchingTime() {
  instructionText.innerText = "Would you like to switch?";
  switchButton.style.visibility = "visible";
  stayButton.style.visibility = "visible";
}

// Called when decided to switch
function switchDoor() {
  instructionText.style.visibility = "hidden";
  switchButton.style.visibility = "hidden";
  stayButton.style.visibility = "hidden";
  doors.forEach(function (door, i) {
    if (i === currentlySelected) {
      door.classList.remove("selected");
    }
  });
  doors.forEach(function (door, i) {
    if (i !== currentlySelected && i !== alreadyOpened) {
      door.classList.remove("closed");
      door.classList.add("opened");
      if (i === correctDoorNumber) {
        instructionText.innerText = "You won!";
        instructionText.style.visibility = "visible";
        switchesWinCounter++;
      } else {
        instructionText.innerText = "You lost!";
        instructionText.style.visibility = "visible";
      }
    }
  });
  totalSwitchesCounter++;
  totalGames++;
  updateData();
}

// Called when decided to stay
function stayOnSameDoor() {
  instructionText.style.visibility = "hidden";
  switchButton.style.visibility = "hidden";
  stayButton.style.visibility = "hidden";
  doors.forEach(function (door, i) {
    if (i === currentlySelected) {
      door.classList.remove("selected");
      door.classList.remove("closed");
      door.classList.add("opened");
      if (i === correctDoorNumber) {
        instructionText.innerText = "You won!";
        instructionText.style.visibility = "visible";
        staysWinCounter++;
      } else {
        instructionText.innerText = "You lost!";
        instructionText.style.visibility = "visible";
      }
    }
  });
  totalStaysCounter++;
  totalGames++;
  updateData();
}

function updateData() {
  totalSwitches.innerText = (totalSwitchesCounter / totalGames) * 100 + "%";
  if (totalSwitchesCounter === 0) {
    switchesWinRate.innerText = "0%";
  } else {
    switchesWinRate.innerText =
      (switchesWinCounter / totalSwitchesCounter) * 100 + "%";
  }
  totalStays.innerText = (totalStaysCounter / totalGames) * 100 + "%";
  if (totalStaysCounter === 0) {
    staysWinRate.innerText = "0%";
  } else {
    staysWinRate.innerText = (staysWinCounter / totalStaysCounter) * 100 + "%";
  }
  instructionText.style.visibility = "hidden";
  setTimeout(function () {
    playAgain();
  }, 1000);
}
