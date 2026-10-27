var buttons = {
  monthly: document.getElementById("monthly"),
  yearly: document.getElementById("yearly")
};
var prices = document.querySelectorAll(".price");
var unit = document.querySelectorAll(".unit");
var billingNotes = document.querySelectorAll(".billing-note");
var billingSummary = document.getElementById("billing-summary");
var selectionBanner = document.getElementById("selection-banner");
var ctaButtons = document.querySelectorAll("[data-select-plan]");

var currentPeriod = "monthly";

function setPeriod(period) {
  currentPeriod = period;

  prices.forEach(function (p) {
    p.textContent = p.dataset[period];
  });

  unit.forEach(function (u) {
    u.textContent = period === "monthly" ? "per month" : "per year";
  });

  billingNotes.forEach(function (note) {
    if (note.dataset[period]) {
      note.textContent = note.dataset[period];
    }
  });

  Object.keys(buttons).forEach(function (key) {
    var isSelected = key === period;
    buttons[key].setAttribute("aria-pressed", String(isSelected));
    buttons[key].classList.toggle("active", isSelected);
  });

  if (billingSummary) {
    billingSummary.textContent =
      period === "monthly"
        ? "Showing monthly billing prices. Switch to yearly to get 20% off."
        : "Yearly discount active — you save 20% compared to monthly billing!";
  }
}

buttons.monthly.addEventListener("click", function () {
  setPeriod("monthly");
});

buttons.yearly.addEventListener("click", function () {
  setPeriod("yearly");
});

ctaButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    var planName = btn.getAttribute("data-select-plan");
    var card = btn.closest(".card");
    var priceEl = card ? card.querySelector(".price") : null;
    var activePrice = priceEl ? priceEl.textContent : "";
    var unitLabel = currentPeriod === "monthly" ? "per month" : "per year (20% off)";

    if (selectionBanner) {
      selectionBanner.textContent =
        "Selected the " + planName + " plan at " + activePrice + " " + unitLabel + ". Ready to proceed!";
      selectionBanner.classList.add("visible");
    }
  });
});

setPeriod("monthly");
