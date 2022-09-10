const { expect } = require("chai");
const jwt = require("jwt-simple");

describe("Routes: Lobbies", () => {
  const Users = app.db.models.Users;
  const Lobbies = app.db.models.Lobbies;
  const jwtSecret = app.libs.config.jwtSecret;
  let token;
  let fakeLobby;
  beforeEach(done => {
    Users
      .destroy({ where: {} })
      .then(() => Users.create(
        {
          name: "Vladimir",
          email: "vladimir@email.com",
          password: "12345678"
        }))
      .then(user => {
        Lobbies
          .destroy({ where: {} })
          .then(() => Lobbies.bulkCreate(
            [
              // Free to connect
              {
                id: "1b69ed8c-2c3c-41af-85ca-bf1fdb8daf3e",
                title: "Free 4 players game",
                slots: 4,
                free_slots: 4
              },
              // Needs a correct pass to connect
              {
                id: "357d24bc-38a9-4da1-922a-d9f887634491",
                title: "Pass locked 2 players game",
                key: "1234",
                slots: 2,
                free_slots: 2
              },
              // Unable to connect because free_slots = 0
              {
                id: "687599d0-0ef9-49ca-bb15-eb1a2fff33d7",
                title: "Full no pass 5 players lobby",
                slots: 5,
                free_slots: 0
              },
            ]
          ))
          .then(lobbies => {
            fakeLobby = lobbies[0];
            token = jwt.encode({ id: 1 }, jwtSecret);
            done();
          });
      });
  });
  describe("GET /lobbies/", () => {
    describe("status 200", () => {
      it("returns a list of lobbies", done => {
        request.get("/lobbies")
          .set("Authorization", `JWT ${token}`)
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.have.length(3);
            expect(res.body[0].title).to.be.eql("Free 4 players game");
            expect(res.body[1].title).to.be.eql("Pass locked 2 players game");
            expect(res.body[2].title).to.be.eql("Full no pass 5 players lobby");
            done(err);
          });
      });
    });
  });
  describe("POST /lobbies/", () => {
    describe("status 200", () => {
      it("Create new lobby with 4 slots and key '2323'", done => {
        request.post("/lobbies")
          .set("Authorization", `JWT ${token}`)
          .send({ title: "New lobby", slots: 4, key: "2323" })
          .expect(200)
          .end((err, res) => {
            expect(res.body.title).to.be.eql("New lobby");
            expect(res.body.key).to.be.eql("2323");
            expect(res.body.slots).to.be.eql(4);
            expect(res.body.free_slots).to.be.eql(4);
            done(err);
          });
      });
    });
    describe("status 412", () => {
      it("throws an error when no 'title' key was set", done => {
        request.post("/lobbies")
          .set("Authorization", `JWT ${token}`)
          .send({ slots: 2, key: "2323" })
          .expect(412)
          .end((err, res) => done(err));
      });
      it("throws an error when no 'slots' key was set", done => {
        request.post("/lobbies")
          .set("Authorization", `JWT ${token}`)
          .send({ title: "New lobby", key: "2323" })
          .expect(412)
          .end((err, res) => done(err));
      });
      it("throws an error when 'slots' key is < 2", done => {
        request.post("/lobbies")
          .set("Authorization", `JWT ${token}`)
          .send({ title: "title", slots: 1 })
          .expect(412)
          .end((err, res) => done(err));
      });
      it("throws an error when 'slots' key is > 5", done => {
        request.post("/lobbies")
          .set("Authorization", `JWT ${token}`)
          .send({ title: "title", slots: 6 })
          .expect(412)
          .end((err, res) => done(err));
      });
    });
  });
  describe("GET /lobbies/:id", () => {
    describe("status 200", () => {
      it("Connect to the free lobby without key", done => {
        request.get(`/lobbies/${fakeLobby.id}`)
          .set("Authorization", `JWT ${token}`)
          .expect(200)
          .end((err, res) => {
            expect(res.body.msg).to.eql("Connected")
            done(err);
          });
      });
      it("Connect to the free key protected lobby with valid key", done => {
        request.get(`/lobbies/357d24bc-38a9-4da1-922a-d9f887634491`)
          .set("Authorization", `JWT ${token}`)
          .send({key: "1234"})
          .expect(200)
          .end((err, res) => {
            expect(res.body.msg).to.eql("Connected")
            done(err);
          });
      });
    });
    describe("status 412", () => {
      it("throws an error when the key is wrong", done => {
        request.get(`/lobbies/357d24bc-38a9-4da1-922a-d9f887634491`)
          .set("Authorization", `JWT ${token}`)
          .send({key: "wrong_pass"})
          .expect(412)
          .end((err, res) => {
            expect(res.body.msg).to.eql("Wrong lobby key");
            done(err);
          });
      });
      it("throws an error when lobby is already full", done => {
        request.get(`/lobbies/687599d0-0ef9-49ca-bb15-eb1a2fff33d7`)
          .set("Authorization", `JWT ${token}`)
          .expect(412)
          .end((err, res) => {
            expect(res.body.msg).to.eql("Unable to connect. Lobby is full");
            done(err);
          });
      });
      it("throws an error when lobby not found", done => {
        request.get("/lobbies/wrong-lobby-uuid-example")
          .set("Authorization", `JWT ${token}`)
          .expect(412)
          .end((err, res) => {
            expect(res.body.msg).to.eql("Wrong lobby uuid");
            done(err);
          });
      });
    });
  });
})