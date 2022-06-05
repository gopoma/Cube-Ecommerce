const production = false;
const BASE_URL = production ? "https://still-plateau-02291.herokuapp.com" : "http://localhost:4000"
const signUpForm = document.querySelector("#signUpForm");
signUpForm.onsubmit = function() {
  const url = `${BASE_URL}/api/auth/signup`;
  const data = {
    name: signUpForm.name.value,
    email: signUpForm.email.value,
    password: signUpForm.password.value
  };
  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }

  fetch(url, request)
  .then(response => response.json())
  .then(data => {console.log(data);})
  return false;
}

const logInForm = document.querySelector("#logInForm");
logInForm.onsubmit = function() {
  const url = `${BASE_URL}/api/auth/login`;
  const credentials = {
    email: logInForm.email.value,
    password: logInForm.password.value
  };
  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(credentials)
  };

  fetch(url, request)
  .then(response => response.json())
  .then(data => {console.log(data);})

  return false;
}

const btnLogOut = document.querySelector("#btnLogOut");
btnLogOut.onclick = function() {
  const url = `${BASE_URL}/api/auth/logout`;
  fetch(url)
  .then(response => response.json())
  .then(data => {console.log(data);})
}