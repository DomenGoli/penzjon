"use strict"


// Elements
const allDays = document.querySelector("#absolute");
const delovniki = document.querySelector("#delovniki");
const datum = document.querySelector(".datum_text");
const datumBtn = document.querySelector(".datum_text");
const modal = document.querySelector(".datum_input");
const btn = document.querySelector(".btn_input");
const dayInput = document.querySelector(".day_input");
const monthInput = document.querySelector(".month_input");
const yearInput = document.querySelector(".year_input");
const overlay = document.querySelector(".overlay");


// Functions
const daysPassed = (date1, date2) => {
    if (date1 > date2) {
        return 0;
    } else return Math.floor(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)+1));
}

const getBussinessDays = function(targetDate) {
    let count = 1; // +1 zaradi cloveskega stetja dni
    const curDate = new Date(danes.getTime());
    
    if (curDate > targetDate) return 0;

    while (curDate <= targetDate) {
        const dayOfWeak = curDate.getDay();
        const string = `${curDate.getDate()}-${curDate.getMonth()+1}`;
        const stringYear = `${curDate.getDate()}-${curDate.getMonth()+1}-${curDate.getFullYear()}`;

        if (dayOfWeak !== 0 && dayOfWeak !==6 && !prazniki.includes(string)) count++;
        if (easter.includes(stringYear)) count --;
        
        curDate.setDate(curDate.getDate() + 1); // samo spremeni Date v zapisu casa 
    }
    return count;
}

const parseDate = function(string) {
    const [day, month, year] = string.split(".");
    return new Date(Number(year), Number(month-1), Number(day));
}

const removeInput = function () {
    modal.classList.add("hidden")
    overlay.classList.add("hidden")
}


// Datumi
const danes = new Date();

let targetDate;
if (!localStorage.setDatum) {
    localStorage.setItem("setDatum", "1.1.1970");
}
targetDate = parseDate(localStorage.getItem("setDatum"));


// Exceptions
const prazniki = [
    "1-1",
    "2-1",
    "8-2",
    "27-4",
    "1-5",
    "2-5",
    "25-6",
    "15-8",
    "31-10",
    "1-11",
    "25-12",
    "26-12"
]

const easter = [
    "20-4-2025",
    "5-4-2026",
    "28-3-2027",
    "16-4-2028",
    "1-4-2029",
    "21-4-2030",
    "13-4-2031",
    "28-3-2032",
    "17-4-2033",
    "9-4-2034"
]


// Display elements
const displayResult = function(targetDate) {
    // Vsi dnevi
    allDays.textContent = daysPassed(danes, targetDate);

    // Samo delovniki
    delovniki.textContent = getBussinessDays(targetDate);

    // Datum
    datum.textContent = `${targetDate.getDate()}.${targetDate.getMonth()+1}.${targetDate.getFullYear()}`
}
displayResult(targetDate)


// Event handlers
datumBtn.addEventListener("click", function() {
    modal.classList.remove("hidden")
    overlay.classList.remove("hidden")
    dayInput.focus()

    overlay.addEventListener("click", function() {
        dayInput.value = monthInput.value = yearInput.value = ""
        removeInput()
    })
})

btn.addEventListener("click", function(event) {
    event.preventDefault();
    const day = dayInput.value;
    const month = monthInput.value;
    const year = yearInput.value;

    if (day.length !== 0 && month.length !== 0 && year.length !== 0) {
        const input = `${day}.${month}.${year}`
        const output = parseDate(input)
        localStorage.setItem("setDatum", input)
        displayResult(output)   
    }
    dayInput.value = monthInput.value = yearInput.value = ""
    removeInput()
})

