/**
 * Created by ajsta on 11/24/2017.
 *
 * http://www.codingdefined.com/2016/01/file-upload-in-nodejs.html
 *
 */

let express = require('express'),
    multer = require('multer'),
    fs = require('fs-extra'),
    path = require('path'),
    app = express();

const port = 5000;

app.set('port', port);

let storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, 'uploads/');
    },
    filename: function (request, file, callback) {
        callback(null, file.originalname)
    }
});

/*Multer accepts a single file with the name photo. This file will be stored in request.file*/

let upload = multer({storage: storage}).single('file');

app.use(express.static('.'));

//Showing index.html file on our homepage
app.get('/', function (request, response) {
    response.sendFile(__dirname + '/public//index.html');
});

// getting files that are already uploaded
app.get('/upload', function (request, response) {
    fs.readdir("./uploads")
        .then(files => {
            response.send(
                files.map(file => {
                    let stats = fs.statSync(path.join('./uploads/', file));
                    return {name: file, size: stats.size}
                })
            );
        })
        .catch(err => {
            console.log(err);
            response.send([]);
        });
});

//Posting the file upload
app.post('/upload', function (request, response) {
    upload(request, response, function (err) {
        if (err || request.file === undefined) {
            console.log(err);
            response.end();
            return;
        }
        console.log("Uploaded file: " + request.file.originalname);
    })
});

app.delete('/uploads/:filename', function (request, response) {
    console.log(__dirname + '/uploads/' + request.params.filename);
    fs.unlink(__dirname + '/uploads/' + request.params.filename, function (err) {
        if (err) {
            console.log(err);
            response.end();
        }
        else {
            response.send(request.params.filename + " deleted.");
        }
    });
});

let server = app.listen(port, function () {
    console.log('Listening on port ' + server.address().port);
});