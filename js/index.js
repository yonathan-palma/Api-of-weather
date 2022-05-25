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
    let url = `${baseUrl}${inputVal}&cnt=9&appid=${apiKey}&units=metric&lang=sp`;

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
    const { main, name, sys, weather, id } = data;
    const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;
    let template = `
        <div class="card-body d-grid">
            <div class="d-flex justify-content-between">
                <div>
                    <h5 class="card-title">${name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${sys.country}</h6>
                </div>
                <img src="${icon}" alt="">
            </div>
            <div class="lh-1" style="text-align: center;">
                <p class="card-text fs-2">${Math.round(main.temp)}°C</p>
                <span class="fs-5 fw-lighter">${weather[0].description}</span>
            </div>
            <div class="d-flex justify-content-around">
                <div class="item">42</div>
                <div class="item">45</div>
                <div class="item">45</div>
            </div>
        </div>
    `;
    let card = document.createElement("div");
    card.classList.add("card");
    card.style.width = "18rem";
    card.innerHTML = template
    cardContainer.append(card);
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

    