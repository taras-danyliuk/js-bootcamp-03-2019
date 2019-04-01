const router = require("express").Router();
const fs = require("fs");
const request = require("request");

const Post = require("../models/post");

const posts = [
  {id: 1, image: "http://i.imgur/fasfe.png"}
];


// Helpers
function getBiggestId() {
  let biggestId = -1;
  posts.forEach(post => {
    if (post.id > biggestId) biggestId = post.id;
  });
  return biggestId;
}

function getPostById(id) {
  for(const post of posts) {
    if (post.id === +id) return user;
  }

  return null;
}


router.get("/", (req, res) => {
  res.send(posts);
})

router.get("/:userId", (req, res) => {
  const targetId = req.params.userId;
  const targetPost = getPostById(targetId);

  if (targetPost) res.send({post: targetPost});
  else res.send({error: `Post not found (id: ${targetId})`});
})

router.get("/:id", (req, res) => {
  const targetId = req.params.id;
  const targetPost = getPostById(targetId);

  if (targetPost) res.send({post: targetPost});
  else res.send({error: `Post not found (id: ${targetId})`});
})

router.post("/", (req, res) => {
  // req.body.imageAsBase64
  // Validation
  function uploadImageToImgur(base64, cb) {
    const post = request.post('https://api.imgur.com/3/image', {
      headers: {
        'Authorization': "Bearer 8007ca856c67c01c49fd42315d96d694681be621",
      }
    }, (error, response, body) => {
      // Send error
      if (error) return cb(error, null);
    
      // Send response
      result = JSON.parse(body);
      return cb(null, result.data.link);
    });

    const upload = post.form();
    upload.append('type', 'file');
    upload.append('image', base64);
  }

  // uploadImageToImgur(req.body.imageAsBase64, (err, imageLink) => {
  //   if (err) return res.send({ status: "error", error: err });

  //   Post.create({ ...req.body, imageUrl: imageLink }).then(result => {
  //     res.send({ status: "created", id: result._id });
  //   });
  // })
  

  fs.readFile(`${process.cwd()}/images/354_1.jpg`, (err, data) => {
    if (err) return resolve(null);

    const base64Image = new Buffer(data, 'binary').toString('base64');

    uploadImageToImgur(base64Image, (err, imageLink) => {
      if (err) return res.send({ status: "error", error: err });
  
      Post.create({ ...req.body, imageUrl: imageLink }).then(result => {
        res.send({ status: "created", id: result._id });
      });
    })
  });
})


module.exports = router;