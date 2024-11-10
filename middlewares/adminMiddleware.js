// function adminMiddleware(req, res, next) {
//   if (req.session.user) {
//     if (req.session.user.tipo_usuario == "admin") {
//       next();
//     }
//   } else {
//     res.send("Sólo los administradores pueden ingresar a esta pagina");
//     res.redirect("/");
//   }
// }
// module.exports = adminMiddleware;

function adminMiddleware(req, res, next) {
  if (!req.session.user || req.session.user.tipo_usuario !== "admin") {
    res.send(`
      <html>
        <head>
          <title>Acceso Denegado</title>
          <meta http-equiv="refresh" content="3;url=/" />
        </head>
        <body style="text-align: center; padding-top: 20px;">
          <h2>Sólo los administradores pueden ingresar a esta página</h2>
          <p>Serás redirigido a la página de inicio en unos segundos...</p>
        </body>
      </html>
    `);
  } else {
    next();
  }
}

module.exports = adminMiddleware;


module.exports = adminMiddleware;

