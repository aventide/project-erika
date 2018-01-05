import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './FileSystemEntryGrid.css';
import Axios from 'axios';
import FileSystemEntry from "./FileSystemEntry.jsx";

// NOTE: This also stores state. Maybe that should also be moved up.

class FileSystemEntryGrid extends React.Component {

    constructor() {
        super();
        this.state = {files: []};
    }

    componentDidMount() {
        this.getFSEntries();
        setInterval(this.getFSEntries.bind(this), 5000);
    }

    componentWillReceiveProps(newProps) {
		Axios.get(newProps.currentDirPath)
			.then(response => {
				this.setState({files: response.data});
			});
    }

    getFSEntries() {
        Axios.get(this.props.currentDirPath)
            .then(response => {
                this.setState({files: response.data});
            });
    }

    render() {

        return (
            <div>
                <ReactCSSTransitionGroup transitionName="file" transitionEnterTimeout={700}
                                         transitionLeaveTimeout={700}>
                    {this.state.files.map(file => (
                        <FileSystemEntry
                            key={file.name}
                            file={file}
                            fileDisplayMode={this.props.fileDisplayMode}
                            handleDirClick={this.props.handleDirClick}
                            currentDirPath={this.props.currentDirPath}
                        />
                    ))}
                </ReactCSSTransitionGroup>
            </div>

        )
    }
}

export default FileSystemEntryGrid;