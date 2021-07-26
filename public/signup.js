var genderEl = document.querySelector("#gender");
var usernameEl = document.querySelector("#username");
var idEl = document.querySelector("#id");
var residenceEl = document.querySelector("#residence");
var dObEl = document.querySelector("#age");
var form = document.querySelector("#signup");
var nId = document.querySelector("#nin");
var telEl = document.querySelector("#telephone");
var ageEl = document.querySelector("#theAge");

//The following isRequired() function returns true if the input argument is empty:
var isRequired = (value) => (value === "" ? false : true);
var isRequire = (value) => (value === "none" ? false : true);
//The following isBetween() function returns false if the length argumet is not between the min and max argument:
var isBetween = (length, min, max) =>
  length < min || length > max ? false : true;

var isNINtrue = (nid) => {
  var re = /^[A-Z]{3}[0-9A-Z]{8}$/;
  return re.test(nid);
};
var isIDValid = (id) => {
  var re = /^ZWash-([0-9]{3})+$/;
  return re.test(id);
};
var isPhoneValid = (number) => {
  var re = /^[0-9]+$/;
  return re.test(number);
};

var isNameValid = (number) => {
  var re = /^[A-Z]([a-z'-.]+ [A-Z][a-z'-.]+)$/;
  return re.test(number);
};

//Develop functions that show the error / success
var showError = (input, message) => {
  // get the form-field element
  var formField = input.parentElement;
  // add the error class
  formField.classList.remove("success");
  formField.classList.add("error");

  // show the error message
  var error = formField.querySelector("small");
  error.textContent = message;
};
var showSuccess = (input) => {
  // get the form-field element
  var formField = input.parentElement;

  // remove the error class
  formField.classList.remove("error");
  formField.classList.add("success");

  // hide the error message
  var error = formField.querySelector("small");
  error.textContent = "";
};
// Validate the username field
var checkUsername = () => {
  let valid = false;
  var min = 8,
    max = 25;
  var username = usernameEl.value.trim();

  if (!isRequired(username)) {
    showError(usernameEl, " Required field");
  } else if (!isNameValid(username)) {
    showError(usernameEl, "Incorrect Format");
  } else if (!isBetween(username.length, min, max)) {
    showError(
      usernameEl,
      `Username must be between ${min} and ${max} characters.`
    );
  } else {
    showSuccess(usernameEl);
    valid = true;
  }
  return valid;
};
//Validate the id field
var checkID = () => {
  let valid = false;
  var id = idEl.value.trim();
  if (!isRequired(id)) {
    showError(idEl, "Required field");
  } else if (!isIDValid(id)) {
    showError(idEl, 'ID must start with "Zwash-"');
  } else {
    showSuccess(idEl);
    valid = true;
  }
  return valid;
};

var checkDOB = () => {
  let valid = false;
  var dOb = dObEl.value.trim();
  if (!isRequired(dOb)) {
    showError(dObEl, "Required field");
  } else {
    showSuccess(dObEl);
    valid = true;
  }

  return valid;
};

// var checkAge = () => {
//     function Age(dateOfBirth){
//         let today=date.now()
//         age=today-dObEl
//         return Age

//     }
//     let valid = false;
//     var dOb = dObEl.value.trim();
//     if (!isRequired(dOb)) {
//       showError(dObEl, "Required field");
//     } else {
//       showSuccess(dObEl);
//       valid = true;
//     }
  
//     return valid;
//   };
  

var checkIdNumber = () => {
  let valid = false;
  var nationalid = nId.value.trim();
  if (!isRequired(nId)) {
    showError(nId, "Required field");
  } else if (!isNINtrue(nationalid)) {
    showError(nId, "Invalid ID number");
  } else {
    showSuccess(nId);
    valid = true;
  }

  return valid;
};

var checkTel = () => {
  let valid = false;
  var min = 9,
    max = 10;
  var phone = telEl.value.trim();
  if (!isBetween(phone.length, min, max)) {
    showError(telEl, `Telephone number is invalid.`);
  } else if (!isPhoneValid(phone)) {
    showError(telEl, "Telephone number is invalid.");
  } else {
    showSuccess(telEl);
    valid = true;
  }
  return valid;
};

var checkGender = () => {
  let valid = false;
  var gender = genderEl.value.trim();
  if (!isRequire(gender)) {
    showError(genderEl, "Please select Gender.");
  } else {
    showSuccess(genderEl);
    valid = true;
  }

  return valid;
};

//Validate the residence field
var checkResidence = () => {
  let valid = false;
  var residence = residenceEl.value.trim();
  if (!isRequired(residence)) {
    showError(residenceEl, "Required field");
  } else {
    showSuccess(residenceEl);
    valid = true;
  }

  return valid;
};

//modify button event handler
form.addEventListener("submit", function (e) {
  // prevent the form from submitting

  // validate forms
  let isUsernameValid = checkUsername(),
    isIdValid = checkID(),
    isGenderValid = checkGender(),
    isTelValid = checkTel(),
    isdOb = checkDOB(),
    // isAgeValid=checkAge(),
    isNIDValid = checkIdNumber(),
  isResidenceValid = checkResidence();
  // isConfirmPasswordValid = checkConfirmPassword();

  let isFormValid =
    isUsernameValid &&
    isIdValid &&
    isGenderValid &&
    isTelValid &&
    // isAgeValid&&
    isResidenceValid &&
    isNIDValid &&
    isdOb;
  // isConfirmPasswordValid;

  // submit to the server if the form is valid
  if (!isFormValid) {
    e.preventDefault();
  }
});
