import React from 'react';
import Axios from 'axios';
import '../containers/App.css';
import uploadIcon from '../images/upload_icon.svg';

// NOTE: this class is acting as a store. Maybe
// /app.jsx really should be...

class Toolbar extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			file: null
		};
		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.fileUpload = this.fileUpload.bind(this);
	}

	onFormSubmit(e){
		e.preventDefault();
		this.fileUpload(this.state.file).then((response)=>{
			console.log(response.data);
		})
	}

	onChange(e) {
		this.setState({file: e.target.files[0]})
	}

	fileUpload(file){
		const url = '/upload';
		const formData = new FormData();

		formData.append('file', file);

		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		};

		return Axios.post(url, formData, config);
	}

	render() {
		return (
			<div className="Toolbar">
				<ButtonRow>
					<form onSubmit={this.onFormSubmit}>
						<label htmlFor="selectFile" className="btn">Select File</label>
						<input id="selectFile" type="file" onChange={this.onChange}/>
						&nbsp;
						<label htmlFor="uploadFile" className="btn">
							<img src={uploadIcon} alt="Upload file"/>
						</label>
						<input id="uploadFile" type="submit"/>
					</form>
				</ButtonRow>
			</div>
		)
	}
}

const ButtonRow = props =>
		<div className="btn-container">
			{props.children}
		</div>;

export default Toolbar;