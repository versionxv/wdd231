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

const stores = [
    {
        shopTittle: 'XXXXXX',
        shopTag: 'YYYYYYYYYY',
        shopLogo: 'images/placeholder-box.jpeg',
        shopEmail: 'placeholder@',
        shopPhone: '1234 5678 9',
        shopUrl: 'placeholder.com',
    },
    {
        shopTittle: 'XXXXXX',
        shopTag: 'YYYYYYYYYY',
        shopLogo: 'images/placeholder-box.jpeg',
        shopEmail: 'placeholder@',
        shopPhone: '1234 5678 9',
        shopUrl: 'placeholder.com',
    },
    {
        shopTittle: 'XXXXXX',
        shopTag: 'YYYYYYYYYY',
        shopLogo: 'images/placeholder-box.jpeg',
        shopEmail: 'placeholder@',
        shopPhone: '1234 5678 9',
        shopUrl: 'placeholder.com',
    },
    {
        shopTittle: 'XXXXXX',
        shopTag: 'YYYYYYYYYY',
        shopLogo: 'images/placeholder-box.jpeg',
        shopEmail: 'placeholder@',
        shopPhone: '1234 5678 9',
        shopUrl: 'placeholder.com',
    },
    {
        shopTittle: 'XXXXXX',
        shopTag: 'YYYYYYYYYY',
        shopLogo: 'images/placeholder-box.jpeg',
        shopEmail: 'placeholder@',
        shopPhone: '1234 5678 9',
        shopUrl: 'placeholder.com',
    },
    {
        shopTittle: 'XXXXXX',
        shopTag: 'YYYYYYYYYY',
        shopLogo: 'images/placeholder-box.jpeg',
        shopEmail: 'placeholder@',
        shopPhone: '1234 5678 9',
        shopUrl: 'placeholder.com',
    }
];

function createDisplay(shopList) {
    document.querySelector(".container").innerHTML = "";

    shopList.forEach(shop => {
        let card = document.createElement("section");

        let headPart = document.createElement("div")
        let title = document.createElement("h3");
        let tag = document.createElement("p");

        let bodyPart = document.createElement("div");
        let logo = document.createElement("img");

        let armPart = document.createElement("div");
        let email = document.createElement("p")
        let phone = document.createElement("p");
        let site = document.createElement("a");

        title.textContent = shop.shopTittle;
        tag.textContent = shop.shopTag || "";

        logo.src = shop.shopLogo;
        logo.alt = `${shop.shopTittle} logo`;

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

        document.querySelector(".container").appendChild(card);
    });
}

createDisplay(stores);