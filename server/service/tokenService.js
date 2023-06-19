import jwt from "jsonwebtoken";

class tokenService {
  generateJwt(id, email, role) {
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

  checkToken(token){
    try {
        const jwtToken = jwt.verify(token, process.env.SECRET_KEY);
        return jwtToken
    } catch (error) {
        return {
            status: 401,
            message: "Token not valid"
        }
    }
  }
}

export default new tokenService();
