const router = require("express").Router();
const db = require("../models");

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
    .then((dbWorkouts) => {
      res.json(dbWorkouts);
    })
    .catch((err) => {
      res.json(err);
    });
});

// GET workout range
router.get("/workouts/range", (req, res) => {
  db.Workout.aggregate([
    {
      $addFields: { totalDuration: { $sum: "$exercises.duration" } },
    },
  ])

    .limit(7)
    .then((dbWorkouts) => {
      res.json(dbWorkouts);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
