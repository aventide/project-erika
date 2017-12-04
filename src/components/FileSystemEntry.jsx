import React from 'react';
import '../containers/App.css';

const imageFileExtensions = [
	"jpg",
	"png",
	"svg",
	"gif",
];

const FileSystemEntry = props =>
	<div className={props.fileDisplayMode} style={{
		backgroundImage: `url('../../uploads/${props.file["name"]}')`,
	}}>
		<h3>
			{/*Show filename only if not an image*/}
			{imageFileExtensions.some(x => props.file.name.endsWith(x)) ? "" : props.file.name}
		</h3>
		<h6>
			{props.file.size}
		</h6>
	</div>;

export default FileSystemEntry;