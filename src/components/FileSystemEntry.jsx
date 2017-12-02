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
		backgroundImage: `url('../../uploads/${props.name}')`,
	}}>
		<h3>
			{/*Show filename only if not an image*/}
			{imageFileExtensions.some(x => props.name.endsWith(x)) ? "" : props.name}
		</h3>
	</div>;

export default FileSystemEntry;