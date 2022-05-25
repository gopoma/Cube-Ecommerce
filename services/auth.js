const UserService = require("./users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {jwtSecret} = require("../config");

class AuthService {
  async login(data) {
    const {email, password} = data;

    const userServ = new UserService();
    const user = await userServ.getByEmail(email);

    if(user && await this.#compare(password, user.password)) {
      return this.#getUserData(user);
    }

    return {
      success: false,
      errors: [{
        credentials: "Las credenciales son incorrectas"
      }]
    };
  }

  async signup(data) {
    if(data && data.password) {
      data.password = await this.#encrypt(data.password);
    }

    const userServ = new UserService();
    const result = await userServ.create(data);

    if(!result.created) {
      return {
        success: false,
        errors: result.errors
      };
    }
    return this.#getUserData(result.user);
  }

  #getUserData(user) {
    const userWithNoSensitiveData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    const token = this.#createToken(userWithNoSensitiveData);
    return {
      success: true,
      user: userWithNoSensitiveData,
      token
    };
  }

  #createToken(payload) {
    const token = jwt.sign(payload, jwtSecret, {
      expiresIn: "7d"
    });
    return token;
  }

  async #encrypt(str) {
    try {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(str, salt);

      return hash;
    } catch(error) {
      console.log(error);
    }
  }

  async #compare(str, hash) {
    try {
      return await bcrypt.compare(str, hash);
    } catch(error) {
      return false;
    }
  }
}

module.exports = AuthService;