const socket = require("../sockets/socket.js");

module.exports = app => {
  if (process.env.NODE_ENV != "test") {
    app.db.sequelize.sync().then(() => {
      app.httpServer = app.listen(
        app.get("port"),
        () => console.log(`Balda server is running on port ${app.get("port")}`)
      );
      app.io = socket.createSocket(app.httpServer, app.libs.config.socketIoAdminAuth);
    });
  }
};