import React from 'react';
import {observer} from 'mobx-react';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

@observer
export default class StatusItem extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {editText: props.status.title};
	}

	render() {
		const {viewStore, status} = this.props;

		return (
			<li className={[
				status.friend ? "friend": "",
				status === viewStore.statusBeingEdited ? "editing" : ""
			].join(" ")}>
				<div className="view">
					<input
						className="toggle"
						type="checkbox"
						checked={status.friend}
						onChange={this.handleToggle}
					/>

					<label onDoubleClick={this.handleEdit}>
						{status.title}
					</label>

					<button className="destroy" onClick={this.handleDestroy} />
				</div>

				<input
					ref="editField"
					className="edit"
					value={this.state.editText}
					onBlur={this.handleSubmit}
					onChange={this.handleChange}
					onKeyDown={this.handleKeyDown}
				/>
			</li>
		);
	}

	handleSubmit = (event) => {
		const val = this.state.editText.trim();

		if (val) {
			this.props.status.setTitle(val);
			this.setState({editText: val});
		} else {
			this.handleDestroy();
		}

		this.props.viewStore.statusBeingEdited = null;
	};

	handleDestroy = () => {
		this.props.status.destroy();
		this.props.viewStore.statusBeingEdited = null;
	};

	handleEdit = () => {
		const status = this.props.status;
		this.props.viewStore.statusBeingEdited = status;
        this.setState({editText: status.title});
	};

	handleKeyDown = (event) => {
		if (event.which === ESCAPE_KEY) {
			this.setState({editText: this.props.status.title});
			this.props.viewStore.statusBeingEdited = null;
		} else if (event.which === ENTER_KEY) {
			this.handleSubmit(event);
		}
	};

	handleChange = (event) => {
		this.setState({editText: event.target.value});
	};

	handleToggle = () => {
		this.props.status.toggle();
	};
}

StatusItem.propTypes = {
	status: React.PropTypes.object.isRequired,
	viewStore: React.PropTypes.object.isRequired
};
