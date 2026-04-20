var allelem = document.querySelectorAll(".elem");

var fullelem = document.querySelectorAll(".fullelem");

var btn = document.querySelectorAll(".fullelem .icon");

function current() {
  allelem.forEach((elem) => {
    elem.addEventListener("click", () => {
      // console.log(elem.id);
      fullelem[elem.id].style.display = "block";
      sessionStorage.setItem("currentPage", elem.id); // ✅ yaha add karo
    });
  });

  btn.forEach((back) => {
    back.addEventListener("click", () => {
      fullelem[back.id].style.display = "none";
       // ✅ jab front pe aaye to storage clear
      sessionStorage.removeItem("currentPage");
    });
  });
}
current();

// ✅ YEH NAYA CODE ADD KARO
window.addEventListener("load", () => {
  let savedPage = sessionStorage.getItem("currentPage");

  if (savedPage !== null) {
    fullelem[savedPage].style.display = "block";
  }
});

function todolist() {
  let currenttask = [];

  if (localStorage.getItem("currenttask")) {
    currenttask = JSON.parse(localStorage.getItem("currenttask"));
  } else {
    console.log("bye");
  }

  var form = document.querySelector(".text-left form");

  var input = document.querySelector(" input ");

  var textarea = document.querySelector("textarea");

  var checkbox = document.querySelector(".mark-imp #check");

  var textcenter = document.querySelector(".text-center");

  function rendertask() {
    let sum = "";
    currenttask.forEach((elem, idx) => {
      sum += `   <div class="text-right">
                <h4>${elem.task} <span class="${elem.imp}">imp</h4>
                <button class="complete" id="${idx}">mark as completed</button>
            </div>
               
           `;
    });

    textcenter.innerHTML = sum;
    localStorage.setItem("currenttask", JSON.stringify(currenttask));

    var addbtn = document.querySelectorAll(".text-right button");
    addbtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        currenttask.splice(btn.id, 1);

        rendertask();
      });
    });
  }
  rendertask();

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    currenttask.push({
      task: input.value,
      disc: textarea.value,
      imp: checkbox.checked,
    });

    rendertask();

    checkbox.checked = false;
    input.value = "";
    textarea.value = "";
  });
}
todolist();

function dailyplanner() {
  var dayplan = JSON.parse(localStorage.getItem("dayplan")) || {};
  var hours = Array.from(
    { length: 18 },
    (_, idx) => `${6 + idx}:00 - ${7 + idx}:00`
  );

  var wholeday = "";
  hours.forEach((elem, idx) => {
    var save = dayplan[idx] || "";
    wholeday += `<div class="dpp">
            <p>${elem}</p>
            <input id= ${idx}  type="text" placeholder="..." value="${save}">          
        </div>`;
  });

  var dailyplanner = document.querySelector(".daily-planner");

  dailyplanner.innerHTML = wholeday;

  var inputdata = document.querySelectorAll(".dpp input");

  inputdata.forEach((elem) => {
    elem.addEventListener("input", () => {
      dayplan[elem.id] = elem.value;
      localStorage.setItem("dayplan", JSON.stringify(dayplan));
    });
  });
}
dailyplanner();

function motivationalquotes() {
  let motivationquote = document.querySelector(".quote p");
  let motivationauthor = document.querySelector(".quote-writer p");

  const quote = document.querySelector(".quote p");
  const character = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  let text = "";
  let iteration = 0;

  async function fetchquote() {
    let response = await fetch("https://dummyjson.com/quotes/random");
    let data = await response.json();

    motivationquote.innerHTML = data.quote;
    motivationauthor.innerHTML = data.author;

    text = data.quote; // 🔥 important fix
  }
  fetchquote();

  quote.addEventListener(
    "mouseenter",
    function () {
      function inner() {
        const out = text
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return char;
            }
            return character[Math.floor(Math.random() * 52)];
          })
          .join("");

        quote.innerText = out;
        iteration += 0.25;

        if (iteration >= text.length) {
          clearInterval(interval);
          quote.innerText = text;
        }
      }

      const interval = setInterval(inner, 2);
    },
    { once: true }
  );
}
motivationalquotes();



