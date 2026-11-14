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

        const container = document.querySelector(".weather");

        let town = document.createElement("h2");
        town.innerHTML = `${data.city.name} Forecast`;
        
        container.appendChild(town);

        dailyForecasts.forEach(day => {
            const datePart = day.dt_txt.split(" ")[0];
            const [year, month, dayNum] = datePart.split("-");
            const shortDate = `${month}/${dayNum}`;
            const temp = Math.round(day.main.temp);
            const description = day.weather[0].description;
            const imgLink = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`

            let newDay = document.createElement("div");

            let left = document.createElement("section");
            let right = document.createElement("section");

            let dayDate = document.createElement("p");
            dayDate.innerHTML = shortDate;

            let dayTemp = document.createElement("p");
            dayTemp.innerHTML = `${temp}°C`

            let dayDesc = document.createElement("p");
            dayDesc.innerHTML = description;

            let dayImg = document.createElement("img");
            dayImg.setAttribute("SRC", imgLink);
            dayImg.setAttribute("alt", day.weather[0].description);

            console.log(`${shortDate}: ${temp}°C - ${description}`);

            left.appendChild(dayDate);
            left.appendChild(dayImg);
            right.appendChild(dayTemp);
            right.appendChild(dayDesc);

            newDay.appendChild(left);
            newDay.appendChild(right);

            container.appendChild(newDay);
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

async function randomMember(jsonPath = "./data/members.json") {

    const box = document.querySelector(".container");
    box.innerHTML = "";

    try {
        const response = await fetch(jsonPath);
        if (!response.ok) throw new Error(`No se pudo cargar el archivo: ${response.status}`);
        
        const shopList = await response.json();

        const eligibleShops = shopList.filter(shop => shop.shopMembership >= 2);

        for (let i = eligibleShops.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [eligibleShops[i], eligibleShops[j]] = [eligibleShops[j], eligibleShops[i]];
        }

        const randomSelection = eligibleShops.slice(0, 3);

        randomSelection.forEach(shop => {
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

            box.appendChild(card);
        });

    } catch (error) {
        console.error("Error while reading:", error);
        container.innerHTML = `<p class="error">Error while loading the member list.</p>`;
    }
};

document.addEventListener("DOMContentLoaded", () => {
    randomMember(); 
});