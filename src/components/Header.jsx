import React from 'react';
import '../containers/App.css'
import PersonalSymbol from '../images/taecon_lightblue.svg';

const Header = () =>
	<header>
		<SymbolDescription/>
		<h2>Choose a file. Upload it. All uploads appear below.</h2>
	</header>;

const SymbolDescription = () =>
	<div className="SymbolDescription">
		<img src={PersonalSymbol} className="PersonalSymbol" alt=""/>
		<div className="SeparationLine"/>
		<span className="HeaderDescription">project erika</span>
	</div>;

export default Header;