import { v4 as uuidv4 } from "uuid";
import path from "path";

import { Device } from "../models/models.js";

import ApiErrorClass from "../error/apiError.js";
const apiError = new ApiErrorClass();

class DeviceController {
  async create(req, res, next) {
    try {
      const { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;

      let fileName = uuidv4() + ".jpg";
      const finalPath = path.resolve("..") + "/server/static/" + fileName;
      console.log(finalPath);
      img.mv(finalPath);

      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      });

      return res.json(device);
    } catch (e) {
      next(apiError.badRequest(e.message));
    }
  }
  async getAll(req, res) {}
  async getOne(req, res) {}
}

export default new DeviceController();
