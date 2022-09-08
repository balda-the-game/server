module.exports = app => {
  const users = app.controllers.users;
  app.route("/user")
    .all(app.auth.authenticate())
    .get(users.onGetUserData)
    .delete(users.onDeleteUser);

  app.route("/users")
    .post(users.onCreateUser);
};