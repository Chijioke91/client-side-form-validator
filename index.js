const form = document.querySelector('#form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');

function showError(input, errMsg) {
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');

  formControl.classList.add('error');

  small.innerText = errMsg;
}

function showSuccess(input) {
  const formControl = input.parentElement;

  if (formControl.classList.contains('error')) {
    formControl.classList.remove('error');
  }

  formControl.classList.add('success');
}

function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(String(input.value).toLowerCase())) {
    showSuccess(input);
  } else {
    showError(input, `${getFieldName(input)} must be valid`);
  }
}

function getFieldName(input) {
  let inputVal = input.id;
  return inputVal === 'password2'
    ? 'Confirm Password'
    : inputVal.charAt(0).toUpperCase() + inputVal.slice(1);
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be atleast ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

function checkPasswordMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  }
}

function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordMatch(password, password2);
});
