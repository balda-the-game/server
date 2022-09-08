module.exports = app => {
  const tasksController = app.controllers.tasks;

  app.route("/tasks")
    .all(app.auth.authenticate())
    .get(tasksController.onGetAllTasks)
    .post(tasksController.onCreateTask);

  app.route("/tasks/:id")
    .all(app.auth.authenticate())
    .get(tasksController.onGetTask)
    .put(tasksController.onUpdateTask)
    .delete(tasksController.onDeleteTask);
};