module.exports = app => {
  app.post("/token", app.controllers.token.onGetToken);
}