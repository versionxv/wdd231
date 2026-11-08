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

const listButton = document.getElementById('list');

const container = document.querySelector('.container');

listButton.addEventListener('click', () => {
    container.classList.add('list-view');
});

gridButton.addEventListener('click', () => {
    container.classList.remove('list-view');
});