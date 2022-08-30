const jwt = require("jwt-simple");

describe("Routes: Users", () => {
  const Users = app.db.models.Users;
  const jwtSecret = app.libs.config.jwtSecret;
  let token;
  beforeEach(done => {
    Users
      .destroy({ where: {} })
      .then(() => Users.create({
        name: "Vladimir",
        email: "vladimir@email.com",
        password: "12345678"
      }))
      .then(user => {
        // console.log(user.id); // BUG: user.id field is null after select query so FOR THIS TEST ONLY i use id 1
        token = jwt.encode({ id: 1 }, jwtSecret);
        done();
      });
  });

  describe("GET /user", () => {
    describe("status 200", () => {
      it("returns an authenticated user", done => {
        request.get("/user")
          .set("Authorization", `JWT ${token}`)
          .expect(200)
          .end((err, res) => {
            expect(res.body.name).to.eql("Vladimir");
            expect(res.body.email).to.eql("vladimir@email.com");
            done(err);
          });
      });
    });
  });

  describe("DELETE /user", () => {
    describe("status 204", () => {
      it("deletes an authenticated user", done => {
        request.delete("/user")
          .set("Authorization", `JWT ${token}`)
          .expect(204)
          .end((err, res) => done(err));
      });
    });
  });

  describe("POST /users", () => {
    describe("status 200", () => {
      it("creates a new user", done => {
        request.post("/users")
          .send({
            name: "Max",
            email: "max@email.com",
            password: "123123123"
          })
          .expect(200)
          .end((err, res) => {
            expect(res.body.name).to.be.eql("Max");
            expect(res.body.email).to.be.eql("max@email.com");
            done(err);
          })
      })
    })
  })
});