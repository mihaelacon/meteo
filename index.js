var arrLocs = [];
var fLS = window.localStorage.getItem("locations");
var today = new Date().getHours();
// console.info(today);

function isDay() {
  if (today >= 7 && today <= 19) {
    return true;
  } else {
    return false;
  }
}
// isDay();
// console.info(isDay());

if (fLS !== null) {
  arrLocs = JSON.parse(fLS);
}

function locationToRow(loc) {
  return `<tr>
   <td class="wtemp">${loc.locname}</td>
   <td data-id="${loc.id}" data-type="date" class="wtemp">${loc.time.replace(
    "T",
    " "
  )}</td>
   <td data-id="${loc.id}" data-type="temp" class="wtemp">${
    loc.temperature
  } &#8451;</td>
   <td data-id="${loc.id}" data-type="wind" class="wtemp">${
    loc.windspeed
  } km/h</td>
  
   <td data-id="${loc.id}" data-type="code" class="wtemp">${weatherCodeToText(
    loc.weathercode
  )}</td>
  <td data-id="${loc.id}" data-type="wcod" class="wimgcode">${weatherCodeForImg(
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

function weatherCodeForImg(code) {
  let c = parseInt(code);
  switch (c) {
    case 0:
      if (isDay()) {
        return "<img src='SVG/FILL/clear-day.svg'  class ='afisareimg' />";
      } else {
        return "<img src='SVG/FILL/clear-night.svg'  class ='afisareimg' />";
      }
      //  "clear sky";
      break;
    case 1:
      if (isDay()) {
        return "<img src='SVG/FILL/clear-day.svg' class ='afisareimg' />";
      } else {
        return "<img src='SVG/FILL/clear-night.svg' class ='afisareimg' />";
      }
      // "mainly clear";
      break;
    case 2:
      if (isDay()) {
        return "<img src='SVG/FILL/partly-cloudy-day.svg' class ='afisareimg' />";
      } else {
        return "<img src='SVG/FILL/partly-cloudy-night.svg' class ='afisareimg' />";
      }
      // "partly cloudy";
      break;
    case 3:
      return "<img src='SVG/FILL/overcast.svg'  class ='afisareimg' />";
      // "overcast";
      break;
    case 45:
      return "<img src='SVG/FILL/fog.svg'  class ='afisareimg' />";
      //  "fog";
      break;
    case 48:
      return "<img src='SVG/FILL/fog.svg'  class ='afisareimg' />";
      //"persistent fog";
      break;
    case 51:
      return "<img src='SVG/FILL/overcast-drizzle.svg'  class ='afisareimg' />";
      // "light drizzle";
      break;
    case 53:
      return "<img src='SVG/FILL/overcast-drizzle.svg'  class ='afisareimg' />";
      //"moderate drizzle";
      break;
    case 55:
      return "<img src='SVG/FILL/overcast-drizzle.svg'  class ='afisareimg' />";
      // "dense drizzle";
      break;
    case 56:
      return "<img src='SVG/FILL/overcast-drizzle.svg'  class ='afisareimg' />";
      // "freezing drizzle";
      break;
    case 57:
      return "<img src='SVG/FILL/overcast-drizzle.svg'  class ='afisareimg' />";
      // "intense freezing drizzle";
      break;
    case 61:
      return "<img src='SVG/extreme-rain.svg' class ='afisareimg' />";
      // "light rain";
      break;
    case 63:
      return "<img src='SVG/extreme-rain.svg' class ='afisareimg' />";
      // "moderate rain";
      break;
    case 65:
      return "<img src='SVG/extreme-rain.svg' class ='afisareimg' />";
      // "heavy rain";
      break;
    case 66:
      return "<img src='SVG/extreme-rain.svg' class ='afisareimg' />";
      r; // "freezing rain";
      break;
    case 67:
      return "<img src='SVG/extreme-rain.svg' class ='afisareimg' />";
      // "heavy freezing rain";
      break;
    case 71:
      return "<img src='SVG/FILL/overcast-snow.svg'  class ='afisareimg' />";
      // "light snow";
      break;
    case 73:
      return "<img src='SVG/FILL/overcast-snow.svg'  class ='afisareimg' />";
      // "moderate snow";
      break;
    case 75:
      return "<img src='SVG/FILL/overcast-snow.svg'  class ='afisareimg' />";
      // "heavy snow";
      break;
    case 77:
      return "<img src='SVG/FILL/overcast-snow.svg'  class ='afisareimg' />";
      // "snow grains";
      break;
    case 80:
      return "<img src='SVG/extreme-rain.svg' class ='afisareimg' />";
      // "light rain showers";
      break;
    case 81:
      return "<img src='SVG/extreme-rain.svg' class ='afisareimg' />";
      // "moderate rain showers";
      break;
    case 82:
      return "<img src='SVG/extreme-rain.svg' class ='afisareimg' />";
      // "violent rain showers";
      break;
    case 85:
      return "<img src='SVG/FILL/overcast-snow.svg'  class ='afisareimg' />";
      // "snow showers";
      break;
    case 86:
      return "<img src='SVG/FILL/overcast-snow.svg'  class ='afisareimg' />";
      // "heavy snow showers";
      break;
    case 95:
      return "<img src='SVG/FILL/thunderstorms-overcast.svg'  class ='afisareimg' />";
      //return "<img src='SVG/FILL/thunderstorms-rain.svg'  class ='afisareimg' />";
      // "thunderstorm";
      break;
    case 96:
      return "<img src='SVG/FILL/thunderstorms-overcast-rain.svg' class ='afisareimg' />";
      // "thunderstorm & hail";
      break;
    case 99:
      return "<img src='SVG/FILL/thunderstorms-overcast-rain.svg' class ='afisareimg' />";
      // "thunderstorm & heavy hail";
      break;
    default:
      return "<img src='SVG/FILL/dust-wind.svg'  class ='afisareimg' />";
      // "code: " + code;
      break;
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
      return arrLocations;
    });
}

function addEventListeners() {
  const table = document.querySelector("table tbody");
  table.addEventListener("click", (e) => {
    const target = e.target;
    if (target.matches("button.btn-edit")) {
      const id = target.getAttribute("data-id");
      const frm = document.getElementById("edit").innerHTML;
      const action = "Edit location: " + locationName(id - 1);
      openModal(frm, action);
      document.querySelector("#editform input[name=locname]").value =
        locationName(id - 1);
      document.querySelector("#editform input[name=locid]").value = id;
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
      const action = "Delete location: " + locationName(id - 1);
      const frm = document.getElementById("del").innerHTML;
      openModal(frm, action);
      document.querySelector("#locid").value = id;
    }
  });

  document.getElementById("btn-refresh").addEventListener("click", function () {
    loadConditions();
    console.info("Am apasat pe butonul de 'refresh'");
  });

  document.getElementById("btn-add").addEventListener("click", function () {
    const frm = document.getElementById("add").innerHTML;
    openModal(frm, "Add new city");
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

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(fillPosition);
  }
}

function fillPosition(position) {
  document.querySelector("#latitude").value = position.coords.latitude;
  document.querySelector("#longitude").value = position.coords.longitude;
}

function addNow(e) {
  e.preventDefault();
  const locname = document.querySelector(
    "#addnewform input[name=locname]"
  ).value;
  const latitude = document.querySelector(
    "#addnewform input[name=latitude]"
  ).value;
  const longitude = document.querySelector(
    "#addnewform input[name=longitude]"
  ).value;
  const newloc = {
    id: arrLocs.length + 1,
    locname: locname,
    latitude: latitude,
    longitude: longitude,
  };
  arrLocs.push(newloc);
  for (var i = 0; i < arrLocs.length; i++) {
    arrLocs[i].id = i + 1;
  }
  saveLocations();
  closeModal();
  loadConditions();
}

function editNow(e) {
  e.preventDefault();
  var id = document.querySelector("#editform input[name=locid]").value;
  console.info("locid:", id);
  arrLocs[id - 1].locname = document.querySelector(
    "#editform input[name=locname]"
  ).value;
  saveLocations();
  closeModal();
  loadConditions();
}

function delNow(e) {
  e.preventDefault();
  var id = document.querySelector("#delform input[name=locid]").value;
  arrLocs.splice(id - 1, 1);
  for (var i = 0; i < arrLocs.length; i++) {
    arrLocs[i].id = i + 1;
  }
  saveLocations();
  closeModal();
  loadConditions();
}

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const editButtons = document.querySelectorAll(".btn-edit");

function openModal(id, action) {
  const modalText = document.querySelector(".modal p");
  const modalTitle = document.querySelector(".modal h2");
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
  if (fLS !== null) {
    var locations = arrLocs;
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
      window.localStorage.setItem("locations", JSON.stringify(locations));
      return weatherConditions;
    });
  } else {
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
        window.localStorage.setItem("locations", JSON.stringify(locations));
        return weatherConditions;
      });
    });
  }
}

function locationName(id) {
  return arrLocs[id].locname;
}

function saveLocations() {
  // salvez locatiile din arrLocs in LocalStorage
  window.localStorage.setItem("locations", JSON.stringify(arrLocs));
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
