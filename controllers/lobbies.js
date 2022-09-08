module.exports = app => {
  const Lobbies = app.db.models.Lobbies;
  const lobbiesController = {};

  // Get list of all lobbies
  // TODO: get list of lobbies with at least 1 free slot
  lobbiesController.onGetAllLobbies = async (req, res) => {
    Lobbies.findAll({
      attributes: ['id', 'title', 'slots', 'free_slots'],
      where: {}
    })
      .then(result => res.json(result))
      .catch(error => {
        res.status(412).json({ msg: error.message });
      });
  };
  lobbiesController.onCreateLobby = async (req, res) => {
    Lobbies.create(req.body)
      .then(result => {
        // TODO: Return appropriate data when create new lobby
        res.json(result)
      })
      .catch(error => {
        res.status(412).json({ msg: error.message });
      });
  };
  // Try to connect to lobby with uuid and key
  lobbiesController.onConnect = async (req, res) => {
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
              // TODO: create a websocket and connect user to it.
              // TODO: Start the game when everyone is ready
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
  };

  return lobbiesController;
}