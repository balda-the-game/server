module.exports = app => {
  const Users = app.db.models.Users;
  const usersController = {};

  usersController.onGetUserData = async (req, res) => {
    Users.findByPk(req.user.id, {
      attributes: ["id", "name", "email"]
    })
      .then(result => res.json(result))
      .catch(error => {
        res.status(412).json({ msg: error.message });
      });
  },
  usersController.onDeleteUser = async (req, res) => {
    Users.destroy({ where: { id: req.user.id } })
      .then(() => res.sendStatus(204))
      .catch(error => {
        res.status(412).json({ msg: error.message });
      });
  },
  usersController.onCreateUser = async (req, res) => {
    Users.create(req.body)
      .then(result => res.json(result))
      .catch(error => {
        res.status(412).json({ msg: error.message });
      });
  }
  return usersController;
}