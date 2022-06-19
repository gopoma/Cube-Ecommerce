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

### Documentación Interna

#### Problemas

* En el momento de construir la solución para los filtros, en un comienzo se tenía propuesto, e inclusive se hicieron pruebas sobre funciones que realizaran solamente una operación del filtro, pero el problema era que no era reutilizables y que a la larga se iban a necesitar demasiadas funciones, realizando un análisis más detallado, se necesitaban aproximádamente:
 
$$ 2^n - 1 $$

donde ***n*** es la cantidad de filtros a utilizar, y el método de cálculo fue realizado a través de la Inducción Matemática, puesto a que, por ejemplo, para 2 tipos de filtro, se necesitaban 3 funciones, 2 para filtros solitarios y 1 combinado. Para el caso de 3 filtros, se necesitaban 3 para casos solitarios, 3 para casos combinados de 2 a 2 y 1 para el caso combinado a 3, adornando el cálculo para el caso de ***n*** igual 3 quedaría:

$$ \binom{3}{1} + \binom{3}{2} + \binom{3}{3} = 3 + 3 + 1 = 2^3 - 1 $$

Es en tal medida que se tenía que buscar otra solución y entra ahí utilizar una decoración el criterio de búsqueda que adapta `mongoose`, es decir, que se van limpiando los parámetros y se van pasando a condiciones y si evaluan a `true`, entonces se va decorando nuestro cuerpo de búsqueda. En consecuencia, resultaría una solución resuelta con exactamente ***n*** condiciones, optimizando así el problema, después se agregaron varios filtros más de búsqueda de los 3 que habían, ahora hay 7 :).

* En el manejo de valores booleanos en los query params, se utilizó la siguiente referencia de [mailchimp developer](https://mailchimp.com/developer/release-notes/handling-boolean-query-parameters/)
como guía para la implementación, además de desarrollar la función `parseBoolean` para lograr el cometido.

* Se realizó una refactorización del método `getOrCreateByProvider` custom, teniendo como detonador de posibles Errores la Interfaz implementada en el FrontEnd, en donde había un inconveniente con vincular varios proveedores a un solo correo tanto para el caso de ya contar con el proveedor local o como no contarlo.