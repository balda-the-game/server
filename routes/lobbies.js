module.exports = app => {
  const Lobbies = app.db.models.Lobbies;

  app.route("/lobbies")
    // Every request should be authenticated
    .all(app.auth.authenticate())
    // Get list of all lobbies
    // TODO: get list of lobbies with at least 1 free slot
    .get((req, res) => {
      Lobbies.findAll({
        attributes: ['id', 'title', 'slots', 'free_slots'],
        where: {}
      })
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({ msg: error.message });
        });
    })
    // Create new one lobby
    .post((req, res) => {
      Lobbies.create(req.body)
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({ msg: error.message });
        });
    });
  app.route("/lobbies/:id")
    // Every request should be authenticated
    .all(app.auth.authenticate())
    // Try to connect to lobby with uuid and key
    .get((req, res) => {
      Lobbies.findOne({
        attributes: ['key', 'free_slots'],
        where: { id: req.params.id }
      })
        .then(result => {
          if (result) {
            if (result.free_slots != 0) {
              if (req.body.key == result.key || result.key == null) {
                Lobbies.update(
                  { free_slots: result.free_slots - 1 },
                  { where: { id: req.params.id } }
                );
                return res.json({ msg: "Connected" });
              }
              else return res.status(412).json({ msg: "Wrong lobby key" });
            }
            else return res.status(412).json({ msg: "Unable to connect. Lobby is full" });
          }
          else
            // Lobby not found
            return res.status(412).json({ msg: "Wrong lobby uuid" });
        })
        .catch(error => {
          res.status(412).json({ msg: error.message });
        });
    })
};