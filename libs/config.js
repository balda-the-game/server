module.exports = {
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
};