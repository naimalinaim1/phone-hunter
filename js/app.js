// load phone data
const loadPhones = async (phonName, phoneQuantity) => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/phones?search=${phonName}`
    );
    const data = await res.json();
    displayPhones(data.data, phoneQuantity);
  } catch (e) {
    console.log(e);
  }
};

// display phone only 9 by default
const displayPhones = (phones, phoneQuantity) => {
  const showAllSec = document.getElementById("show-all");
  const noPhoneFound = document.getElementById("phone-not-found");

  // display show button if phones length gater then 9
  if (phoneQuantity && phones.length > 9) {
    phones = phones.slice(0, 9);
    showAllSec.classList.remove("d-none");
  } else {
    showAllSec.classList.add("d-none");
  }

  // message no phone found
  if (phones.length === 0) {
    noPhoneFound.classList.remove("d-none");
  } else {
    noPhoneFound.classList.add("d-none");
  }

  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.innerHTML = "";
  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
        <div class="card h-100 p-4">
            <img src="${phone.image}" class="card-img-top" alt="phone" />
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">
                    This is a longer card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                </p>
                <button onclick="loadPhoneDetails('${phone.slug}');" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Details</button>
            </div>
        </div>`;
    phoneContainer.appendChild(phoneDiv);
  });
  loader(false);
};

// load phone details
const loadPhoneDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);

  } catch (e) {
    console.log(e);
  }
};

// display phone details
const displayPhoneDetails = (phone) => {
  console.log(phone);
  document.getElementById('phoneDetailsModalLabel').innerText = phone.name;
  const modalBody = document.getElementById('phone-details');
  modalBody.innerHTML = `
    <p>Release Date ${phone.releaseDate ? phone.releaseDate : 'no release date found'}</p>
    <p>Storage ${phone?.mainFeatures?.storage ? phone?.mainFeatures?.storage : 'no storage found'}</p>
    <p>Bluetooth ${phone?.others?.Bluetooth ? phone?.others?.Bluetooth : 'no bluetooth found'}</p>
  `;
}

// loader
const loader = (isLoader) => {
  const loader = document.getElementById("loader");
  if (isLoader) {
    loader.classList.remove("d-none");
  } else {
    loader.classList.add("d-none");
  }
};

// search phone function
const searchPhone = (phoneQuantity) => {
  loader(true);
  let searchPhone = document.getElementById("search-phone-field").value;
  if (searchPhone === "" && phoneQuantity == undefined) {
    searchPhone = "phone";
  }
  loadPhones(searchPhone, phoneQuantity);
};

// search phone with button click
document.getElementById("search-phone-btn").addEventListener("click", (_) => {
  searchPhone(10);
});

// search phone with press Enter key
document
  .getElementById("search-phone-field")
  .addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      searchPhone(10);
    }
  });

// display phone all
document.getElementById("btn-show-all").addEventListener("click", (_) => {
  searchPhone();
});

loadPhones("phone", 10);
