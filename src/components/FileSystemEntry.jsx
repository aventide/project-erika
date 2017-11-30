import React from 'react';
import '../containers/App.css';

const FileSystemEntry = props =>
			<div className={props.fileDisplayMode}>
				<h3>
					{props.name}
				</h3>
			</div>;

export default FileSystemEntry;