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
app.use(express.static('build'));

//Showing index.html file on our homepage
app.get('/', (request, response) => {
	response.sendFile(__dirname + '/build/index.html');
});

// getting files that are already uploaded
// filter out files beginning with '.'
app.get('/upload', (request, response) => {
	fs.readdir("./uploads")
		.then(files => {
			response.send(
				files
					.filter(file => !file.startsWith("."))
					.map(file => {
						const stats = fs.statSync(path.join('./uploads/', file));
						const sizeInMB = (stats.size / 1024 / 1024).toFixed(2);
						return {name: file, size: sizeInMB + " MB"}
					})
			);
		})
		.catch(err => {
			console.log(err);
			response.send([]);
		});
});

// get single file or directory of files that is already uploaded. Nested level.
app.get('/upload/*', (request, response, err) => {
	console.log(`GET /upload/${request.params[0]}`);

	const thisPath = path.join('./uploads/', request.params[0]);
	const stats = fs.statSync(thisPath);

	if(stats.isFile()){
		response.sendFile(path.resolve(thisPath));
	}

	else if (stats.isDirectory()){
		fs.readdir(thisPath)
			.then(files => {
				response.send(
					files
						.filter(file => !file.startsWith("."))
						.map(file => {
							const stats = fs.statSync(thisPath);
							const sizeInMB = (stats.size / 1024 / 1024).toFixed(2);
							return {name: file, size: sizeInMB + " MB"}
						})
				);
			})
			.catch(err => {
				console.log(err);
				response.send([]);
			});
	}

	if(err){
		console.log(err);
	}

});

// get single file that is already uploaded. Single level.
// app.get('/upload/:file', (request, response, err) => {
// 	console.log(`GET /upload/${request.params.file}`);
// 	if(err){
// 		console.log(err);
// 	}
// 	response.sendFile(__dirname + '/uploads/' + request.params.file);
// });

//Posting the file upload
app.post('/upload', (request, response) => {
	upload(request, response, err => {
		if (err || request.file === undefined) {
			console.log(err);
			response.end();
			return;
		}
		console.log("Uploaded file: " + request.file.originalname);
	})
});

app.delete('/upload/:filename', (request, response) => {
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