

var typeEl = document.querySelector('#type')
var usernameEl = document.querySelector('#username');
var emailEl = document.querySelector('#email');
var passwordEl = document.querySelector('#password');
var confirmPasswordEl = document.querySelector('#confirm-password');
var dObEl = document.querySelector('#age');
var form = document.querySelector('#signup')
var nId = document.querySelector('#nin')
var telEl = document.querySelector('#telephone')

form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();

});

//The following isRequired() function returns true if the input argument is empty:
var isRequired = value => value === '' ? false : true;
var isRequire = value => value === 'none' ? false : true;
//The following isBetween() function returns false if the length argumet is not between the min and max argument:
var isBetween = (length, min, max) => length < min || length > max ? false : true;
//To check the email is valid, you’ll use a regular expression:
var isEmailValid = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};
//To check if a password is strong, which match specified pattern, you’ll also use a regular expression:
var isPasswordSecure = (password) => {
    var re = new RegExp("(?=.*[!@#\$%\^&\*])(?=.{8,})"); // this regex wil require the password to have atleast 8 characters and one special character
    return re.test(password);
};
var isNINtrue = (id) => {
    var re = new RegExp("(?=.*[A-Z])(?=.{8,})"); // this regex wil require the password to have atleast 8 characters and one special character
    return re.test(id);
};
var isPhoneValid = (number) => {
    var re = new RegExp("(/^[0-9]+$/)"); // this regex wil require the password to have atleast 8 characters and one special character
    return re.test(number);
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
        showError(usernameEl, ' Username cannot be blank.');
    } else if (!isBetween(username.length, min, max)) {
        showError(usernameEl, `Username must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(usernameEl);
        valid = true;
    }
    return valid;
}
//Validate the email field
var checkEmail = () => {
    let valid = false;
    var email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email is not valid.')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
}

var checkAge = () => {
    let valid = false;
    var dOb = dObEl.value.trim();
    if (!isRequired(dOb)) {
        showError(dObEl, 'Date of birth cannot be blank and must be 18 years.');
    } else {
        showSuccess(dObEl);
        valid = true;
    }

    return valid;
};

var checkIdNumber = () => {
    let valid = false;
    var nationalid = nId.value.trim();
    if (!isRequired(nId)) {
        showError(nId, '*ID number cannot be blank.');
    } else if (!isNINtrue(nationalid) || nId.value !== 14) {
        showError(nId, '*Invalid ID number');
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
    if (isRequired(phone)) {
        showError(telEl, '');
    } if(!isBetween(phone.length, min, max)) {
        showError(telEl, `Telephone number must be either ${min} or ${max} characters.`)
    } else if (!isPhoneValid(number)) {
        showError(telEl, 'Telephone number is ivalid.');
    }else {
        showSuccess(telEl);
        valid = true;
    }
    return valid;
}

var checkType = () => {
    let valid = false;
    var typeE = typeEl.value.trim();
    if (!isRequire(typeE)) {
        showError(typeEl, 'Please select type of employee.');
    } else {
        showSuccess(typeEl);
        valid = true;
    }

    return valid;
};

//Validate the password field
var checkPassword = () => {
    let valid = false;
    var password = passwordEl.value.trim();
    if (!isRequired(password)) {
        showError(passwordEl, 'Password cannot be blank.');
    } else if (!isPasswordSecure(password)) {
        showError(passwordEl, 'Password must has at least 8 characters that include at least 1 special character in (!@#$%^&*)');
    } else {
        showSuccess(passwordEl);
        valid = true;
    }

    return valid;
};
//Validate the confirm password field
var checkConfirmPassword = () => {
    let valid = false;
    // check confirm password
    var confirmPassword = confirmPasswordEl.value.trim();
    var password = passwordEl.value.trim();

    if (!isRequired(confirmPassword)) {
        showError(confirmPasswordEl, 'Please enter the password again');
    } else if (password !== confirmPassword) {
        showError(confirmPasswordEl, 'Confirm password does not match');
    } else {
        showSuccess(confirmPasswordEl);
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
        isEmailValid = checkEmail(),
        isTypeValid = checkType(),
        isTelValid = checkTel(),
        isdOb = checkAge(),
        isIDValid = checkIdNumber(),
        isPasswordValid = checkPassword(),
        isConfirmPasswordValid = checkConfirmPassword();

    let isFormValid = isUsernameValid &&
        isEmailValid &&
        isTypeValid &&
        isTelValid &&
        isPasswordValid &&
        isIDValid &&
        isdOb &&
        isConfirmPasswordValid;

    // submit to the server if the form is valid
    if (isFormValid) {
        window.location.href="log-in.html"
    }
});