/**
 * Created by ajsta on 1/18/2017.
 *
 * http://www.codingdefined.com/2016/01/file-upload-in-nodejs.html
 *
 */

var express = require('express');
var multer = require('multer');
var fs = require('file-system');
var app = express();
var port = 5000;

app.set('port', port);

var storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, 'uploads/');
    },
    filename: function (request, file, callback) {
        console.log(file);
        callback(null, file.originalname)
    }
});

/*Multer accepts a single file with the name photo. This file will be stored in request.file*/

var upload = multer({storage: storage}).single('file');

app.use(express.static('.'));

//Showing index.html file on our homepage
app.get('/', function (request, response) {
    response.sendFile(__dirname + '/index.html');
});

// getting files that are already uploaded
app.get('/upload', function(request, response){
    var fileList = [];
    fs.readdir("./uploads", function(err, files){
        if(err || files.length === 0){
            console.log(err);
            response.end();
            return;
        }
        var itemsProcessed = 0;
        files.forEach(function(file){
            itemsProcessed++;
            console.log("Loading: " + file);
            fileList.push(file);
            if(itemsProcessed === files.length || files.length === 0){
                response.send(fileList);
            }
        });
    });
    console.log("filelist:" + fileList);
});

//Posting the file upload
app.post('/upload', function (request, response) {
    upload(request, response, function (err) {
        if (err || request.file === undefined) {
            console.log(err);
            response.end();
            return;
        }
        console.log(request.file);
        console.log('File Uploaded');
        response.send(request.file.originalname);

    })
});

var server = app.listen(port, function () {
    console.log('Listening on port ' + server.address().port)
});