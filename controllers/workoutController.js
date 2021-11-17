const express = require("express");
const router = express.Router();
const Workout = require("../models/workoutModel");

router.get("/api/workouts", (req, res) => {
  Workout.aggregate(
    [
      {
        $addFields: {
          totalDuration: {
            $sum: "$exercises.duration",
          },
        },
      },
    ],
  )
  .then(data => {
    res.json(data);
  })
  .catch(err => {
    res.status(404).json(err);
  });
});

router.post("/api/workouts", (req, res) => {
  Workout.create(req.body)
    .then((created) => {
      res.json(created);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
  Workout.findByIdAndUpdate(
    req.params.id,
    { $push: { exercises: req.body } }, {new: true}
  )
  .then(data => {
    res.json(data);
  })
  .catch(err => {
    res.status(404).json(err);
  });
});

router.get("/api/workouts/range", (req, res) => {
  Workout.aggregate(
    [
      {
        $addFields: {
          totalDuration: {
            $sum: "$exercises.duration",
          },
        },
      },
    ],
  ).sort({_id: -1}).limit(7)
  .then(data => {
    res.json(data);
  })
  .catch(err => {
    res.status(404).json(err);
  });
});



module.exports = router;
