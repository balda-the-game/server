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
      language: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          validator(value) {
            if (!["en_US", "ru_RU"].includes(value))
              throw new Error("String is note a language code. Example: en_US, ru_RU");
          }
        }
      },
      dimention: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 5,
          max: 8,
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
      locked: {
        type: DataTypes.BOOLEAN,
        default: false,
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
    lobby.locked = lobby.key != "";
    // FIXME: it is possible to pass string as value in 'slots' field. Temporary check it here
  })
  return Lobbies;
};