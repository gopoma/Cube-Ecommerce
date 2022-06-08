const production = true;
const BASE_URL = production ? "https://still-plateau-02291.herokuapp.com" : "http://localhost:4000"
const statusElement = document.querySelector("#status");

const url = `${BASE_URL}/api/auth/validate`;
fetch(url, {credentials:'include'})
.then(response => response.json())
.then(data => {
  console.log(data);
  statusElement.textContent = data.success ? "Logged In" : "Invitado";
})

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
    body: JSON.stringify(data),
    credentials: 'include'
  }

  fetch(url, request)
  .then(response => response.json())
  .then(data => {
    // console.log(data);
    statusElement.textContent = data.success ? "Logged In" : "A wild error in SignUp was appeared!"
  })
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
    body: JSON.stringify(credentials),
    credentials: 'include'
  };

  fetch(url, request)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    statusElement.textContent = data.success ? "Logged In" : data.errors[0];
  })

  return false;
}

const btnLogOut = document.querySelector("#btnLogOut");
btnLogOut.onclick = function() {
  const url = `${BASE_URL}/api/auth/logout`;
  fetch(url, {credentials: 'include'})
  .then(response => response.json())
  .then(data => {
    console.log(data);
    statusElement.textContent = "Invitado"; 
  })
}

const btnFetchUsers = document.querySelector("#btnFetchUsers");
btnFetchUsers.onclick = function() {
  const url = `${BASE_URL}/api/users`;

  fetch(url, {credentials: 'include'})
  .then(response => response.json())
  .then(data => {console.log(data);})
}
