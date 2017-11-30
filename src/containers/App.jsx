import React, {Component} from 'react';
import './App.css';
import AppHeader from '../components/Header';
import Toolbar from '../components/Toolbar.jsx';
import FileSection from '../components/FileSystemEntryGrid.jsx'

// NOTE: /components/Toolbar is acting as the store right now.
// you might want to change things around later.

class App extends Component {
	render() {
		return (
			<div className="App">
				<AppHeader/>
				<Toolbar/>
				<FileSection fileDisplayMode="file"/>
				<footer>Copyright &copy; 2017 Alex Staples. All Rights Reserved.</footer>
			</div>
		);
	}
}

export default App;
