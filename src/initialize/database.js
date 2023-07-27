const { sequelize, User, Task, Assignment } = require("../models");

const mocData = async () => {
  await sequelize.sync({ forc: true });
  await User.bulkCreate([
    {
      name: "a",
    },
    {
      name: "b",
    },
    {
      name: "c",
    },
    {
      name: "d",
    },
  ]);
  await Assignment.bulkCreate([
    {
      name: "AS1",
    },
    {
      name: "AS2",
    },
    {
      name: "AS3",
    },
    {
      name: "AS4",
    },
  ]);
  await Task.bulkCreate([
    {
      userId: 1,
      assignmentId: 1,
      inspectorId: 2,
    },
    {
      userId: 1,
      assignmentId: 2,
      inspectorId: 3,
    },
    {
      userId: 1,
      assignmentId: 3,
      inspectorId: 2,
    },
    {
      userId: 2,
      assignmentId: 1,
      inspectorId: 1,
    },
    {
      userId: 2,
      assignmentId: 2,
      inspectorId: 3,
    },
    {
      userId: 2,
      assignmentId: 3,
      inspectorId: 1,
    },
    {
      userId: 3,
      assignmentId: 1,
      inspectorId: 2,
    },
    {
      userId: 3,
      assignmentId: 2,
      inspectorId: 1,
    },
    {
      userId: 3,
      assignmentId: 3,
      inspectorId: 2,
    },
  ]);
};

try {
  mocData();
} catch (err) {
  console.log(err);
}
