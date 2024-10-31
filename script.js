function fetchAndPopulateCategories(timeframe = "daily") {
  fetch("data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      data.forEach((category) => {
        // Locate card by category
        const card = document.getElementById(
          category.title.toLowerCase().replace(" ", "")
        );

        if (card) {
          // Update cards with corresponding information
          card.querySelector("h3").textContent = category.title;
          card.querySelector(
            ".current-hours"
          ).textContent = `${category.timeframes[timeframe].current}hrs`;
          card.querySelector(
            ".previous-hours"
          ).textContent = `Last Week - ${category.timeframes[timeframe].previous}hrs`;
        }
      });
    })
    .catch((error) => console.error("Error fetching data", error));
}

// Call to default population of categories
fetchAndPopulateCategories();

// Event listeners for switching timeframes (daily, weekly, monthly)
document.querySelectorAll(".selectPeriod li").forEach((item) => {
  item.addEventListener("mouseover", () => {
    const timeframe = item.textContent.toLowerCase(); // e.g., "daily", "weekly", "monthly"
    fetchAndPopulateCategories(timeframe); // Update display based on selected timeframe
  });
});
