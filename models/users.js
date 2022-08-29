import bcrypt from "bcrypt";

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
      hooks: {
        beforeCreate: user => {
          const salt = bcrypt.genSaltSync();
          user.password = bcrypt.hashSync(user.password, salt);
        }
      },
      classMethods: {
      }
    }
  );

  Users.associate = (models) => {
    Users.hasMany(models.Tasks); // Users 1 - N tasks relationship
  };

  // FIXME: THIS METHODs DOES NOT WORK IN classMethods. Why?
  Users.isPassword = (encodedPassword, password) => {
    return bcrypt.compareSync(password, encodedPassword);
  };

  return Users;
};
