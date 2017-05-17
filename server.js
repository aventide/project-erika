/**
 * Created by ajsta on 1/18/2017
 *
 */

var express = require('express');
var multer = require('multer');
var session = require('client-sessions');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var mysql = require('mysql');
var fs = require('file-system');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "woi9HooZ",
    database: "kemmcare"
});

connection.connect(function(err){
    if(err){
        console.log('Error connecting to database');
        return;
    }
    console.log('Database connection established.');
});

var app = express();
var port = 5000;
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

app.post('/login', function(req, res){
    connection.query('SELECT * FROM users', function(err, rows){
        if(err) throw err;

        if(rows.length > 0){
            if(req.body.username === rows[0].email){
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
                res.send("<html>Invalid username.</html>");
            }
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

app.get('/uploads/:filename', function(req, res){
    if(req.session.user){
        res.sendFile(__dirname + '/uploads/' + req.params.filename);
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

var server = app.listen(port, function () {
    console.log('Listening on port ' + server.address().port);
});