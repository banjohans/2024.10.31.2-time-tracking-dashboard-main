// initializing a function for fetching and populating classes in the html with new strings fetched from the data.json file
function fetchAndPopulateCategories(timeframe = "daily") {
  // initial fetch function to fetch and execute our needed functionality
  fetch("data.json")
    // method to initialize an arrow function
    .then((response) => {
      // that states that if the response is in negation '!' to ok, then we have an error, and need to return an error message.
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })

    // Formating relevant HTML ID categories to lowercase, removing potential spaces to make it work in JS language
    .then((data) => {
      data.forEach((category) => {
        // Locate card by ID category
        const card = document.getElementById(
          category.title.toLowerCase().replace(" ", "")
        );

        // Update cards with corresponding data to the category
        if (card) {
          // this line selects the card category from h3 which is only used for this operation
          // following, it pulls the consequent categories of current- and previous hours, existing within the same card's div.
          card.querySelector("h3").textContent = category.title;
          card.querySelector(
            ".current-hours"
            // the following line pulls numbers from the JSON "timeframes" to be exchanged with the
            // categories 'current' and 'previous' hours, and adds 'hrs' to the string.
          ).textContent = `${category.timeframes[timeframe].current}hrs`;
          card.querySelector(
            ".previous-hours"
          ).textContent = `Last Week - ${category.timeframes[timeframe].previous}hrs`;
        }
      });
    })
    // an arrow function that will state a console error if anything wrong happens during the if statement.
    .catch((error) => console.error("Error fetching data", error));
}

// Call to fetch and populate the categories correspondingly
fetchAndPopulateCategories();

// Event listeners for where to switch timeframes (daily, weekly, monthly) from - the li in the selectPeriod class card.
document.querySelectorAll(".selectPeriod li").forEach((item) => {
  // an arrow function to listen for new data when mouseover on li from .selectPeriod
  item.addEventListener("mouseover", () => {
    const timeframe = item.textContent.toLowerCase(); // create a new const to be defined by items textcontent converted to lowercase.
    fetchAndPopulateCategories(timeframe); // Fetch and display information from different timeframes based on the selected li
  });
});
//we're done!
