"use strict";
// api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
// reemplazar "forecast" por "weather"
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiKey= "d7bff8bde3d5bd43bdb1e4d1b365f730";
const form = document.getElementById("form_city");
const cardContainer = document.getElementById("cards_container");
const input = document.getElementById("city");
let cities = [];
form.addEventListener("submit", searchCity);

function searchCity(e){

    e.preventDefault();
    
    let inputTooltip = document.querySelector(".invalid-tooltip")
    let inputVal = input.value;
    let url = `${baseUrl}${inputVal}&appid=${apiKey}&units=metric&lang=sp`;

    let toInput = inputVal.toLowerCase();
    let valid = citiesValidate(cities, toInput);

    if(valid){ return false; } 

    cities.push(toInput);

    fetch(url)
        .then(response => response.json()) 
        .then(data => { card_template(data)}) 
        .catch(() => {
            input.classList.add("is-invalid");
            inputTooltip.textContent = "Please search for a valid city 😩"; 
        });
}


const card_template = (data)=>{
    const { main, name, sys, weather, wind, id } = data;
    const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;
    let template = `
        <div class="card-body d-grid">
            <div class="d-flex justify-content-between">
                <div>
                    <h5 class="card-title">${name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${sys.country}</h6>
                </div>
                <img class="img_icon" src="${icon}" alt="">
            </div>
            <div class="lh-1" style="text-align: center;">
                <p class="card-text mb-0 fs-1">${Math.round(main.temp)}°C</p>
                <span class="text-secondary">${weather[0].description}</span>
            </div>
            <div class="d-flex justify-content-around align-items-center card_footer">
                <div class="small">Humedad:<br>${main.humidity}%</div>
                <div class="small data_medio">V/ del viento:<br>${wind.speed}<sup> m/s</sup></div>
                <div class="small">Presion:<br>${main.pressure}<sup> mbar</sup></div>
            </div>
        </div>
    `;
    let card = document.createElement("div");
    card.classList.add("card");
    card.style.width = "18rem";
    card.innerHTML = template
    cardContainer.prepend(card);
    form.reset();
    input.classList.remove("is-invalid"); 
    console.log(data);
}

const citiesValidate = (cities, inputval)=>{
    let valid = cities.some((element)=> element == inputval);
    let inputTooltip = document.querySelector(".invalid-tooltip");

    if(inputval == ""){
        input.classList.add("is-invalid");
        inputTooltip.textContent = "Ingrese una ubicación";
        return true
    }else if (valid) {
        input.classList.add("is-invalid"); 
        inputTooltip.textContent = "Ubicación ya consultada";
        return true
    }
}

// paises https://api.openweathermap.org/data/2.5/weather?q={city name},{country code}&appid={API key}

// var date = new Date(unix_timestamp * 1000);
// // Hours part from the timestamp
// var hours = date.getHours();
// // Minutes part from the timestamp
// var minutes = "0" + date.getMinutes();
// // Seconds part from the timestamp
// var seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format