import React from 'react';
import './FileSystemEntryGrid.css';
import downloadIcon from '../images/download_icon.svg';

const imageFileExtensions = [
	"jpg", "JPG",
	"png", "PNG",
	"svg", "SVG",
	"gif", "GIF"
];

const FileSystemEntry = props =>
	<div className={props.fileDisplayMode} style={{
		backgroundImage: `url('../../uploads/${props.file["name"]}')`,
		backgroundSize: "220px 220px",
		backgroundPosition: "center",
		backgroundRepeat: 'no-repeat',
		backgroundOrigin: 'content-box'
	}}>
		{/*Show show image overlay only if an image*/}
		{imageFileExtensions.some(x => props.file.name.endsWith(x)) ? <EntryOverlay/> : null}
		<h3>
			{/*Hide filename if an image*/}
			{imageFileExtensions.some(x => props.file.name.endsWith(x)) ? "" : props.file.name}
		</h3>
		<EntrySize value={props.file.size}/>
		<DownloadButton filename={props.file.name}/>
	</div>;

const EntrySize = props =>
	<h6 className="entry-size">
		Size: {props.value}
	</h6>;

const DownloadButton = props =>
	<a
		className="download-button"
		href={`/upload/${props.filename}`}>
		<img src={downloadIcon} alt="Download file"/>
	</a>;

const EntryOverlay = () =>
	<div className="entry-overlay"/>

export default FileSystemEntry;