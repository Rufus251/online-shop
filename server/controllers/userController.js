import ApiErrorClass from "../error/apiError.js";

const apiError = new ApiErrorClass()
class UserController {
  async registration(req, res) {}

  async login(req, res) {}

  async checkAuth(req, res, next) {
    const { id } = req.query;
    if (!id) {
      return next(apiError.badRequest("Не указан id"));
    }
    res.json(id);
  }
}

export default new UserController();
