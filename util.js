function validate_frmDonate() {
  let form = $("#frmDonate");
  form.validate({
    rules: {
      itemName: {
        required: true,
      },
      quantity: {
        required: true,
        min: 1,
      },
      expirationDate: {
        required: true,
      },
      description: {
        required: false,
      },
      donorName: {
        required: true,
      },

      email: {
        required: true,
        email: true,
        emailcheck: true,
      },
      address: {
        required: true,
      },
    },
    messages: {
      itemName: {
        required: "Item Name is missing",
      },
      quantity: {
        required: "Quantity is missing",
        min: "Quantity must be at least 1",
      },
      expirationDate: {
        required: "Expiration Date is missing",
      },
      donorName: {
        required: "Your Name is missing",
      },

      email: {
        required: "Email Address is missing",
        email: "Please enter a valid email address",
      },
      address: {
        required: "Address is missing",
      },
    },
  });
  return form.valid();
}
jQuery.validator.addMethod("emailcheck", function (value, element) {
  var regexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return this.optional(element) || regexp.test(value);
});


function validate_frmCalculate() {
  let form = $("#frmCalculate");
  form.validate({
    rules: {
      foodQuantity: {
        required: true,
        min: 1,
      },
    },
    messages: {
      foodQuantity: {
        required: "Quantity is missing",
        min: "Quantity must be at least 1",
      },
    },
  });
  return form.valid();
}

function validate_login() {
  let form = $("#registerForm");
  form.validate({
    rules: {
      newUsername: {
        required: true,
      },
      emailUser: {
        required: true,
        email: true,
      },
      newPassword: {
        required: true,
        newpasswordcheck: true,
      },
      confirmPassword: {
        required: true,
        equalTo: "#newPassword",
      },
    },
    messages: {
      newUsername: {
        required: "Username is missing",
      },
      emailUser: {
        required: "Email Address is missing",
        email: "Please enter a valid email address",
      },
      newPassword: {
        required: "Password is missing",
        newpasswordcheck:
          "Password must contain at least 8 characters, including one letter and one number",
      },
      confirmPassword: {
        required: "Confirm Password is missing",
        equalTo: "Passwords do not match",
      },
    },
  });
  return form.valid();
}
jQuery.validator.addMethod("newpasswordcheck", function (value, element) {
  var regexp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return this.optional(element) || regexp.test(value);
});
