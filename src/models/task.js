module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "Task",
    {},
    {
      underscored: true,
    }
  );
  Task.associate = (models) => {
    Task.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    Task.belongsTo(models.User, {
      foreignKey: {
        name: "inspectorId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    Task.belongsTo(models.Assignment, {
      foreignKey: {
        name: "assignmentId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };
  return Task;
};
