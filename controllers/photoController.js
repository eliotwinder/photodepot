module.exports = {
  // fetch photos
  get: function(req, res) {
    var User = req.app.get('models').User;  
    var Photo = req.app.get('models').Photo;  
    var Comment = req.app.get('models').Comment;
    var Like = req.app.get('models').Like;
    // if url param photoid is defined, only return that photo
    if (req.params.photoid) {
      Photo.findById(photoid)
        .then(function(photo) {
          res.status(200).send([photo.format()])
        })
        .catch(function(error) {
          // handle error
        })
    }

    // SET LIMIT
    var query = {
      limit: req.query.limit || 100
    };

    // if userid is defined, add it to the query
    if (req.query.userid) {
      query.where = {
        UserId: userid
      }
    }

    // QUERY DB, THEN SEND RESULTS
    Photo.findAll(query)
      .then(function(photos){
        // FORMAT FOR SENDING
        var photos = photos.map(function(photo){
          return photo.format();
        });
        res.status(200).send(photos);
      })
      .catch(function(error){
        // handle error
      })
  },

  // add a photo to the database, return the photo
  post: function(req, res) {
    var photo = req.app.get('photo');

    var base64Uri = photo.buffer.toString('base64');

    var photo = {
      contentType: req.get('content-type'),
      base64Uri: base64Uri,
      UserId: req.user.id
    };

    Photo.create(photo)
      .then(function(photo) {
        res.status(201).send(photo);
      })
      .catch(function(error) {
        // handle error
      })
  },

  // DELETE A PHOTO
  remove: function(req, res) {
    var Photo = req.app.get('photo');
    var photoid = req.param.photoid;

    Photo.findOne({where: {
      id: photoid,
    }})
      .then(function(photo) {
        // if req.user is the same as the user that posted the photo they are trying to delete
        if (req.user.id === photo.User.id) {
          // delete the photo 
          return Photo.destroy()
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
  },

  // LIKE A PHOTO
  like: function(req, res) {
    var Like = req.app.get('models').Like;

    Like.create({
      PhotoId: req.body.photoId,
      UserId: req.user.id,
    })
      .then(function(like) {
        res.status(201).send();
      })
      .catch(function(error) {
        //handle error
      })
  }   

};