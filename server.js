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
	destination: (request, file, callback) => {
		callback(null, 'uploads/');
	},
	filename: (request, file, callback) => {
		callback(null, file.originalname)
	}
});

/*Multer accepts a single file with the name photo. This file will be stored in request.file*/

let upload = multer({storage: storage}).single('file');

app.use(express.static('.'));

//Showing index.html file on our homepage
app.get('/', (request, response) => {
	response.sendFile(__dirname + '/public//index.html');
});

// getting files that are already uploaded
app.get('/upload', (request, response) => {
	fs.readdir("./uploads")
		.then(files => {
			response.send(
				files
					.filter(file => !file.startsWith("."))
					.map(file => {
						let stats = fs.statSync(path.join('./uploads/', file));
						let sizeInMB = (stats.size / 1024 / 1024).toFixed(2);
						return {name: file, size: sizeInMB + " MB"}
					})
			);
		})
		.catch(err => {
			console.log(err);
			response.send([]);
		});
});

// get single file that is already uploaded
// app.get('/upload/:file', (request, response, err) => {
// 	console.log(request.params.file);
// 	if(err){
// 		console.log(err);
// 	}
// 	response.sendFile('/uploads/' + request.params.file);
// });

//Posting the file upload
app.post('/upload', (request, response) =>{
	upload(request, response, err => {
		if (err || request.file === undefined) {
			console.log(err);
			response.end();
			return;
		}
		console.log("Uploaded file: " + request.file.originalname);
	})
});

app.delete('/uploads/:filename', (request, response) => {
	console.log(__dirname + '/uploads/' + request.params.filename);
	fs.unlink(__dirname + '/uploads/' + request.params.filename, err => {
		if (err) {
			console.log(err);
			response.end();
		}
		else {
			response.send(request.params.filename + " deleted.");
		}
	});
});

let server = app.listen(port, () =>
	console.log('Listening on port ' + server.address().port));