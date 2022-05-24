const UserModel = require("../models/user");
const dbError = require("../helpers/dbError");
class UserService {
  async getByEmail(email) {
    try {
      const user = await UserModel.findOne({email});
      return user;
    } catch(error) {
      console.log(error);
      return error;
    }
  }

  async create(data) {
    try {
      const user = await UserModel.create(data);
      return {
        created: true,
        user
      };
    } catch(error) {
      return dbError(error);
    }
  }
}

module.exports = UserService;