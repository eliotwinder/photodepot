// checks the user property on the request for a logged in user. 
module.exports = function(req, res, next){ 

  if (req.get('user')) {
  } else {
    //handle not logged in user
    req.set('user', {
      id: 1234,
      username: 'eliot',
      displayname: 'eze',
    });
  }
  
  next();
};