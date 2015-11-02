module.exports = function(sequelize, dataTypes) {
  return sequelize.define('Photo', {
    base64Uri: dataTypes.STRING,
    contentType: dataTypes.STRING
  },{
    instanceMethods: {
      // FORMATS A PHOTO TO SEND OVER RESPONSE
      format: function(){
        
        var photo = {
          photoId: this.id,
          user: {
            username: this.User.username,
            displayname: this.User.displayname
          },
          image: {
            base64Uri: this.base64Uri,
            contentType: this.contentType
          },
          likes: [],
          comments: [],
        };

        // HANDLE LIKES
        this.Likes.forEach(function(like){
          photo.likes.push(like.User.username);
        });

        // HANDLE COMMENTS
        this.Comments.forEach(function(comment) {
          photo.comments.push({
            commentId: comment.id,
            username: comment.User.name,
            comment: comment.text
          })
        });

        return format;
      }
    }
  });
};