module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: true
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    },
    {
      // Function that create asssociation between tables
      classMethods: {
        associate: (models) => {
          Users.hasMany(models.Tasks); // Users 1 - N tasks relationship
        }
      }
    });
  return Users;
}
