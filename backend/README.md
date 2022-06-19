# Cube Ecommerce

Este sistema fue desarrollado haciendo uso de la **Arquitectura Orientada a Servicios (SOA)**

**API Documentation:** [Click me :D!](https://documenter.getpostman.com/view/19249423/UzBmMSX3)

El sistema fué desarrollado usando estas tecnologías:

* `HTML`, `CSS` y vanilla `JavaScript` para el FrontEnd.
* `NodeJS` para el backend a través del framework `Express`.
* `MongoDB` para la base de datos.
* El ODM `Mongoose` para la validación y modelado de objetos en el modelo.
* La comunicación entre el cliente y el servidor se hizo usando `JSON` de manera asíncrona.
* `HttpOnly Cookies` para el control de flujo en la autenticación.
* `Stripe` para el manejo de los pagos.
* `Passport` para el inicio de sesión con redes sociales.

**Librerías empleadas en el lado del Servidor:**

* `bcrypt`
* `cookie-parser`
* `cors`
* `cross-env`
* `dotenv`
* `express`
* `express-session`
* `jsonwebtoken`
* `mongoose`
* `morgan`
* `passport`
* `passport-facebook`
* `passport-github2`
* `passport-google-oauth20`
* `passport-twitter`
* `stripe`
* `uuid`

## Getting Started

First, clone the repository and install all the dependencies of the project by using:

```bash
npm install
```

Fill the details in a `.env` file taking into consideration `.env.example` template, in the case of the authentication with social media, you have also to get that data from the corresponding providers.

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open http://localhost:4000 with the browser to see the result.

You also can add features by modifying any selected file in the src directory.

###### Happy Coding or Running :D!