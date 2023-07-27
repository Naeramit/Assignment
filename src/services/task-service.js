const { User, Task, Assignment } = require("../models");
const { Op } = require("sequelize");

exports.getTaskEachUser = (userIdArr) =>
  Task.findAll({
    where: {
      userId: { [Op.in]: userIdArr },
      inspectorId: { [Op.in]: userIdArr },
    },
    attributes: ["userId", "inspectorId"],
  });
