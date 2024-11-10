function sessionMiddleware (req, res, next)  {
  if (req.session && req.session.user) {
    // console.log("Usuario en la sesión:", req.session.user); 
      res.locals.user = req.session.user;
  } else {
      res.locals.user = null; // o lo que prefieras poner si no hay usuario
  }
  next();
};
module.exports = sessionMiddleware;