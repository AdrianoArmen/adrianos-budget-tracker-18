const router = require("express").Router();
const db = require("../models");

// api calls defined to meet functionality

//POST new Workout
router.post("/workouts", (req, res) => {
  db.Workout.create(req.body)
    .then((newWO) => {
      res.json(newWO);
    })
    .catch((err) => {
      res.json(err);
    });
});

//PUT update a workout
router.put("/workouts/:id", (req, res) => {
  db.Workout.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { exercises: req.body } }
  ).then((results) => {
    res.json(results);
  });
});

// GET all workouts
router.get("/workouts", (req, res) => {
  db.Workout.aggregate([
    // totalduration is the agregate of exercise duration total
    {
      $addFields: { totalDuration: { $sum: "$exercises.duration" } },
    },
  ])
    .then((workouts_db) => {
      res.json(workouts_db);
    })
    .catch((err) => {
      res.json(err);
    });
});

// GET workout weekly range
router.get("/workouts/range", (req, res) => {
  db.Workout.aggregate([
    {
      $addFields: { totalDuration: { $sum: "$exercises.duration" } },
    },
  ])

    .limit(7)
    .then((workouts_db) => {
      res.json(workouts_db);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
