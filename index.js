var arrLocs = [];

function locationToRow(loc) {
  return `<tr>
   <td>${loc.locname}</td>
   <td data-id="${loc.id}" data-type="date">${loc.time.replace("T", " ")}</td>
   <td data-id="${loc.id}" data-type="temp">${loc.temperature} &#8451;</td>
   <td data-id="${loc.id}" data-type="wind">${loc.windspeed} km/h</td>
   <td data-id="${loc.id}" data-type="code">${weatherCodeToText(
    loc.weathercode
  )}</td>
   <td style="text-align: center"><button type="button" class="btn-edit btn btn--primary" data-id="${
     loc.id
   }">&#9998;</button> <button type="button" class="btn-delete btn btn--primary" data-id="${
    loc.id
  }">&#10006;</button></td>
  </tr>`;
}
//<button type="button" class="btn-refresh btn btn--primary" data-id="${loc.id}" style="background-image: url('refresh.png'); background-repeat: no-repeat; background-position: center; width: 28px;">&nbsp;</button>

function editLocation(id) {
  //find element in arrLocs which has the id
  var loc = arrLocs[id - 1];
  alert("NOT IMPLEMENTED: edit location " + loc.locname);
}

function getConditions(loc) {
  return fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=" +
      loc.latitude +
      "&longitude=" +
      loc.longitude +
      "&current_weather=true&timezone=Europe/Bucharest"
  )
    .then(function (r) {
      return r.json();
    })
    .then(function (weather) {
      //console.info(loc.locname);
      //console.info(weather.current_weather.temperature);
      return weather.current_weather;
    });
}

function weatherCodeToText(code) {
  let c = parseInt(code);
  switch (c) {
    case 0:
      return "clear sky";
      break;
    case 1:
      return "mainly clear";
      break;
    case 2:
      return "partly cloudy";
      break;
    case 3:
      return "overcast";
      break;
    case 45:
      return "fog";
      break;
    case 48:
      return "persistent fog";
      break;
    case 51:
      return "light drizzle";
      break;
    case 53:
      return "moderate drizzle";
      break;
    case 55:
      return "dense drizzle";
      break;
    case 56:
      return "freezing drizzle";
      break;
    case 57:
      return "intense freezing drizzle";
      break;
    case 61:
      return "light rain";
      break;
    case 63:
      return "moderate rain";
      break;
    case 65:
      return "heavy rain";
      break;
    case 66:
      return "freezing rain";
      break;
    case 67:
      return "heavy freezing rain";
      break;
    case 71:
      return "light snow";
      break;
    case 73:
      return "moderate snow";
      break;
    case 75:
      return "heavy snow";
      break;
    case 77:
      return "snow grains";
      break;
    case 80:
      return "light rain showers";
      break;
    case 81:
      return "moderate rain showers";
      break;
    case 82:
      return "violent rain showers";
      break;
    case 85:
      return "snow showers";
      break;
    case 86:
      return "heavy snow showers";
      break;
    case 95:
      return "thunderstorm";
      break;
    case 96:
      return "thunderstorm & hail";
      break;
    case 99:
      return "thunderstorm & heavy hail";
      break;
    default:
      return "code: " + code;
      break;
  }
}

function not_used_fn_locationToRow(loc) {
  try {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=" +
        loc.latitude +
        "&longitude=" +
        loc.longitude +
        "&current_weather=true&timezone=Europe/Bucharest"
    )
      .then(function (r) {
        return r.json();
      })
      .then(function (weather) {
        var vreme = "<tr>";
        vreme += `<td>${loc.locname}</td>`;
        vreme += `<td>${weather.current_weather.time.replace("T", " ")}</td>`;
        vreme += `<td>${weather.current_weather.temperature}</td>`;
        vreme += `<td>${weather.current_weather.windspeed}</td>`;
        vreme += `<td>${weather.current_weather.weathercode}</td>`;
        vreme += `<td><button type="button" data_id="${loc.id}">Edit</button</td>`;
        vreme += "</tr>";
        console.info(vreme);
        return vreme;
      });
  } catch (error) {
    console.info(error);
  }
}

function locationsToTable(arrLocations) {
  arrLocs = arrLocations;
  var rowHTML = arrLocations.map(locationToRow);
  document.querySelector("table tbody").innerHTML = rowHTML.join("");
}

function loadLocations() {
  return fetch("locations.json")
    .then(function (r) {
      return r.json();
    })
    .then(function (arrLocations) {
      //console.info(arrLocations);
      //locationsToTable(arrLocations);
      return arrLocations;
    });
}

function addEventListeners() {
  const table = document.querySelector("table tbody");
  table.addEventListener("click", (e) => {
    const target = e.target;
    if (target.matches("button.btn-edit")) {
      const id = target.getAttribute("data-id");
      const action = "Edit location";
      openModal(id, action);
    } else if (target.matches("button.btn-refresh")) {
      const id = target.getAttribute("data-id");
      getConditions(id).then((weather) => {
        document.querySelector(
          '[data-id="' + id + '"][data-type="date"]'
        ).innerHTML = weather.time.replace("T", " ");
        document.querySelector(
          '[data-id="' + id + '"][data-type="temp"]'
        ).innerHTML = weather.temperature + " &#8451;";
        document.querySelector(
          '[data-id="' + id + '"][data-type="wind"]'
        ).innerHTML = weather.windspeed + " km/h";
        document.querySelector(
          '[data-id="' + id + '"][data-type="code"]'
        ).innerHTML = fn_weatherCodeToText(weather.weathercode);
      });
    } else if (target.matches("button.btn-delete")) {
      const id = target.getAttribute("data-id");
      const action = "Delete location";
      openModal(id, action);
    }
  });

  document.getElementById("btn-refresh").addEventListener("click", function () {
    loadConditions();
    console.info("Am apasat pe butonul de 'refresh'");
  });

  document.getElementById("btn-add").addEventListener("click", function () {
    openModal('new', 'location');
    console.info("Am apasat pe butonul 'add'");
  });

  // for modal
  btnCloseModal.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });
}

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const editButtons = document.querySelectorAll(".btn-edit");

function openModal(id, action) {
  const modalText = document.querySelector(".modal p");
  const modalTitle = document.querySelector(".modal h3");
  modalText.innerHTML = id;
  modalTitle.innerHTML = action;
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

function loadConditions() {
  loadLocations().then((locations) => {
    const requests = locations.map((location) => getConditions(location));
    return Promise.all(requests).then((weatherConditions) => {
      const newLocations = locations.map((location, i) => {
        location.temperature = weatherConditions[i].temperature;
        location.time = weatherConditions[i].time;
        location.windspeed = weatherConditions[i].windspeed;
        location.weathercode = weatherConditions[i].weathercode;
        return location;
      });
      locationsToTable(newLocations);
      return weatherConditions;
    });
  });
}

// function refreshButton() {
//   loadConditions();
//   console.info("Am apasat pe buton");
// }

// document.getElementById("btn-refresh").addEventListener("click", function () {
//   refreshButton();
// });

loadConditions();
addEventListeners();
