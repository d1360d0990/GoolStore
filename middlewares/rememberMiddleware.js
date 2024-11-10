// const usersDataSource = require("../service/usersDataSource.js");
// async function rememberMiddleware(req, res, next) {
//   if (req.cookies && req.session.user == undefined) {
//     let userList = await usersDataSource.load();
//     let user = userList.find((u) => {
//       return u.email == req.cookies.remember;
//     });
//     req.session.user = user;
//   } else {
//     req.cookies = null;
//   }
//   next();
// }
// module.exports = rememberMiddleware;


const db = require("../database/models"); 

async function rememberMiddleware(req, res, next) {
  
  if (req.cookies && req.session.user == undefined) {
    try {
      
      let user = await db.Usuario.findOne({
        where: { email: req.cookies.remember }
      });

   
      if (user) {
        req.session.user = user;
      }
    } catch (error) {
      console.error("Error al buscar el usuario en la base de datos:", error);
    }
  } else {
   
    req.cookies = null;
  }
  
  next();
}

module.exports = rememberMiddleware;
