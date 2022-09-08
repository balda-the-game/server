module.exports = app => {
  const lobbies = app.controllers.lobbies;
  app.route("/lobbies")
    .all(app.auth.authenticate())
    .get(lobbies.onGetAllLobbies)
    .post(lobbies.onCreateLobby);

  app.route("/lobbies/:id")
    .all(app.auth.authenticate())
    .get(lobbies.onConnect);
};