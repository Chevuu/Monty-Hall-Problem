const instructionText = document.querySelector(".instructions");
const playAgainButton = document.querySelector("#play-again");
const switchButton = document.querySelector("#switch");
const stayButton = document.querySelector("#stay");
const totalSwitches = document.querySelector("#switches");
const switchesWinRate = document.querySelector("#switches-win-rate");
const totalStays = document.querySelector("#stays");
const staysWinRate = document.querySelector("#stays-win-rate");
const totalGamesPlayed = document.querySelector("#total-games");
const doors = document.querySelectorAll("[door]");
const icons = document.querySelectorAll("[icon]");

instructionText.style.visibility = "hidden";
playAgainButton.disabled = true;
switchButton.style.visibility = "hidden";
stayButton.style.visibility = "hidden";

let switchesWinCounter = 0;
let totalSwitchesCounter = 0;
let staysWinCounter = 0;
let totalStaysCounter = 0;
let totalGames = 0;
let correctDoorNumber = -1;
let currentlySelected = -1;
let alreadyOpened = -1;
let oneDoorAlreadyOpen = false;

// Called to start the first game since Play Again button isn't in use at the moment
playAgain();

// Generates the index of the correct door
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
  oneDoorAlreadyOpen = false;
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
  if (!oneDoorAlreadyOpen) {
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
    oneDoorAlreadyOpen = true;
  }
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
  totalGamesPlayed.innerText = totalGames;
  setTimeout(function () {
    playAgain();
  }, 1000);
}
