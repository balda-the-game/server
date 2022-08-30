describe("ROUTES", () => {
  describe("Route /", () => {
    it("returns thte API status", (done) => {
      request.get("/")
        .expect(200)
        .end((err, res) => {
          const expected = { status: "Balda API" };
          expect(res.body).to.eql(expected);
          done(err);
        });
    });
  });
});
