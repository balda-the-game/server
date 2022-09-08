module.exports = (sequelize, DataTypes) => {
  // Create or change table "Lobbies"
  const Lobbies = sequelize.define("Lobbies",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      key: {
        type: DataTypes.STRING,
        default: "",
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      slots: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 2,
          max: 5,
        }
      },
      free_slots: {
        type: DataTypes.INTEGER,
        default: 0,
        validate: {
          min: 0,
          max: 5,
        }
      },
    },
    {
      classMethods: {
      }
    });
  Lobbies.beforeCreate(async (lobby, _) => {
    // After lobby created all the slots is free
    if (typeof lobby.slots != "number")
      lobby.slots = 2;
    lobby.free_slots = lobby.slots;
    // FIXME: it is possible to pass string as value in 'slots' field. Temporary check it here
  })
  return Lobbies;
};