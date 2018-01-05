import React, {Component} from 'react';
import './App.css';
import Header from '../components/Header';
import Toolbar from '../components/Toolbar.jsx';
import FileSystemEntryGrid from '../components/FileSystemEntryGrid.jsx'

// NOTE: /components/Toolbar is acting as the store right now.
// you might want to change things around later.

class App extends Component {

	constructor() {
		super();
		this.state = {
			currentDirPath: "upload"
		};
	}

	handleDirClick(e){
		this.setState({
			currentDirPath: `${this.state.currentDirPath}/${e.target.children[0].innerText}`
		});
	}

	handlePathClick(e){
		this.setState({
			currentDirPath: e.target.children[0].innerText
		});
	}

	render() {
		return (
			<div className="App">
				<Header currentDirPath={this.state.currentDirPath}/>
                <div className="main-content-container">
                    <div className="main-content">
                        <Toolbar/>
                        <FileSystemEntryGrid
							fileDisplayMode="file"
							currentDirPath={this.state.currentDirPath}
							handleDirClick={this.handleDirClick.bind(this)}
						/>
                    </div>
                </div>
				<footer>Copyright &copy; 2017 Alex Staples. All Rights Reserved.</footer>
			</div>
		);
	}
}

export default App;
