const today = new Date();

const currentYear = today.getFullYear();

document.getElementById('currentyear').textContent = currentYear

document.getElementById('lastmodified').textContent = document.lastModified;

const hambutton = document.querySelector('#menu');

const navigation = document.querySelector('.navigation');

hambutton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hambutton.classList.toggle('open');
});

const apiKey = "7a240712510374a5ac818b57fb11c680";
const lat = 51.5074;
const lon = -0.1278;
const apiUrl = `//api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

async function loadData() {
  try {
    const response = await fetch(apiUrl);
    if (response.ok)
    {
        const data = await response.json();
        console.log(data);
        createWeather(data);
    } else {
        throw new Error(`Error ${data.cod}: ${data.message}`);
    }

  } catch (error) {
    document.getElementById("city").textContent = "Error";
    document.getElementById("desc").textContent = error.message;
  }
};

loadData();

function createWeather(data) {

    document.getElementById("city").textContent = data.name;
    document.getElementById("temp").textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById("desc").textContent = data.weather[0].description;

    const iconCode = data.weather[0].icon;
    const iconImg = document.getElementById("weather-icon");
    const iconSRC = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

    iconImg.setAttribute('SRC', iconSRC);
};

createWeather();