var isLoggedIn = require('./middleware/isLoggedIn');
var photoController = require('./controllers/photoController');
var commentController = require('./controllers/commentController');

module.exports = function(app){
  // FETCH PHOTOS
  app.get('api/photo/:photoid', photoController.get);

  // CREATE PHOTO 
  app.post('api/photo', photoController.post);

  // DELETE PHOTO
  app.delete('api/photo/:photoid', photoController.remove);

  // ADD COMMENT 
  // body = {photoid: 1234, text: 'i am a msg'}
  app.post('api/comment', commentController.post);

  // DELETE COMMENT
  app.delete('api/comment/:commentid', commentController.remove);

  // ADD LIKE body = {photoId: 1234}
  app.post('api/like/', photoController.like);
};