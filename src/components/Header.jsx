import React from 'react';
import '../containers/App.css'
import PersonalSymbol from '../images/taecon_lightblue.svg';

const Header = props =>
	<header>
		<LeftHeaderContent/>
		<h2>{props.text}</h2>
		<RightHeaderContent/>
	</header>;

const LeftHeaderContent = () =>
	<div className="LeftHeaderContent">
		<img src={PersonalSymbol} className="PersonalSymbol" alt=""/>
		<div className="SeparationLine"/>
		<span className="HeaderDescription">project erika</span>
	</div>;

const RightHeaderContent = () =>
	<div className="RightHeaderContent">
		<h6>Log out</h6>
	</div>;

export default Header;