// uses busboy to process an image
var busboy = require('connect-busboy');

module.exports = function(req, res, next) {
  req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype){
    file.fileRead = [];
    
    file.on('data', function(chunk) {
      this.fileRead.push(chunk);
    });

    file.on('error', function(chunk){
      // handle error
    });

    file.on('end', function(){
      var finalBuffer = Buffer.concat(this.fileRead);
      
      var file = {
        buffer: finalBuffer,
        size: finalBuffer.length,
        filename: filename,
        mimetype: mimetype.toLowerCase()
      };

      req.files = req.file || {};
      req.files[fieldname] = file;
      // make image accessible on request as photo
      req.set('photo', file);

    });
  });

  req.busboy.on('finish', function() {
    next();
  });

  req.pipe(req.busboy);
};