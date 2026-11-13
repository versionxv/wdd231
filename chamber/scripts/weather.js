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

const apiUrl = `//api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

async function loadWeather() {
  try {
    const response = await fetch(apiUrl);
    if (response.ok)
    {
        const data = await response.json();
        console.log("Full 5-day JSON:", data);

        const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00"));

        document.getElementById("city").textContent = data.city.name;

        dailyForecasts.forEach(day => {
            const date = day.dt_txt.split(" ");
            const temp = day.main.temp;
            const description = day.weather.description;
            console.log(`${date}: ${temp}°C - ${description}`);
        });
    } else {
        throw new Error(`Error ${data.cod}: ${data.message}`);
    }

  } catch (error) {
    document.getElementById("city").textContent = "Error";
    document.getElementById("desc").textContent = error.message;
  }
};

loadWeather();