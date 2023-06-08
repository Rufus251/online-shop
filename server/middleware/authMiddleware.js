import jwt from 'jsonwebtoken';
import { User } from "../models/models.js";
export default async function(req, res, next){
    if (req.method === 'OPTIONS'){
        next()
    }
    console.log(req.headers.authorization)
    try{
        const token = req.headers.authorization.split(' ')[1] 
        if(!token){
            return res.status(401).json({message: "Токен не валиден"})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        const user = await User.findOne({ where: { id: decoded.id } });
        if (user.token !== token){
            return res.status(401).json({message: "Устаревший токен"})
        }

        req.user = decoded
        next()
    }catch(e){
        res.status(401).json({message: "Пользователь не авторизован"})
    }
}