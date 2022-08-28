module.exports = app => {
  const Users = app.db.models.Users;

  // "/users/1": Get data of user with id 1
  app.get("/users/:id", (req, res) => {
    Users.findById(req.params.id, {
      attributes: ["id", "name", "email"]
    })
      .then(result => res.json(result))
      .catch(error => {
        res.status(412).json({ msg: error.message });
      });
  });

  app.post("/users", (req, res) => {
    Users.create(req.body)
      .then(result => res.json(result))
      .catch(error => {
        res.status(412).json({ msg: error.message });
      });
  });

  app.delete("/users/:id", (req, res) => {
    // "/users/3": Delete user with id 3
    Users.destroy({ where: { id: req.params.id } })
      .then(() => res.sendStatus(204))
      .catch(error => {
        res.status(412).json({ msg: error.message });
      });
  });
};