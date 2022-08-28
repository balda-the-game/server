module.exports = (sequelize, DataTypes) => {

  // Create or change table "Tasks"
  const Tasks = sequelize.define("Tasks",

    // Object that represent fields of a table
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      done: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },

    {
    classMethods: {
      // Function that create asssociation between tables
      associate: (models) => {
        Tasks.belongsTo(models.Users); // Tasks N - 1 Users relationship
      }
    }
  });
  return Tasks;
};