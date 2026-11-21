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

document.addEventListener("DOMContentLoaded", () => {
  const timestampField = document.getElementById("timestamp");
  
  if (timestampField) {
    timestampField.value = new Date().toISOString();
  }
});

const closeButtons = document.querySelectorAll(".close-modal");

closeButtons.forEach(button => {
    button.addEventListener("click", () => {
      button.closest("dialog").close();
    });
});

const openLinks = document.querySelectorAll(".open-modal");
  openLinks.forEach(link => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const modalId = link.getAttribute("data-modal");
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.showModal();
      }
    });
});

document.addEventListener("DOMContentLoaded", () => {
  
  const params = new URLSearchParams(window.location.search);

  const resultsContainer = document.getElementById("results");

  if (resultsContainer) {
    
    const firstName = params.get("fname") || "Not provided";
    const lastName = params.get("lname") || "Not provided";

    const email = params.get("email") || "Not provided";
    const phone = params.get("phone") || "Not provided";

    const borgName = params.get("borg-name") || "Not provided";
    const timestamp = params.get("timestamp") || "Not provided";
 
    resultsContainer.innerHTML = `
      <p><strong>First Name:</strong> ${firstName}</p>
      <p><strong>Last Name:</strong> ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Business/Organization:</strong> ${borgName}</p>
      <p><strong>Submitted At:</strong> ${timestamp}</p>
    `;
  }
});