import ApiErrorClass from "../error/apiError.js";

import bcrypt, { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { User, Basket } from "../models/models.js";

function generateJwt(id, email, role) {
  return jwt.sign(
    {
      id,
      email,
      role,
    },
    process.env.SECRET_KEY,
    { expiresIn: "7d" }
  );
}

const apiError = new ApiErrorClass();

class UserController {
  async registration(req, res, next) {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return next(apiError.badRequest("Не указан email или пароль"));
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(
        apiError.badRequest("Пользователь с таким email уже существует")
      );
    }

    const hashPassword = await bcrypt.hash(password, 7);
    const user = await User.create({ email, role, password: hashPassword });

    const basket = await Basket.create({ userId: user.id });
    const token = generateJwt(user.id, user.email, user.role);

    user.token = token
    await user.save()

    return res.json({ token }, user.role, basket);
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return next(apiError.internal("Пользователь не найден"));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(apiError.internal("Неверный пароль"));
    }
    const userId = user.id;
    const basket = await Basket.findOne({ where: { userId } });
    const token = generateJwt(user.id, user.email, user.role);
    user.token = token
    await user.save()
    return res.json({ token, role: user.role, basket });
  }

  async checkAuth(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    const user = await User.findOne({ where: { id: req.user.id } });
    const basket = await Basket.findOne({ where: { userId: user.id } });
    user.token = token
    await user.save()
    return res.status(200).json({user, basket});   
  }
}

export default new UserController();
