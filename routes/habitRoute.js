const express = require("express")
const habitController = require("../controllers/habitController")

const habitRouter = express.Router();

habitRouter.get("/getHabits",habitController.getHabits);
habitRouter.post("/addHabit",habitController.addHabit);
habitRouter.put("/updateHabit",habitController.updateHabit);
habitRouter.delete("/deleteHabit",habitController.deleteHabit);

module.exports = habitRouter;