module.exports = app => {
  const Tasks = app.db.models.Tasks;

  const tasksController = {};

  tasksController.onGetAllTasks = async (req, res) => {
    Tasks.findAll({
      where: { user_id: req.user.id }
    })
      .then(result => res.json(result))
      .catch(error => {
        res.status(412).json({ msg: error.message });
      });
  };

  tasksController.onCreateTask = async (req, res) => {
    req.body.user_id = req.user.id;
    Tasks.create(req.body)
      .then(result => res.json(result))
      .catch(error => {
        res.status(412).json({ msg: error.message });
      });
  };

  tasksController.onGetTask = async (req, res) => {
    Tasks.findOne({
      where: {
        id: req.params.id,
        user_id: req.user.id
      }
    })
      .then(result => {
        if (result) return res.json(result);
        return res.sendStatus(404);
      })
      .catch(error => {
        res.status(412).json({ msg: error.message });
      });
  };

  tasksController.onUpdateTask = async (req, res) => {
    Tasks.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.user.id
      }
    })
      .then(() => res.sendStatus(204))
      .catch(error => {
        res.status(412).json({ msg: error.message });
      });
  };

  tasksController.onDeleteTask = async (req, res) => {
    Tasks.destroy({
      where: {
        id: req.params.id,
        user_id: req.user.id
      }
    })
      .then(() => res.sendStatus(204))
      .catch(error => {
        res.status(412).json({ msg: error.message });
      });
  };

  return tasksController;
}