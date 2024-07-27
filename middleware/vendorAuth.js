const jwt = require('jsonwebtoken');
const knex = require('../database/knex.config')()

async function authentication(req, res, next) {
  if (!req.headers.authorization) {
    return res.json({ message: "unauthorized" });
  }
  const token = req.headers.authorization.split(" ")[1];
  const decodedJwtToken = jwt.decode(token);
    if (decodedJwtToken.userType === 'user') {
      const user = await knex('users').where({ email: decodedJwtToken.email }).first();
      
      const isRevoked = await knex('accessToken')
        .where({ userId: user.id, jtiId: decodedJwtToken.jti, revoked: true })
        .first();
        
      if (!user || isRevoked) {
        return res.json({ message: "unauthorized" });
      }

      req.user = {
        userId: user.id,
        email: user.email,
        jtiId: decodedJwtToken.jti,
        userType: decodedJwtToken.userType
      };
      return next();
    } else if (decodedJwtToken.userType === 'vendor') {
      const vendor = await knex('vendor').where({ email: decodedJwtToken.email }).first();
      const isRevoked = await knex('vendorAccessToken')
     
        .where({ vendorId: vendor.id, jtiId: decodedJwtToken.jti, revoked: true })
        .first();
      if (!vendor || isRevoked) {
        return res.json({ message: "unauthorized" });
      }

      req.user = {
        vendorId: vendor.id,
        email: vendor.email,
        jtiId: decodedJwtToken.jti,
        userType: decodedJwtToken.userType
      };
   
      return next();
    }
 
}

module.exports = authentication;


