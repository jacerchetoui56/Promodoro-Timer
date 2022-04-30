//first I created one button that starts,stops and start break and I controlled
//all that with booleans.First, it worked well but when I wanted to add more features
//it was pretty complex. So I decided to just create a button for every action and keep
//it simple. 
//!==> Advice : clever code is a bad code 

const startBtn = document.querySelector(".start");
const stopBtn = document.querySelector(".stop");
const startBreakBtn = document.querySelector(".break");
const resetBtn = document.querySelector(".reset");
const skipBtn = document.querySelector(".skip");
const time = document.querySelector(".time h1");
const motivation = document.querySelector(".time h3");
const buttons = document.querySelector(".buttons");
const body = document.querySelector("body");
const ringtone = document.querySelector("audio");


let seconds = 1500; //25 munites
let count = false; //to check if the timer is counting or not , initially No
let breakTime = false; // to check if we are in the break time or not,initially No
let doneSessions = 0 // after 4 sessions we will have a longer break with of 15 minutes

startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stop);
startBreakBtn.addEventListener("click", startBreak);
resetBtn.addEventListener("click", reset);
skipBtn.addEventListener("click", skip);

function timer() {
  if (seconds > 0) seconds--;
  else if (seconds == 0 && !breakTime) takeBreak(); //if the timer is 0 and we are not in the break time, then take a break
  else reset(); //if the timer is 0 and we are in the break time, then we'll start another session
  let minutes = Math.floor(seconds / 60);
  let secs = seconds % 60;

  if (minutes < 10) minutes = "0" + minutes;
  if (secs < 10) secs = "0" + secs;
  time.textContent = `${minutes}:${secs}`;
}

function start() {
  count = setInterval(timer, 1000);
  buttons.classList.add("stop");
  buttons.classList.remove("start");
  buttons.classList.remove("break");
  resetBtn.classList.remove("reset-entry");
  skipBtn.style.display = "block";
}

function stop() {
  clearInterval(count);
  count = false;
  buttons.classList.remove("stop");
  buttons.classList.add("start");
  buttons.classList.remove("break");
  resetBtn.classList.add("reset-entry");
  skipBtn.style.display = "none";
}

function takeBreak() {
  ringtone.volume = 0.65;
  ringtone.play();
  breakTime = true; //this is the boolean that checks if we are in the break time or not
  clearInterval(count);
  count = false;
  if(doneSessions < 3){
    seconds = 300;
    time.textContent = "05:00";
    doneSessions++
  }
  else {
    seconds = 900;
    time.textContent = "15:00";
    doneSessions = 0
  }
  buttons.classList.remove("stop");
  buttons.classList.remove("start");
  buttons.classList.add("break");
  motivation.textContent = "Take a break!";
  body.classList.add("break");
  skipBtn.setAttribute("title", "Skip Break");
}

function startBreak() {
  count = setInterval(timer, 1000);
  buttons.classList.add("stop");
  buttons.classList.remove("start");
  buttons.classList.remove("break");
}

function reset() {
  stop();
  seconds = 1500;
  time.textContent = "25:00";
  breakTime = false;
  motivation.textContent = "Focus!";
  buttons.classList.remove("stop");
  buttons.classList.add("start");
  resetBtn.classList.remove("reset-entry");
  buttons.classList.remove("break");
  body.classList.remove("break");
}

function skip() {
  if (!breakTime) {
    takeBreak();
  } else {
    reset();
  }
}
