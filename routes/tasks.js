module.exports = app => {
  const Tasks = app.db.models.Tasks;

  app.route("/tasks")
    .get((req, res) => {
      // "/tasks": List of tasks
      Tasks.findAll({})
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({ msg: error.message });
        });
    })
    .post((req, res) => {
      // "/tasks": Save new task
      Tasks.create(req.body)
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({ msg: error.message });
        });
    });

  app.route("/tasks/:id")
    .get((req, res) => {
      // "/tasks/1": Get a task with id 1
      Tasks.findOne({ where: req.params })
        .then(result => {
          if (result) res.json(result);
          else res.sendStatus(404);
        })
        .catch(error => {
          res.status(412).json({ msg: error.message });
        });
    })
    .post((req, res) => {
      // "/tasks/2": Update task with id 2
      Tasks.update(req.body, { where: req.params })
        .then(() => res.sendStatus(204))
        .catch(error => {
          res.status(412).json({ msg: error.message });
        });
    })
    .delete((req, res) => {
      // "/tasks/3": Delete task with id 3
      Tasks.destroy({ where: req.params })
        .then(() => res.sendStatus(204))
        .catch(error => {
          res.status(412).json({ msg: error.message });
        });
    });
};