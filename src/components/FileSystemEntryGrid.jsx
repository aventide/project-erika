import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import '../containers/App.css';
import Axios from 'axios';
import FileSystemEntry from "./FileSystemEntry.jsx";

// NOTE: This also stores state. Maybe that should also be moved up.

class FileSystemEntryGrid extends React.Component {

	constructor() {
		super();
		this.state = {files: []};
	}

	componentDidMount() {
		this.getFileItems();
		setInterval(this.getFileItems.bind(this), 5000);
	}

	getFileItems() {
		Axios.get('/upload')
			.then(response => {
				this.setState({files: response.data});
			});
	}

	render() {
		return (
			<div className="file-section-container">
				<div className="file-section">
					<ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={700}
											 transitionLeaveTimeout={700}>
						{this.state.files.map(file => (
							<FileSystemEntry
								key={file}
								name={file}
								fileDisplayMode={this.props.fileDisplayMode}
							/>
						))}
					</ReactCSSTransitionGroup>
				</div>
			</div>

		)
	}
}

export default FileSystemEntryGrid;