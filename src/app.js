const express = require("express");
const taskRoute = require("./routes/task-routes");

const app = express();

app.use(express.json());

app.use("/task", taskRoute);

app.listen(8000, () => console.log("server running on port 8000"));
