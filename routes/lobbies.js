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
  app.route("/:lobby_guid")
    // Every request should be authenticated
    .all(app.auth.authenticate())
    // Try to connect to lobby with uuid and key
    .get((req, res) => {
      const query = {
        where: {
          id: req.params.id
        }
      };
      if (req.params.key) {
        where.key = req.params.key
      };
      Lobbies.findOne(query)
        .then(result => {
          if (result)
            return res.json(result);
          else
            // Lobby not found
            return res.sendStatus(401);
        })
        .catch(error => {
          // Aunouthorized
          res.status(412).json({ msg: error.message });
        });
    })
};