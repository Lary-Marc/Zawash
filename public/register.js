

var usernameEl = document.querySelector('#username');
var dateEl = document.querySelector('#date');
var timeEl = document.querySelector('#time');
var vehicleEl = document.querySelector('#vehicle')
var wageEl = document.querySelector('#wage')
var payEl = document.querySelector('#payment')
var washerEl = document.querySelector('#washer')
var numberplateEl = document.querySelector('#numberPlate')

var form = document.querySelector('#register')

form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();

});

//The following isRequired() function returns true if the input argument is empty:
var isRequired = value => value === '' ? false : true;
var isRequire = value => value == 'none' ? false : true;
//The following isBetween() function returns false if the length argumet is not between the min and max argument:
var isBetween = (length, min, max) => length < min || length > max ? false : true;
var isAmountValid = (number) => {
    var re = /^[0-9]+$/ ; // this regex wil require the password to have atleast 8 characters and one special character
    return re.test(number);
};

var isPlatetrue = (plate) => {
    var re = /^[A-Z]{3}[0-9A-Z]{4}$/ ;
    return re.test(plate);
};  


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
        showError(usernameEl, '*Required field');
    } else if (!isBetween(username.length, min, max)) {
        showError(usernameEl, `*Username must be between ${min} and ${max} characters.`)
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
        showError(dateEl, '*Required field');
    } else {
        showSuccess(dateEl);
        valid = true;
    }
    return valid;
}

var checkVehicle = () => {
    let valid = false;
    var vehicle = vehicleEl.value.trim();
    if (!isRequire(vehicle)) {
        showError(vehicleEl, '*Please select an option');
    } else {
        showSuccess(vehicleEl);
        valid = true;
    }

    return valid;
};

//Validate the time field
var checkTime = () => {
    let valid = false;
    var time = timeEl.value.trim();
    if (!isRequired(time)) {
        showError(timeEl, '*Required field');
    } else {
        showSuccess(timeEl);
        valid = true;
    }

    return valid;
};

//Validate the residence field
var checkPayment = () => {
    let valid = false;
    var payment = payEl.value.trim();
    if (!isRequire(payment)) {
        showError(payEl, '*Required field');
    } else if (!isAmountValid(payment)) {
        showError(payEl, 'Invalid format')
    }else {
        showSuccess(payEl);
        valid = true;
    }
    return valid;
};
// // //Validate the nationality field
var checkWage = () => {
    let valid = false;
    var wage = wageEl.value.trim();
    if (!isRequire(wage)) {
        showError(wageEl, '*Required field');
    } else if (!isAmountValid(wage)) {
        showError(wageEl, 'Invalid format')
    } else {
        showSuccess(wageEl);
        valid = true;
    }

    return valid;
};
//Validate the car model field
var checkWasher = () => {
    let valid = false;
    var washer = washerEl.value.trim();
    if (!isRequire(washer)) {
        showError(washerEl, '*Required field');
    } else {
        showSuccess(washerEl);
        valid = true;
    }

    return valid;
};
//Validate the number plate field
var checkNumberPlate = () => {
    let valid = false;
    var numberPlate = numberplateEl.value.trim();
    if (!isRequired(numberPlate)) {
        showError(numberplateEl, '*Required field');
    }else if (!isPlatetrue(numberPlate)) {
        showError(numberplateEl, '*Invalid')
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
        isWasherValid = checkWasher(),
        isDateValid = checkDate(),
        isWageValid = checkWage(),
        isPaymentValid = checkPayment(),
        isVehicleValid = checkVehicle(),
        isNumberPlateValid = checkNumberPlate();
       

    let isFormValid = isUsernameValid &&
        isTimeValid &&
        isDateValid &&
        isWasherValid &&
        isWageValid &&
        isVehicleValid &&
        isPaymentValid &&
        isNumberPlateValid;
        

    // submit to the server if the form is valid
    if (isFormValid) {
        // window.location.href="index.html"
    }
});