const today = new Date();

const currentYear = today.getFullYear();

document.getElementById('currentyear').textContent = currentYear

document.getElementById('lastmodified').textContent = document.lastModified;

const hambutton = document.querySelector('#menu');

const navigation = document.querySelector('.navigation');

hambutton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hambutton.classList.toggle('open');
})

async function createDisplay(jsonPath = "./data/members.json") {
    
    const container = document.querySelector(".container");
    container.innerHTML = "";

    try {
        const response = await fetch(jsonPath);
        if (!response.ok) throw new Error(`No se pudo cargar el archivo: ${response.status}`);
        
        const shopList = await response.json();

        shopList.forEach(shop => {
            let card = document.createElement("section");

            let headPart = document.createElement("div");
            let title = document.createElement("h3");
            let tag = document.createElement("p");

            let bodyPart = document.createElement("div");
            let logo = document.createElement("img");

            let armPart = document.createElement("div");
            let email = document.createElement("p");
            let phone = document.createElement("p");
            let site = document.createElement("a");

            title.textContent = shop.shopTitle;
            tag.textContent = shop.shopTag || "";

            logo.src = shop.shopLogo;
            logo.alt = `${shop.shopTitle} logo`;

            email.innerHTML = shop.shopEmail ? `<strong>EMAIL:</strong> ${shop.shopEmail}` : "";
            phone.innerHTML = shop.shopPhone ? `<strong>PHONE:</strong> ${shop.shopPhone}` : "";

            site.href = shop.shopUrl || "#";
            site.innerHTML = shop.shopUrl ? `<strong>URL:</strong> ${shop.shopUrl}` : "";

            headPart.classList.add("card-head");
            armPart.classList.add("card-arm");
            bodyPart.classList.add("card-body");

            headPart.appendChild(title);
            headPart.appendChild(tag);

            armPart.appendChild(logo);

            bodyPart.appendChild(email);
            bodyPart.appendChild(phone);
            bodyPart.appendChild(site);

            card.appendChild(headPart);
            card.appendChild(armPart);
            card.appendChild(bodyPart);

            container.appendChild(card);
        });

    } catch (error) {
        console.error("Error while reading:", error);
        container.innerHTML = `<p class="error">Error while loading the member list.</p>`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    createDisplay(); 
});

const gridButton = document.getElementById('grid');
gridButton.classList.add('active');

const listButton = document.getElementById('list');

const container = document.querySelector('.container');

listButton.addEventListener('click', () => {
    container.classList.add('list-view');

    listButton.classList.add('active');
    gridButton.classList.remove('active');
});

gridButton.addEventListener('click', () => {
    container.classList.remove('list-view');

    gridButton.classList.add('active');
    listButton.classList.remove('active');
});

const apiKey = "7a240712510374a5ac818b57fb11c680";
const lat = 51.5074;
const lon = -0.1278;
const apiUrl = `https://openweathermap.org{lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function loadWeather() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Location not found or API key inactive");
    
    const data = await response.json();

    document.getElementById("city").textContent = data.name;
    document.getElementById("temp").textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById("desc").textContent = data.weather.description;

    const iconCode = data.weather.icon;
    const iconImg = document.getElementById("weather-icon");
    iconImg.src = `https://openweathermap.org{iconCode}@2x.png`;
    iconImg.style.display = "inline";

  } catch (error) {
    document.getElementById("city").textContent = "Error";
    document.getElementById("desc").textContent = error.message;
  }
}

loadWeather();