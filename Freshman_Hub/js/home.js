import { card, el } from "./data.js";

function setYear() {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
  buildFeatureGrid();
  setYear();
});
