

var usernameEl = document.querySelector('#username');
var dateEl = document.querySelector('#date');
var timeEl = document.querySelector('#time');
var genderEl = document.querySelector('#gender')

var residenceEl = document.querySelector('#residence')
var carModelEl = document.querySelector('#carModel')
var numberplateEl = document.querySelector('#numberPlate')

var form = document.querySelector('#register')

form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();

});

//The following isRequired() function returns true if the input argument is empty:
var isRequired = value => value === '' ? false : true;
var isRequire = value => value === 'none' ? false : true;
//The following isBetween() function returns false if the length argumet is not between the min and max argument:
var isBetween = (length, min, max) => length < min || length > max ? false : true;

//Develop functions that show the error / success
var showError = (input, message) => {
    // get the form-field element
    var formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    var error = formField.querySelector('small');
    error.textContent = message;
};
var showSuccess = (input) => {
    // get the form-field element
    var formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    var error = formField.querySelector('small');
    error.textContent = '';
}
//Validate the username field
var checkUsername = () => {

    let valid = false;
    var min = 3,
        max = 25;
    var username = usernameEl.value.trim();

    if (!isRequired(username)) {
        showError(usernameEl, 'Username cannot be blank.');
    } else if (!isBetween(username.length, min, max)) {
        showError(usernameEl, `Username must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(usernameEl);
        valid = true;
    }
    return valid;
}
//Validate the date field
var checkDate = () => {
    let valid = false;
    var date = dateEl.value.trim();
    if (!isRequired(date)) {
        showError(dateEl, 'Date cannot be blank.');
    } else {
        showSuccess(dateEl);
        valid = true;
    }
    return valid;
}

// var checkGender = () => {
//     let valid = false;
//     var gender = genderEl.value.trim();
//     if (!isRequire(gender)) {
//         showError(genderEl, 'Please select an option');
//     } else {
//         showSuccess(genderEl);
//         valid = true;
//     }

//     return valid;
// };

//Validate the time field
var checkTime = () => {
    let valid = false;
    var time = timeEl.value.trim();
    if (!isRequired(time)) {
        showError(timeEl, 'Time cannot be blank.');
    } else {
        showSuccess(timeEl);
        valid = true;
    }

    return valid;
};

//Validate the residence field
// var checkResidence = () => {
//     let valid = false;
//     var residence = residenceEl.value.trim();
//     if (!isRequired(residence)) {
//         showError(residenceEl, 'Residence cannot be blank.');
//     } else {
//         showSuccess(residenceEl);
//         valid = true;
//     }
//     return valid;
// };
// // //Validate the nationality field
// var checkNationality = () => {
//     let valid = false;
//     var nationality = nationalityEl.value.trim();
//     if (!isRequired(nationality)) {
//         showError(nationalityEl, 'Nationality cannot be blank.');
//     } else {
//         showSuccess(nationalityEl);
//         valid = true;
//     }

//     return valid;
// };
//Validate the car model field
// var checkCarModel = () => {
//     let valid = false;
//     var carModel = carModelEl.value.trim();
//     if (!isRequired(carModel)) {
//         showError(carModelEl, 'Car model cannot be blank.');
//     } else {
//         showSuccess(carModelEl);
//         valid = true;
//     }

//     return valid;
// };
//Validate the number plate field
var checkNumberPlate = () => {
    let valid = false;
    var numberPlate = numberplateEl.value.trim();
    if (!isRequired(numberPlate)) {
        showError(numberplateEl, 'Number plate cannot be blank.');
    } else {
        showSuccess(numberplateEl);
        valid = true;
    }

    return valid;
};

//modify button event handler
form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();

    // validate forms
    let isUsernameValid = checkUsername(),
        isTimeValid = checkTime(),
        // isGenderValid = checkGender(),
        isDateValid = checkDate(),
        // isResidenceValid = checkResidence(),
        // isNationalityValid = checkNationality(),
        // isCarModelValid = checkCarModel(),
        isNumberPlateValid = checkNumberPlate();
       

    let isFormValid = isUsernameValid &&
        isTimeValid &&
        isDateValid &&
        // isGenderValid &&
        // isResidenceValid &&
        // isCarModelValid &&
        // isNationalityValid &&
        isNumberPlateValid;
        

    // submit to the server if the form is valid
    if (isFormValid) {
        // window.location.href="index.html"
    }
});