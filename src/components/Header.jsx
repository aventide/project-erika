import React from 'react';
import '../containers/App.css'
import PersonalSymbol from '../images/taecon_lightblue.svg';

const Header = props =>
	<header>
		<img src={PersonalSymbol} className="PersonalSymbol" alt=""/>
		<div className="SeparationLine"/>
		<WorkingDirectory currentDirPath={props.currentDirPath}/>
		<LogOut/>
	</header>;

const LogOut = () =>
	<h6 className="login">Log out</h6>;

const WorkingDirectory = props =>
	props.currentDirPath.split('/').map((dir, index) =>
		<div style={{display: "inline"}} key={dir + index}>
			<b className="selectable-directory">{dir}</b>
			<b>/</b>
		</div>
	);

export default Header;