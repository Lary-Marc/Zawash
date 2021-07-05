

// var usernameEl = document.querySelector('#username');
var emailEl = document.querySelector('#email');
var passwordEl = document.querySelector('#password');

var form = document.querySelector('#login')



form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();

});

//The following isRequired() function returns true if the input argument is empty:
var isRequired = value => value === '' ? false : true;
//The following isBetween() function returns false if the length argumet is not between the min and max argument:
// var isBetween = (length, min, max) => length < min || length > max ? false : true;

var isEmailValid = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};
//To check if a password is strong, which match specified pattern, you’ll also use a regular expression:
var isPasswordSecure = (password) => {
    var re = new RegExp("(?=.*[!@#\$%\^&\*])(?=.{8,})"); // this regex wil require the password to have atleast 8 characters and one special character
    return re.test(password);
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


//modify button event handler
form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();

    // validate forms
    let
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword();
        

    let isFormValid = isEmailValid &&
        isPasswordValid;

    // submit to the server if the form is valid
    if (isFormValid) {
    //  window.location.href="register.html"
    }
});