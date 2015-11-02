module.exports = {
  // post a comment
  post: function(req, res) {
    var Comment = req.app.get('models').comment;

    // Create comment in db
    Comment.create({
      // TODO: make sure sequelize sanitizes req.body.text
      PhotoId: req.body.photoId,
      text: req.body.text,
      UserId: req.user.id,
    })
      .then(function(comment) {
        res.status(201).send(comment);
      })
      .catch(function(error) {
        // handle error
      })
  },

  remove: function(req, res) {
    var Comment = req.app.get('models').comment;
    var commentid = req.param.commentid;
    // remove a comment
    Comment.findOne({where: {
      id: commentid
    }})
      .then(function(comment) {
        // if req.user is the same as the user that posted the photo they are trying to delete
        if (req.user.id === comment.User.id) {
          // delete the photo 
          return Comment.destroy();
        } else {
          return false;
        }
      })
      .then(function(data){
        if (data){
          res.status(204).end();
        } else 
          res.status(401).end();
      })
      .catch(function(error) {
        //handle error
      });

  }
};