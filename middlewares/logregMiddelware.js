function logregMiddleware(req, res, next) {
  if (req.session.user) {
    res.redirect("/");
  } else {
    next();
  }
}
module.exports = logregMiddleware;
