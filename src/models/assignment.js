module.exports = (sequelize, DataTypes) => {
  const Assignment = sequelize.define(
    "Assignment",
    {
      name: DataTypes.STRING,
    },
    {
      underscored: true,
    }
  );
  Assignment.associate = (models) => {
    Assignment.hasMany(models.Task, {
      foreignKey: {
        name: "assignmentId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };
  return Assignment;
};
