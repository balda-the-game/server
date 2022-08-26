module.exports = app => {
  app.listen(app.get("port"), () => console.log(`Balda server is running on port ${app.get("port")}`));
}