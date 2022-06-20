const production = true;
const BASE_URL = production ? "https://still-plateau-02291.herokuapp.com" : "http://localhost:4000"
const statusElement = document.querySelector("#status");
var user = {};

window.onload = showWelcome;

function showMessages(messages, success) {
  const messagesContainer = document.querySelector("#messages");
  messagesContainer.innerHTML = "";
  messages.forEach(message => {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", success ? "message--info" : "message--error");
    messageElement.innerHTML = `<span>${message}</span><span class="message__closer" : "message__closer--error"}">✘</span>`;
    messagesContainer.appendChild(messageElement);
  });
  document.querySelectorAll(".message__closer").forEach(messageCloser => {
    messageCloser.onclick = function() {
      messageCloser.parentNode.parentNode.removeChild(messageCloser.parentNode);
    }
  });
}

const url = `${BASE_URL}/api/auth/validate`;
fetch(url, {credentials:'include'})
.then(response => response.json())
.then(data => {
  if(!data.success) { return; }
  user = data.user;
  showWelcome();
  showMenuUserLogged();
})

function showWelcome() {
  const main = document.querySelector("#main");
  main.innerHTML = `
    <h2>Bienvenido ${(user && user.name)? user.name : ""}</h2>
    <p>Este sistema fue desarrollado por alumnos del primer año de la Escuela Profesional de Ingeniería de Sistemas, de la Universidad Nacional de San Agustín de Arequipa</p>
    <p>El sistema fué desarrollado usando estas tecnologías:</p>
    <ul>
      <li>HTML y CSS</li>
      <li>Perl para el backend</li>
      <li>MariaDB para la base de datos</li>
      <li>Javascript para el frontend</li>
      <li>Las páginas se escriben en lenguaje Markdown</li>
      <li>Se usaron expresiones regulares para el procesamiento del lenguaje Markdown</li>
      <li>La comunicación entre el cliente y el servidor se hizo usando XML de manera asíncrona</li>
    </ul>;
  `;
}

function showMenuUserLogged() {
  const menu = document.querySelector("#menu");
  menu.innerHTML = `
    <p class="navbar__link" onclick="showWelcome()">Home</p>
    <p class="navbar__link" onclick="showProducts()">Products</p>
    <p class="navbar__link" onclick="showCart()">My Cart</p>
    <p class="navbar__link navbar__link--danger" onclick="doLogOut()">LogOut</p>
  `;
}

function showLogin() {
  const main = document.querySelector("#main");
  main.innerHTML = `
    <h3>Login</h3>
    <div>
      <a href="https://still-plateau-02291.herokuapp.com/api/auth/google">Google</a>
      <a href="https://still-plateau-02291.herokuapp.com/api/auth/facebook">Facebook</a>
      <a href="https://still-plateau-02291.herokuapp.com/api/auth/twitter">Twitter</a>
      <a href="https://still-plateau-02291.herokuapp.com/api/auth/github">GitHub</a>
    </div>
    <div class="login-form">
      <input type="email" id="email" placeholder="Email">
      <input type="password" id="password" placeholder="Password">
      <button onclick="doLogin()">Login</button>
    </divid=>
  `;
}

function doLogin() {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const url = `${BASE_URL}/api/auth/login`;
  const credentials = {email, password};
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
    if(!data.success) {
      return showMessages(data.errors, data.success);
    }
    user = data.user;

    showMenuUserLogged();
    showWelcome();
  })
}

function showSignUp() {
  const main = document.querySelector("#main");
  main.innerHTML = `
    <h3>SignUp</h3>
    <div>
      <a href="https://still-plateau-02291.herokuapp.com/api/auth/google">Google</a>
      <a href="https://still-plateau-02291.herokuapp.com/api/auth/facebook">Facebook</a>
      <a href="https://still-plateau-02291.herokuapp.com/api/auth/twitter">Twitter</a>
      <a href="https://still-plateau-02291.herokuapp.com/api/auth/github">GitHub</a>
    </div>
    <div class="signup-form">
      <input type="text" id="name" placeholder="Name">
      <input type="email" id="email" placeholder="Email">
      <input type="password" id="password" placeholder="Password">
      <button onclick="doSignUp()">SignUp</button>
    </div>
  `;
}

function doSignUp() {
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const url = `${BASE_URL}/api/auth/signup`;
  const data = {name, email, password};
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
    if(!data.success) { return showMessages(data.errors.map(error => error.message), data.success); }
    user = data.user;

    showMenuUserLogged();
    showWelcome();
  })
}

function doLogOut() {
  const url = `${BASE_URL}/api/auth/logout`;
  fetch(url, {credentials: 'include'})
  .then(response => response.json())
  .then(data => {
    if(!data.success) { return; }
    user = {};
    showWelcome();
    const menu = document.querySelector("#menu");
    menu.innerHTML = `
      <p class="navbar__link" onclick="showWelcome()">Home</p>
      <p class="navbar__link" onclick="showLogin()">Login</p>
      <p class="navbar__link" onclick="showSignUp()">SignUp</p>
    `;
  })
}

function showProducts(limit = 4, page = 1) {
  const url = `${BASE_URL}/api/products?limit=${limit}&page=${page}`;
  fetch(url, {credentials: 'include'})
  .then(response => response.json())
  .then(data => {
    const products = data.data;
    let productsComponent = "";
    products.forEach(product => {
      productsComponent += `
        <article class="product">
          <div class="product__img-container">
            <img class="product__img" src="${product.images[0]}">
          </div>
          <div class="product__details">
            <h4 class="product__name">${product.name}</h4>
            <div class="product__prizing">
              <strong class="product__price">$${product.price}</strong>
              ${product.offer?"<span class='product__offer'>Special Offer</span>":""}
            </div>
          </div>
        </article>
      `;
    });
    let btnPrevComponent = "<span>✘</span>";
    if(data.prevPage) {
      btnPrevComponent = `<button class='btnPrev' onclick='showProducts(${limit}, ${page - 1})'>Prev</button>`;
    }
    let btnNextComponent = "<span>✘</span>";
    if(data.nextPage) {
      btnNextComponent = `<button class='btnNext' onclick='showProducts(${limit}, ${page + 1})'>Next</button>`;
    }
    const main = document.querySelector("#main");
    main.innerHTML = `
      <h2>Products</h2>
      <section class="products">${productsComponent}</section>
      <div class="btnsPrevNext">
        ${btnPrevComponent}
        ${btnNextComponent}
      </div>
    `;
  });
}

function showCart() {
  const main = document.querySelector("#main");
  main.innerHTML = `
    <h2>My Cart</h2>
  `;
}