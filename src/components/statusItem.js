import React from 'react';

import {observer} from 'mobx-react';

import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import TextField from 'material-ui/TextField';

import uniqueId from 'lodash/uniqueId';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

@observer
export default class StatusItem extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {editText: props.status.title};

    this.id = uniqueId('editField_');
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

          <IconButton tooltip="Delete" onClick={this.handleDestroy}>
              <ActionDelete />
          </IconButton>
				</div>

        <TextField
          ref="editField"
          className="edit"
          id={this.id}
          value={this.state.editText}
          onBlur={this.handleSubmit}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          multiLine={true}
          rows={1}
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
    console.log('--- handleEdit ---');

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
