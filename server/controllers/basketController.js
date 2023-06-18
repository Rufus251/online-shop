import { BasketDevice, Device } from "../models/models.js";
import ApiError from "../error/apiError.js";

class basketController {
  async create(req, res) {
    try {
      const { basketId, deviceId } = req.body;
      const basDevice = await BasketDevice.create({ basketId, deviceId });
      return res.json(basDevice);
      
    } catch (error) {
      console.log(error)
    }
  }
  async getAll(req, res) {
    try {
      const { basketId } = req.params 
      const basDevice = await BasketDevice.findAll({where:{basketId}});
      return res.json(basDevice);
    } catch (error) {
      console.log(error)
    }
  } 
  async deleteDevice(req, res) {
    try {
      const { basketId, deviceId } = req.params;
      console.log(basketId, deviceId)
      const basDevice = await BasketDevice.destroy({where:{basketId, deviceId}})
      return res.status(200).json({message:"deleted"})
      
    } catch (error) {
      console.log(error)
    }
  }  
}

export default new basketController();
