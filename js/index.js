"use strict";

const baseUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiKey= "d7bff8bde3d5bd43bdb1e4d1b365f730";
const form = document.getElementById("form_city");
const cardContainer = document.getElementById("cards_container");
let cities = [];
form.addEventListener("submit", searchCity);

function searchCity(e){

    e.preventDefault();
    
    let input = document.getElementById("city").value;
    let url = `${baseUrl}${input}&appid=${apiKey}&units=metric`;

    let valid = citiesValidate(cities, input);
    if (valid) {
        document.getElementById("city").style.border = "solid 2px red"; 
        return false
    }
    cities.push(input);

    fetch(url)
        .then(response => response.json()) 
        .then(data => { card_template(data)}) 
        .catch(() => { cardContainer.textContent = "Please search for a valid city 😩"; });
}


const card_template = (data)=>{
    const { main, name, sys, weather, id } = data;
    const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;
    let template = `
        <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${sys.country}</h6>
            <p class="card-text">${Math.round(main.temp)}</p>
            <img src="${icon}" alt="">
        </div>
    `;
    let card = document.createElement("div");
    card.classList.add("card");
    card.style.width = "18rem";
    card.innerHTML = template
    cardContainer.append(card);
    form.reset();
    console.log(data);
}

const citiesValidate = (cities, input)=>{
    let valid = cities.some((element)=> element == input);
    return valid;
}

// https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric

    