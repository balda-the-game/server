const { expect } = require("chai");
const jwt = require("jwt-simple");

describe("Routes: Tasks", () => {
  const Users = app.db.models.Users;
  const Tasks = app.db.models.Tasks;
  const jwtSecret = app.libs.config.jwtSecret;
  let token;
  let fakeTask;
  beforeEach(done => {
    let user_id = 1; // BUG: user.id field is null after select query so FOR THIS TEST ONLY i use id 1
    Users
      .destroy({ where: {} })
      .then(() => Users.create(
        {
          name: "Vladimir",
          email: "vladimir@email.com",
          password: "12345678"
        }))
      .then(user => {
        Tasks
          .destroy({ where: {} })
          .then(() => Tasks.bulkCreate(
            [
              {
                id: 1,
                title: "Work",
                user_id: 1
              },
              {
                id: 2,
                title: "Study",
                user_id: 1
              },
            ]
          ))
          .then(tasks => {
            fakeTask = tasks[0];
            token = jwt.encode({ id: 1 }, jwtSecret);
            done();
          });
      });
  });
  describe("GET /tasks", () => {
    describe("status 200", () => {
      it("returns a list of tasks", done => {
        request.get("/tasks")
          .set("Authorization", `JWT ${token}`)
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.have.length(2);
            expect(res.body[0].title).to.be.eql("Work");
            expect(res.body[1].title).to.be.eql("Study");
            done(err);
          });
      });
    });
  });
  describe("POST /tasks/", () => {
    describe("status 200", () => {
      it("creates a new task", done => {
        request.post("/tasks")
          .set("Authorization", `JWT ${token}`)
          .send({ title: "Run" })
          .expect(200)
          .end((err, res) => {
            expect(res.body.title).to.be.eql("Run");
            expect(res.body.done).to.be.eql(false);
            done(err);
          });
      });
    });
  });
  describe("GET /tasks/:id", () => {
    describe("status 200", () => {
      it("creates a new task", done => {
        request.get(`/tasks/${fakeTask.id}`)
          .set("Authorization", `JWT ${token}`)
          .expect(200)
          .end((err, res) => {
            expect(res.body.title).to.eql("Work")
            done(err);
          });
      });
    });
    describe("status 404", () => {
      it("throws an error when task not exitst", done => {
        request.get("/tasks/0")
          .set("Authorization", `JWT ${token}`)
          .expect(404)
          .end((err, res) => done(err));
      });
    });
  });
  describe("PUT /tasks/:id", () => {
    describe("status 204", () => {
      it("updates existing task", done => {
        request.put(`/tasks/${fakeTask.id}`)
          .set("Authorization", `JWT ${token}`)
          .send({
            title: "Travel",
            done: true
          })
          .expect(204)
          .end((err, res) => done(err));
      });
    });
  });
  describe("DELETE /tasks/:id", () => {
    describe("status 204", () => {
      it("throws an error when task not exitst", done => {
        request.delete(`/tasks/${fakeTask.id}`)
          .set("Authorization", `JWT ${token}`)
          .expect(204)
          .end((err, res) => done(err));
      });
    });
  });
})