function pomodoro() {
  
let timer = 25*60

let pomoTimer = document.querySelector(".pomo-timer h1");
let startBtn = document.querySelector("#pomo-start");
let pauseBtn = document.querySelector("#pomo-pause");
let resetBtn = document.querySelector("#pomo-reset");
let sessionText = document.querySelector(".session");

let isworking = true;

function updateTimer() {
  let minutes = Math.floor(timer/60);
  let seconds = Math.floor(timer%60);
  let displaytime = `${minutes.toString().padStart('2','0')}:${seconds.toString().padStart('2','0')}`
  pomoTimer.innerHTML = displaytime;
}

updateTimer()

let interval= null;
function startTimer() {
clearInterval(interval);
     
 if(isworking){
   
interval= setInterval(() => {
   
   

  if( timer > 0){
   timer--;
  
  updateTimer();
  
  }
  else{
    clearInterval(interval);
    isworking = false;
    pomoTimer.innerHTML = "05:00";
     sessionText.innerHTML = "Take a break";
    sessionText.style.backgroundColor = "lightblue";
    timer = 5*60;
   
    
    
    
  }
  
}, 1000);

}
else{
   
interval= setInterval(() => {
   

  if( timer > 0){
   timer--;
  
  updateTimer();
  
  }
  else{
    clearInterval(interval);
    isworking = true;
    pomoTimer.innerHTML = "25:00";
     sessionText.innerHTML = "work-session";
    sessionText.style.backgroundColor = "green";
    
    timer = 25*60;
   
   
  }
  
}, 1000);


}
 }



function pauseTimer() {
  clearInterval(interval);
}

function resetTimer() {
  clearInterval(interval);
  if(!isworking){
    timer = 5*60;
    pomoTimer.innerHTML = "05:00";
  }
  else{
    timer = 25*60;
    pomoTimer.innerHTML = "25:00";
  }
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);



}
 pomodoro();




function weathercheck(){
  
let headertime = document.querySelector(".header1 h1 ");
let headerdate = document.querySelector(".header1 h2 ");
let c = document.querySelector(".header2 h3");
let feels = document.querySelector(".header2 h4.f");
let humidity = document.querySelector(".header2 h4:nth-child(3)");
let wind = document.querySelector(".header2 h4:nth-child(4)");
let uv = document.querySelector(".header2 h4:nth-child(5)");
let visibility = document.querySelector(".header2 h4:nth-child(6)");
var cityname = document.querySelector(".header1 h3");

var apiKey = '042a95a7de6f4dc8b79164514261904';

let city = "kareli";
 async function showcase(){
  let data = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
  let newdata = await data.json()
     cityname.innerHTML = `${newdata.location.name} (MP)`
     c.innerHTML = `${newdata.current.temp_c}°C`
     feels.innerHTML = ` ${newdata.current.condition.text}`
     humidity.innerHTML = `Humidity: ${newdata.current.humidity}%`
     wind.innerHTML = `Wind: ${newdata.current.wind_kph} km/h`
     uv.innerHTML = `UV index: ${newdata.current.uv}`
    visibility.innerHTML = `Visibility: ${newdata.current.vis_km} km`
     
  
}
showcase()

function newdatetime(){
    var weakdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var day = weakdays[date.getDay()];
    var month = months[date.getMonth()];
    var year = date.getFullYear();
    
    

  if (hours>12){
     headertime.innerHTML = `${hours.toString().padStart('2', '0')}:${minutes.toString().padStart('2', '0')}:${seconds.toString().padStart('2', '0')} PM`   
  }
  else{
     headertime.innerHTML = `${hours.toString().padStart('2', '0')}:${minutes.toString().padStart('2', '0')}:${seconds.toString().padStart('2', '0')} AM`
  }
  headerdate.innerHTML = `${day}-${month}-${year}`

}
newdatetime()

function fc(){
  setInterval(newdatetime,1000)
}
fc()
}
weathercheck()



var change = document.documentElement
var btn1 = document.querySelector(".ch");

btn1.addEventListener("click",()=>{
change.style.setProperty("--pri","#"+Math.floor(Math.random()*16777215).toString(16));
change.style.setProperty("--tri5","#"+Math.floor(Math.random()*16777215).toString(16));
})