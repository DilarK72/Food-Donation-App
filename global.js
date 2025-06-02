let db;
let currentDonationId = null;

$(document).ready(function () {
  init();
});

function btnSubmit(event) {
  event.preventDefault();
  submitValidaton();
}

function pageDonation_historyshow() {
  showDonationHistory();
}

function btnCalculateFoodWaste(event) {
  calculateFoodWaste();
  event.preventDefault();
}
function submitlogin(event) {
  login();
  event.preventDefault();
}
function takePhoto() {
  clickPhoto();
}

async function init() {
  db = new DonationDBManager("DonationDB", ["Users", "Donations"]);
  await db.init();

  // Attach event handlers
  $("#submit").on("click", btnSubmit);

  $("#history").on("pageshow", pageDonation_historyshow);

  $("#calculate").on("click", btnCalculateFoodWaste);

  $("#registerForm").on("submit", submitlogin);

  $("#takePhotoBtn").on("click", takePhoto);
}

// Function to delete a donation
async function deleteDonation(donationId) {
  try {
    await db.delete("Donations", donationId);
    console.log("Donation deleted successfully");
  } catch (error) {
    console.error("Error deleting donation:", error);
  }
}
