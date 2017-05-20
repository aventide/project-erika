/**
 * Created by ajsta on 1/18/2017
 *
 */

let express = require('express');
let multer = require('multer');
let session = require('client-sessions');
let bodyParser = require('body-parser');
let bcrypt = require('bcrypt');
let fs = require('file-system');
let database = require('./database');

let app = express();
let port = 5000;
app.set('port', port);

app.use('/public', express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    cookieName: 'session',
    secret: 'Quae8dee!Ahth5kah!',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000
}));

let storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, 'uploads/');
    },
    filename: function (request, file, callback) {
        console.log(file);
        callback(null, file.originalname)
    }
});

/*Multer accepts a single file with the name photo. This file will be stored in request.file*/

let upload = multer({storage: storage}).single('file');

app.post('/login', function(req, res){
    database.getUsers( `SELECT * FROM users where email='${req.body.username}'`, (err, rows) => {
        if(err) throw err;
        if(rows.length > 0){
            bcrypt.compare(req.body.password, rows[0].password, function(err, matches){
                if(matches){
                    req.session.user = rows[0].email;
                    res.redirect('/');
                }
                else{
                    res.send("<html>Valid Username, bad password.</html>");
                }
            });
        }
        else{
            res.send("<html>Invalid Username.</html>");
        }
    });
});

app.post('/logout', function(req, res){
    req.session.reset();
    res.redirect('/');
});

app.get('/logout', function(req, res){
    req.session.reset();
    res.redirect('/');
});

app.get('/', function(req, res){
    console.log("GET /");
    if(req.session.user){
        res.sendFile(__dirname + '/uploader.html');
    } else{
        res.sendFile(__dirname + '/login.html');
    }
});

// getting files that are already uploaded
app.get('/upload', function(request, response){
    let fileList = [];
    fs.readdir("./uploads", function(err, files){
        if(err || files.length === 0){
            console.log(err);
            response.end();
            return;
        }
        let itemsProcessed = 0;
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

app.get('/uploads/:filename', function(req, res){
    if(req.session.user){
        res.sendFile(__dirname + '/uploads/' + req.params.filename);
    } else{
        res.redirect('/');
    }
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

app.delete('/uploads/:filename', function(request, response){
    console.log(__dirname + '/uploads/' + request.params.filename);
    fs.unlink(__dirname + '/uploads/' + request.params.filename, function(err){
        if(err){
            throw err;
        }
        else {
            response.send(request.params.filename + " deleted.");
            response.end();
        }
    });
});

let server = app.listen(port, function () {
    console.log('Listening on port ' + server.address().port);
});