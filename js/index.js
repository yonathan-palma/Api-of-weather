"use strict";

const baseUrl = "http://api.openweathermap.org/data/2.5/forecast?id=3646738&appid=";
const apiUrl = "d7bff8bde3d5bd43bdb1e4d1b365f730";
// window.fetch(apiUrl)
//     .then(data)
// console.log(baseUrl + apiUrl);
const form = document.getElementById("form_city");
form.addEventListener("submit", (e)=>{
    e.preventDefault();
    let input = document.getElementById("city").value;
    console.log(input);
})

// https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric
let url = "https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=" + apiUrl;
fetch(url) 
    .then(response => response.json()) 
    .then(data => { const { main, name, sys, weather } = data; console.log(data) }) 
    .catch(() => { msg.textContent = "Please search for a valid city 😩"; });

    // const { main, name, sys, weather } = data;