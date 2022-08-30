describe("Routes: Token", () => {
  const Users = app.db.models.Users;
  describe("POST /token", () => {
    beforeEach(done => {
      Users
        .destroy({ where: {} })
        .then(() => Users.create(
          {
            name: "Vladimir",
            email: "vladimir@email.com",
            password: "12345678"
          }))
        .then(() => done());
    });
    describe("status 200", () => {
      it("returns authenticated user token", done => {
        request.post("/token")
          .send({
            email: "vladimir@email.com",
            password: "12345678"
          })
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.include.keys("token");
            done(err);
          });
      });
    });
    describe("status 401", () => {
      it("throws error when pass is incorrect", done => {
        request.post("/token")
          .send({
            email: "vladimir@email.com",
            password: "wrongpass"
          })
          .expect(401)
          .end((err, res) => {
            done(err);
          });
      });
      it("throws error when email not exist", done => {
        request.post("/token")
          .send({
            email: "notexisting@email.com",
            password: "12345678"
          })
          .expect(401)
          .end((err, res) => {
            done(err);
          });
      });
      it("throws error when email and password are blank", done => {
        // Test's logic
        request.post("/token")
          .expect(401)
          .end((err, res) => {
            done(err);
          });
      });
    });
  });
});