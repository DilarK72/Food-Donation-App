async function submitValidaton() {
  if (validate_frmDonate()) {
    await db.add("Donations", {
      itemName: $("#itemName").val(),
      quantity: $("#quantity").val(),
      expirationDate: $("#expirationDate").val(),
      category: $("#category").val(),
      condition: $("#condition").val(),
      pickupLocation: $("#pickupLocation").val(),
      preferredPickupTime: $("#preferredPickupTime").val(),
      specialInstructions: $("#specialInstructions").val(),
      allergenInformation: [
        $("#allergenDairy").is(":checked") ? "dairy" : "",
        $("#allergenNuts").is(":checked") ? "nuts" : "",
      ].join(","),
      image: $("#photoUpload").val(),
      donorName: $("#donorName").val(),
      phone: $("#phone").val(),
      emailId: $("#email").val(),
      address: $("#address").val(),
      dateDonated: new Date().toLocaleDateString(),
    });
    console.log("Donate Succssful");
    resetForm();
  } else console.log("Submission form is invalid");
}
function resetForm() {
  // Reset all form fields to their default values or empty
  $("#itemName").val("");
  $("#quantity").val("");
  $("#expirationDate").val("");
  $("#category").val("");
  $("#condition").val("");
  $("#pickupLocation").val("");
  $("#preferredPickupTime").val("");
  $("#specialInstructions").val("");
  $("#allergenDairy").prop("checked", false);
  $("#allergenNuts").prop("checked", false);
  $("#photoUpload").val(""), $("#phone").val("");
  $("#donorName").val("");
  $("#email").val("");
  $("#address").val("");
}
async function showDonationHistory() {
  let donations = await db.getAll("Donations");
  let tableBody = $("#donationList");

  // Clear existing rows
  tableBody.empty();

  // Iterate over donations and populate table rows
  donations.forEach((donation) => {
    let row = `
      <tr>
      <td>${donation.donorName}</td>
        <td>${donation.itemName}</td>
        <td>${donation.quantity}</td>
        <td>${donation.dateDonated}</td>
        <td>
         <button class="delete-btn" data-id="${donation.id}">Delete</button>
        </td>

      </tr>
    `;
    tableBody.append(row);
  });

  // Refresh the table to apply dynamic changes
  $("#donationTable").table("refresh");

  // Attach a click event to each list item
  $("#donationList a").on("click", function () {
    // Store the participant ID in the global variable
    currentParticipantId = $(this).data("id");
  });

  // Attach click event to delete buttons
  $(".delete-btn").on("click", function () {
    // Get the donation id associated with the delete button
    let donationId = $(this).data("id");
    // Remove the corresponding row from the table
    $(this).closest("tr").remove();
    // Call a function to delete the donation from the database
    deleteDonation(donationId);
  });
  $(".delete-btn").addClass("delete-button-styling");
}

async function calculateFoodWaste() {
  if (validate_frmCalculate()) {
    let foodType = $("#foodType").val();
    let quantity = $("#foodQuantity").val();

    let wastePerUnit = {
      fruit: 0.5,
      vegetable: 0.4,
      grain: 0.3,
      dairy: 0.2,
      protein: 0.6,
      other: 0.7,
    };
    let totalWaste = quantity * wastePerUnit[foodType];
    $("#foodWaste").text(totalWaste.toFixed(2));
  }
}
async function login() {
  if (validate_login()) 
  {
    await db.add("Users", {
      user: $("#newUsername").val(),
      email: $("#emailUser").val(),
      password: $("#newPassword").val(),
    });

    $("#showUser").text($("#newUsername").val());
    window.location.href = "#home";
    console.log("User added successfully");
  } else {
    console.log("Invalid email or password");
  }
}
async function clickPhoto() {
  // Check if the device has the Camera plugin available
  if (!navigator.camera) {
    alert("Camera plugin is not available.");
    return;
  }

  // Define camera options
  var options = {
    quality: 50, // Image quality (0-100)
    destinationType: Camera.DestinationType.FILE_URI, // Return file URI
    sourceType: Camera.PictureSourceType.CAMERA, // Use the device's camera
    encodingType: Camera.EncodingType.JPEG, // Image encoding type
    mediaType: Camera.MediaType.PICTURE, // Media type (IMAGE/VIDEO/ALLMEDIA)
  };

  // Call the Camera plugin's getPicture method to trigger the device's camera
  navigator.camera.getPicture(onPhotoSuccess, onPhotoError, options);
}

// Callback function executed when the photo is successfully captured
function onPhotoSuccess(imageURI) {
  // Display the captured image (optional)
  var imgElement = document.createElement("img");
  imgElement.src = imageURI;
  document.body.appendChild(imgElement);

  // You can do further processing with the image URI, such as uploading it to a server
}

// Callback function executed when there's an error capturing the photo
function onPhotoError(message) {
  alert("Failed to take photo: " + message);
}
