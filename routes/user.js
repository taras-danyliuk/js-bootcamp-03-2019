const router = require("express").Router();

const User = require("../models/user");

const users = [
  {id: 1, name: "John Doe"}
];

// Helpers
function getBiggestId() {
  let biggestId = -1;
  users.forEach(user => {
    if (user.id > biggestId) biggestId = user.id;
  });
  return biggestId;
}

function getUserById(id) {
  for(const user of users) {
    if (user.id === +id) return user;
  }

  return null;
}


router.get("/", (req, res) => {
  User.find({}, 'email createdAt').exec().then(allUsers => {
    res.send({status: "success", users: allUsers});
  })
})

router.get("/:id", (req, res) => {
  User.findOne({_id: req.params.id}, 'email createdAt').exec().then(user => {
    res.send({status: "success", user});
  })
})

// Registration
router.post("/", (req, res) => {
  // Validation

  User.create(req.body)
    .then(result => {
      res.send({ status: "created", id: result._id });
    })
    .catch(err => {
      res.send({ status: "error", error: err });
    })
});

// Authentification
router.post("/authentificate", (req, res) => {
  const { email, password } = req.body;
  // Validation

  User.findOne({ email, password })
    .then(result => {
      if (result) {
        res.send({ status: "successful", id: result._id });
      }
      else res.send({ status: "error", message: "user not found" });
    })
    .catch(err => {
      res.send({ status: "error", error: err });
    })
});




module.exports = router;