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
        backgroundImage: `url('../../uploads/${props.file.name}')`,
    }}>
        {/*If image file, give it an overlay and small filename. Show big filename if not.*/}
        {imageFileExtensions.some(x => props.file.name.endsWith(x)) ?
            <div><EntryOverlay/><EntryFilename value={props.file.name}/></div> :
            <h3>{props.file.name}</h3>}
        <EntrySize value={props.file.size}/>
        <DownloadButton filename={props.file.name}/>
    </div>;

const EntryFilename = props =>
    <h6 className="entry-filename">
        {props.value}
    </h6>;

const EntrySize = props =>
    <h6 className="entry-size">
        Size: {props.value}
    </h6>;

const DownloadButton = props =>
    <a
        download
        className="download-button"
        href={`/upload/${props.filename}`}>
        <img src={downloadIcon} alt="Download file" async="async"/>
    </a>;

const EntryOverlay = () =>
    <div className="entry-overlay"/>;

export default FileSystemEntry;