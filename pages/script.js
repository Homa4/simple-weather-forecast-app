const cities = [
  "Lviv",
  "Odesa",
  "Kyiv",
  "London",
  "New York",
  "Paris",
  "Berlin",
];

const container = document.getElementById("buttons");

cities.forEach((city) => {
  const btn = document.createElement("button");

  btn.className = "city-btn";
  btn.textContent = city;
  btn.value = city;

  btn.addEventListener("click", handleClick);

  container.appendChild(btn);
});

function handleClick(e) {
  const city = e.target.value;

  window.location.href = `cityPage.html?city=${encodeURIComponent(city)}`;
}
