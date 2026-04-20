export function setupTabs() {
  const homeTab = document.querySelector('[data-tab="home"]');
  const converterTab = document.querySelector('[data-tab="converter"]');
  const homeSection = document.getElementById("home");
  const converterSection = document.getElementById("converter");

  // Home をクリックした時
  homeTab.addEventListener("click", (event) => {
    event.preventDefault(); // これがないとページがリロードされてしまいます
    converterSection.classList.add("hidden");
    homeSection.classList.remove("hidden");
  });

  // Unit Converter をクリックした時
  converterTab.addEventListener("click", () => {
    homeSection.classList.add("hidden");
    converterSection.classList.remove("hidden");
  });
}
