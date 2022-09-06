const logger = require("./logger");

module.exports = app => {
  if (process.env.NODE_ENV == "dev")
    return {                            // Dev env config
      database: "balda",
      username: "",
      password: "",
      params: {
        dialect: "sqlite",
        storage: "balda.sqlite",
        logging: (sql) => {
          logger.info(`[${new Date()}] ${sql}`);
        },
        define: {
          underscore: true
        }
      },
      jwtSecret: process.env.JWT_SECRET,
      jwtSession: { session: false }
    }
  else if (process.env.NODE_ENV == "test")
    return {                            // test env config 
      database: "balda",
      username: "",
      password: "",
      params: {
        dialect: "sqlite",
        storage: "test.balda.sqlite",
        logging: false,
        define: {
          underscore: true
        }
      },
      jwtSecret: process.env.JWT_SECRET,
      jwtSession: { session: false }
    }
  else
    return {                         // PROD Config
      database: "balda",
      username: "",
      password: "",
      params: {
        dialect: "sqlite",
        storage: "balda.sqlite",
        define: {
          underscore: true
        }
      },
      jwtSecret: process.env.JWT_SECRET,
      jwtSession: { session: false }
    }
};